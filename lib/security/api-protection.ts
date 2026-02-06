// API Security Middleware - میان‌افزار امنیتی API
// محافظت جامع از تمام API endpoints

import { NextRequest, NextResponse } from "next/server";
import { verifyEnhancedAuth } from "./auth";
import { securityConfig } from "./config";
import { csrfProtection } from "./csrf";
import { logAuthFailure, logSecurityEvent, SecurityEventType } from "./logger";
import { applyRateLimit, getClientIP } from "./rate-limiter";
import { validateInput } from "./validation";

/**
 * نوع پاسخ API
 */
export interface SecureAPIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    timestamp: string;
    requestId: string;
  };
}

/**
 * محافظت کامل API endpoint
 */
export async function protectAPIEndpoint(
  request: NextRequest,
  options: {
    requireAuth?: boolean;
    requireMFA?: boolean;
    checkCSRF?: boolean;
    rateLimit?: "general" | "auth" | "sensitive";
    allowedMethods?: string[];
    validateBody?: boolean;
  } = {},
): Promise<{
  success: boolean;
  response?: NextResponse;
  user?: any;
  sessionData?: any;
}> {
  const {
    requireAuth = false,
    requireMFA = false,
    checkCSRF = true,
    rateLimit = "general",
    allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"],
    validateBody = true,
  } = options;

  const ip = getClientIP(request);
  const method = request.method;
  const path = request.nextUrl.pathname;

  // بررسی متد HTTP مجاز
  if (!allowedMethods.includes(method)) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "متد HTTP مجاز نیست" },
        { status: 405 },
      ),
    };
  }

  // اعمال Rate Limiting
  const rateLimitResult = await applyRateLimit(request, rateLimit);
  if (!rateLimitResult.success) {
    return {
      success: false,
      response: rateLimitResult.response,
    };
  }

  // بررسی احراز هویت
  let user, sessionData;
  if (requireAuth) {
    const authResult = await verifyEnhancedAuth(request);

    if (!authResult) {
      await logAuthFailure(
        ip,
        "unknown",
        request.headers.get("user-agent") || "",
        "No valid token",
      );

      return {
        success: false,
        response: NextResponse.json(
          { error: "احراز هویت ناموفق" },
          { status: 401 },
        ),
      };
    }

    user = authResult.user;
    sessionData = authResult.sessionData;

    // بررسی MFA
    if (requireMFA && !sessionData.mfaVerified) {
      return {
        success: false,
        response: NextResponse.json(
          { error: "نیاز به احراز هویت دو مرحله‌ای" },
          { status: 403 },
        ),
      };
    }
  }

  // بررسی CSRF برای درخواست‌های تغییردهنده
  if (checkCSRF && ["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
    const sessionId = sessionData?.sessionId || "anonymous";
    const csrfResult = await csrfProtection(request, sessionId);

    if (!csrfResult.protected) {
      await logSecurityEvent(
        SecurityEventType.CSRF_VIOLATION,
        "high",
        ip,
        { path, method },
        user?.id,
      );

      return {
        success: false,
        response: csrfResult.response,
      };
    }
  }

  // اعتبارسنجی بدنه درخواست
  if (validateBody && ["POST", "PUT", "PATCH"].includes(method)) {
    try {
      const body = await request.json();

      // بررسی اندازه بدنه
      const bodySize = JSON.stringify(body).length;
      if (bodySize > 1024 * 1024) {
        // 1MB
        return {
          success: false,
          response: NextResponse.json(
            { error: "بدنه درخواست بیش از حد بزرگ است" },
            { status: 413 },
          ),
        };
      }

      // بررسی تهدیدات در داده‌های ورودی
      for (const [key, value] of Object.entries(body)) {
        if (typeof value === "string") {
          const result = validateInput(value, key, false);

          if (result.threats.length > 0) {
            await logSecurityEvent(
              SecurityEventType.SUSPICIOUS_INPUT,
              "high",
              ip,
              { field: key, threats: result.threats, path },
              user?.id,
            );

            if (securityConfig.threatDetection.blockOnDetection) {
              return {
                success: false,
                response: NextResponse.json(
                  { error: "ورودی مشکوک شناسایی شد" },
                  { status: 400 },
                ),
              };
            }
          }
        }
      }
    } catch (error) {
      // بدنه درخواست JSON معتبری نیست
      return {
        success: false,
        response: NextResponse.json(
          { error: "فرمت درخواست نامعتبر است" },
          { status: 400 },
        ),
      };
    }
  }

  return {
    success: true,
    user,
    sessionData,
  };
}

