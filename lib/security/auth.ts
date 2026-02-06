// Enhanced Authentication System - سیستم احراز هویت پیشرفته
// با قابلیت‌های MFA, Session Rotation, و Fingerprinting

import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { supabase } from "../db";
import { securityConfig } from "./config";

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export interface SessionData {
  userId: string;
  sessionId: string;
  fingerprint: string;
  createdAt: number;
  lastRotation: number;
  mfaVerified: boolean;
}

/**
 * تولید JWT امن
 */
export async function generateSecureToken(
  payload: any,
  expiresIn: string = securityConfig.token.expiresIn,
): Promise<string> {
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || "your-secret-key-change-in-production",
  );

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: securityConfig.token.algorithm as any })
    .setIssuedAt()
    .setIssuer(securityConfig.token.issuer)
    .setAudience(securityConfig.token.audience)
    .setExpirationTime(expiresIn)
    .sign(secret);
}

/**
 * تایید و پردازش JWT
 */
export async function verifySecureToken(token: string): Promise<any> {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "your-secret-key-change-in-production",
    );

    const { payload } = await jwtVerify(token, secret, {
      issuer: securityConfig.token.issuer,
      audience: securityConfig.token.audience,
    });

    return payload;
  } catch (error) {
    console.error("[SECURITY] Token verification failed:", error);
    return null;
  }
}

/**
 * تولید Session Fingerprint
 * ترکیبی از IP, User-Agent و اطلاعات دیگر برای شناسایی منحصر به فرد
 */
export function generateSessionFingerprint(request: NextRequest): string {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const acceptLanguage = request.headers.get("accept-language") || "";

  const fingerprintData = `${ip}|${userAgent}|${acceptLanguage}`;

  return createHash("sha256").update(fingerprintData).digest("hex");
}

/**
 * بررسی نیاز به چرخش Session
 */
export function shouldRotateSession(sessionData: SessionData): boolean {
  const timeSinceRotation = Date.now() - sessionData.lastRotation;
  return timeSinceRotation > securityConfig.session.rotationInterval;
}

/**
 * بررسی Session Timeout مطلق
 */
export function isSessionExpired(sessionData: SessionData): boolean {
  const sessionAge = Date.now() - sessionData.createdAt;
  return sessionAge > securityConfig.session.absoluteTimeout;
}

/**
 * تایید Session با Fingerprint
 */
export function validateSessionFingerprint(
  storedFingerprint: string,
  currentFingerprint: string,
): boolean {
  return storedFingerprint === currentFingerprint;
}

/**
 * هش کردن رمز عبور با bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(securityConfig.password.bcryptRounds);
  return bcrypt.hash(password, salt);
}

/**
 * مقایسه رمز عبور
 */
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * تولید کد MFA
 */
export function generateMFACode(): string {
  const code = randomBytes(3).toString("hex").toUpperCase();
  return code.substring(0, securityConfig.mfa.tokenLength);
}

/**
 * ذخیره کد MFA (باید در database ذخیره شود)
 */
const mfaCodes = new Map<
  string,
  { code: string; expires: number; attempts: number }
>();

export function storeMFACode(userId: string, code: string): void {
  mfaCodes.set(userId, {
    code,
    expires: Date.now() + securityConfig.mfa.tokenExpiry,
    attempts: 0,
  });
}

/**
 * تایید کد MFA
 */
export function verifyMFACode(
  userId: string,
  code: string,
): { valid: boolean; error?: string } {
  const stored = mfaCodes.get(userId);

  if (!stored) {
    return { valid: false, error: "کد تایید یافت نشد" };
  }

  if (Date.now() > stored.expires) {
    mfaCodes.delete(userId);
    return { valid: false, error: "کد تایید منقضی شده است" };
  }

  if (stored.attempts >= securityConfig.mfa.maxAttempts) {
    mfaCodes.delete(userId);
    return { valid: false, error: "تعداد تلاش‌های مجاز تمام شده است" };
  }

  stored.attempts++;

  if (stored.code !== code) {
    return { valid: false, error: "کد تایید نادرست است" };
  }

  // حذف کد پس از استفاده موفق
  mfaCodes.delete(userId);

  return { valid: true };
}

