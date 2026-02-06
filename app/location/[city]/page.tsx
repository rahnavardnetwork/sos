import { SEO_KEYWORDS } from "@/lib/seo/keywords";
import { generateLocationMetadata } from "@/lib/seo/metadata";
import {
  getBreadcrumbSchema,
  getLocalBusinessSchema,
  JsonLd,
} from "@/lib/seo/structured-data";
import { Building, Clock, MapPin, Phone, Users } from "lucide-react";
import Link from "next/link";

// Generate static params for all major cities
export async function generateStaticParams() {
  return SEO_KEYWORDS.cities.map((city) => ({
    city: city,
  }));
}

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { city } = await params;
  return generateLocationMetadata(city);
}

export default async function LocationPage({ params }: Props) {
  const { city } = await params;

  const breadcrumbs = [
    { name: "خانه", url: "/" },
    { name: "مکان‌ها", url: "/locations" },
    { name: city, url: `/location/${city}` },
  ];

  const localBusinessSchema = getLocalBusinessSchema({
    city,
  });

  return (
    <>
      <JsonLd data={[localBusinessSchema, getBreadcrumbSchema(breadcrumbs)]} />

      <div
        className="min-h-screen bg-gradient-to-b from-blue-50 to-white"
        dir="rtl"
      >
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-extrabold">
                امداد اضطراری در {city}
              </h1>
            </div>
            <p className="text-xl md:text-2xl max-w-3xl">
              دسترسی سریع به شبکه داوطلبان و سازمان‌های معتبر کمک‌رسانی در{" "}
              {city}
            </p>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/search"
                className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                درخواست کمک فوری
              </Link>
              <Link
                href="/register"
                className="bg-blue-800 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-900 transition-colors border-2 border-white"
              >
                ثبت نام داوطلب
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold text-gray-800">۲۵۰+</div>
                <div className="text-gray-600">داوطلب فعال</div>
              </div>
              <div>
                <Building className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-3xl font-bold text-gray-800">۳۵+</div>
                <div className="text-gray-600">سازمان معتبر</div>
              </div>
              <div>
                <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-3xl font-bold text-gray-800">
                  &lt;۲۴ ساعت
                </div>
                <div className="text-gray-600">زمان پاسخ</div>
              </div>
              <div>
                <Phone className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <div className="text-3xl font-bold text-gray-800">۲۴/۷</div>
                <div className="text-gray-600">پشتیبانی</div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Services Available */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              خدمات اضطراری در {city}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SEO_KEYWORDS.services.persian.map((service, index) => {
                const icons = ["🏥", "⚖️", "🧠", "🍲", "💰", "📚", "🏠", "🚗"];
                return (
                  <div
                    key={service}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                  >
                    <div className="text-4xl mb-4">{icons[index]}</div>
                    <h3 className="text-xl font-bold mb-2">{service}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      دسترسی به داوطلبان و سازمان‌های معتبر {service} در {city}
                    </p>
                    <Link
                      href={`/search?category=${service}&location=${city}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      جستجو کنید ←
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Local Keywords Section - Important for SEO */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              چگونه می‌توانیم به شما در {city} کمک کنیم؟
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                `کمک اضطراری ${city}`,
                `امداد فوری ${city}`,
                `داوطلب در ${city}`,
                `سازمان کمک رسان ${city}`,
                `پزشک داوطلب ${city}`,
                `وکیل داوطلب ${city}`,
                `مشاور روانی ${city}`,
                `کمک غذایی ${city}`,
              ].map((keyword) => (
                <div
                  key={keyword}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <Link
                    href={`/search?q=${keyword}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {keyword}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Get Help in This City */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              نحوه دریافت کمک در {city}
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">
                  ۱. نوع کمک را مشخص کنید
                </h3>
                <p className="text-blue-50">
                  از بین خدمات مختلف اضطراری، نوع کمک مورد نیاز خود را انتخاب
                  کنید
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">
                  ۲. موقعیت خود در {city} را مشخص کنید
                </h3>
                <p className="text-green-50">
                  آدرس دقیق یا محله خود را وارد کنید تا نزدیک‌ترین داوطلبان به
                  شما معرفی شوند
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">
                  ۳. با داوطلب ارتباط بگیرید
                </h3>
                <p className="text-purple-50">
                  داوطلبان معتبر {city} با شما تماس می‌گیرند و کمک لازم را ارائه
                  می‌کنند
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/search"
                className="inline-block bg-red-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-red-700 transition-colors shadow-lg"
              >
                شروع جستجو در {city}
              </Link>
            </div>
          </div>
        </section>

        {/* Volunteer in This City */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              در {city} ساکن هستید؟
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              با پیوستن به شبکه داوطلبان رهنورد، به همشهریان خود در {city} کمک
              کنید
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-xl"
            >
              <Users className="w-6 h-6" />
              ثبت نام داوطلب در {city}
            </Link>
          </div>
        </section>

        {/* Other Cities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              سایر شهرهای تحت پوشش
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {SEO_KEYWORDS.cities
                .filter((c) => c !== city)
                .map((otherCity) => (
                  <Link
                    key={otherCity}
                    href={`/location/${otherCity}`}
                    className="bg-white p-4 rounded-lg text-center hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
                  >
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <span className="font-medium">{otherCity}</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Local FAQ */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              سوالات متداول درباره خدمات رهنورد در {city}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-bold text-lg cursor-pointer">
                  آیا خدمات رهنورد در تمام مناطق {city} در دسترس است؟
                </summary>
                <p className="mt-4 text-gray-600">
                  بله، ما تلاش می‌کنیم شبکه داوطلبان را در تمام مناطق {city}{" "}
                  گسترش دهیم. با افزایش تعداد داوطلبان، پوشش بهتری خواهیم داشت.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-bold text-lg cursor-pointer">
                  چقدر طول می‌کشد تا در {city} کمک دریافت کنم؟
                </summary>
                <p className="mt-4 text-gray-600">
                  متوسط زمان پاسخ در {city} کمتر از ۲۴ ساعت است. در مواردی که
                  داوطلب در نزدیکی شما باشد، ممکن است سریع‌تر پاسخ دریافت کنید.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-bold text-lg cursor-pointer">
                  چگونه می‌توانم داوطلب معتبر در {city} شوم؟
                </summary>
                <p className="mt-4 text-gray-600">
                  با ثبت نام در رهنورد و ارسال مدارک هویتی و تخصصی خود،
                  می‌توانید عضو شبکه داوطلبان معتبر {city} شوید.
                </p>
              </details>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
