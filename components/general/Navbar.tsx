"use client";

import { Home, Mail, PlusCircle, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavTab = "home" | "register" | "verification" | "contact";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NavTab>("home");

  // بروز رسانی activeTab بر اساس pathname
  useEffect(() => {
    if (pathname === "/" || pathname === "/home") {
      setActiveTab("home");
    } else if (pathname.includes("/register")) {
      setActiveTab("register");
    } else if (pathname.includes("/search")) {
      setActiveTab("verification");
    } else if (pathname.includes("/contact")) {
      setActiveTab("contact");
    }
  }, [pathname]);

  // مسیرها برای navbar
  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);

    // ناوبری بر اساس تب انتخاب شده
    switch (tab) {
      case "home":
        router.push("/");
        break;
      case "register":
        router.push("/register");
        break;
      case "verification":
        router.push("/search");
        break;
      case "contact":
        router.push("/contact");
        break;
    }
  };

  const menuItems = [
    {
      id: "home",
      label: "خانه",
      icon: Home,
    },
    {
      id: "verification",
      label: "جستجو",
      icon: Search,
    },
    {
      id: "register",
      label: "ثبت",
      icon: PlusCircle,
    },
    {
      id: "contact",
      label: "ارتباط",
      icon: Mail,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-around">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id as NavTab)}
                className="flex-1 flex flex-col items-center justify-center py-4 px-2 relative group transition-colors duration-200"
              >
                {/* Red indicator above active item */}
                {activeTab === item.id && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-red-600 rounded-b-lg"></div>
                )}

                {/* Icon */}
                <Icon
                  className={`w-6 h-6 transition-colors duration-200 ${
                    activeTab === item.id
                      ? "text-[var(--second)]"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                />

                {/* Label */}
                <span
                  className={`text-xs font-medium mt-2 transition-colors duration-200 ${
                    activeTab === item.id
                      ? "text-[var(--second)]"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
