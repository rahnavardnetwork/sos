import { generateBlogMetadata } from "@/lib/seo/metadata";
import {
  getArticleSchema,
  getBreadcrumbSchema,
  getHowToSchema,
  JsonLd,
} from "@/lib/seo/structured-data";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateBlogMetadata(
  "پروتکل‌های ملاقات امن - راهنمای کامل ملاقات بین داوطلب و کمک‌گیرنده",
  "راهنمای جامع پروتکل‌های امنیتی برای ملاقات‌های امن بین داوطلبان و افراد نیازمند. نکات حیاتی برای هر دو طرف.",
  "safe-meeting-protocols",
  "2026-02-01",
  [
    "پروتکل‌های ملاقات",
    "ملاقات امن",
    "امنیت داوطلبان",
    "امنیت کمک‌گیرندگان",
    "راهنمای ملاقات",
  ],
);

export default function SafeMeetingProtocolsPage() {
  const breadcrumbs = [
    { name: "خانه", url: "/" },
    { name: "بلاگ", url: "/blog" },
    { name: "پروتکل‌های ملاقات امن", url: "/blog/safe-meeting-protocols" },
  ];

  const articleSchema = getArticleSchema({
    title: "پروتکل‌های ملاقات امن",
    description: "بهترین روش‌ها برای ملاقات امن بین داوطلب و کمک‌گیرنده",
    url: "/blog/safe-meeting-protocols",
    publishedTime: "2026-02-01",
    author: "تیم رهنورد",
    keywords: ["پروتکل‌های ملاقات", "ملاقات امن", "امنیت داوطلبان"],
  });

  const howToSchema = getHowToSchema({
    name: "چگونه ملاقات امنی داشته باشیم",
    description: "راهنمای گام به گام برای برگزاری ملاقات امن و ایمن",
    totalTime: "PT5M",
    steps: [
      {
        name: "انتخاب مکان عمومی",
        text: "مکان شلوغ و امنی برای ملاقات انتخاب کنید",
      },
      {
        name: "تعیین زمان مناسب",
        text: "در ساعات روز و در زمان‌های مناسب ملاقات کنید",
      },
      {
        name: "اطلاع‌رسانی به دیگران",
        text: "جزئیات ملاقات را با افراد مورد اعتماد خود به اشتراک بگذارید",
      },
      {
        name: "رعایت حریم شخصی",
        text: "مرزهای شخصی را محترم بشمارید و از هر دو طرف حفاظت کنید",
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
              <Users className="w-10 h-10" />
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium">
                امنیت و ایمنی
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              پروتکل‌های ملاقات امن
            </h1>
            <p className="text-xl text-green-50 mb-6">
              بهترین روش‌ها برای ملاقات امن بین داوطلب و کمک‌گیرنده
            </p>
            <div className="flex items-center gap-6 text-green-50">
              <span>زمان مطالعه: ۵ دقیقه</span>
              <span>تاریخ انتشار: ۱ فوریه ۲۰۲۶</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              ملاقات امن بین داوطلب و کمک‌گیرنده پایه و اساس یک تجربه موفق است.
              این پروتکل‌ها برای محافظت از امنیت هر دو طرف طراحی شده و رعایت
              آنها می‌تواند از بسیاری از خطرات جلوگیری کند. در شرایط خطرناک
              امنیتی، این پروتکل‌ها می‌توانند نجات‌دهنده باشند.
            </p>
          </section>

          {/* Core Principles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              اصول اساسی
            </h2>

            <div className="bg-blue-50 border-r-4 border-blue-500 p-6 rounded-lg mb-8">
              <p className="text-lg text-gray-800">
                <strong>قانون اصلی:</strong> امنیت هر دو طرف در اولویت است. هیچ
                کمکی به اندازه جان و سلامتی شما اهمیت ندارد.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "شفافیت کامل",
                  desc: "قبل از ملاقات، انتظارات، نوع کمک و جزئیات را به صورت شفاف مشخص کنید",
                },
                {
                  title: "احترام متقابل",
                  desc: "حریم شخصی، فرهنگ و باورهای یکدیگر را محترم بشمارید",
                },
                {
                  title: "قابل ردیابی بودن",
                  desc: "همیشه ملاقات را از طریق پلتفرم رهنورد هماهنگ کنید تا قابل پیگیری باشد",
                },
                {
                  title: "حق انصراف",
                  desc: "هر دو طرف می‌توانند در هر زمان بدون توضیح از ملاقات انصراف دهند",
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

          {/* Location Selection */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">انتخاب مکان امن</h2>

            <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-2 text-green-900">
                ویژگی‌های مکان ایده‌آل
              </h3>
              <p className="text-green-800">
                مکان ملاقات باید عمومی، امن و دارای این ویژگی‌ها باشد:
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">
                  ✅ مکان‌های توصیه شده
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "کافه‌ها و رستوران‌های شلوغ",
                    "مراکز خرید و پاساژها",
                    "کتابخانه‌های عمومی",
                    "پارک‌های پرجمعیت در روز",
                    "مراکز فرهنگی و هنری",
                    "ایستگاه‌های مترو و اتوبوس شلوغ",
                    "ساختمان‌های اداری عمومی",
                    "درمانگاه‌ها و مراکز بهداشتی",
                  ].map((location) => (
                    <li
                      key={location}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      {location}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-red-600">
                  ❌ مکان‌های غیرمجاز و خطرناک
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "منازل شخصی (مگر در شرایط خاص)",
                    "مکان‌های خلوت و دورافتاده",
                    "پارکینگ‌های زیرزمینی",
                    "کوچه‌های تاریک و خلوت",
                    "مناطق بی‌امن و خطرناک",
                    "اتاق‌های خصوصی در مکان‌های عمومی",
                    "ماشین شخصی",
                    "مکان‌های بدون دوربین مداربسته",
                  ].map((location) => (
                    <li
                      key={location}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      {location}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-r-4 border-yellow-500 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-yellow-900">
                مورد استثنا: ملاقات در منزل
              </h3>
              <p className="text-gray-700 mb-3">
                در موارد خاص که ملاقات در منزل ضروری است (مثل کمک به افراد بیمار
                یا مسن):
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                <li>حتماً حداقل یک نفر دیگر در منزل حضور داشته باشد</li>
                <li>درهای ورودی باز بماند</li>
                <li>افراد دیگری از زمان دقیق ملاقات مطلع باشند</li>
                <li>ملاقات در ساعات روز انجام شود</li>
                <li>برای ملاقات اول، حتماً در مکان عمومی باشد</li>
              </ul>
            </div>
          </section>

          {/* Time Selection */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">انتخاب زمان مناسب</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border-r-4 border-green-500">
                <h3 className="text-xl font-bold mb-4 text-green-900">
                  ✅ زمان‌های مناسب
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ساعات روز (۹ صبح تا ۶ عصر)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    روزهای کاری در ساعات شلوغ
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    زمان‌هایی که مکان پرجمعیت است
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    هنگامی که هوا روشن است
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border-r-4 border-red-500">
                <h3 className="text-xl font-bold mb-4 text-red-900">
                  ❌ زمان‌های نامناسب
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    دیروقت شب یا سحرگاه
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    ساعاتی که مکان خلوت است
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    تعطیلات که امکانات کمتری باز است
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    هوای تاریک و کم‌نور
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border-r-4 border-blue-500 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">
                نکته مهم: مدت زمان ملاقات
              </h3>
              <p className="text-gray-700">
                برای اولین ملاقات، مدت زمان را کوتاه (۳۰-۶۰ دقیقه) و مشخص در نظر
                بگیرید. این به هر دو طرف کمک می‌کند تا بدون فشار و با احساس
                امنیت بیشتر ملاقات کنند.
              </p>
            </div>
          </section>

          {/* Communication Protocol */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">پروتکل ارتباطات</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">قبل از ملاقات</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      ۱
                    </span>
                    <div>
                      <h4 className="font-bold mb-1">تایید هویت</h4>
                      <p className="text-gray-600">
                        از طریق پلتفرم رهنورد، پروفایل و هویت یکدیگر را تایید
                        کنید
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      ۲
                    </span>
                    <div>
                      <h4 className="font-bold mb-1">مشخص کردن جزئیات</h4>
                      <p className="text-gray-600">
                        نوع کمک، زمان دقیق، مکان دقیق و مدت زمان را روشن کنید
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      ۳
                    </span>
                    <div>
                      <h4 className="font-bold mb-1">تبادل اطلاعات محدود</h4>
                      <p className="text-gray-600">
                        فقط اطلاعات ضروری مانند نام، شماره تماس و توضیح مختصر را
                        به اشتراک بگذارید
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      ۴
                    </span>
                    <div>
                      <h4 className="font-bold mb-1">تایید نهایی</h4>
                      <p className="text-gray-600">
                        یک روز قبل و یک ساعت قبل از ملاقات، با یکدیگر تماس
                        بگیرید و تایید کنید
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">حین ملاقات</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>رفتار محترمانه و حرفه‌ای داشته باشید</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>از سوالات شخصی و نامربوط پرهیز کنید</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>حریم فیزیکی و احساسی یکدیگر را رعایت کنید</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>فقط به موضوع اصلی کمک بپردازید</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>تلفن همراه خود را در دسترس و شارژ شده نگه دارید</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">بعد از ملاقات</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>
                      به افراد مورد اعتماد خود از پایان امن ملاقات اطلاع دهید
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>بازخورد صادقانه در پلتفرم رهنورد ثبت کنید</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>در صورت مشاهده هر مشکلی، به پشتیبانی گزارش دهید</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>برای ملاقات‌های بعدی، از تجربه خود درس بگیرید</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Red Flags */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">علائم هشدار</h2>

            <div className="bg-red-50 border-r-4 border-red-600 p-6 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-red-900">
                    اگر این علائم را دیدید، فوراً ملاقات را لغو کنید:
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "تغییر مکرر مکان یا زمان ملاقات",
                "اصرار بر ملاقات در مکان خلوت",
                "درخواست اطلاعات شخصی بیش از حد",
                "رفتار مشکوک یا نامتعارف",
                "فشار برای ملاقات سریع و فوری",
                "عدم شفافیت در اطلاعات",
                "پاسخ ندادن به سوالات امنیتی",
                "عکس پروفایل غیرواقعی یا ساختگی",
                "عدم تایید هویت در پلتفرم",
                "نظرات منفی از سایر کاربران",
                "درخواست‌های نامتعارف یا غیرقانونی",
                "احساس ناامنی یا عدم اطمینان",
              ].map((flag) => (
                <div
                  key={flag}
                  className="flex items-start gap-2 bg-white p-4 rounded-lg border-r-4 border-red-500"
                >
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{flag}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Safety Checklist */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">چک‌لیست امنیتی</h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">قبل از خروج از منزل:</h3>
              <div className="space-y-2">
                {[
                  "اطلاعات کامل ملاقات را با حداقل ۲ نفر به اشتراک گذاشته‌ام",
                  "پروفایل طرف مقابل را بررسی و تایید کرده‌ام",
                  "مکان عمومی و امنی انتخاب کرده‌ام",
                  "زمان روز و ساعات شلوغ را انتخاب کرده‌ام",
                  "تلفن همراه‌ام شارژ کامل است",
                  "برنامه اشتراک موقعیت مکانی را فعال کرده‌ام",
                  "کلمه رمز اضطراری با نزدیکانم تعیین کرده‌ام",
                  "مسیر رفت و برگشت را بررسی کرده‌ام",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-green-600"
                      id={`checklist-${index}`}
                    />
                    <label
                      htmlFor={`checklist-${index}`}
                      className="text-gray-700 cursor-pointer"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Emergency Support Network */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">شبکه حمایت اضطراری</h2>

            <div className="bg-red-50 border-r-4 border-red-600 p-6 rounded-lg mb-6">
              <p className="text-gray-800 font-bold mb-2">
                در صورت احساس خطر فوری، بلافاصله این اقدامات را انجام دهید:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-blue-500">
                <h4 className="font-bold mb-3 text-lg text-blue-900">
                  افراد مورد اعتماد
                </h4>
                <p className="text-gray-700 mb-3">
                  فوراً با دوستان، خانواده یا همسایگان مورد اعتماد تماس بگیرید
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mr-4">
                  <li>شماره‌های اضطراری در دسترس داشته باشید</li>
                  <li>موقعیت مکانی خود را به اشتراک بگذارید</li>
                  <li>از آنها بخواهید در محل حاضر شوند</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-purple-500">
                <h4 className="font-bold mb-3 text-lg text-purple-900">
                  گروه‌های مردمی
                </h4>
                <p className="text-gray-700 mb-3">
                  با گروه‌های کمک‌رسانی مردمی و فعالان محلی در ارتباط باشید
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mr-4">
                  <li>شبکه‌های محلی کمک‌رسانی</li>
                  <li>گروه‌های تلگرامی محله</li>
                  <li>فعالان مدنی و حقوق بشری</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-green-500">
                <h4 className="font-bold mb-3 text-lg text-green-900">
                  پشتیبانی رهنورد
                </h4>
                <p className="text-gray-700 mb-3">
                  ماجرا را به سیستم گزارش‌دهی رهنورد اطلاع دهید
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mr-4">
                  <li>گزارش مشکلات امنیتی</li>
                  <li>هشدار به سایر کاربران</li>
                  <li>مسدود کردن کاربر مشکل‌دار</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-orange-500">
                <h4 className="font-bold mb-3 text-lg text-orange-900">
                  فرار و پناهگاه
                </h4>
                <p className="text-gray-700 mb-3">
                  در شرایط خطر جدی، سریعاً به مکان امن بروید
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mr-4">
                  <li>مکان‌های عمومی و شلوغ</li>
                  <li>منزل افراد مورد اعتماد</li>
                  <li>مراکز مردمی و انجمن‌های محلی</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">نکته پایانی</h2>
              <p className="text-lg text-green-50 leading-relaxed mb-4">
                رعایت این پروتکل‌ها نه تنها امنیت شما را تضمین می‌کند، بلکه به
                ایجاد فضایی امن و مطمئن برای همه کاربران رهنورد کمک می‌نماید. به
                یاد داشته باشید که رهنورد صرفاً یک پل ارتباطی است و مسئولیت
                رفتار و امنیت در ملاقات‌ها بر عهده خود افراد است.
              </p>
              <p className="text-lg text-green-50 leading-relaxed">
                امنیت یک انتخاب است - انتخاب درست بکنید.
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
                  title: "نکات ایمنی برای کمک‌گیرندگان",
                  slug: "aid-recipient-safety",
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
