# 🔒 راهنمای امنیتی جامع / Comprehensive Security Guide

## فهرست مطالب / Table of Contents

1. [نمای کلی امنیت](#overview)
2. [لایه‌های امنیتی پیاده‌سازی شده](#security-layers)
3. [پیکربندی](#configuration)
4. [محافظت در برابر حملات](#attack-protection)
5. [بهترین شیوه‌های امنیتی](#best-practices)
6. [مانیتورینگ و لاگ‌گیری](#monitoring)
7. [راهنمای اضطراری](#emergency-guide)

---

## 🛡️ نمای کلی امنیت / Security Overview

این سیستم با **۱۰+ لایه امنیتی** برای محافظت در برابر طیف گسترده‌ای از تهدیدات طراحی شده است:

### ویژگی‌های کلیدی:

- ✅ محافظت در برابر **DDoS & Brute Force**
- ✅ جلوگیری از **SQL Injection**
- ✅ محافظت **XSS (Cross-Site Scripting)**
- ✅ جلوگیری از **CSRF (Cross-Site Request Forgery)**
- ✅ **Session Hijacking Prevention**
- ✅ **Rate Limiting** پیشرفته
- ✅ **MFA (Multi-Factor Authentication)**
- ✅ **Session Fingerprinting**
- ✅ **Token Rotation** خودکار
- ✅ **Encryption** داده‌های حساس
- ✅ **Audit Trail** کامل
- ✅ **Real-time Threat Detection**

---

## 🔐 لایه‌های امنیتی پیاده‌سازی شده / Security Layers

### 1. Network Layer (لایه شبکه)

#### Rate Limiting

```typescript
// محدودسازی سه سطحی:
- General: 100 درخواست / 15 دقیقه
- Authentication: 5 تلاش / 15 دقیقه
- Sensitive APIs: 20 درخواست / ساعت
```

#### IP Blocking

- مسدودی خودکار پس از ۱۰ تلاش ناموفق
- مسدودی دائمی پس از ۵ بار مسدودی موقت
- بررسی IP در هر درخواست

#### Security Headers

```typescript
- Content-Security-Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy
```

### 2. Application Layer (لایه اپلیکیشن)

#### Input Validation & Sanitization

```typescript
// تمام ورودی‌ها بررسی می‌شوند:
✓ اعتبارسنجی فرمت
✓ تشخیص الگوهای مخرب
✓ پاکسازی HTML/JavaScript
✓ Escape کاراکترهای خاص
```

#### CSRF Protection

```typescript
- توکن منحصر به فرد برای هر session
- اعتبارسنجی در تمام درخواست‌های تغییردهنده
- یکبار مصرف بودن توکن‌ها
```

#### Authentication & Authorization

```typescript
- JWT با الگوریتم HS512
- Session Fingerprinting
- Token Rotation هر 1 ساعت
- Absolute Timeout: 7 روز
- MFA Support
```

### 3. Data Layer (لایه داده)

#### Database Security

```typescript
✓ Parameterized Queries (جلوگیری از SQL Injection)
✓ Row Level Security (RLS)
✓ Encryption برای فیلدهای حساس (AES-256-GCM)
✓ Audit Trail کامل
✓ محدودیت تعداد رکورد بازگشتی
```

#### Password Security

```typescript
- حداقل 12 کاراکتر
- الزام حروف بزرگ/کوچک، اعداد، کاراکترهای خاص
- bcrypt با 14 rounds
- جلوگیری از استفاده مجدد 5 رمز قبلی
- تغییر اجباری هر 90 روز
```

### 4. Monitoring Layer (لایه نظارت)

#### Security Logging

```typescript
✓ ثبت تمام رویدادهای امنیتی
✓ تحلیل الگوهای مشکوک
✓ گزارش‌گیری خودکار
✓ اعلان رویدادهای critical
```

---

## ⚙️ پیکربندی / Configuration

### نصب اولیه

1. **نصب Dependencies**

```bash
npm install
```

2. **تنظیم Environment Variables**

```bash
cp .env.example .env
```

3. **تولید کلیدهای امنیتی**

```bash
# JWT Secret
openssl rand -base64 48

# Encryption Key
openssl rand -hex 32

# IP Hash Salt
openssl rand -base64 32
```

4. **به‌روزرسانی دیتابیس**

افزودن ستون‌های امنیتی به جدول `rep_session`:

```sql
ALTER TABLE rep_session
ADD COLUMN IF NOT EXISTS session_fingerprint TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS last_rotation_at TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS mfa_verified BOOLEAN DEFAULT FALSE;

-- ایجاد جدول Audit Log
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id TEXT,
  user_id UUID,
  changes JSONB,
  timestamp TIMESTAMP DEFAULT NOW(),
  ip_address TEXT
);

-- ایجاد Index
CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_timestamp ON audit_log(timestamp);
```

### تنظیمات سفارشی

فایل `lib/security/config.ts` را برای تنظیمات سفارشی ویرایش کنید:

```typescript
export const securityConfig = {
  rateLimit: {
    general: { windowMs: 15 * 60 * 1000, max: 100 },
    auth: { windowMs: 15 * 60 * 1000, max: 5 },
    // ...
  },
  // ...
};
```

---

## 🛡️ محافظت در برابر حملات / Attack Protection

### SQL Injection

```typescript
❌ آسیب‌پذیر:
const query = `SELECT * FROM users WHERE username = '${username}'`;

✅ امن:
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('username', sanitizedUsername);
```

### XSS (Cross-Site Scripting)

```typescript
// تمام ورودی‌ها پاکسازی می‌شوند
import { sanitizeString } from "@/lib/security/validation";

const clean = sanitizeString(userInput);
// کاراکترهای خاص escape می‌شوند
// تگ‌های HTML حذف می‌شوند
```

### CSRF

```typescript
// در client:
headers: {
  'X-CSRF-Token': csrfToken,
}

// در server:
const protection = await protectAPIEndpoint(request, {
  checkCSRF: true,
});
```

### Session Hijacking

```typescript
// Session Fingerprinting
const fingerprint = generateSessionFingerprint(request);

// بررسی در هر درخواست
if (!validateSessionFingerprint(stored, current)) {
  // مسدود کردن session
  await deleteSession(sessionId);
  return unauthorized();
}
```

### Brute Force

```typescript
// Rate Limiting خودکار
- 5 تلاش ناموفق → مسدودی 15 دقیقه
- 10 تلاش → مسدودی 24 ساعت
- 5 بار مسدودی → مسدودی دائمی
```

---

## 📋 بهترین شیوه‌های امنیتی / Best Practices

### برای Developers

1. **همیشه از API Protection استفاده کنید:**

```typescript
export const POST = withAPIProtection(
  async (request, context) => {
    // handler code
  },
  { requireAuth: true, checkCSRF: true },
);
```

2. **اعتبارسنجی تمام ورودی‌ها:**

```typescript
const validation = validateInput(input, "fieldName", true);
if (!validation.isValid) {
  return error(validation.errors);
}
```

3. **لاگ رویدادهای امنیتی:**

```typescript
logSecurityEvent(
  SecurityEventType.SUSPICIOUS_INPUT,
  "high",
  ip,
  details,
  userId,
);
```

4. **استفاده از Secure Database Client:**

```typescript
import { createSecureSupabaseClient } from "@/lib/security/database";
const supabase = createSecureSupabaseClient();
```

### برای Admins

1. **چرخش کلیدها هر 90 روز**
2. **بررسی لاگ‌های امنیتی روزانه**
3. **نظارت بر IP های مسدود شده**
4. **بررسی گزارش‌های امنیتی هفتگی**
5. **به‌روزرسانی منظم Dependencies**

---

## 📊 مانیتورینگ و لاگ‌گیری / Monitoring & Logging

### دسترسی به لاگ‌های امنیتی

```typescript
import { getSecurityLogs, generateSecurityReport } from "@/lib/security/logger";

// دریافت لاگ‌ها
const logs = getSecurityLogs({
  severity: "high",
  startDate: new Date("2024-01-01"),
  limit: 100,
});

// تولید گزارش
const report = generateSecurityReport("week");
console.log(report);
```

### تحلیل الگوهای مشکوک

```typescript
import { analyzeSuspiciousPatterns } from "@/lib/security/logger";

const analysis = analyzeSuspiciousPatterns();
// {
//   suspiciousIPs: [...],
//   suspiciousUsers: [...],
//   frequentEvents: [...]
// }
```

### متریک‌های کلیدی

```typescript
✓ تعداد تلاش‌های ورود ناموفق
✓ IP های مسدود شده
✓ رویدادهای critical/high
✓ الگوهای حمله شناسایی شده
✓ زمان پاسخ‌دهی API
```

---

## 🚨 راهنمای اضطراری / Emergency Guide

### در صورت شناسایی حمله:

1. **بررسی فوری لاگ‌ها:**

```bash
grep "CRITICAL" logs/security.log
```

2. **مسدودی دستی IP:**

```typescript
import { blockIP } from "@/lib/security/rate-limiter";
blockIP("attacker-ip", "Manual block - security incident");
```

3. **غیرفعال کردن موقت سرویس:**

```typescript
// در next.config.ts
export default {
  async redirects() {
    return [
      { source: "/:path*", destination: "/maintenance", permanent: false },
    ];
  },
};
```

4. **بررسی دیتابیس:**

```sql
SELECT * FROM audit_log
WHERE timestamp > NOW() - INTERVAL '1 hour'
ORDER BY timestamp DESC;
```

5. **اطلاع‌رسانی به تیم:**

- ارسال ایمیل/SMS به تیم امنیتی
- فعال‌سازی پروتکل اضطراری
- ثبت incident در سیستم

### خروج از حالت اضطراری:

1. رفع آسیب‌پذیری
2. تغییر تمام کلیدها
3. بازنشانی Session های موجود
4. بررسی Audit Trail
5. تهیه گزارش کامل

---

## 📞 پشتیبانی و ارتباط / Support

### گزارش مشکلات امنیتی

اگر آسیب‌پذیری امنیتی پیدا کردید، **فوراً** به تیم اطلاع دهید:

- 📧 Email: security@yourdomain.com
- 🔒 PGP Key: [لینک کلید عمومی]
- ⏱️ زمان پاسخ: کمتر از 24 ساعت

---

## 📚 منابع اضافی / Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CWE/SANS Top 25](https://www.sans.org/top25-software-errors/)

---

## ✅ Checklist امنیتی

- [ ] تمام Environment Variables تنظیم شده
- [ ] کلیدهای قوی تولید شده
- [ ] دیتابیس به‌روزرسانی شده
- [ ] HTTPS فعال است
- [ ] Firewall پیکربندی شده
- [ ] Backup خودکار فعال است
- [ ] مانیتورینگ فعال است
- [ ] تیم امنیتی آموزش دیده
- [ ] پلن اضطراری آماده است
- [ ] Penetration Test انجام شده

---

**⚠️ هشدار:** این سیستم امنیتی باید به صورت مداوم به‌روزرسانی و بهبود یابد. امنیت یک فرآیند مداوم است، نه یک نقطه پایان.
