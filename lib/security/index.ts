// Security Module Main Export
// تمام ماژول‌های امنیتی را از یک جا export می‌کنیم

// Configuration
export { securityConfig } from "./config";
export type { SecurityConfig } from "./config";

// Authentication & Authorization
export {
  comparePassword,
  generateMFACode,
  generateSecureToken,
  generateSessionFingerprint,
  hashPassword,
  isSessionExpired,
  logSecurityActivity,
  shouldRotateSession,
  storeMFACode,
  validateSessionFingerprint,
  verifyEnhancedAuth,
  verifyMFACode,
  verifySecureToken,
} from "./auth";

export type { AuthUser, SessionData } from "./auth";

// Rate Limiting
export {
  applyRateLimit,
  blockIP,
  cleanupOldData,
  clearFailedAttempts,
  getClientIP,
  isIPBlocked,
  rateLimitMiddleware,
  recordFailedAttempt,
} from "./rate-limiter";

// Input Validation & Sanitization
export {
  detectThreats,
  logSecurityThreat,
  sanitizeString,
  validateEmail,
  validateInput,
  validateObject,
  validatePassword,
  validatePhone,
  validateURL,
  validateUsername,
} from "./validation";

export type { ValidationResult } from "./validation";

// CSRF Protection
export {
  csrfProtection,
  generateCSRFToken,
  getOrCreateCSRFToken,
  removeCSRFToken,
  validateCSRFToken,
} from "./csrf";

// Security Logging
export {
  SecurityEventType,
  analyzeSuspiciousPatterns,
  generateSecurityReport,
  getSecurityLogs,
  logAuthFailure,
  logAuthSuccess,
  logCSRFViolation,
  logRateLimitExceeded,
  logSQLInjectionAttempt,
  logSecurityEvent,
  logSessionHijackAttempt,
  logXSSAttempt,
} from "./logger";

export type { SecurityEvent } from "./logger";

// Database Security
export {
  checkDatabaseHealth,
  checkRLSPolicy,
  createSecureSupabaseClient,
  decryptSensitiveData,
  encryptSensitiveData,
  limitQueryResults,
  logDatabaseAction,
  prepareStatement,
  sanitizeQueryParams,
  secureQuery,
  validateQuery,
} from "./database";

// API Protection
export {
  createSecureAPIResponse,
  createSecureCORSHeaders,
  protectAPIEndpoint,
  requireRole,
  withAPIProtection,
} from "./api-protection";

export type { SecureAPIResponse } from "./api-protection";

// =============================================================================
// Helper Functions - توابع کمکی
// =============================================================================

/**
 * تنظیم سریع محافظت برای یک API route
 *
 * @example
 * ```typescript
 * export const POST = secureAPIRoute(
 *   async (request, context) => {
 *     // handler code
 *   },
 *   { requireAuth: true }
 * );
 * ```
 */
export { withAPIProtection as secureAPIRoute } from "./api-protection";

/**
 * اعتبارسنجی سریع برای فرم‌ها
 *
 * @example
 * ```typescript
 * const errors = validateForm({
 *   email: validateEmail(data.email),
 *   password: validatePassword(data.password),
 *   username: validateUsername(data.username),
 * });
 * ```
 */
export function validateForm(
  validations: Record<string, any>,
): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  for (const [field, validation] of Object.entries(validations)) {
    if (!validation.isValid) {
      errors[field] = validation.errors;
    }
  }

  return errors;
}

/**
 * بررسی اینکه آیا فرم معتبر است
 */
export function isFormValid(validations: Record<string, any>): boolean {
  return Object.values(validations).every((v: any) => v.isValid);
}

// =============================================================================
// Constants - ثابت‌ها
// =============================================================================

export const SECURITY_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 12,
  MAX_LOGIN_ATTEMPTS: 5,
  SESSION_MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
  TOKEN_ROTATION_INTERVAL: 60 * 60 * 1000, // 1 hour
  MFA_CODE_LENGTH: 6,
  MFA_CODE_EXPIRY: 5 * 60 * 1000, // 5 minutes
} as const;

