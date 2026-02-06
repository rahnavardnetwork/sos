import React from "react";

interface CategoryCardProps {
  id: string;
  name: string;
  isSelected?: boolean;
  onClick: (id: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  isSelected = false,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`
        w-full px-6 py-4 rounded-2xl text-right transition-all
        ${
          isSelected
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-white text-gray-800 hover:bg-gray-50"
        }
        text-lg font-medium border-0 cursor-pointer
      `}
    >
      {name}
    </button>
  );
};
