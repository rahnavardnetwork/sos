import { generateBlogMetadata } from "@/lib/seo/metadata";
import {
  getArticleSchema,
  getBreadcrumbSchema,
  getHowToSchema,
  JsonLd,
} from "@/lib/seo/structured-data";
import { AlertTriangle, ArrowLeft, CheckCircle2, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = generateBlogMetadata(
  "راهنمای کامل امنیت داوطلبان - نکات ضروری برای کمک‌رسانی امن",
  "راهنمای جامع برای حفظ امنیت شخصی داوطلبان هنگام کمک به افراد امدادجو. آموزش نکات ایمنی، پروتکل‌های امنیتی و راهکارهای عملی.",
  "volunteer-safety-guide",
  "2026-02-01",
  [
    "امنیت داوطلبان",
    "نکات ایمنی کمک‌رسانی",
    "حفاظت شخصی",
    "پروتکل امنیتی",
    "کمک‌رسانی امن",
  ],
);

export default function VolunteerSafetyGuidePage() {
  const breadcrumbs = [
    { name: "خانه", url: "/" },
    { name: "بلاگ", url: "/blog" },
    { name: "راهنمای امنیت داوطلبان", url: "/blog/volunteer-safety-guide" },
  ];

  const articleSchema = getArticleSchema({
    title: "راهنمای کامل امنیت داوطلبان",
    description: "نکات ضروری برای حفظ امنیت شخصی هنگام کمک به افراد امدادجو",
    url: "/blog/volunteer-safety-guide",
    publishedTime: "2026-02-01",
    author: "تیم رهنورد",
    keywords: ["امنیت داوطلبان", "نکات ایمنی", "کمک‌رسانی امن"],
  });

  const howToSchema = getHowToSchema({
    name: "چگونه به عنوان داوطلب امن باشیم",
    description: "راهنمای گام به گام برای حفظ امنیت در فرآیند کمک‌رسانی",
    totalTime: "PT8M",
    steps: [
      {
        name: "قبل از ملاقات احراز هویت کنید",
        text: "همیشه هویت فرد امدادجو را از طریق پلتفرم تایید کنید",
      },
      {
        name: "در مکان‌های عمومی ملاقات کنید",
        text: "اولین ملاقات را در مکان‌های عمومی و شلوغ انجام دهید",
      },
      {
        name: "اطلاعات خود را به دوستان بدهید",
        text: "آدرس و زمان ملاقات را با فرد مورد اعتماد خود به اشتراک بگذارید",
      },
      {
        name: "به غریزه خود اعتماد کنید",
        text: "اگر احساس ناامنی کردید، از ادامه فعالیت خودداری کنید",
      },
    ],
  });

  return (
    <>
      <JsonLd
        data={[articleSchema, howToSchema, getBreadcrumbSchema(breadcrumbs)]}
      />

      <article
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
        dir="rtl"
      >
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.url} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 font-medium">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.url}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="bg-gradient-to-br from-green-500 to-green-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-10 h-10" />
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium">
                امنیت و ایمنی
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              راهنمای کامل امنیت داوطلبان
            </h1>
            <p className="text-xl text-green-50 mb-6">
              نکات ضروری برای حفظ امنیت شخصی هنگام کمک به افراد امدادجو
            </p>
            <div className="flex items-center gap-6 text-green-50">
              <span>زمان مطالعه: ۸ دقیقه</span>
              <span>تاریخ انتشار: ۱ فوریه ۲۰۲۶</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              کمک به دیگران یکی از شریف‌ترین کارهایی است که می‌توانید انجام
              دهید، اما امنیت شما در درجه اول اهمیت قرار دارد. این راهنما به شما
              کمک می‌کند تا با اطمینان و امنیت بیشتری به افراد امدادجو کمک کنید.
            </p>
          </section>

          {/* Key Principles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              اصول کلیدی امنیت
            </h2>

            <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded-lg mb-8">
              <p className="text-lg text-gray-800">
                <strong>قانون طلایی:</strong> امنیت شما از هر چیز دیگری مهم‌تر
                است. اگر احساس ناامنی می‌کنید، حق دارید از ادامه فعالیت صرف‌نظر
                کنید.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "احراز هویت دقیق",
                  desc: "همیشه هویت فرد امدادجو را از طریق سیستم رهنورد تایید کنید",
                },
                {
                  title: "ملاقات در مکان عمومی",
                  desc: "اولین ملاقات را در مکان‌های شلوغ و عمومی انجام دهید",
                },
                {
                  title: "اطلاع‌رسانی به دیگران",
                  desc: "زمان، مکان و جزئیات ملاقات را با فرد مورد اعتماد خود به اشتراک بگذارید",
                },
                {
                  title: "گوش دادن به غریزه",
                  desc: "به احساسات خود اعتماد کنید و در صورت احساس خطر، عقب‌نشینی کنید",
                },
              ].map((principle) => (
                <div
                  key={principle.title}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {principle.title}
                      </h3>
                      <p className="text-gray-600">{principle.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Before Meeting */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">قبل از ملاقات</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    ۱
                  </span>
                  بررسی پروفایل
                </h3>
                <p className="text-gray-700 mb-4">
                  پروفایل فرد امدادجو را در رهنورد به دقت بررسی کنید:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>امتیازات و نظرات سایر داوطلبان را بخوانید</li>
                  <li>تایید هویت و نشان معتبر را چک کنید</li>
                  <li>سابقه درخواست‌های قبلی را مشاهده کنید</li>
                  <li>در صورت شک، با پشتیبانی رهنورد تماس بگیرید</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    ۲
                  </span>
                  برنامه‌ریزی ملاقات
                </h3>
                <p className="text-gray-700 mb-4">
                  برای اولین ملاقات، این نکات را رعایت کنید:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>مکان عمومی و شلوغ انتخاب کنید (کافه، پارک، مرکز خرید)</li>
                  <li>در ساعات روز ملاقات کنید</li>
                  <li>زمان ملاقات را محدود کنید</li>
                  <li>وسیله نقلیه خود را در مکان امن پارک کنید</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    ۳
                  </span>
                  اطلاع‌رسانی
                </h3>
                <p className="text-gray-700 mb-4">
                  اطلاعات ملاقات را با افراد مورد اعتماد به اشتراک بگذارید:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>آدرس دقیق و زمان ملاقات</li>
                  <li>اطلاعات فرد امدادجو (نام، شماره تماس)</li>
                  <li>زمان تقریبی بازگشت</li>
                  <li>برنامه‌ریزی برای تماس بعد از ملاقات</li>
                </ul>
              </div>
            </div>
          </section>

          {/* During Meeting */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">حین ملاقات</h2>

            <div className="bg-yellow-50 border-r-4 border-yellow-500 p-6 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-yellow-900">
                    علائم هشدار
                  </h3>
                  <p className="text-yellow-800">
                    اگر هر یک از این موارد را مشاهده کردید، فوراً ملاقات را
                    خاتمه دهید و به پشتیبانی رهنورد اطلاع دهید.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "فرد از اطلاعات شخصی بیش از حد سوال می‌کند",
                "درخواست تغییر مکان به جای خلوت",
                "رفتار تهدیدآمیز یا نامناسب",
                "حضور افراد دیگر بدون اطلاع قبلی",
                "فشار برای کمک‌های مالی مستقیم",
                "احساس عدم امنیت یا ناراحتی",
              ].map((warning) => (
                <div
                  key={warning}
                  className="flex items-start gap-2 bg-white p-4 rounded-lg border border-yellow-200"
                >
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{warning}</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">نکات ایمنی حین ملاقات</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>
                    همیشه تلفن همراه خود را شارژ کامل و در دسترس داشته باشید
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>
                    مرزهای شخصی خود را حفظ کنید و از دادن اطلاعات حساس خودداری
                    کنید
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>
                    در صورت احساس ناامنی، بلافاصله ملاقات را خاتمه دهید
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* After Meeting */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">بعد از ملاقات</h2>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">گزارش‌دهی</h3>
                <p className="text-gray-700">
                  بعد از هر ملاقات، بازخورد خود را در سیستم رهنورد ثبت کنید. این
                  کار به سایر داوطلبان کمک می‌کند و امنیت کلی شبکه را افزایش
                  می‌دهد.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">گزارش مشکلات</h3>
                <p className="text-gray-700 mb-4">
                  اگر هر گونه مشکل یا رفتار نامناسبی مشاهده کردید، فوراً به
                  پشتیبانی رهنورد گزارش دهید:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>از طریق سیستم گزارش‌دهی درون پلتفرم</li>
                  <li>تماس با خط پشتیبانی ۲۴ </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">نتیجه‌گیری</h2>
              <p className="text-lg text-green-50 leading-relaxed">
                امنیت شما برای ما بسیار مهم است. با رعایت این نکات، می‌توانید با
                اطمینان و آرامش خاطر به افراد امدادجو کمک کنید. به یاد داشته
                باشید که رهنورد همیشه در کنار شماست و آماده پشتیبانی در هر زمان
                می‌باشد.
              </p>
            </div>
          </section>

          {/* Related Articles */}
          <section>
            <h2 className="text-3xl font-bold mb-6">مقالات مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "نکات ایمنی برای کمک‌گیرندگان",
                  slug: "aid-recipient-safety",
                },
                {
                  title: "امنیت دیجیتال برای داوطلبان",
                  slug: "digital-security-volunteers",
                },
                {
                  title: "پروتکل‌های ملاقات امن",
                  slug: "safe-meeting-protocols",
                },
              ].map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100 hover:border-blue-300"
                >
                  <h3 className="text-lg font-bold mb-2 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <span className="text-blue-600 font-medium">مطالعه ←</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              بازگشت به بلاگ
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
