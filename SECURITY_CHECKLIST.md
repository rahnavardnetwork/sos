# 🔒 Security Deployment Checklist

# چک‌لیست امنیتی برای استقرار

## قبل از استقرار (Pre-Deployment)

### Environment & Configuration

- [ ] تمام کلیدهای امنیتی تولید شده‌اند (JWT_SECRET, ENCRYPTION_KEY, etc.)
- [ ] فایل `.env` در `.gitignore` اضافه شده
- [ ] کلیدهای production با development متفاوت هستند
- [ ] HTTPS فعال است و certificate معتبر دارد
- [ ] `NODE_ENV=production` تنظیم شده
- [ ] تمام `console.log` های حساس حذف شده‌اند
- [ ] Source maps در production غیرفعال است

### Database Security

- [ ] اسکریپت `sql/security_schema.sql` اجرا شده
- [ ] Row Level Security (RLS) فعال است
- [ ] Backup خودکار تنظیم شده
- [ ] Connection string رمزنگاری شده
- [ ] Database در شبکه خصوصی است
- [ ] User permissions به درستی تنظیم شده
- [ ] Audit log فعال است

### Authentication & Authorization

- [ ] رمزهای عبور با bcrypt (14 rounds) هش می‌شوند
- [ ] Session timeout تنظیم شده (24 ساعت)
- [ ] Token rotation فعال است (هر 1 ساعت)
- [ ] Session fingerprinting فعال است
- [ ] MFA برای admin ها الزامی است
- [ ] Password policy اعمال می‌شود (12+ کاراکتر)
- [ ] Account lockout پس از 5 تلاش ناموفق

### API Security

- [ ] تمام API endpoints محافظت شده‌اند
- [ ] Rate limiting فعال است
- [ ] CSRF protection فعال است
- [ ] Input validation در همه جا اعمال می‌شود
- [ ] Error messages اطلاعات حساس فاش نمی‌کنند
- [ ] CORS به درستی پیکربندی شده
- [ ] API keys امن ذخیره می‌شوند

### Network Security

- [ ] Firewall پیکربندی شده
- [ ] فقط پورت‌های ضروری باز هستند (80, 443)
- [ ] DDoS protection فعال است (Cloudflare/AWS Shield)
- [ ] IP whitelisting برای admin panel
- [ ] Rate limiting در network level

### Security Headers

- [ ] Content-Security-Policy (CSP) تنظیم شده
- [ ] Strict-Transport-Security (HSTS) فعال است
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] X-XSS-Protection فعال است
- [ ] Referrer-Policy تنظیم شده
- [ ] Permissions-Policy محدود شده

## بعد از استقرار (Post-Deployment)

### Monitoring & Logging

- [ ] Security logging فعال است
- [ ] Log aggregation تنظیم شده (ELK/CloudWatch)
- [ ] Alert ها برای رویدادهای critical پیکربندی شده
- [ ] Dashboard امنیتی راه‌اندازی شده
- [ ] Uptime monitoring فعال است
- [ ] Performance monitoring نصب شده (Sentry/DataDog)

### Testing & Validation

- [ ] Penetration testing انجام شده
- [ ] Security scan انجام شده (OWASP ZAP)
- [ ] Vulnerability scan انجام شده (npm audit)
- [ ] SSL Labs test: A+ rating
- [ ] Security headers test: A+ rating
- [ ] Load testing انجام شده

### Documentation

- [ ] Security documentation کامل است
- [ ] Incident response plan آماده است
- [ ] Contact information برای security team
- [ ] Backup & recovery procedures مستند شده
- [ ] Runbook برای حوادث امنیتی

### Compliance & Legal

- [ ] GDPR compliance بررسی شده
- [ ] Privacy policy به‌روز است
- [ ] Terms of service به‌روز است
- [ ] Data retention policies تعریف شده
- [ ] User consent mechanism فعال است

## نگهداری مداوم (Ongoing Maintenance)

### هفتگی

- [ ] بررسی لاگ‌های امنیتی
- [ ] بررسی IP های مسدود شده
- [ ] بررسی failed login attempts
- [ ] بررسی security alerts

### ماهانه

- [ ] به‌روزرسانی Dependencies
- [ ] بررسی security patches
- [ ] Vulnerability scan
- [ ] بررسی user permissions
- [ ] تولید گزارش امنیتی ماهانه

### سه‌ماهه

- [ ] چرخش کلیدها و secrets
- [ ] بررسی و به‌روزرسانی security policies
- [ ] Security training برای تیم
- [ ] Penetration testing
- [ ] Disaster recovery drill

### سالانه

- [ ] Security audit کامل توسط third-party
- [ ] بررسی architecture امنیتی
- [ ] به‌روزرسانی incident response plan
- [ ] بررسی compliance requirements
- [ ] Insurance coverage برای cyber security

## Emergency Contacts

```
Security Team Lead: +XX-XXX-XXX-XXXX
DevOps Lead: +XX-XXX-XXX-XXXX
Legal: +XX-XXX-XXX-XXXX

Email: security@yourdomain.com
PGP Key: [لینک به کلید عمومی]
```

## Incident Response Steps

1. **شناسایی (Detection)**
   - بررسی alerts
   - تایید incident
   - تعیین severity

2. **مهار (Containment)**
   - ایزوله کردن سیستم‌های آسیب‌دیده
   - مسدودی IP ها
   - غیرفعال کردن حساب‌های در معرض خطر

3. **پاک‌سازی (Eradication)**
   - حذف malware/backdoors
   - بستن آسیب‌پذیری‌ها
   - تغییر credentials

4. **بازیابی (Recovery)**
   - بازگرداندن از backup
   - بازنشانی سرویس‌ها
   - مانیتورینگ دقیق

5. **یادگیری (Lessons Learned)**
   - Post-mortem meeting
   - مستندسازی incident
   - بهبود procedures

## Security Metrics

### KPIs امنیتی

- Mean Time to Detect (MTTD): < 5 دقیقه
- Mean Time to Respond (MTTR): < 30 دقیقه
- False Positive Rate: < 5%
- Security Score: > 95%
- Vulnerability Remediation Time: < 7 روز

### Targets

- Zero successful breaches
- 99.9% uptime
- < 0.1% failed authentications
- 100% critical patches applied within 24 hours
- 100% team security training completion

---

## ✅ تایید نهایی

تاریخ: **\*\***\_\_\_\_**\*\***
توسط: **\*\***\_\_\_\_**\*\***
امضا: **\*\***\_\_\_\_**\*\***

**این checklist باید قبل از هر deployment پر شود و در مستندات نگهداری شود.**
