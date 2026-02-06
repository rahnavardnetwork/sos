// Advanced Rate Limiter - محدودساز پیشرفته درخواست‌ها
// این ماژول از حملات DDoS و Brute Force جلوگیری می‌کند

import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";
import { securityConfig } from "./config";

// ذخیره‌سازی IP های مسدود شده
const blockedIPs = new Map<
  string,
  { until: number; reason: string; attempts: number }
>();
const failedAttempts = new Map<string, number>();

// Rate Limiter برای درخواست‌های عمومی
const generalLimiter = new RateLimiterMemory({
  points: securityConfig.rateLimit.general.max,
  duration: securityConfig.rateLimit.general.windowMs / 1000,
  blockDuration: 60, // مسدود کردن برای 60 ثانیه
});

// Rate Limiter برای احراز هویت (محدودیت شدیدتر)
const authLimiter = new RateLimiterMemory({
  points: securityConfig.rateLimit.auth.max,
  duration: securityConfig.rateLimit.auth.windowMs / 1000,
  blockDuration: 900, // مسدود کردن برای 15 دقیقه
});

// Rate Limiter برای API های حساس
const sensitiveLimiter = new RateLimiterMemory({
  points: securityConfig.rateLimit.sensitive.max,
  duration: securityConfig.rateLimit.sensitive.windowMs / 1000,
  blockDuration: 1800, // مسدود کردن برای 30 دقیقه
});

/**
 * دریافت IP واقعی کاربر (حتی پشت Proxy یا CDN)
 */
export function getClientIP(request: NextRequest): string {
  // بررسی هدرهای مختلف برای یافتن IP واقعی
  const forwarded = request.headers.get("x-forwarded-for");
  const real = request.headers.get("x-real-ip");
  const cfConnecting = request.headers.get("cf-connecting-ip"); // Cloudflare

  if (cfConnecting) return cfConnecting;
  if (forwarded) return forwarded.split(",")[0].trim();
  if (real) return real;

  return "unknown";
}

/**
 * بررسی اینکه آیا IP مسدود شده است
 */
export function isIPBlocked(ip: string): {
  blocked: boolean;
  reason?: string;
  until?: number;
} {
  const blockInfo = blockedIPs.get(ip);

  if (!blockInfo) return { blocked: false };

  // بررسی اینکه آیا زمان مسدودی تمام شده
  if (Date.now() > blockInfo.until) {
    blockedIPs.delete(ip);
    return { blocked: false };
  }

  return {
    blocked: true,
    reason: blockInfo.reason,
    until: blockInfo.until,
  };
}

/**
 * مسدود کردن یک IP
 */
export function blockIP(
  ip: string,
  reason: string,
  duration: number = securityConfig.ipBlocking.blockDuration,
): void {
  const attempts = failedAttempts.get(ip) || 0;

  blockedIPs.set(ip, {
    until: Date.now() + duration,
    reason,
    attempts: attempts + 1,
  });

  // لاگ امنیتی
  console.error(
    `[SECURITY] IP blocked: ${ip}, Reason: ${reason}, Attempts: ${attempts + 1}`,
  );
}

/**
 * ثبت تلاش ناموفق
 */
export function recordFailedAttempt(ip: string): number {
  const current = failedAttempts.get(ip) || 0;
  const newCount = current + 1;
  failedAttempts.set(ip, newCount);

  // اگر تعداد تلاش‌های ناموفق از حد مجاز بگذرد، IP را مسدود کن
  if (newCount >= securityConfig.ipBlocking.maxFailedAttempts) {
    blockIP(
      ip,
      "Too many failed attempts",
      securityConfig.ipBlocking.blockDuration,
    );
  }

  return newCount;
}

/**
 * پاک کردن تلاش‌های ناموفق پس از موفقیت
 */
export function clearFailedAttempts(ip: string): void {
  failedAttempts.delete(ip);
}

/**
 * اعمال Rate Limiting بر اساس نوع درخواست
 */
export async function applyRateLimit(
  request: NextRequest,
  type: "general" | "auth" | "sensitive" = "general",
): Promise<{ success: boolean; response?: NextResponse }> {
  const ip = getClientIP(request);

  // بررسی مسدودیت IP
  const blockCheck = isIPBlocked(ip);
  if (blockCheck.blocked) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "دسترسی مسدود شده است",
          reason: blockCheck.reason,
          until: new Date(blockCheck.until!).toISOString(),
        },
        { status: 429 },
      ),
    };
  }

  // انتخاب limiter مناسب
  const limiter =
    type === "auth"
      ? authLimiter
      : type === "sensitive"
        ? sensitiveLimiter
        : generalLimiter;

  try {
    await limiter.consume(ip);
    return { success: true };
  } catch (rateLimiterRes) {
    const resetTime = new Date(
      Date.now() + (rateLimiterRes as RateLimiterRes).msBeforeNext,
    );

    // ثبت تلاش ناموفق
    recordFailedAttempt(ip);

    // لاگ امنیتی
    console.warn(`[SECURITY] Rate limit exceeded: ${ip}, Type: ${type}`);

    return {
      success: false,
      response: NextResponse.json(
        {
          error: "تعداد درخواست‌ها بیش از حد مجاز است",
          retryAfter: resetTime.toISOString(),
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(
              (rateLimiterRes as RateLimiterRes).msBeforeNext / 1000,
            ).toString(),
          },
        },
      ),
    };
  }
}

/**
 * Middleware برای اعمال خودکار Rate Limiting
 */
export async function rateLimitMiddleware(
  request: NextRequest,
  handler: () => Promise<NextResponse>,
): Promise<NextResponse> {
  // تعیین نوع محدودیت بر اساس مسیر
  let limitType: "general" | "auth" | "sensitive" = "general";

  const path = request.nextUrl.pathname;

  if (path.includes("/login") || path.includes("/register")) {
    limitType = "auth";
  } else if (
    path.includes("/api/rep") ||
    path.includes("/api/submit") ||
    path.includes("/dashboard")
  ) {
    limitType = "sensitive";
  }

  const result = await applyRateLimit(request, limitType);

  if (!result.success) {
    return result.response!;
  }

  return handler();
}

/**
 * پاکسازی خودکار داده‌های قدیمی (باید به صورت دوره‌ای اجرا شود)
 */
export function cleanupOldData(): void {
  const now = Date.now();

  // پاک کردن IP های منقضی شده
  for (const [ip, blockInfo] of blockedIPs.entries()) {
    if (now > blockInfo.until) {
      blockedIPs.delete(ip);
    }
  }

  // پاک کردن تلاش‌های ناموفق قدیمی (بیش از 24 ساعت)
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  for (const [ip, _] of failedAttempts.entries()) {
    // در صورت نیاز می‌توان timestamp هم ذخیره کرد
    // فعلا فقط برای مثال این کد را نگه می‌داریم
  }

  console.log("[SECURITY] Cleanup completed");
}

// اجرای خودکار پاکسازی هر 1 ساعت
if (typeof window === "undefined") {
  setInterval(cleanupOldData, 60 * 60 * 1000);
}
