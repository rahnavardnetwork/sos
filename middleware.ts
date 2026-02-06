import { logSecurityEvent, SecurityEventType } from "@/lib/security/logger";
import {
  applyRateLimit,
  getClientIP,
  isIPBlocked,
} from "@/lib/security/rate-limiter";
import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const ip = getClientIP(request);
  const path = request.nextUrl.pathname;

  // بررسی مسدودیت IP
  const blockCheck = isIPBlocked(ip);
  if (blockCheck.blocked) {
    await logSecurityEvent(SecurityEventType.IP_BLOCKED, "high", ip, {
      reason: blockCheck.reason,
      path,
    });

    return NextResponse.json(
      {
        error: "دسترسی شما مسدود شده است",
        reason: blockCheck.reason,
        until: new Date(blockCheck.until!).toISOString(),
      },
      { status: 403 },
    );
  }

  // تعیین نوع محدودیت بر اساس مسیر
  let limitType: "general" | "auth" | "sensitive" = "general";

  if (path.includes("/login") || path.includes("/register")) {
    limitType = "auth";
  } else if (
    path.includes("/api/rep") ||
    path.includes("/api/submit") ||
    path.includes("/dashboard")
  ) {
    limitType = "sensitive";
  }

  // اعمال Rate Limiting
  const rateLimitResult = await applyRateLimit(request, limitType);
  if (!rateLimitResult.success) {
    await logSecurityEvent(
      SecurityEventType.RATE_LIMIT_EXCEEDED,
      "medium",
      ip,
      {
        path,
        limitType,
      },
    );

    return rateLimitResult.response!;
  }

  // اعمال Security Headers اضافی
  const response = await updateSession(request);

  // اضافه کردن هدرهای امنیتی سفارشی
  response.headers.set("X-Request-ID", crypto.randomUUID());
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // حذف اطلاعات حساس از هدرها
  response.headers.delete("X-Powered-By");
  response.headers.delete("Server");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
