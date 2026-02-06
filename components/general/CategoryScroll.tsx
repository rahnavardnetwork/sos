"use client";

import {
  AlertCircle,
  Apple,
  Brain,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  Lock,
  MapPin,
  Package,
  Pill,
  Radio,
  Scale,
  Search,
  Shield,
  Stethoscope,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CategoryCard from "./CategoryCard";

// Icon mapping - map category names to icons
const iconMap: Record<string, any> = {
  "دارو و نسخه": Pill,
  "کمک پزشکی الفوری": AlertCircle,
  "مشاوره پزشکی": Stethoscope,
  "سلامت روان و روان‌شناسی": Brain,
  "حمایت حقوقی": Scale,
  "پناهگاه و اسکان امن": Home,
  "حمل‌ونقل و انتقال امن": Truck,
  "کمک مالی اضطراری": Wallet,
  "جایجایی اضطراری": MapPin,
  "اطلاعات و راستی‌آزمایی": Search,
  "حمایت از افراد آسیب‌پذیر": Heart,
  "حمایت از خانواده‌های آسیب‌دیده": Users,
  "رسانه / تلویزیون مردم": Radio,
  "ارسال کالا به ایران": Package,
  "غذا و اقلام ضروری": Apple,
  "ارتباطات امن": Lock,
  "امنیت دیجیتال": Shield,
};

interface Category {
  id: number;
  name: string;
  name_english: string;
  sort: number;
}

export default function CategoryScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();

        // Check if data is array
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Categories data is not an array:", data);
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    // Store selected category in sessionStorage or pass via URL
    sessionStorage.setItem(
      "selectedCategory",
      JSON.stringify({ id: categoryId, name: categoryName }),
    );
    // Redirect to search page with step 2
    router.push("/search?step=2");
  };

  if (loading) {
    return (
      <div className="w-full bg-transparent py-2" dir="rtl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="min-w-[140px] h-24 bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-transparent py-2" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Container with scroll */}
        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory touch-pan-x"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                icon={iconMap[category.name] || Package}
                onClick={() => handleCategoryClick(category.id, category.name)}
              />
            ))}
          </div>

          {/* Scroll Buttons - Desktop Only */}
          {isDesktop && (
            <>
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 -right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition"
                aria-label="اسکرول به راست"
              >
                <ChevronRight className="w-6 h-6 text-indigo-600" />
              </button>

              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -left-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition"
                aria-label="اسکرول به چپ"
              >
                <ChevronLeft className="w-6 h-6 text-indigo-600" />
              </button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
