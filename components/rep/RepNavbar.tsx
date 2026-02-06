"use client";

import { useRouter } from "next/navigation";

interface NavbarProps {
  activeTab: "home" | "register" | "verification" | "contact";
  onTabChange: (tab: "home" | "register" | "verification" | "contact") => void;
}

export default function RepNavbar({ activeTab, onTabChange }: NavbarProps) {
  const router = useRouter();

  const menuItems = [
    {
      id: "home",
      label: "خانه",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4"
          />
        </svg>
      ),
    },
    {
      id: "register",
      label: "ثبت",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m0 0h6m0-6h-6m0 0H6"
          />
        </svg>
      ),
    },
    {
      id: "verification",
      label: "جستجو",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      id: "contact",
      label: "ارتباط",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-around">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as any)}
              className="flex-1 flex flex-col items-center justify-center py-4 px-2 relative group transition-colors duration-200"
            >
              {/* Red indicator above active item */}
              {activeTab === item.id && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-red-600 rounded-b-lg"></div>
              )}

              {/* Icon */}
              <div
                className={`transition-colors duration-200 ${
                  activeTab === item.id
                    ? "text-red-600"
                    : "text-gray-600 group-hover:text-gray-900"
                }`}
              >
                {item.icon}
              </div>

              {/* Label */}
              <span
                className={`text-xs font-medium mt-2 transition-colors duration-200 ${
                  activeTab === item.id
                    ? "text-red-600"
                    : "text-gray-600 group-hover:text-gray-900"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