/**
 * احراز هویت پیشرفته با بررسی‌های امنیتی کامل
 */
export async function verifyEnhancedAuth(
  request: NextRequest,
): Promise<{ user: AuthUser; sessionData: SessionData } | null> {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.slice(7);

    // تایید JWT
    const payload = await verifySecureToken(token);
    if (!payload) {
      return null;
    }

    // بررسی Session در دیتابیس
    const { data: session, error } = await supabase
      .from("rep_session")
      .select(
        `
        id,
        rep_id,
        expires_at,
        session_fingerprint,
        created_at,
        last_rotation_at,
        mfa_verified,
        rep(id, email, full_name, role, is_active)
      `,
      )
      .eq("session_token", token)
      .single();

    if (error || !session) {
      return null;
    }

    const rep = session.rep as any;

    // بررسی فعال بودن کاربر
    if (!rep.is_active) {
      return null;
    }

    // بررسی انقضا
    if (new Date(session.expires_at) < new Date()) {
      return null;
    }

    // تولید fingerprint فعلی
    const currentFingerprint = generateSessionFingerprint(request);

    // بررسی fingerprint (محافظت در برابر Session Hijacking)
    if (
      session.session_fingerprint &&
      !validateSessionFingerprint(
        session.session_fingerprint,
        currentFingerprint,
      )
    ) {
      console.error(
        "[SECURITY] Session fingerprint mismatch - possible hijacking attempt",
      );
      // مسدود کردن session
      await supabase.from("rep_session").delete().eq("id", session.id);

      return null;
    }

    const sessionData: SessionData = {
      userId: rep.id,
      sessionId: session.id,
      fingerprint: currentFingerprint,
      createdAt: new Date(session.created_at).getTime(),
      lastRotation: session.last_rotation_at
        ? new Date(session.last_rotation_at).getTime()
        : new Date(session.created_at).getTime(),
      mfaVerified: session.mfa_verified || false,
    };

    // بررسی نیاز به چرخش Session
    if (shouldRotateSession(sessionData)) {
      const newToken = randomBytes(32).toString("hex");

      await supabase
        .from("rep_session")
        .update({
          session_token: newToken,
          last_rotation_at: new Date().toISOString(),
        })
        .eq("id", session.id);

      console.log("[SECURITY] Session rotated for user:", rep.id);
    }

    // بررسی Session Timeout مطلق
    if (isSessionExpired(sessionData)) {
      await supabase.from("rep_session").delete().eq("id", session.id);

      return null;
    }

    const user: AuthUser = {
      id: rep.id,
      email: rep.email || "",
      full_name: rep.full_name || "",
      role: rep.role || "rep",
    };

    return { user, sessionData };
  } catch (error) {
    console.error("[SECURITY] Enhanced auth verification error:", error);
    return null;
  }
}

/**
 * ثبت فعالیت امنیتی
 */
export async function logSecurityActivity(
  userId: string,
  activityType: string,
  ip: string,
  details: any,
): Promise<void> {
  try {
    await supabase.from("rep_activity").insert({
      rep_id: userId,
      activity_type: activityType,
      ip_address: ip,
      details,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[SECURITY] Failed to log activity:", error);
  }
}

/**
 * پاکسازی کدهای MFA منقضی شده
 */
function cleanupExpiredMFACodes(): void {
  const now = Date.now();
  for (const [userId, data] of mfaCodes.entries()) {
    if (now > data.expires) {
      mfaCodes.delete(userId);
    }
  }
}

// پاکسازی خودکار هر 5 دقیقه
if (typeof window === "undefined") {
  setInterval(cleanupExpiredMFACodes, 5 * 60 * 1000);
}
