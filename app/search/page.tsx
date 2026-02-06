"use client";

import { CategoryCard } from "@/components/CategoryCard";
import { LocationSelector } from "@/components/LocationSelector";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  name_english: string;
  sort: number;
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "1";

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Get selected category from sessionStorage for step 2
    if (step === "2") {
      const categoryData = sessionStorage.getItem("selectedCategory");
      if (categoryData) {
        setSelectedCategory(JSON.parse(categoryData));
      }
    }
  }, [step]);

  const handleCategorySelect = (categoryId: string) => {
    const category = categories.find((cat) => cat.id.toString() === categoryId);
    if (category) {
      sessionStorage.setItem(
        "selectedCategory",
        JSON.stringify({ id: category.id, name: category.name }),
      );
      router.push("/search?step=2");
    }
  };

  const handleLocationNext = (locationData: {
    province?: string;
    isOnline: boolean;
    isOutOfIran: boolean;
  }) => {
    const params = new URLSearchParams();
    if (selectedCategory) {
      params.set("categoryId", selectedCategory.id.toString());
    }
    if (locationData.province) {
      params.set("province", locationData.province);
    }
    if (locationData.isOnline) {
      params.set("isOnline", "true");
    }
    if (locationData.isOutOfIran) {
      params.set("isOutOfIran", "true");
    }

    router.push(`/search/results?${params.toString()}`);
  };

  const handleBack = () => {
    if (step === "2") {
      router.push("/search?step=1");
    } else {
      router.push("/");
    }
  };

  // Step 1: Category Selection
  if (step === "1") {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-blue-50 to-blue-100">
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      );
    }

    return (
      <div
        className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 p-6"
        dir="rtl"
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 text-blue-600 flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            بازگشت
          </button>

          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            انتخاب دسته‌بندی خدمات
          </h1>
          <p className="text-gray-600 mb-8">
            لطفاً دسته‌بندی مورد نیاز خود را انتخاب کنید
          </p>

          <div className="space-y-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id.toString()}
                name={category.name}
                onClick={handleCategorySelect}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Location Selection
  if (step === "2") {
    if (!selectedCategory) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      );
    }

    return (
      <div>
        <LocationSelector onNext={handleLocationNext} onBack={handleBack} />
      </div>
    );
  }

  return null;
}
