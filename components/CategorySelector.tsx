import React, { useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  onNext: (selectedCategoryId: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  onNext,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      // Ensure data is an array
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
  };

  const handleNext = () => {
    if (selectedCategory) {
      onNext(selectedCategory);
    }
  };

  if (loading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  return (
    <div
      className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 p-6"
      dir="rtl"
    >
      <div className="max-w-md mx-auto">
        <div className="space-y-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              isSelected={selectedCategory === category.id}
              onClick={handleCategoryClick}
            />
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-8">
            <button
              onClick={handleNext}
              className="w-full bg-blue-500 text-white py-4 rounded-2xl text-lg font-medium hover:bg-blue-600 transition-colors"
            >
              مرحله بعد
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
