// Input Validation & Sanitization - اعتبارسنجی و پاکسازی ورودی
// محافظت در برابر SQL Injection, XSS, Command Injection و سایر حملات

import validator from "validator";
import xss from "xss";
import { securityConfig } from "./config";

/**
 * نتیجه اعتبارسنجی
 */
export interface ValidationResult {
  isValid: boolean;
  sanitized?: any;
  errors: string[];
  threats: string[];
}

/**
 * الگوهای مشکوک برای تشخیص حملات
 */
const THREAT_PATTERNS = {
  sqlInjection: [
    /(\bOR\b|\bAND\b).*?=.*?/gi,
    /UNION.*?SELECT/gi,
    /DROP.*?TABLE/gi,
    /INSERT.*?INTO/gi,
    /DELETE.*?FROM/gi,
    /UPDATE.*?SET/gi,
    /EXEC(\s|\+)+(s|x)p\w+/gi,
    /'.*?--/g,
    /'.*?;.*?'/g,
  ],
  xss: [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<embed/gi,
    /<object/gi,
  ],
  commandInjection: [/\|\s*\w+/g, /;\s*\w+/g, /`.*?`/g, /\$\(.*?\)/g],
  pathTraversal: [/\.\.\//g, /\.\.\\/, /%2e%2e/gi],
};

/**
 * تشخیص تهدیدات امنیتی در ورودی
 */
export function detectThreats(input: string): string[] {
  const threats: string[] = [];

  if (!securityConfig.threatDetection.enabled) {
    return threats;
  }

  // بررسی SQL Injection
  if (securityConfig.threatDetection.detectSqlInjection) {
    for (const pattern of THREAT_PATTERNS.sqlInjection) {
      if (pattern.test(input)) {
        threats.push("SQL Injection detected");
        break;
      }
    }
  }

  // بررسی XSS
  if (securityConfig.threatDetection.detectXss) {
    for (const pattern of THREAT_PATTERNS.xss) {
      if (pattern.test(input)) {
        threats.push("XSS Attack detected");
        break;
      }
    }
  }

  // بررسی Command Injection
  if (securityConfig.threatDetection.detectCommandInjection) {
    for (const pattern of THREAT_PATTERNS.commandInjection) {
      if (pattern.test(input)) {
        threats.push("Command Injection detected");
        break;
      }
    }
  }

  // بررسی Path Traversal
  if (securityConfig.threatDetection.detectPathTraversal) {
    for (const pattern of THREAT_PATTERNS.pathTraversal) {
      if (pattern.test(input)) {
        threats.push("Path Traversal detected");
        break;
      }
    }
  }

  return threats;
}

/**
 * پاکسازی و امن‌سازی رشته
 */
export function sanitizeString(input: string): string {
  if (!input) return "";

  let sanitized = input;

  // حذف تگ‌های HTML خطرناک
  if (securityConfig.validation.sanitizeHtml) {
    sanitized = xss(sanitized, {
      whiteList: {}, // هیچ تگی مجاز نیست
      stripIgnoreTag: true,
      stripIgnoreTagBody: ["script", "style"],
    });
  }

  // حذف اسکریپت‌ها
  if (securityConfig.validation.stripScripts) {
    sanitized = sanitized.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      "",
    );
  }

  // Escape کاراکترهای خاص
  sanitized = validator.escape(sanitized);

  return sanitized.trim();
}

/**
 * اعتبارسنجی ایمیل
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  const threats = detectThreats(email);

  if (!email) {
    errors.push("ایمیل الزامی است");
  } else if (!validator.isEmail(email)) {
    errors.push("فرمت ایمیل نامعتبر است");
  } else if (email.length > 255) {
    errors.push("ایمیل بیش از حد طولانی است");
  }

  return {
    isValid: errors.length === 0 && threats.length === 0,
    sanitized: validator.normalizeEmail(email) || email,
    errors,
    threats,
  };
}

/**
 * اعتبارسنجی رمز عبور
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  const config = securityConfig.password;

  if (!password) {
    errors.push("رمز عبور الزامی است");
    return { isValid: false, errors, threats: [] };
  }

  if (password.length < config.minLength) {
    errors.push(`رمز عبور باید حداقل ${config.minLength} کاراکتر باشد`);
  }

  if (config.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("رمز عبور باید شامل حداقل یک حرف بزرگ باشد");
  }

  if (config.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("رمز عبور باید شامل حداقل یک حرف کوچک باشد");
  }

  if (config.requireNumbers && !/\d/.test(password)) {
    errors.push("رمز عبور باید شامل حداقل یک عدد باشد");
  }

  if (config.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("رمز عبور باید شامل حداقل یک کاراکتر خاص باشد");
  }

  // بررسی رمزهای ضعیف رایج
  const weakPasswords = ["password", "12345678", "qwerty", "admin", "letmein"];
  if (weakPasswords.some((weak) => password.toLowerCase().includes(weak))) {
    errors.push("رمز عبور بسیار ضعیف است");
  }

  return {
    isValid: errors.length === 0,
    sanitized: password, // رمز عبور را پاکسازی نمی‌کنیم
    errors,
    threats: [],
  };
}

/**
 * اعتبارسنجی نام کاربری
 */
