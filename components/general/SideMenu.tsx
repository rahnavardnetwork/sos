"use client";

import {
  BookOpen,
  Home,
  Mail,
  PlusCircle,
  Search,
  Users,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  const menuItems = [
    {
      path: "/",
      label: "خانه",
      icon: Home,
      description: "صفحه اصلی",
    },
    {
      path: "/search",
      label: "جستجو",
      icon: Search,
      description: "جستجوی داوطلبان",
    },
    {
      path: "/register",
      label: "ثبت نام",
      icon: PlusCircle,
      description: "ثبت نام داوطلب جدید",
    },
    {
      path: "/about",
      label: "درباره ما",
      icon: Users,
      description: "آشنایی با رهنورد",
    },
    {
      path: "/blog",
      label: "وبلاگ",
      icon: BookOpen,
      description: "مقالات و راهنماها",
    },
    {
      path: "/contact",
      label: "تماس با ما",
      icon: Mail,
      description: "راه‌های ارتباطی",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[var(--second)] to-blue-700">
          <h2 className="text-xl font-bold text-white">منوی اصلی</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="بستن منو"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col p-4 space-y-2 overflow-y-auto h-[calc(100%-88px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-[var(--second)] text-white shadow-lg"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {/* Icon */}
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white/20"
                      : "bg-gray-200 group-hover:bg-[var(--second)]/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-white" : "text-[var(--second)]"
                    }`}
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col items-start flex-1">
                  <span className="font-semibold text-base">{item.label}</span>
                  <span
                    className={`text-xs ${
                      isActive ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {item.description}
                  </span>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="w-1 h-8 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
