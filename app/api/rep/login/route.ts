import {
  createSecureAPIResponse,
  protectAPIEndpoint,
} from "@/lib/security/api-protection";
import {
  generateMFACode,
  generateSessionFingerprint,
  storeMFACode,
} from "@/lib/security/auth";
import { securityConfig } from "@/lib/security/config";
import {
  logAuthFailure,
  logAuthSuccess,
  logSecurityEvent,
  SecurityEventType,
} from "@/lib/security/logger";
import {
  blockIP,
  clearFailedAttempts,
  getClientIP,
  recordFailedAttempt,
} from "@/lib/security/rate-limiter";
import { validateInput, validateUsername } from "@/lib/security/validation";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextRequest } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  // محافظت API با تنظیمات امنیتی قوی
  const protection = await protectAPIEndpoint(request, {
    requireAuth: false,
    checkCSRF: false, // برای لاگین CSRF چک نمی‌کنیم
    rateLimit: "auth", // محدودیت شدید برای لاگین
    allowedMethods: ["POST"],
    validateBody: true,
  });

  if (!protection.success) {
    return protection.response!;
  }

  try {
    const body = await request.json();
    const { username, password } = body;

    const ip = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || "unknown";

    // اعتبارسنجی ورودی‌ها
    const usernameValidation = validateUsername(username);
    const passwordValidation = validateInput(password, "password", true);

    if (!usernameValidation.isValid) {
      await logAuthFailure(ip, username, userAgent, "Invalid username format");
      return createSecureAPIResponse(
        { error: usernameValidation.errors[0] || "نام کاربری نامعتبر است" },
        400,
      );
    }

    if (usernameValidation.threats.length > 0) {
      await logSecurityEvent(
        SecurityEventType.SQL_INJECTION_ATTEMPT,
        "critical",
        ip,
        { username, threats: usernameValidation.threats },
      );
      blockIP(ip, "SQL Injection attempt in login");
      return createSecureAPIResponse({ error: "ورودی مشکوک شناسایی شد" }, 403);
    }

    if (!passwordValidation.isValid) {
      await logAuthFailure(ip, username, userAgent, "Invalid password format");
      return createSecureAPIResponse({ error: "رمز عبور نامعتبر است" }, 400);
    }

    console.log("Login attempt for username:", username);

    // جستجوی کاربر
    const { data: rep, error: repError } = await supabase
      .from("rep")
      .select("*")
      .eq("username", usernameValidation.sanitized)
      .eq("is_active", true)
      .single();

    if (repError || !rep) {
      console.log("User not found or error:", repError);
      await logAuthFailure(ip, username, userAgent, "User not found");
      recordFailedAttempt(ip);

      return createSecureAPIResponse(
        { error: "نام کاربری یا رمز عبور اشتباه است" },
        401,
      );
    }

    // تایید رمز عبور
    const isValidPassword = await bcrypt.compare(password, rep.password_hash);

    if (!isValidPassword) {
      console.log("Invalid password for user:", username);
      await logAuthFailure(ip, username, userAgent, "Invalid password");
      recordFailedAttempt(ip);

      // مسدود کردن IP پس از تلاش‌های زیاد
      const attempts = recordFailedAttempt(ip);
      if (attempts >= securityConfig.ipBlocking.maxFailedAttempts) {
        blockIP(ip, "Too many failed login attempts");
      }

      return createSecureAPIResponse(
        { error: "نام کاربری یا رمز عبور اشتباه است" },
        401,
      );
    }

    // تولید Session Token امن
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 روز

    // تولید Session Fingerprint
    const fingerprint = generateSessionFingerprint(request);

    // ایجاد Session
    const { error: sessionError } = await supabase.from("rep_session").insert({
      rep_id: rep.id,
      session_token: sessionToken,
      ip_address: ip,
      user_agent: userAgent,
      expires_at: expiresAt.toISOString(),
      session_fingerprint: fingerprint,
      created_at: new Date().toISOString(),
      last_rotation_at: new Date().toISOString(),
      mfa_verified: false, // در صورت فعال بودن MFA باید تایید شود
    });

    if (sessionError) {
      console.error("Session creation error:", sessionError);
      return createSecureAPIResponse({ error: "خطا در ایجاد نشست" }, 500);
    }

    // به‌روزرسانی زمان آخرین ورود
    await supabase
      .from("rep")
      .update({
        last_login_at: new Date().toISOString(),
        last_login_ip: ip,
      })
      .eq("id", rep.id);

    // ثبت فعالیت
    await supabase.from("rep_activity").insert({
      rep_id: rep.id,
      activity_type: "login",
      ip_address: ip,
      details: {
        user_agent: userAgent,
        fingerprint: fingerprint.substring(0, 16),
      },
    });

    // پاک کردن تلاش‌های ناموفق
    clearFailedAttempts(ip);

    // لاگ موفقیت
    await logAuthSuccess(ip, rep.id, userAgent);

    console.log("Login successful for:", username);

    // در صورت فعال بودن MFA، کد ارسال می‌کنیم
    let mfaRequired = false;
    if (securityConfig.mfa.enabled && securityConfig.mfa.required) {
      const mfaCode = generateMFACode();
      storeMFACode(rep.id, mfaCode);
      mfaRequired = true;

      // در production باید کد از طریق SMS یا Email ارسال شود
      console.log("[MFA] Code for user:", rep.id, ":", mfaCode);
    }

    // بازگشت پاسخ موفق
    return createSecureAPIResponse({
      sessionToken,
      mfaRequired,
      rep: {
        id: rep.id,
        username: rep.username,
        full_name: rep.full_name,
        email: rep.email,
        role: rep.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    logSecurityEvent(
      SecurityEventType.AUTH_FAILURE,
      "high",
      getClientIP(request),
      { error: (error as Error).message },
    );

    return createSecureAPIResponse({ error: "خطای سرور" }, 500);
  }
}
