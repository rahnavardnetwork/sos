// CSRF Protection - محافظت در برابر حملات CSRF
// Cross-Site Request Forgery Prevention

import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

// ذخیره توکن‌های CSRF (در production باید در Redis یا Database باشد)
const csrfTokens = new Map<
  string,
  { token: string; expires: number; used: boolean }
>();

/**
 * تولید توکن CSRF منحصر به فرد
 */
export function generateCSRFToken(sessionId: string): string {
  const token = randomBytes(32).toString("hex");
  const expires = Date.now() + 60 * 60 * 1000; // 1 ساعت

  // ذخیره توکن
  csrfTokens.set(sessionId, {
    token,
    expires,
    used: false,
  });

  // پاکسازی توکن‌های منقضی شده
  cleanupExpiredTokens();

  return token;
}

/**
 * اعتبارسنجی توکن CSRF
 */
export function validateCSRFToken(
  sessionId: string,
  token: string,
): { valid: boolean; error?: string } {
  const stored = csrfTokens.get(sessionId);

  if (!stored) {
    return { valid: false, error: "توکن CSRF یافت نشد" };
  }

  if (stored.used) {
    return { valid: false, error: "توکن CSRF قبلا استفاده شده است" };
  }

  if (Date.now() > stored.expires) {
    csrfTokens.delete(sessionId);
    return { valid: false, error: "توکن CSRF منقضی شده است" };
  }

  if (stored.token !== token) {
    return { valid: false, error: "توکن CSRF نامعتبر است" };
  }

  // علامت‌گذاری به عنوان استفاده شده (برای جلوگیری از استفاده مجدد)
  stored.used = true;

  return { valid: true };
}

/**
 * حذف توکن CSRF
 */
export function removeCSRFToken(sessionId: string): void {
  csrfTokens.delete(sessionId);
}

/**
 * پاکسازی توکن‌های منقضی شده
 */
function cleanupExpiredTokens(): void {
  const now = Date.now();
  for (const [sessionId, data] of csrfTokens.entries()) {
    if (now > data.expires) {
      csrfTokens.delete(sessionId);
    }
  }
}

/**
 * Middleware برای محافظت CSRF
 */
export async function csrfProtection(
  request: NextRequest,
  sessionId: string,
): Promise<{ protected: boolean; response?: NextResponse }> {
  const method = request.method;

  // فقط درخواست‌های تغییردهنده را بررسی می‌کنیم
  if (!["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
    return { protected: true };
  }

  // دریافت توکن از هدر
  const token = request.headers.get("X-CSRF-Token");

  if (!token) {
    return {
      protected: false,
      response: NextResponse.json(
        { error: "توکن CSRF یافت نشد" },
        { status: 403 },
      ),
    };
  }

  // اعتبارسنجی توکن
  const validation = validateCSRFToken(sessionId, token);

  if (!validation.valid) {
    return {
      protected: false,
      response: NextResponse.json({ error: validation.error }, { status: 403 }),
    };
  }

  return { protected: true };
}

/**
 * دریافت یا تولید توکن CSRF برای یک نشست
 */
export function getOrCreateCSRFToken(sessionId: string): string {
  const stored = csrfTokens.get(sessionId);

  // اگر توکن معتبر وجود دارد، همان را برگردان
  if (stored && !stored.used && Date.now() < stored.expires) {
    return stored.token;
  }

  // در غیر این صورت توکن جدید بساز
  return generateCSRFToken(sessionId);
}

// پاکسازی خودکار هر 30 دقیقه
if (typeof window === "undefined") {
  setInterval(cleanupExpiredTokens, 30 * 60 * 1000);
}
