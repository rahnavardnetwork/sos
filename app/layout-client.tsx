"use client";

import Header from "@/components/general/Header";
import Navbar from "@/components/general/Navbar";
import { usePathname } from "next/navigation";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // تعیین نوع صفحه
  const isRepPage = pathname.includes("/rep");
  const isAuthPage =
    pathname.includes("/login") ||
    pathname.includes("/signup") ||
    pathname.includes("/forgot-password");
  const isProviderFormPage =
    pathname === "/providerform" || pathname === "/register";

  // نمایش Header و Navbar فقط در صفحات عمومی (نه در صفحات فرم)
  const showHeaderAndNavbar = !isAuthPage && !isRepPage && !isProviderFormPage;

  return (
    <>
      {/* Header - فقط در صفحات عمومی */}
      {showHeaderAndNavbar && <Header />}

      {/* Navbar - فقط در صفحات عمومی */}
      {showHeaderAndNavbar && <Navbar />}

      {/* محتوای صفحه */}
      <main className={showHeaderAndNavbar ? "pb-32" : ""}>{children}</main>
    </>
  );
}
