"use client";

import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-transparent py-8 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-8">
          {/* Logo and Text */}
          <div className="flex-1">
            <h1 className="text-lg font-extrabold pr-2 text-gray-900 mb-2">
             شبکه کمک‌رسانی اضطراری رهنورد
            </h1>
            <p className="text-sm  pr-2 leading-relaxed bg-(--second) text-white p-2 rounded-sm">
             دسترسی سریع به داوطلبان معتبر
            </p>
          </div>

          {/* Logo Icon */}
            <div className="shrink-0 bg-(--second) p-2 rounded-full">
            <Image
              src="/images/logo.webp"
              alt="راه‌نورد لوگو"
              width={72}
              height={72}
              className="rounded-full shadow-lg border-2 border-white"
              priority
            />
            </div>
        </div>
      </div>
    </div>
  );
}
