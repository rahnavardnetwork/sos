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
  "نکات ایمنی برای کمک‌گیرندگان - راهنمای دریافت کمک امن",
  "راهنمای جامع برای حفظ امنیت شخصی هنگام دریافت کمک از داوطلبان. نکات حیاتی برای محافظت از خود در شرایط خطرناک.",
  "aid-recipient-safety",
  "2026-02-01",
  [
    "امنیت کمک‌گیرندگان",
    "دریافت کمک امن",
    "نکات ایمنی",
    "حفاظت شخصی",
    "امنیت فردی",
  ],
);

export default function AidRecipientSafetyPage() {
  const breadcrumbs = [
    { name: "خانه", url: "/" },
    { name: "بلاگ", url: "/blog" },
    { name: "نکات ایمنی برای کمک‌گیرندگان", url: "/blog/aid-recipient-safety" },
  ];

  const articleSchema = getArticleSchema({
    title: "نکات ایمنی برای کمک‌گیرندگان",
    description: "چگونه از خود در هنگام دریافت کمک محافظت کنید",
    url: "/blog/aid-recipient-safety",
    publishedTime: "2026-02-01",
    author: "تیم رهنورد",
    keywords: ["امنیت کمک‌گیرندگان", "دریافت کمک امن", "نکات ایمنی"],
  });

  const howToSchema = getHowToSchema({
    name: "چگونه در دریافت کمک امن باشیم",
    description: "راهنمای گام به گام برای دریافت کمک با امنیت کامل",
    totalTime: "PT6M",
    steps: [
      {
        name: "بررسی هویت داوطلب",
        text: "قبل از ملاقات، پروفایل و امتیاز داوطلب را بررسی کنید",
      },
      {
        name: "ملاقات در مکان عمومی",
        text: "همیشه در مکان‌های شلوغ و امن ملاقات کنید",
      },
      {
        name: "اطلاع‌رسانی به نزدیکان",
        text: "زمان و مکان ملاقات را با فرد مورد اعتماد خود به اشتراک بگذارید",
      },
      {
        name: "محدودیت اطلاعات شخصی",
        text: "فقط اطلاعات ضروری را افشا کنید و از دادن جزئیات حساس خودداری نمایید",
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
              نکات ایمنی برای کمک‌گیرندگان
            </h1>
            <p className="text-xl text-green-50 mb-6">
              چگونه از خود در هنگام دریافت کمک محافظت کنید
            </p>
            <div className="flex items-center gap-6 text-green-50">
              <span>زمان مطالعه: ۶ دقیقه</span>
              <span>تاریخ انتشار: ۱ فوریه ۲۰۲۶</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              دریافت کمک یک حق مسلم شماست، اما حفظ امنیت شخصی در این فرآیند
              بسیار حیاتی است. این راهنما به شما کمک می‌کند تا با اطمینان و
              امنیت کامل از کمک‌های داوطلبان بهره‌مند شوید. در شرایط دشوار،
              آگاهی از نکات امنیتی می‌تواند جان شما را نجات دهد.
            </p>
          </section>

          {/* Critical Safety Rules */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              قوانین حیاتی امنیتی
            </h2>

            <div className="bg-red-50 border-r-4 border-red-600 p-6 rounded-lg mb-8">
              <p className="text-lg text-gray-800 font-bold mb-4">
                هشدار مهم: در شرایط خطرناک، هیچ کمکی ارزش جان شما را ندارد
              </p>
              <p className="text-gray-700">
                اگر احساس خطر می‌کنید یا شرایط مشکوک است، از دریافت کمک صرف‌نظر
                کنید. امنیت شما از هر چیز دیگری مهم‌تر است.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "هیچ‌وقت تنها نباشید",
                  desc: "در صورت امکان، همیشه با فرد مورد اعتماد خود ملاقات کنید. اگر مجبور به حضور تنها هستید، در مکان عمومی باشید",
                },
                {
                  title: "اطلاعات شخصی را حفظ کنید",
                  desc: "هرگز آدرس دقیق منزل، شماره حساب بانکی یا اطلاعات هویتی کامل خود را ندهید",
                },
                {
                  title: "مکان‌های عمومی را انتخاب کنید",
                  desc: "همیشه در مکان‌های شلوغ، روشن و دارای دوربین مداربسته ملاقات کنید",
                },
                {
                  title: "به غریزه خود اعتماد کنید",
                  desc: "اگر احساس ناامنی دارید، فوراً ملاقات را لغو کنید. احساسات شما معمولاً درست است",
                },
              ].map((rule) => (
                <div
                  key={rule.title}
                  className="bg-white p-6 rounded-lg shadow-md border-r-4 border-red-500"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-red-900">
                        {rule.title}
                      </h3>
                      <p className="text-gray-700">{rule.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Before Accepting Help */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">قبل از پذیرش کمک</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    ۱
                  </span>
                  بررسی دقیق پروفایل داوطلب
                </h3>
                <p className="text-gray-700 mb-4">
                  قبل از هرگونه تماس، پروفایل داوطلب را به دقت بررسی کنید:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>نظرات و امتیازات سایر کمک‌گیرندگان را مطالعه کنید</li>
                  <li>بررسی کنید که پروفایل تایید هویت شده باشد</li>
                  <li>تعداد کمک‌های قبلی و سابقه فعالیت را چک کنید</li>
                  <li>از عکس پروفایل واقعی و معتبر مطمئن شوید</li>
                  <li>در صورت هرگونه شک، با پشتیبانی رهنورد تماس بگیرید</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    ۲
                  </span>
                  تعیین شرایط ملاقات امن
                </h3>
                <p className="text-gray-700 mb-4">
                  شرایط ملاقات را به گونه‌ای تنظیم کنید که امنیت شما تضمین شود:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>مکان عمومی و شلوغ انتخاب کنید (کافه، پارک، مرکز خرید)</li>
                  <li>زمان روز را ترجیح دهید، نه شب</li>
                  <li>از داوطلب بخواهید که خودش تنها بیاید</li>
                  <li>مدت زمان ملاقات را از قبل مشخص کنید</li>
                  <li>مسیر فرار و خروج اضطراری را شناسایی کنید</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    ۳
                  </span>
                  آماده‌سازی شبکه امنیتی
                </h3>
                <p className="text-gray-700 mb-4">
                  قبل از ملاقات، شبکه امنیتی خود را فعال کنید:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>
                    اطلاعات کامل ملاقات را با ۲-۳ نفر مورد اعتماد به اشتراک
                    بگذارید
                  </li>
                  <li>عکس و نام داوطلب را برای آنها ارسال کنید</li>
                  <li>برنامه‌ریزی کنید که بعد از ملاقات تماس بگیرید</li>
                  <li>کلمه یا کد رمزی برای اعلام خطر تعیین کنید</li>
                  <li>از برنامه‌های اشتراک موقعیت مکانی استفاده کنید</li>
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
                    نشانه‌های خطر - فوراً ملاقات را ترک کنید اگر:
                  </h3>
                  <p className="text-yellow-800">
                    هر یک از این موارد را مشاهده کردید، بلافاصله مکان را ترک
                    کنید، به مکان امن بروید و به افراد مورد اعتماد خود اطلاع
                    دهید
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "داوطلب سوالات نامربوط و شخصی زیادی می‌پرسد",
                "درخواست تغییر مکان به جای خلوت‌تر",
                "رفتار تهدیدآمیز، تهاجمی یا نامناسب",
                "حضور افراد دیگر بدون اطلاع قبلی",
                "فشار برای پذیرش کمک‌های خاص یا مشروط",
                "درخواست اطلاعات بانکی یا مالی",
                "سعی در عکس‌برداری یا فیلم‌برداری بدون اجازه",
                "پیشنهادهای نامتعارف یا مشکوک",
              ].map((warning) => (
                <div
                  key={warning}
                  className="flex items-start gap-2 bg-white p-4 rounded-lg border-r-4 border-red-500"
                >
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{warning}</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">نکات ایمنی حین ملاقات</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>تلفن همراه خود را شارژ کامل و در دسترس نگه دارید</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>در مکان عمومی بمانید و به مکان‌های خلوت نروید</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>فقط اطلاعات ضروری را به اشتراک بگذارید</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>
                    از پذیرفتن غذا یا نوشیدنی که بسته‌بندی باز شده خودداری کنید
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>مسیر خروج را همیشه در ذهن داشته باشید</span>
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
                <h3 className="text-xl font-bold mb-3">
                  اطلاع‌رسانی به نزدیکان
                </h3>
                <p className="text-gray-700">
                  بلافاصله بعد از ملاقات، با افراد مورد اعتماد خود تماس بگیرید و
                  از سلامت خود اطمینان دهید. این کار به شبکه امنیتی شما آرامش
                  می‌دهد و در صورت بروز مشکل، کمک سریع‌تری دریافت خواهید کرد.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">ثبت بازخورد</h3>
                <p className="text-gray-700 mb-4">
                  بازخورد صادقانه شما به سایر کمک‌گیرندگان کمک می‌کند:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>رفتار داوطلب را به صورت دقیق توصیف کنید</li>
                  <li>نکات مثبت و منفی را ذکر کنید</li>
                  <li>امتیاز منصفانه بدهید</li>
                  <li>در صورت مشاهده رفتار نامناسب، حتماً گزارش دهید</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">گزارش مشکلات امنیتی</h3>
                <p className="text-gray-700 mb-4">
                  اگر هر گونه رفتار مشکوک، تهدید یا مشکل امنیتی مشاهده کردید:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>فوراً به پشتیبانی رهنورد اطلاع دهید</li>
                  <li>به گروه‌های کمک‌رسانی مردمی و فعالان مدنی اطلاع دهید</li>
                  <li>
                    مدارک و شواهد را حفظ کنید (پیام‌ها، عکس‌ها، زمان و مکان)
                  </li>
                  <li>از ادامه ارتباط با آن داوطلب خودداری کنید</li>
                  <li>
                    در صورت نیاز، موضوع را با افراد مورد اعتماد خود در میان
                    بگذارید
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Special Situations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">موقعیت‌های خاص</h2>

            <div className="space-y-6">
              <div className="bg-blue-50 border-r-4 border-blue-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-blue-900">
                  دریافت کمک در منزل
                </h3>
                <p className="text-gray-700 mb-4">
                  اگر مجبور هستید داوطلب به منزل شما بیاید:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>حتماً فرد دیگری در منزل حضور داشته باشد</li>
                  <li>درهای اتاق‌ها را باز نگه دارید</li>
                  <li>دوربین یا ضبط صدا فعال باشد</li>
                  <li>اطلاعات دقیق را با چند نفر به اشتراک بگذارید</li>
                  <li>آدرس دقیق منزل را فقط در لحظه آخر بدهید</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-r-4 border-purple-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-purple-900">
                  کمک‌های مالی و بانکی
                </h3>
                <p className="text-gray-700 mb-4">
                  هرگز اطلاعات بانکی کامل خود را ندهید:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>از طریق سیستم رهنورد کمک‌های مالی را دریافت کنید</li>
                  <li>هیچ‌وقت رمز کارت، CVV2 یا رمز یکبار مصرف ندهید</li>
                  <li>از کارت بانکی جداگانه برای دریافت کمک استفاده کنید</li>
                  <li>در صورت درخواست مستقیم پول نقد، احتیاط کنید</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-r-4 border-orange-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-orange-900">
                  کمک‌های غیرمالی (غذا، دارو، لباس)
                </h3>
                <p className="text-gray-700 mb-4">
                  هنگام دریافت کمک‌های فیزیکی:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>بسته‌بندی را قبل از پذیرش بررسی کنید</li>
                  <li>از پذیرفتن غذای باز شده خودداری کنید</li>
                  <li>داروها باید در بسته‌بندی اصلی و مهر و موم شده باشند</li>
                  <li>از تحویل در مکان‌های خلوت احتراز کنید</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Emergency Procedures */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">اقدامات اضطراری</h2>

            <div className="bg-red-50 border-r-4 border-red-600 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4 text-red-900">
                اگر احساس خطر فوری می‌کنید:
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mr-4">
                <li className="font-bold">
                  فوراً از مکان خارج شوید - هیچ توضیحی لازم نیست
                </li>
                <li>
                  به محیط امن و شلوغ (مغازه، مرکز خرید، مکان عمومی پرجمعیت)
                  بروید
                </li>
                <li>بلافاصله با نزدیکان و افراد مورد اعتماد خود تماس بگیرید</li>
                <li>
                  تا دریافت کمک، در مکان عمومی و شلوغ بمانید و تنها نباشید
                </li>
                <li>
                  ماجرا را به پشتیبانی رهنورد و گروه‌های کمک‌رسانی مردمی گزارش
                  دهید
                </li>
                <li>
                  در صورت امکان، از کمک دوستان، همسایگان یا فعالان مدنی استفاده
                  کنید
                </li>
              </ol>
            </div>

            <div className="bg-orange-50 border-r-4 border-orange-500 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-orange-900">
                شبکه حمایتی خود را بسازید
              </h3>
              <p className="text-gray-700 mb-4">
                در شرایط فعلی، داشتن شبکه حمایتی شخصی بسیار مهم است:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                <li>
                  حداقل ۳-۵ نفر از دوستان و آشنایان مورد اعتماد را در گروه
                  اضطراری خود داشته باشید
                </li>
                <li>با گروه‌های کمک‌رسانی محلی و مردمی در ارتباط باشید</li>
                <li>
                  آدرس و شماره تماس افراد مورد اعتماد را همیشه در دسترس داشته
                  باشید
                </li>
                <li>
                  در صورت خطر، از کمک جامعه مدنی و فعالان حقوق بشر استفاده کنید
                </li>
                <li>با همسایگان مورد اعتماد خود رابطه نزدیک حفظ کنید</li>
              </ul>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">یادآور مهم</h2>
              <p className="text-lg text-green-50 leading-relaxed mb-4">
                دریافت کمک حق طبیعی شماست، اما امنیت شما از هر چیز دیگری مهم‌تر
                است. هیچ‌وقت به خاطر نیاز به کمک، امنیت خود را به خطر نیندازید.
              </p>
              <p className="text-lg text-green-50 leading-relaxed">
                رهنورد تنها یک پلتفرم ارتباطی است. ما هیچ خدمتی ارائه نمی‌دهیم و
                مسئولیت رفتار داوطلبان بر عهده خود آنهاست. با رعایت این نکات،
                می‌توانید با اطمینان بیشتری از کمک‌ها استفاده کنید.
              </p>
            </div>
          </section>

          {/* Related Articles */}
          <section>
            <h2 className="text-3xl font-bold mb-6">مقالات مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "راهنمای کامل امنیت داوطلبان",
                  slug: "volunteer-safety-guide",
                },
                {
                  title: "پروتکل‌های ملاقات امن",
                  slug: "safe-meeting-protocols",
                },
                {
                  title: "امنیت دیجیتال برای داوطلبان",
                  slug: "digital-security-volunteers",
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
