import { CONTENT_PILLAR_KEYWORDS } from "@/lib/seo/keywords";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { BookOpen, Heart, Shield, Users } from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata({
  title: "منابع و مقالات آموزشی - راهنمای کامل کمک‌رسانی",
  description:
    "راهنماهای جامع درباره امنیت داوطلبان، حریم خصوصی دیجیتال، کمک‌های اولیه و نکات ایمنی برای کمک‌گیرندگان",
  keywords: [
    ...CONTENT_PILLAR_KEYWORDS.safety.persian,
    ...CONTENT_PILLAR_KEYWORDS.digitalSecurity.persian,
    ...CONTENT_PILLAR_KEYWORDS.firstAid.persian,
  ],
});

export default function BlogPage() {
  const contentPillars = [
    {
      title: "امنیت و ایمنی",
      description: "راهنماهای جامع برای حفظ امنیت در فرآیند کمک‌رسانی",
      icon: Shield,
      color: "from-green-500 to-green-600",
      articles: [
        {
          slug: "volunteer-safety-guide",
          title: "راهنمای کامل امنیت داوطلبان",
          excerpt: "نکات ضروری برای حفظ امنیت شخصی هنگام کمک به افراد امدادجو",
          readTime: "۸ دقیقه",
        },
        {
          slug: "aid-recipient-safety",
          title: "نکات ایمنی برای کمک‌گیرندگان",
          excerpt: "چگونه از خود در هنگام دریافت کمک محافظت کنید",
          readTime: "۶ دقیقه",
        },
        {
          slug: "safe-meeting-protocols",
          title: "پروتکل‌های ملاقات امن",
          excerpt: "بهترین روش‌ها برای ملاقات امن بین داوطلب و کمک‌گیرنده",
          readTime: "۵ دقیقه",
        },
      ],
    },
    {
      title: "امنیت دیجیتال",
      description: "حفاظت از حریم خصوصی و اطلاعات شخصی در دنیای دیجیتال",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      articles: [
        {
          slug: "digital-security-volunteers",
          title: "امنیت دیجیتال برای داوطلبان",
          excerpt: "نحوه محافظت از اطلاعات شخصی و حریم خصوصی آنلاین",
          readTime: "۱۰ دقیقه",
        },
        {
          slug: "privacy-best-practices",
          title: "بهترین روش‌های حفظ حریم خصوصی",
          excerpt: "تنظیمات امنیتی و نکات حفاظت از داده‌های شخصی",
          readTime: "۷ دقیقه",
        },
        {
          slug: "two-factor-authentication",
          title: "راهنمای احراز هویت دو مرحله‌ای",
          excerpt:
            "چگونه حساب کاربری خود را با احراز هویت دو مرحله‌ای امن کنیم",
          readTime: "۵ دقیقه",
        },
      ],
    },
    {
      title: "کمک‌های اولیه",
      description: "آموزش اصول و فنون کمک‌های اولیه برای موقعیت‌های اضطراری",
      icon: Heart,
      color: "from-red-500 to-red-600",
      articles: [
        {
          slug: "first-aid-basics",
          title: "اصول پایه کمک‌های اولیه",
          excerpt: "آموزش مهارت‌های ضروری کمک‌های اولیه برای همه",
          readTime: "۱۲ دقیقه",
        },
        {
          slug: "emergency-response",
          title: "واکنش سریع در موقعیت‌های اضطراری",
          excerpt: "چگونه در موقعیت‌های بحرانی به درستی عمل کنیم",
          readTime: "۹ دقیقه",
        },
        {
          slug: "cpr-guide",
          title: "راهنمای انجام CPR",
          excerpt: "آموزش گام به گام احیای قلبی ریوی",
          readTime: "۱۵ دقیقه",
        },
      ],
    },
    {
      title: "مدیریت بحران",
      description: "راهنماهای عملی برای مدیریت و مقابله با شرایط بحرانی",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      articles: [
        {
          slug: "crisis-management-basics",
          title: "اصول مدیریت بحران",
          excerpt: "نحوه برنامه‌ریزی و مدیریت در شرایط اضطراری",
          readTime: "۱۱ دقیقه",
        },
        {
          slug: "psychological-first-aid",
          title: "کمک‌های اولیه روانی",
          excerpt: "چگونه به افراد در شرایط استرس شدید کمک کنیم",
          readTime: "۸ دقیقه",
        },
        {
          slug: "disaster-preparedness",
          title: "آمادگی برای بلایای طبیعی",
          excerpt: "راهنمای آماده‌سازی برای مواجهه با بلایا",
          readTime: "۱۰ دقیقه",
        },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      dir="rtl"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              منابع و مقالات آموزشی
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              راهنماهای جامع برای داوطلبان و افراد امدادجو
            </p>
          </div>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {contentPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title}>
                  {/* Pillar Header */}
                  <div className="mb-8">
                    <div
                      className={`inline-flex items-center gap-3 bg-gradient-to-r ${pillar.color} text-white px-6 py-3 rounded-full mb-4`}
                    >
                      <Icon className="w-6 h-6" />
                      <h2 className="text-2xl font-bold">{pillar.title}</h2>
                    </div>
                    <p className="text-gray-600 text-lg">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Articles Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pillar.articles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/blog/${article.slug}`}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-indigo-300 group"
                      >
                        <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            زمان مطالعه: {article.readTime}
                          </span>
                          <span className="text-indigo-600 font-medium group-hover:translate-x-1 transition-transform">
                            مطالعه ←
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {index < contentPillars.length - 1 && (
                    <div className="mt-12 border-b border-gray-200"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter/Updates Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            از جدیدترین مقالات باخبر شوید
          </h2>
          <p className="text-xl mb-8">
            مقالات جدید درباره امنیت، کمک‌های اولیه و مدیریت بحران را از دست
            ندهید
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-xl"
          >
            عضویت در خبرنامه
          </Link>
        </div>
      </section>
    </div>
  );
}
