import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import {
  getBreadcrumbSchema,
  getOrganizationSchema,
  JsonLd,
} from "@/lib/seo/structured-data";

export const metadata = generateSEOMetadata({
  title: "درباره رهنورد - داستان ما، ماموریت و تیم",
  description:
    "رهنورد یک پلتفرم مستقل و داوطلبانه برای تسهیل دسترسی شهروندان به امدادرسانان در لحظات بحرانی. احراز هویت دقیق، امنیت بالا و پشتیبانی ۲۴ساعته.",
  keywords: [
    "درباره رهنورد",
    "شبکه امداد",
    "داوطلبان معتبر",
    "کمک اضطراری",
    "احراز هویت",
  ],
});

export default function AboutPage() {
  const breadcrumbs = [
    { name: "خانه", url: "/" },
    { name: "درباره ما", url: "/about" },
  ];

  return (
    <>
      <JsonLd
        data={[getOrganizationSchema(), getBreadcrumbSchema(breadcrumbs)]}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl" dir="rtl">
        <h1 className="text-3xl font-bold mb-6">
          درباره رهنورد: پلی برای نجات، مسیری برای همبستگی
        </h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-lg leading-relaxed">
            رهنورد یک پلتفرم مستقل و داوطلبانه است که با یک هدف واحد شکل گرفته:
            تسهیل و تسریع دسترسی شهروندان به امدادرسانان در لحظات بحرانی.
          </p>

          <p className="text-lg leading-relaxed">
            در روزهایی که زمان، تعیین‌کننده مرز میان حادثه و سلامت است، ما شکاف
            میان «نیاز فوری» و «امداد در دسترس» را پر می‌کنیم. رهنورد شبکه‌ای از
            افراد، گروه‌ها و سازمان‌های خودجوش را که در مقیاس‌های کوچک و بزرگ
            سازماندهی شده‌اند، به کسانی که امدادجو یاری هستند متصل می‌کند.
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">ما چه می‌کنیم؟</h2>
            <p className="text-lg leading-relaxed">
              ما امدادرسان نیستیم، اما مسیر رسیدن به امداد را هموار می‌کنیم.
              رهنورد فهرستی راستی‌آزمایی شده از درگاه‌های عمومی امدادرسانی را
              ارائه می‌دهد تا هر شهروند در کوتاه‌ترین زمان ممکن، نزدیک‌ترین و
              معتبرترین منبع کمک را پیدا کند.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              امنیت و اعتماد؛ اولویت اول ما
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              در دنیای رهنورد، اعتماد اتفاقی نیست. برای اطمینان از سلامت خدمات و
              کاهش خطای انسانی:
            </p>

            <div className="space-y-4 mr-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">تیم نظارت:</h3>
                <p className="text-lg leading-relaxed">
                  گروهی متشکل از بیش از ۲۰ متخصص و داوطلب، سوابق و فعالیت‌های هر
                  ارائه‌دهنده خدمت را به دقت بررسی می‌کنند.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  ترکیب هوش انسانی و مصنوعی:
                </h3>
                <p className="text-lg leading-relaxed">
                  ما برای تایید صلاحیت‌ها، از پروتکل‌های ترکیبی
                  (Human-in-the-loop AI) استفاده می‌کنیم تا با بهره‌گیری از دقت
                  هوش مصنوعی و تجربه هوش انسانی، ضریب خطا را به حداقل برسانیم.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">شفافیت:</h3>
                <p className="text-lg leading-relaxed">
                  تنها درخواست‌هایی در سامانه پذیرفته می‌شوند که فرآیند
                  سخت‌گیرانه راستی‌آزمایی ما را پشت سر گذاشته باشند.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">برخاسته از بطن جامعه</h2>
            <p className="text-lg leading-relaxed">
              تمام اعضای تیم رهنورد به صورت صد در صد داوطلبانه (Voluntary) و با
              انگیزه‌ای خالصانه برای خدمت به شهروندان ایرانی فعالیت می‌کنند. ما
              هیچ نفع مادی در این پروسه نداریم و تنها پاداش ما، کاهش زمان انتظار
              برای فردی است که به کمک نیاز دارد.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">به ما بپیوندید</h2>
            <p className="text-lg leading-relaxed">
              آغوش جامعه داوطلبانه رهنورد برای هرگونه همیاری، همکاری و تخصص جدید
              باز است. اگر معتقدید می‌توانید در این مسیر باری از دوش هم‌وطنانمان
              بردارید، ما منتظر شما هستیم.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-gray-200 text-center">
            <p className="text-xl font-semibold text-primary">
              رهنورد؛ همراه شما در مسیر یاری.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
