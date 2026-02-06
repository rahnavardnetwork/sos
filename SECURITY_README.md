# 🔐 سیستم امنیتی Rahnavard

## نصب و راه‌اندازی سریع

### 1. نصب Dependencies

```bash
npm install
```

### 2. تنظیم Environment Variables

```bash
# کپی کردن فایل نمونه
cp .env.example .env

# تولید کلیدهای امنیتی
openssl rand -base64 48  # JWT_SECRET
openssl rand -hex 32     # ENCRYPTION_KEY
openssl rand -base64 32  # IP_HASH_SALT

# ویرایش .env و اضافه کردن کلیدها
nano .env
```

### 3. به‌روزرسانی Database

```bash
# اجرای اسکریپت امنیتی در Supabase SQL Editor
# محتوای فایل sql/security_schema.sql را کپی و اجرا کنید
```

### 4. اجرای پروژه

```bash
npm run dev
```

## استفاده در API Routes

### محافظت ساده از یک endpoint:

```typescript
import { withAPIProtection } from "@/lib/security";

export const POST = withAPIProtection(
  async (request, context) => {
    // handler code
    return NextResponse.json({ success: true });
  },
  { requireAuth: true, checkCSRF: true },
);
```

### استفاده پیشرفته‌تر:

```typescript
import {
  protectAPIEndpoint,
  createSecureAPIResponse,
  validateInput,
} from "@/lib/security";

export async function POST(request: NextRequest) {
  // بررسی امنیتی
  const protection = await protectAPIEndpoint(request, {
    requireAuth: true,
    rateLimit: "sensitive",
  });

  if (!protection.success) {
    return protection.response!;
  }

  // دریافت و اعتبارسنجی داده
  const body = await request.json();
  const validation = validateInput(body.name, "name", true);

  if (!validation.isValid) {
    return createSecureAPIResponse({ error: validation.errors[0] }, 400);
  }

  // انجام عملیات
  // ...

  return createSecureAPIResponse({ success: true });
}
```

## اعتبارسنجی ورودی‌ها

```typescript
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/lib/security";

// اعتبارسنجی ایمیل
const emailResult = validateEmail("user@example.com");
if (!emailResult.isValid) {
  console.error(emailResult.errors);
}

// اعتبارسنجی رمز عبور
const passResult = validatePassword("MySecurePass123!");
if (!passResult.isValid) {
  console.error(passResult.errors);
}
```

## مانیتورینگ امنیتی

```typescript
import {
  getSecurityLogs,
  generateSecurityReport,
  analyzeSuspiciousPatterns,
} from "@/lib/security";

// دریافت لاگ‌های امنیتی
const logs = getSecurityLogs({
  severity: "high",
  limit: 50,
});

// تولید گزارش هفتگی
const report = generateSecurityReport("week");
console.log(report);

// تحلیل الگوهای مشکوک
const analysis = analyzeSuspiciousPatterns();
console.log("Suspicious IPs:", analysis.suspiciousIPs);
```

## لایه‌های امنیتی فعال

✅ **Rate Limiting**: محدودسازی درخواست‌ها  
✅ **IP Blocking**: مسدودی خودکار IP های مشکوک  
✅ **Input Validation**: اعتبارسنجی تمام ورودی‌ها  
✅ **SQL Injection Prevention**: جلوگیری از تزریق SQL  
✅ **XSS Protection**: محافظت در برابر XSS  
✅ **CSRF Protection**: محافظت در برابر CSRF  
✅ **Session Security**: امنیت نشست با Fingerprinting  
✅ **MFA Support**: احراز هویت دو مرحله‌ای  
✅ **Encryption**: رمزنگاری داده‌های حساس  
✅ **Audit Trail**: ثبت تمام تغییرات  
✅ **Security Headers**: هدرهای امنیتی پیشرفته  
✅ **Threat Detection**: تشخیص خودکار تهدیدات

## مستندات کامل

برای اطلاعات بیشتر، فایل [SECURITY.md](./SECURITY.md) را مطالعه کنید.

## پشتیبانی

در صورت مشاهده آسیب‌پذیری امنیتی، فوراً به `security@yourdomain.com` اطلاع دهید.

## License

MIT