export function validateUsername(username: string): ValidationResult {
  const errors: string[] = [];
  const threats = detectThreats(username);

  if (!username) {
    errors.push("نام کاربری الزامی است");
  } else if (username.length < 3) {
    errors.push("نام کاربری باید حداقل 3 کاراکتر باشد");
  } else if (username.length > 50) {
    errors.push("نام کاربری بیش از حد طولانی است");
  } else if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
    errors.push("نام کاربری فقط می‌تواند شامل حروف، اعداد و _ . - باشد");
  }

  return {
    isValid: errors.length === 0 && threats.length === 0,
    sanitized: sanitizeString(username),
    errors,
    threats,
  };
}

/**
 * اعتبارسنجی شماره تلفن
 */
export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];
  const threats = detectThreats(phone);

  // حذف فاصله‌ها و خط تیره‌ها
  const cleanPhone = phone.replace(/[\s-]/g, "");

  if (!cleanPhone) {
    errors.push("شماره تلفن الزامی است");
  } else if (!validator.isMobilePhone(cleanPhone, "any")) {
    errors.push("فرمت شماره تلفن نامعتبر است");
  }

  return {
    isValid: errors.length === 0 && threats.length === 0,
    sanitized: cleanPhone,
    errors,
    threats,
  };
}

/**
 * اعتبارسنجی URL
 */
export function validateURL(url: string): ValidationResult {
  const errors: string[] = [];
  const threats = detectThreats(url);

  if (!url) {
    errors.push("URL الزامی است");
  } else if (
    !validator.isURL(url, {
      protocols: ["http", "https"],
      require_protocol: true,
    })
  ) {
    errors.push("فرمت URL نامعتبر است");
  }

  return {
    isValid: errors.length === 0 && threats.length === 0,
    sanitized: sanitizeString(url),
    errors,
    threats,
  };
}

/**
 * اعتبارسنجی عمومی برای هر ورودی
 */
export function validateInput(
  input: any,
  fieldName: string,
  required: boolean = true,
  maxLength?: number,
): ValidationResult {
  const errors: string[] = [];
  let threats: string[] = [];

  // بررسی الزامی بودن
  if (required && (!input || input === "")) {
    errors.push(`${fieldName} الزامی است`);
    return { isValid: false, errors, threats };
  }

  // اگر ورودی خالی است و الزامی نیست
  if (!input) {
    return { isValid: true, sanitized: input, errors: [], threats: [] };
  }

  // تبدیل به رشته برای بررسی
  const strInput = String(input);

  // بررسی طول
  const maxLen = maxLength || securityConfig.validation.maxInputLength;
  if (strInput.length > maxLen) {
    errors.push(`${fieldName} بیش از حد طولانی است (حداکثر ${maxLen} کاراکتر)`);
  }

  // تشخیص تهدیدات
  threats = detectThreats(strInput);

  // پاکسازی
  const sanitized = typeof input === "string" ? sanitizeString(input) : input;

  return {
    isValid: errors.length === 0 && threats.length === 0,
    sanitized,
    errors,
    threats,
  };
}

/**
 * اعتبارسنجی آبجکت JSON
 */
export function validateObject(
  obj: any,
  schema: Record<
    string,
    { required?: boolean; type?: string; maxLength?: number }
  >,
): ValidationResult {
  const errors: string[] = [];
  const threats: string[] = [];
  const sanitized: any = {};

  for (const [key, rules] of Object.entries(schema)) {
    const value = obj[key];

    // بررسی الزامی بودن
    if (rules.required && (!value || value === "")) {
      errors.push(`${key} الزامی است`);
      continue;
    }

    // بررسی نوع
    if (value && rules.type && typeof value !== rules.type) {
      errors.push(`${key} باید از نوع ${rules.type} باشد`);
      continue;
    }

    // اعتبارسنجی ورودی
    const result = validateInput(value, key, rules.required, rules.maxLength);

    if (!result.isValid) {
      errors.push(...result.errors);
      threats.push(...result.threats);
    }

    sanitized[key] = result.sanitized;
  }

  return {
    isValid: errors.length === 0 && threats.length === 0,
    sanitized,
    errors,
    threats,
  };
}

/**
 * لاگ کردن تهدیدات امنیتی
 */
export function logSecurityThreat(
  ip: string,
  threatType: string,
  details: any,
): void {
  console.error("[SECURITY THREAT]", {
    timestamp: new Date().toISOString(),
    ip,
    threatType,
    details,
  });

  // در محیط production باید به سیستم مانیتورینگ ارسال شود
}