/**
 * ساخت پاسخ امن API
 */
export function createSecureAPIResponse<T>(
  data: T,
  status: number = 200,
): NextResponse {
  const response: SecureAPIResponse<T> = {
    success: status >= 200 && status < 300,
    data: status >= 200 && status < 300 ? data : undefined,
    error: status >= 400 ? (data as any).error || "خطای ناشناخته" : undefined,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: crypto.randomUUID(),
    },
  };

  return NextResponse.json(response, {
    status,
    headers: {
      "Content-Type": "application/json",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
    },
  });
}

/**
 * Wrapper برای API handlers با محافظت خودکار
 */
export function withAPIProtection(
  handler: (request: NextRequest, context: any) => Promise<NextResponse>,
  options?: Parameters<typeof protectAPIEndpoint>[1],
) {
  return async (request: NextRequest, context: any) => {
    const protection = await protectAPIEndpoint(request, options);

    if (!protection.success) {
      return protection.response!;
    }

    // اضافه کردن اطلاعات امنیتی به context
    const secureContext = {
      ...context,
      user: protection.user,
      sessionData: protection.sessionData,
      ip: getClientIP(request),
    };

    try {
      return await handler(request, secureContext);
    } catch (error: any) {
      console.error("[API ERROR]", error);

      // لاگ خطاها برای مانیتورینگ
      logSecurityEvent(
        SecurityEventType.DATA_BREACH_ATTEMPT,
        "high",
        getClientIP(request),
        { error: error.message, path: request.nextUrl.pathname },
        protection.user?.id,
      );

      return createSecureAPIResponse({ error: "خطای سرور" }, 500);
    }
  };
}

/**
 * محدودسازی دسترسی بر اساس نقش
 */
export function requireRole(...allowedRoles: string[]) {
  return async (request: NextRequest, context: any) => {
    const protection = await protectAPIEndpoint(request, { requireAuth: true });

    if (!protection.success) {
      return protection.response!;
    }

    const userRole = protection.user?.role;

    if (!allowedRoles.includes(userRole)) {
      logSecurityEvent(
        SecurityEventType.PRIVILEGE_ESCALATION_ATTEMPT,
        "critical",
        getClientIP(request),
        {
          requiredRoles: allowedRoles,
          userRole,
          path: request.nextUrl.pathname,
        },
        protection.user?.id,
      );

      return NextResponse.json(
        { error: "شما دسترسی لازم را ندارید" },
        { status: 403 },
      );
    }

    return { user: protection.user, sessionData: protection.sessionData };
  };
}

/**
 * ساخت CORS headers امن
 */
export function createSecureCORSHeaders(
  origin?: string,
): Record<string, string> {
  const allowedOrigins = securityConfig.cors.allowedOrigins;
  const isAllowed =
    !origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*");

  if (!securityConfig.cors.enabled || !isAllowed) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": origin || allowedOrigins[0] || "*",
    "Access-Control-Allow-Methods":
      securityConfig.cors.allowedMethods.join(", "),
    "Access-Control-Allow-Headers":
      securityConfig.cors.allowedHeaders.join(", "),
    "Access-Control-Expose-Headers":
      securityConfig.cors.exposedHeaders.join(", "),
    "Access-Control-Allow-Credentials": securityConfig.cors.credentials
      ? "true"
      : "false",
    "Access-Control-Max-Age": securityConfig.cors.maxAge.toString(),
  };
}
