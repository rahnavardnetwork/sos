import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Security Headers - هدرهای امنیتی پیشرفته */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Content Security Policy - محافظت در برابر XSS
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // HTTP Strict Transport Security - اجبار به HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // X-Frame-Options - جلوگیری از Clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // X-Content-Type-Options - جلوگیری از MIME Type Sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // X-XSS-Protection - محافظت در برابر XSS
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Referrer-Policy - کنترل اطلاعات Referrer
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions-Policy - محدود کردن دسترسی به ویژگی‌های مرورگر
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // X-DNS-Prefetch-Control - کنترل DNS Prefetching
          {
            key: "X-DNS-Prefetch-Control",
            value: "off",
          },
          // حذف هدرهایی که اطلاعات سرور را فاش می‌کنند
          {
            key: "X-Powered-By",
            value: "",
          },
        ],
      },
    ];
  },

  /* تنظیمات امنیتی اضافی */
  reactStrictMode: true,
  poweredByHeader: false, // حذف هدر X-Powered-By

  /* تنظیمات تولید */
  productionBrowserSourceMaps: false, // غیرفعال کردن source maps در production

  /* تنظیمات بهینه‌سازی */
  compress: true,

  /* Experimental features */
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
