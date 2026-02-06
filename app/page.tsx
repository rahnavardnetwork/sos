import CategoryScroll from "@/components/general/CategoryScroll";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { getServiceSchema, JsonLd } from "@/lib/seo/structured-data";
import Link from "next/link";

export const metadata = generateSEOMetadata();

export default function HomePage() {
  const serviceSchema = getServiceSchema({
    name: "شبکه کمک‌رسانی اضطراری رهنورد",
    description:
      "دسترسی سریع به داوطلبان معتبر و سازمان‌های امداد برای کمک پزشکی، حقوقی، مالی و روانی",
    serviceType: "Emergency Aid Network",
  });

  return (
    <>
      <JsonLd data={serviceSchema} />
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Hero Section with SOS Button */}
          <div className="text-center mb-4" dir="rtl">
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 mt-6 mb-4">
              ما شما را به همه متصل میکنیم
            </h1>

            {/* SOS Button */}
            <div className="flex justify-center mb-4">
              <Link
                href="/get-help"
                className="relative w-45 h-45 rounded-full bg-linear-to-br from-red-500 to-red-600 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-white text-2xl font-bold mb-2">
                    امداد فوری
                  </span>
                  <span className="text-white text-6xl font-black tracking-wider">
                    SOS
                  </span>
                </div>
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:opacity-30 animate-ping"></div>
              </Link>
            </div>

            {/* Description Text */}
            <p
              className="text-gray-700 text-justify text-sm md:text-lg leading-relaxed max-w-3xl mx-auto mb-4 px-4"
              dir="rtl"
            >
              رهنورد، با هدف ایجاد پل ارتباطی بین افرادی که نیاز به کمک دارند و
              داوطلبانی که می‌خواهند کمک کنند، ایجاد شده است.
            </p>
          </div>

          {/* Categories Section */}
          <CategoryScroll />
        </div>
      </div>
    </>
  );
}
