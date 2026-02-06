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
              رهنورد، پلت‌فرم جامع برای یاری‌رسانی شهروندان ایرانی
            </h1>
            <p className="text-sm  pr-2 leading-relaxed bg-(--second) text-white p-2 rounded-sm">
              این بخش برای نت‌های ادمین است
            </p>
          </div>

          {/* Logo Icon */}
          <div className="shrink-0">
            <Image
              src="/images/logo.webp"
              alt="راه‌نورد لوگو"
              width={96}
              height={96}
              className="rounded-full shadow-lg border-2 border-white"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
