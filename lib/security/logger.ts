// Security Logging & Monitoring - لاگ‌گیری و نظارت امنیتی
// ثبت و تحلیل تمام فعالیت‌های مشکوک و امنیتی

export enum SecurityEventType {
  AUTH_SUCCESS = "auth_success",
  AUTH_FAILURE = "auth_failure",
  RATE_LIMIT_EXCEEDED = "rate_limit_exceeded",
  INVALID_TOKEN = "invalid_token",
  SESSION_HIJACK_ATTEMPT = "session_hijack_attempt",
  SQL_INJECTION_ATTEMPT = "sql_injection_attempt",
  XSS_ATTEMPT = "xss_attempt",
  CSRF_VIOLATION = "csrf_violation",
  SUSPICIOUS_INPUT = "suspicious_input",
  IP_BLOCKED = "ip_blocked",
  MFA_FAILURE = "mfa_failure",
  PASSWORD_CHANGE = "password_change",
  ACCOUNT_LOCKED = "account_locked",
  PRIVILEGE_ESCALATION_ATTEMPT = "privilege_escalation_attempt",
  DATA_BREACH_ATTEMPT = "data_breach_attempt",
}

export interface SecurityEvent {
  id: string;
  timestamp: Date;
  eventType: SecurityEventType;
  severity: "low" | "medium" | "high" | "critical";
  ip: string;
  userId?: string;
  userAgent?: string;
  endpoint?: string;
  details: any;
  location?: {
    country?: string;
    city?: string;
  };
}

// ذخیره‌سازی موقت لاگ‌ها (در production باید به database یا log service ارسال شود)
const securityLogs: SecurityEvent[] = [];

/**
 * ثبت رویداد امنیتی
 */
export async function logSecurityEvent(
  eventType: SecurityEventType,
  severity: "low" | "medium" | "high" | "critical",
  ip: string,
  details: any,
  userId?: string,
  userAgent?: string,
  endpoint?: string,
): Promise<void> {
  const event: SecurityEvent = {
    id: generateEventId(),
    timestamp: new Date(),
    eventType,
    severity,
    ip: await hashIP(ip), // هش کردن IP برای حفظ حریم خصوصی
    userId,
    userAgent,
    endpoint,
    details,
  };

  securityLogs.push(event);

  // لاگ کردن در console
  const logMethod =
    severity === "critical" || severity === "high"
      ? console.error
      : console.warn;
  logMethod("[SECURITY EVENT]", {
    type: eventType,
    severity,
    ip: ip.substring(0, 8) + "...", // نمایش جزئی IP
    userId,
    timestamp: event.timestamp.toISOString(),
  });

  // ارسال به سرویس مانیتورینگ (مثل Sentry, DataDog, etc)
  if (process.env.NODE_ENV === "production") {
    sendToMonitoringService(event);
  }

  // اگر رویداد critical است، اقدام فوری
  if (severity === "critical") {
    handleCriticalEvent(event);
  }

  // پاکسازی لاگ‌های قدیمی
  if (securityLogs.length > 10000) {
    securityLogs.splice(0, 1000); // حذف 1000 رکورد قدیمی
  }
}

/**
 * تولید ID منحصر به فرد برای رویداد
 */
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * هش کردن IP برای حفظ حریم خصوصی
 * استفاده از Web Crypto API که در Edge Runtime پشتیبانی می‌شود
 */
async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + (process.env.IP_HASH_SALT || "salt"));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex.substring(0, 16);
}

/**
 * مدیریت رویدادهای بحرانی
 */
function handleCriticalEvent(event: SecurityEvent): void {
  console.error("🚨 CRITICAL SECURITY EVENT:", event);

  // در production:
  // 1. ارسال اعلان به تیم امنیتی
  // 2. مسدود کردن خودکار IP
  // 3. فعال‌سازی پروتکل‌های اضطراری
}

/**
 * ارسال به سرویس مانیتورینگ
 */
