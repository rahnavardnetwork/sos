// Database Security Layer - لایه امنیتی دیتابیس
// محافظت در برابر SQL Injection و تقویت امنیت دیتابیس

import { createClient } from "@supabase/supabase-js";
import { securityConfig } from "./config";
import { logSecurityEvent, SecurityEventType } from "./logger";
import { detectThreats } from "./validation";

/**
 * کلاینت Supabase امن با تنظیمات پیشرفته
 */
export function createSecureSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials not found");
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
    db: {
      schema: "public",
    },
    global: {
      headers: {
        "X-Client-Info": "rahnavard-secure-client",
      },
    },
  });
}

/**
 * بررسی امنیت کوئری قبل از اجرا
 */
export async function validateQuery(
  queryString: string,
  params: any = {},
): Promise<{ safe: boolean; threats: string[] }> {
  // تشخیص الگوهای مخرب
  const threats = detectThreats(queryString);

  if (threats.length > 0) {
    await logSecurityEvent(
      SecurityEventType.SQL_INJECTION_ATTEMPT,
      "critical",
      "server",
      { query: queryString, threats },
    );

    return { safe: false, threats };
  }

  // بررسی پارامترها
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      const paramThreats = detectThreats(value);
      if (paramThreats.length > 0) {
        threats.push(...paramThreats);
      }
    }
  }

  return { safe: threats.length === 0, threats };
}

/**
 * Wrapper امن برای کوئری‌های Supabase
 */
export async function secureQuery<T>(
  queryBuilder: any,
  context: { ip?: string; userId?: string } = {},
): Promise<{ data: T | null; error: any }> {
  try {
    const { data, error } = await queryBuilder;

    if (error) {
      // لاگ خطاهای دیتابیس
      console.error("[DB ERROR]", {
        error: error.message,
        code: error.code,
        userId: context.userId,
        ip: context.ip,
      });
    }

    return { data, error };
  } catch (error: any) {
    console.error("[DB EXCEPTION]", error);
    return { data: null, error };
  }
}

/**
 * رمزنگاری داده‌های حساس قبل از ذخیره
 */
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export function encryptSensitiveData(data: string): {
  encrypted: string;
  iv: string;
  tag: string;
} {
  const algorithm = securityConfig.encryption.algorithm;
  const key = Buffer.from(process.env.ENCRYPTION_KEY || "0".repeat(64), "hex");
  const iv = randomBytes(securityConfig.encryption.ivLength);

  const cipher = createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = (cipher as any).getAuthTag();

  return {
    encrypted,
    iv: iv.toString("hex"),
    tag: authTag.toString("hex"),
  };
}

/**
 * رمزگشایی داده‌های حساس
 */
export function decryptSensitiveData(
  encrypted: string,
  iv: string,
  tag: string,
): string {
  const algorithm = securityConfig.encryption.algorithm;
  const key = Buffer.from(process.env.ENCRYPTION_KEY || "0".repeat(64), "hex");

  const decipher = createDecipheriv(algorithm, key, Buffer.from(iv, "hex"));

  (decipher as any).setAuthTag(Buffer.from(tag, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/**
 * پاکسازی پارامترهای کوئری
 */
export function sanitizeQueryParams(
  params: Record<string, any>,
): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      // حذف کاراکترهای خطرناک
      sanitized[key] = value
        .replace(/['"\\;]/g, "") // حذف کوتیشن، بک‌اسلش و سمی‌کالن
        .replace(/--/g, "") // حذف کامنت SQL
        .replace(/\/\*/g, "") // حذف کامنت چند خطی
        .trim();
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * اجرای Audit Trail - ثبت تمام تغییرات دیتابیس
 */
export async function logDatabaseAction(
  action: "INSERT" | "UPDATE" | "DELETE",
  table: string,
  recordId: string,
  userId: string,
  changes: any,
): Promise<void> {
  if (!securityConfig.database.auditTrail) {
    return;
  }

  try {
    const supabase = createSecureSupabaseClient();

    await supabase.from("audit_log").insert({
      action,
      table_name: table,
      record_id: recordId,
      user_id: userId,
      changes: changes,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[AUDIT] Failed to log database action:", error);
  }
}

/**
 * بررسی دسترسی Row Level Security
 */
export async function checkRLSPolicy(
  userId: string,
  table: string,
  action: "SELECT" | "INSERT" | "UPDATE" | "DELETE",
  recordId?: string,
): Promise<boolean> {
  // در اینجا می‌توانید منطق سفارشی RLS خود را پیاده کنید
  // یا از RLS داخلی Supabase استفاده کنید

  return true; // فعلا همه دسترسی‌ها مجاز است
}

/**
 * محدود کردن تعداد رکوردهای بازگشتی (جلوگیری از Data Exfiltration)
 */
export function limitQueryResults<T>(
  data: T[],
  maxResults: number = 1000,
): T[] {
  if (data.length > maxResults) {
    console.warn(
      "[SECURITY] Query returned too many results, limiting to",
      maxResults,
    );
    return data.slice(0, maxResults);
  }

  return data;
}

/**
 * Prepared Statement Helper - جلوگیری از SQL Injection
 */
export function prepareStatement(
  query: string,
  params: any[],
): { query: string; params: any[] } {
  // در Supabase از ORM استفاده می‌شود که خود Parameterized Query است
  // اما اگر نیاز به Raw Query باشد:

  const sanitizedParams = params.map((param) => {
    if (typeof param === "string") {
      return sanitizeQueryParams({ param }).param;
    }
    return param;
  });

  return { query, params: sanitizedParams };
}

/**
 * بررسی سلامت اتصال دیتابیس
 */
export async function checkDatabaseHealth(): Promise<{
  healthy: boolean;
  latency: number;
}> {
  const startTime = Date.now();

  try {
    const supabase = createSecureSupabaseClient();
    await supabase.from("rep").select("id").limit(1);

    const latency = Date.now() - startTime;

    return { healthy: true, latency };
  } catch (error) {
    return { healthy: false, latency: -1 };
  }
}
