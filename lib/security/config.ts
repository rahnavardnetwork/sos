// Security Configuration - Maximum Protection
// این فایل تنظیمات امنیتی پیشرفته برای حفاظت در برابر انواع حملات را فراهم می‌کند

export const securityConfig = {
  // Rate Limiting Configuration - محدودسازی درخواست‌ها
  rateLimit: {
    // محدودیت عمومی برای همه درخواست‌ها
    general: {
      windowMs: 15 * 60 * 1000, // 15 دقیقه
      max: 100, // حداکثر 100 درخواست
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
    },
    // محدودیت شدید برای لاگین (جلوگیری از Brute Force)
    auth: {
      windowMs: 15 * 60 * 1000, // 15 دقیقه
      max: 5, // فقط 5 تلاش
      skipSuccessfulRequests: true,
    },
    // محدودیت برای API های حساس
    sensitive: {
      windowMs: 60 * 60 * 1000, // 1 ساعت
      max: 20, // 20 درخواست
    },
  },

  // Session Security - امنیت نشست
  session: {
    maxAge: 24 * 60 * 60 * 1000, // 24 ساعت
    rotationInterval: 60 * 60 * 1000, // تغییر توکن هر 1 ساعت
    absoluteTimeout: 7 * 24 * 60 * 60 * 1000, // حداکثر 7 روز
    cookieOptions: {
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
      path: "/",
    },
  },

  // Password Policy - سیاست رمز عبور
  password: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90, // تغییر رمز هر 90 روز
    preventReuse: 5, // جلوگیری از استفاده مجدد 5 رمز قبلی
    bcryptRounds: 14, // تعداد دور هش (بالاتر = امن‌تر اما کندتر)
  },

  // Token Configuration - تنظیمات توکن
  token: {
    algorithm: "HS512", // الگوریتم قوی
    expiresIn: "24h",
    refreshExpiresIn: "7d",
    issuer: "rahnavard-security",
    audience: "rahnavard-app",
  },

  // Encryption Keys - کلیدهای رمزنگاری
  encryption: {
    algorithm: "aes-256-gcm", // رمزنگاری قوی
    keyLength: 32,
    ivLength: 16,
    saltRounds: 14,
  },

  // IP Blocking - مسدودسازی IP
  ipBlocking: {
    enabled: true,
    maxFailedAttempts: 10,
    blockDuration: 24 * 60 * 60 * 1000, // 24 ساعت
    permanentBlockAfter: 5, // مسدودی دائمی پس از 5 بار
  },

  // Input Validation - اعتبارسنجی ورودی
  validation: {
    maxInputLength: 10000,
    allowedFileTypes: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
    maxFileSize: 10 * 1024 * 1024, // 10MB
    sanitizeHtml: true,
    stripScripts: true,
  },

  // CORS Configuration - تنظیمات CORS
  cors: {
    enabled: true,
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [],
    allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
    exposedHeaders: [],
    credentials: true,
    maxAge: 86400,
  },

  // Security Headers - هدرهای امنیتی
  headers: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 سال
      includeSubDomains: true,
      preload: true,
    },
  },

  // Logging - لاگ گیری
  logging: {
    enabled: true,
    logLevel: "warn",
    logFailedAuth: true,
    logSuspiciousActivity: true,
    retentionDays: 90,
  },

  // Two-Factor Authentication - احراز هویت دو مرحله‌ای
  mfa: {
    enabled: true,
    required: false, // اختیاری
    tokenLength: 6,
    tokenExpiry: 300000, // 5 دقیقه
    maxAttempts: 3,
  },

  // Database Security - امنیت پایگاه داده
  database: {
    useParameterizedQueries: true,
    enableRowLevelSecurity: true,
    encryptSensitiveFields: true,
    auditTrail: true,
  },

  // Threat Detection - تشخیص تهدید
  threatDetection: {
    enabled: true,
    detectSqlInjection: true,
    detectXss: true,
    detectPathTraversal: true,
    detectCommandInjection: true,
    blockOnDetection: true,
  },
};

export type SecurityConfig = typeof securityConfig;