function sendToMonitoringService(event: SecurityEvent): void {
  // پیاده‌سازی ارسال به سرویس‌هایی مثل:
  // - Sentry
  // - DataDog
  // - Elastic Stack
  // - AWS CloudWatch
  // - Azure Monitor
  // مثال:
  // if (process.env.SENTRY_DSN) {
  //   Sentry.captureMessage(`Security Event: ${event.eventType}`, {
  //     level: event.severity,
  //     extra: event,
  //   });
  // }
}

/**
 * دریافت لاگ‌های امنیتی با فیلتر
 */
export async function getSecurityLogs(filter?: {
  eventType?: SecurityEventType;
  severity?: string;
  ip?: string;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}): Promise<SecurityEvent[]> {
  let filtered = [...securityLogs];

  if (filter) {
    if (filter.eventType) {
      filtered = filtered.filter((log) => log.eventType === filter.eventType);
    }

    if (filter.severity) {
      filtered = filtered.filter((log) => log.severity === filter.severity);
    }

    if (filter.ip) {
      const hashedIP = await hashIP(filter.ip);
      filtered = filtered.filter((log) => log.ip === hashedIP);
    }

    if (filter.userId) {
      filtered = filtered.filter((log) => log.userId === filter.userId);
    }

    if (filter.startDate) {
      filtered = filtered.filter((log) => log.timestamp >= filter.startDate!);
    }

    if (filter.endDate) {
      filtered = filtered.filter((log) => log.timestamp <= filter.endDate!);
    }

    if (filter.limit) {
      filtered = filtered.slice(-filter.limit);
    }
  }

  return filtered;
}

/**
 * تحلیل الگوهای مشکوک
 */
export function analyzeSuspiciousPatterns(): {
  suspiciousIPs: string[];
  suspiciousUsers: string[];
  frequentEvents: Array<{ type: SecurityEventType; count: number }>;
} {
  const ipCounts = new Map<string, number>();
  const userCounts = new Map<string, number>();
  const eventCounts = new Map<SecurityEventType, number>();

  // تحلیل لاگ‌های 24 ساعت گذشته
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentLogs = securityLogs.filter((log) => log.timestamp >= oneDayAgo);

  for (const log of recentLogs) {
    // شمارش IP ها
    if (log.severity === "high" || log.severity === "critical") {
      ipCounts.set(log.ip, (ipCounts.get(log.ip) || 0) + 1);
    }

    // شمارش کاربران
    if (
      log.userId &&
      (log.severity === "high" || log.severity === "critical")
    ) {
      userCounts.set(log.userId, (userCounts.get(log.userId) || 0) + 1);
    }

    // شمارش نوع رویدادها
    eventCounts.set(log.eventType, (eventCounts.get(log.eventType) || 0) + 1);
  }

  // IP های مشکوک (بیش از 10 رویداد high/critical)
  const suspiciousIPs = Array.from(ipCounts.entries())
    .filter(([_, count]) => count > 10)
    .map(([ip, _]) => ip);

  // کاربران مشکوک (بیش از 5 رویداد high/critical)
  const suspiciousUsers = Array.from(userCounts.entries())
    .filter(([_, count]) => count > 5)
    .map(([userId, _]) => userId);

  // رویدادهای پرتکرار
  const frequentEvents = Array.from(eventCounts.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    suspiciousIPs,
    suspiciousUsers,
    frequentEvents,
  };
}

/**
 * تولید گزارش امنیتی
 */
