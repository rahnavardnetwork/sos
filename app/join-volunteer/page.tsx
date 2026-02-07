import { SEO_KEYWORDS } from "@/lib/seo/keywords";
import { generateVolunteerMetadata } from "@/lib/seo/metadata";
import {
  getBreadcrumbSchema,
  getServiceSchema,
  JsonLd,
} from "@/lib/seo/structured-data";
import {
  Award,
  CheckCircle2,
  Clock,
  Globe,
  Heart,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateVolunteerMetadata();

export default function VolunteerPage() {
  const breadcrumbs = [
    { name: "خانه", url: "/" },
    { name: "ثبت نام داوطلبان", url: "/join-volunteer" },
  ];

  const serviceSchema = getServiceSchema({
    name: "ثبت نام داوطلبان معتبر",
    description:
      "پیوستن به شبکه داوطلبان رهنورد با فرآیند احراز هویت امن و شفاف",
    serviceType: "Volunteer Registration Service",
  });

  return (
    <>
      <JsonLd data={[serviceSchema, getBreadcrumbSchema(breadcrumbs)]} />

      <div
        className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50"
        dir="rtl"
      >
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                تغییری واقعی در جامعه ایجاد کنید
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                با پیوستن به رهنورد، عضو شبکه معتبر داوطلبان ایران شوید و به
                افراد امدادجو کمک کنید
              </p>

              {/* CTA Button */}
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-2xl"
              >
                <Users className="w-6 h-6" />
                ثبت نام داوطلب
              </Link>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div>
                  <div className="text-4xl font-bold mb-2">۵,۰۰۰+</div>
                  <div className="text-blue-200">داوطلب فعال</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">۲۰,۰۰۰+</div>
                  <div className="text-blue-200">کمک انجام شده</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">۵۰+</div>
                  <div className="text-blue-200">شهر</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              چرا به رهنورد بپیوندم؟
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">تاثیر واقعی</h3>
                <p className="text-gray-600">
                  به طور مستقیم زندگی افراد امدادجو را تغییر دهید و تاثیر مثبت
                  بگذارید
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">پلتفرم معتبر</h3>
                <p className="text-gray-600">
                  با احراز هویت کامل، بخشی از شبکه معتبر و امن داوطلبان شوید
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-purple-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">انعطاف‌پذیری</h3>
                <p className="text-gray-600">
                  زمان و نوع فعالیت خود را انتخاب کنید، هر چقدر که می‌توانید کمک
                  کنید
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-orange-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">رشد شخصی</h3>
                <p className="text-gray-600">
                  مهارت‌های جدید یاد بگیرید و تجربیات ارزشمند کسب کنید
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              حوزه‌های داوطلبی
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "خدمات پزشکی",
                  desc: "پزشکان، پرستاران و متخصصان بهداشت",
                  icon: "🏥",
                  keywords: SEO_KEYWORDS.services.persian[0],
                },
                {
                  title: "مشاوره حقوقی",
                  desc: "وکلا و کارشناسان حقوقی",
                  icon: "⚖️",
                  keywords: SEO_KEYWORDS.services.persian[1],
                },
                {
                  title: "مشاوره روانشناسی",
                  desc: "روانشناسان و مشاوران",
                  icon: "🧠",
                  keywords: SEO_KEYWORDS.services.persian[2],
                },
                {
                  title: "توزیع غذا",
                  desc: "کمک در تهیه و توزیع غذا",
                  icon: "🍲",
                  keywords: SEO_KEYWORDS.services.persian[3],
                },
                {
                  title: "کمک مالی",
                  desc: "حمایت مالی و مدیریت کمک‌ها",
                  icon: "💰",
                  keywords: SEO_KEYWORDS.services.persian[4],
                },
                {
                  title: "آموزش",
                  desc: "معلمان و اساتید داوطلب",
                  icon: "📚",
                  keywords: SEO_KEYWORDS.services.persian[5],
                },
              ].map((category) => (
                <div
                  key={category.title}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-blue-300"
                >
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-3">{category.desc}</p>
                  <span className="text-xs text-blue-600 font-medium">
                    {category.keywords}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Process */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              فرآیند ثبت نام و احراز هویت
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ۱
                </div>
                <h3 className="text-xl font-bold mb-3">ثبت نام اولیه</h3>
                <p className="text-gray-600">
                  فرم ثبت نام را پر کنید و اطلاعات پایه خود را وارد نمایید
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ۲
                </div>
                <h3 className="text-xl font-bold mb-3">احراز هویت</h3>
                <p className="text-gray-600">
                  مدارک هویتی و تخصصی خود را برای بررسی ارسال کنید
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ۳
                </div>
                <h3 className="text-xl font-bold mb-3">بررسی مدارک</h3>
                <p className="text-gray-600">
                  تیم ما مدارک شما را با دقت بررسی و تایید می‌کند
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold mb-3">شروع فعالیت</h3>
                <p className="text-gray-600">
                  پروفایل شما فعال می‌شود و می‌توانید شروع به کمک کنید
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl mt-12 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    مدت زمان فرآیند احراز هویت
                  </h3>
                  <p className="text-gray-700">
                    معمولاً ۲ تا ۵ روز کاری طول می‌کشد. در مواردی که نیاز به
                    بررسی بیشتر باشد، با شما تماس خواهیم گرفت.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition-colors shadow-lg"
              >
                شروع ثبت نام
              </Link>
            </div>
          </div>
        </section>

        {/* Verification Standards */}
        <section className="py-16 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              استانداردهای احراز هویت ما
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <Shield className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-3">بررسی اسناد هویتی</h3>
                <p className="text-green-50">
                  تایید هویت واقعی داوطلبان از طریق مدارک معتبر و سیستم‌های
                  تایید هویت دیجیتال
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <Award className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-3">تایید صلاحیت حرفه‌ای</h3>
                <p className="text-green-50">
                  برای داوطلبان تخصصی، تایید مدارک تحصیلی، مجوزهای حرفه‌ای و
                  سوابق کاری
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <TrendingUp className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  نظام رتبه‌بندی و بازخورد
                </h3>
                <p className="text-green-50">
                  سیستم امتیازدهی و نظرات کمک‌گیرندگان برای حفظ کیفیت بالای
                  خدمات
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              مزایای داوطلب معتبر رهنورد
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "نشان معتبر",
                  desc: "دریافت نشان تایید رسمی رهنورد در پروفایل شما",
                },
                {
                  title: "شبکه حرفه‌ای",
                  desc: "اتصال با سایر داوطلبان و سازمان‌های معتبر",
                },
                {
                  title: "آموزش رایگان",
                  desc: "دسترسی به دوره‌های آموزشی و ارتقای مهارت",
                },
                {
                  title: "پشتیبانی دائمی",
                  desc: "تیم پشتیبانی همیشه در کنار شماست",
                },
                {
                  title: "گواهینامه فعالیت",
                  desc: "دریافت گواهی برای فعالیت‌های داوطلبانه",
                },
                {
                  title: "اولویت در خدمات",
                  desc: "دسترسی اولویت‌دار به امکانات ویژه پلتفرم",
                },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              داستان داوطلبان ما
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-4xl mb-4">👨‍⚕️</div>
                <p className="text-gray-600 mb-4 italic">
                  "به عنوان یک پزشک، رهنورد به من این امکان را داد که به افراد
                  بیشتری کمک کنم. احساس رضایت بی‌نظیری دارم."
                </p>
                <p className="font-bold">دکتر علی محمدی</p>
                <p className="text-sm text-gray-500">پزشک عمومی - تهران</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-4xl mb-4">👩‍🏫</div>
                <p className="text-gray-600 mb-4 italic">
                  "تدریس رایگان به دانش‌آموزان امدادجو، یکی از بهترین تجربیات
                  زندگی من بوده است."
                </p>
                <p className="font-bold">خانم سارا احمدی</p>
                <p className="text-sm text-gray-500">معلم ریاضی - اصفهان</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-4xl mb-4">👨‍💼</div>
                <p className="text-gray-600 mb-4 italic">
                  "مشاوره حقوقی رایگان به افراد امدادجو، به من کمک کرد تا تاثیر
                  واقعی در جامعه بگذارم."
                </p>
                <p className="font-bold">آقای رضا کریمی</p>
                <p className="text-sm text-gray-500">وکیل دادگستری - شیراز</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              سوالات متداول داوطلبان
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-bold text-lg cursor-pointer">
                  چه مدارکی برای ثبت نام نیاز است؟
                </summary>
                <p className="mt-4 text-gray-600">
                  مدارک هویتی معتبر (کارت ملی)، مدارک تحصیلی (در صورت داوطلبی
                  تخصصی) و مجوزهای حرفه‌ای مرتبط.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-bold text-lg cursor-pointer">
                  آیا می‌توانم به صورت پاره‌وقت فعالیت کنم؟
                </summary>
                <p className="mt-4 text-gray-600">
                  بله، شما می‌توانید زمان و میزان فعالیت خود را کاملاً خودتان
                  مشخص کنید.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-bold text-lg cursor-pointer">
                  فرآیند احراز هویت چقدر طول می‌کشد؟
                </summary>
                <p className="mt-4 text-gray-600">
                  معمولاً بین ۲ تا ۵ روز کاری. در صورت نیاز به بررسی بیشتر، با
                  شما تماس خواهیم گرفت.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <Globe className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              آماده‌اید تغییری ایجاد کنید؟
            </h2>
            <p className="text-xl mb-8">
              به شبکه معتبر داوطلبان رهنورد بپیوندید و تاثیر واقعی بگذارید
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-2xl"
            >
              <Users className="w-6 h-6" />
              ثبت نام همین الان
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
