import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export default function CategoryCard({
  name,
  icon: Icon,
  onClick,
}: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="shrink-0 w-40 h-40 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer snap-start flex flex-col items-center justify-between p-6"
    >
      <div className="flex-1 flex items-center justify-center">
        <Icon className="w-16 h-16 text-indigo-600" />
      </div>
      <h3 className="text-sm font-semibold text-gray-800 text-center leading-tight">
        {name}
      </h3>
    </div>
  );
}