export function generateSecurityReport(
  period: "day" | "week" | "month" = "day",
): {
  summary: {
    totalEvents: number;
    criticalEvents: number;
    highEvents: number;
    mediumEvents: number;
    lowEvents: number;
  };
  topThreats: Array<{ type: SecurityEventType; count: number }>;
  affectedUsers: number;
  affectedIPs: number;
} {
  const periodMs = {
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
  }[period];

  const startDate = new Date(Date.now() - periodMs);
  const logs = securityLogs.filter((log) => log.timestamp >= startDate);

  // خلاصه
  const summary = {
    totalEvents: logs.length,
    criticalEvents: logs.filter((l) => l.severity === "critical").length,
    highEvents: logs.filter((l) => l.severity === "high").length,
    mediumEvents: logs.filter((l) => l.severity === "medium").length,
    lowEvents: logs.filter((l) => l.severity === "low").length,
  };

  // تهدیدات برتر
  const threatCounts = new Map<SecurityEventType, number>();
  for (const log of logs) {
    threatCounts.set(log.eventType, (threatCounts.get(log.eventType) || 0) + 1);
  }

  const topThreats = Array.from(threatCounts.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // کاربران و IP های تحت تاثیر
  const uniqueUsers = new Set(logs.map((l) => l.userId).filter(Boolean));
  const uniqueIPs = new Set(logs.map((l) => l.ip));

  return {
    summary,
    topThreats,
    affectedUsers: uniqueUsers.size,
    affectedIPs: uniqueIPs.size,
  };
}

/**
 * Helper functions برای لاگ کردن رویدادهای خاص
 */

export async function logAuthSuccess(
  ip: string,
  userId: string,
  userAgent: string,
): Promise<void> {
  await logSecurityEvent(
    SecurityEventType.AUTH_SUCCESS,
    "low",
    ip,
    { success: true },
    userId,
    userAgent,
  );
}

export async function logAuthFailure(
  ip: string,
  username: string,
  userAgent: string,
  reason: string,
): Promise<void> {
  await logSecurityEvent(
    SecurityEventType.AUTH_FAILURE,
    "medium",
    ip,
    { username, reason },
    undefined,
    userAgent,
  );
}

export async function logRateLimitExceeded(
  ip: string,
  endpoint: string,
): Promise<void> {
  await logSecurityEvent(
    SecurityEventType.RATE_LIMIT_EXCEEDED,
    "medium",
    ip,
    { endpoint },
    undefined,
    undefined,
    endpoint,
  );
}

export async function logSQLInjectionAttempt(
  ip: string,
  input: string,
  endpoint: string,
): Promise<void> {
  await logSecurityEvent(
    SecurityEventType.SQL_INJECTION_ATTEMPT,
    "critical",
    ip,
    { input: input.substring(0, 200) },
    undefined,
    undefined,
    endpoint,
  );
}

export async function logXSSAttempt(
  ip: string,
  input: string,
  endpoint: string,
): Promise<void> {
  await logSecurityEvent(
    SecurityEventType.XSS_ATTEMPT,
    "high",
    ip,
    { input: input.substring(0, 200) },
    undefined,
    undefined,
    endpoint,
  );
}

export async function logCSRFViolation(
  ip: string,
  userId: string,
  endpoint: string,
): Promise<void> {
  await logSecurityEvent(
    SecurityEventType.CSRF_VIOLATION,
    "high",
    ip,
    { endpoint },
    userId,
    undefined,
    endpoint,
  );
}

export async function logSessionHijackAttempt(
  ip: string,
  userId: string,
  details: any,
): Promise<void> {
  await logSecurityEvent(
    SecurityEventType.SESSION_HIJACK_ATTEMPT,
    "critical",
    ip,
    details,
    userId,
  );
}

// تمیز کردن لاگ‌های قدیمی هر 1 ساعت
if (typeof window === "undefined") {
  setInterval(
    () => {
      const retentionDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // 90 روز
      const originalLength = securityLogs.length;

      // حذف لاگ‌های قدیمی‌تر از 90 روز
      for (let i = securityLogs.length - 1; i >= 0; i--) {
        if (securityLogs[i].timestamp < retentionDate) {
          securityLogs.splice(i, 1);
        }
      }

      const removed = originalLength - securityLogs.length;
      if (removed > 0) {
        console.log(`[SECURITY] Cleaned up ${removed} old security logs`);
      }
    },
    60 * 60 * 1000,
  );
}
