import { SEO_KEYWORDS } from "@/lib/seo/keywords";
import { generateAidSeekerMetadata } from "@/lib/seo/metadata";
import {
  getBreadcrumbSchema,
  getServiceSchema,
  JsonLd,
} from "@/lib/seo/structured-data";
import {
  CheckCircle2,
  Clock,
  Heart,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateAidSeekerMetadata();

export default function AidSeekerPage() {
  const breadcrumbs = [
    { name: "خانه", url: "/" },
    { name: "دریافت کمک اضطراری", url: "/get-help" },
  ];

  const serviceSchema = getServiceSchema({
    name: "دریافت کمک اضطراری",
    description:
      "دسترسی سریع به داوطلبان معتبر و سازمان‌های کمک‌رسان برای امداد پزشکی، حقوقی، مالی و روانی",
    serviceType: "Emergency Aid Service",
  });

  return (
    <>
      <JsonLd data={[serviceSchema, getBreadcrumbSchema(breadcrumbs)]} />

      <div
        className="min-h-screen bg-gradient-to-b from-red-50 via-white to-blue-50"
        dir="rtl"
      >
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                نیاز به کمک فوری دارید؟
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                رهنورد شما را در کمتر از ۲۴ ساعت به داوطلبان معتبر و سازمان‌های
                امداد متصل می‌کند
              </p>

              {/* CTA Button */}
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-2xl"
              >
                <Heart className="w-6 h-6" />
                درخواست کمک فوری
              </Link>

              {/* Emergency Contact */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5 animate-pulse" />
                <span className="text-lg">دسترسی ۲۴/۷ به پشتیبانی</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">۱۰۰٪ احراز هویت شده</h3>
                <p className="text-gray-600">
                  تمامی داوطلبان و سازمان‌ها توسط سیستم هوشمند و کارشناسان ما
                  تایید می‌شوند
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">پاسخ سریع</h3>
                <p className="text-gray-600">
                  متوسط زمان پاسخ کمتر از ۲۴ ساعت برای درخواست‌های اضطراری
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">پوشش سراسری</h3>
                <p className="text-gray-600">
                  دسترسی به شبکه داوطلبان در تمامی شهرهای بزرگ ایران
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              انواع کمک‌های اضطراری
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "کمک پزشکی",
                  desc: "دسترسی به پزشکان، پرستاران و تجهیزات پزشکی",
                  icon: "🏥",
                  keywords: SEO_KEYWORDS.services.persian[0],
                },
                {
                  title: "مشاوره حقوقی",
                  desc: "وکلای داوطلب برای مشاوره و راهنمایی قانونی",
                  icon: "⚖️",
                  keywords: SEO_KEYWORDS.services.persian[1],
                },
                {
                  title: "حمایت روانی",
                  desc: "مشاوران روانشناسی برای حمایت در شرایط سخت",
                  icon: "🧠",
                  keywords: SEO_KEYWORDS.services.persian[2],
                },
                {
                  title: "کمک غذایی",
                  desc: "دریافت غذا و مواد غذایی در مواقع اضطراری",
                  icon: "🍲",
                  keywords: SEO_KEYWORDS.services.persian[3],
                },
                {
                  title: "کمک مالی",
                  desc: "دریافت کمک هزینه در شرایط بحرانی",
                  icon: "💰",
                  keywords: SEO_KEYWORDS.services.persian[4],
                },
                {
                  title: "آموزش",
                  desc: "دسترسی به منابع آموزشی و معلمان داوطلب",
                  icon: "📚",
                  keywords: SEO_KEYWORDS.services.persian[5],
                },
                {
                  title: "سرپناه موقت",
                  desc: "پیدا کردن محل امن برای اقامت موقت",
                  icon: "🏠",
                  keywords: SEO_KEYWORDS.services.persian[6],
                },
                {
                  title: "حمل و نقل",
                  desc: "کمک برای جابجایی در مواقع اضطراری",
                  icon: "🚗",
                  keywords: SEO_KEYWORDS.services.persian[7],
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
                  <span className="text-xs text-blue-600 font-medium">
                    {service.keywords}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              چگونه کمک دریافت کنم؟
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ۱
                </div>
                <h3 className="text-xl font-bold mb-3">
                  نوع کمک را انتخاب کنید
                </h3>
                <p className="text-gray-600">
                  از بین دسته‌بندی‌های مختلف، نوع کمک مورد نیاز خود را مشخص کنید
                </p>
              </div>

              <div className="text-center">
                <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ۲
                </div>
                <h3 className="text-xl font-bold mb-3">درخواست ثبت کنید</h3>
                <p className="text-gray-600">
                  فرم ساده را پر کنید و موقعیت مکانی خود را مشخص نمایید
                </p>
              </div>

              <div className="text-center">
                <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ۳
                </div>
                <h3 className="text-xl font-bold mb-3">به داوطلب متصل شوید</h3>
                <p className="text-gray-600">
                  داوطلبان معتبر با شما تماس می‌گیرند و کمک‌های لازم را ارائه
                  می‌دهند
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-red-700 transition-colors shadow-lg"
              >
                شروع کنید - دریافت کمک فوری
              </Link>
            </div>
          </div>
        </section>

        {/* Safety & Privacy */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                امنیت و حریم خصوصی شما اولویت ماست
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      احراز هویت دو مرحله‌ای
                    </h3>
                    <p className="text-green-100">
                      تمامی داوطلبان با احراز هویت چند مرحله‌ای تایید می‌شوند
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">رمزگذاری اطلاعات</h3>
                    <p className="text-green-100">
                      اطلاعات شخصی شما با بالاترین استانداردهای امنیتی محافظت
                      می‌شود
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      سیستم گزارش‌دهی سریع
                    </h3>
                    <p className="text-green-100">
                      امکان گزارش مشکلات و رفتارهای مشکوک در هر زمان
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">پشتیبانی ۲۴ساعته</h3>
                    <p className="text-green-100">
                      تیم پشتیبانی ما همیشه آماده کمک به شماست
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local SEO Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              کمک اضطراری در شهر شما
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              دسترسی به شبکه داوطلبان معتبر در شهرهای بزرگ ایران
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {SEO_KEYWORDS.cities.map((city) => (
                <Link
                  key={city}
                  href={`/location/${city}`}
                  className="bg-white p-4 rounded-lg text-center hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <span className="font-medium">{city}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              سوالات متداول
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-bold text-lg cursor-pointer">
                  چقدر طول می‌کشد تا کمک دریافت کنم؟
                </summary>
                <p className="mt-4 text-gray-600">
                  متوسط زمان پاسخ به درخواست‌های اضطراری کمتر از ۲۴ ساعت است. در
                  موارد فوری، ممکن است در عرض چند ساعت پاسخ دریافت کنید.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-bold text-lg cursor-pointer">
                  آیا استفاده از رهنورد رایگان است؟
                </summary>
                <p className="mt-4 text-gray-600">
                  بله، استفاده از پلتفرم رهنورد کاملاً رایگان است. تمامی
                  داوطلبان به صورت داوطلبانه کمک می‌کنند.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-bold text-lg cursor-pointer">
                  چگونه از اعتبار داوطلبان اطمینان حاصل کنم؟
                </summary>
                <p className="mt-4 text-gray-600">
                  تمامی داوطلبان از طریق سیستم احراز هویت چند مرحله‌ای ما تایید
                  شده‌اند. شما می‌توانید نظرات و امتیازات داوطلبان را مشاهده
                  کنید.
                </p>
              </details>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/faq"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                مشاهده تمام سوالات متداول ←
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              در شرایط سخت تنها نیستید
            </h2>
            <p className="text-xl mb-8">هزاران داوطلب آماده کمک به شما هستند</p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-2xl"
            >
              <Heart className="w-6 h-6" />
              همین الان کمک دریافت کنید
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