export const SECURITY_MESSAGES = {
  fa: {
    AUTH_REQUIRED: "احراز هویت الزامی است",
    INVALID_TOKEN: "توکن نامعتبر است",
    RATE_LIMIT_EXCEEDED: "تعداد درخواست‌ها بیش از حد مجاز است",
    IP_BLOCKED: "دسترسی شما مسدود شده است",
    INVALID_INPUT: "ورودی نامعتبر است",
    CSRF_VIOLATION: "خطای امنیتی CSRF",
    PERMISSION_DENIED: "شما دسترسی لازم را ندارید",
    SERVER_ERROR: "خطای سرور",
  },
  en: {
    AUTH_REQUIRED: "Authentication required",
    INVALID_TOKEN: "Invalid token",
    RATE_LIMIT_EXCEEDED: "Rate limit exceeded",
    IP_BLOCKED: "Your IP has been blocked",
    INVALID_INPUT: "Invalid input",
    CSRF_VIOLATION: "CSRF violation",
    PERMISSION_DENIED: "Permission denied",
    SERVER_ERROR: "Server error",
  },
} as const;

// =============================================================================
// Utilities - ابزارها
// =============================================================================

/**
 * تولید کلید رمزنگاری تصادفی
 */
export function generateEncryptionKey(length: number = 32): string {
  const crypto = require("crypto");
  return crypto.randomBytes(length).toString("hex");
}

/**
 * تولید نمک (salt) برای هش
 */
export function generateSalt(length: number = 16): string {
  const crypto = require("crypto");
  return crypto.randomBytes(length).toString("hex");
}

/**
 * بررسی قدرت رمز عبور (score 0-4)
 */
export function getPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 12) score++;
  else feedback.push("رمز عبور باید حداقل 12 کاراکتر باشد");

  if (/[A-Z]/.test(password)) score++;
  else feedback.push("باید شامل حروف بزرگ باشد");

  if (/[a-z]/.test(password)) score++;
  else feedback.push("باید شامل حروف کوچک باشد");

  if (/\d/.test(password)) score++;
  else feedback.push("باید شامل اعداد باشد");

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  else feedback.push("باید شامل کاراکترهای خاص باشد");

  // کاهش امتیاز برای الگوهای ضعیف
  const weakPatterns = ["123", "abc", "password", "admin"];
  if (weakPatterns.some((p) => password.toLowerCase().includes(p))) {
    score = Math.max(0, score - 2);
    feedback.push("از الگوهای رایج استفاده نکنید");
  }

  return { score: Math.min(score, 4), feedback };
}

/**
 * ماسک کردن اطلاعات حساس برای نمایش
 */
export function maskSensitiveData(
  data: string,
  type: "email" | "phone" | "card",
): string {
  switch (type) {
    case "email":
      const [username, domain] = data.split("@");
      return `${username.substring(0, 2)}***@${domain}`;
    case "phone":
      return `***${data.slice(-4)}`;
    case "card":
      return `****-****-****-${data.slice(-4)}`;
    default:
      return "***";
  }
}

/**
 * تایید IP معتبر
 */
export function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * دریافت اطلاعات دستگاه از User-Agent
 */
export function parseUserAgent(userAgent: string): {
  browser?: string;
  os?: string;
  device?: string;
} {
  // پیاده‌سازی ساده - در production از کتابخانه‌ای مثل ua-parser-js استفاده کنید
  return {
    browser: userAgent.includes("Chrome")
      ? "Chrome"
      : userAgent.includes("Firefox")
        ? "Firefox"
        : "Unknown",
    os: userAgent.includes("Windows")
      ? "Windows"
      : userAgent.includes("Mac")
        ? "MacOS"
        : "Unknown",
    device: userAgent.includes("Mobile") ? "Mobile" : "Desktop",
  };
}
