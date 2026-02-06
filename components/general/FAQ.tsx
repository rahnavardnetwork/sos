"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "رهنورد دقیقاً چه خدماتی ارائه می‌دهد؟",
    answer:
      "رهنورد یک «پل ارتباطی» است. ما فهرستی از افراد و گروه‌های داوطلب را که خدمات امدادی فوری (پزشکی، اسکان، مشاوره و غیره) ارائه می‌دهند، جمع‌آوری و راستی‌آزمایی کرده‌ایم تا شما در زمان بحران، به جای جست‌وجوی بی‌هدف، مستقیماً به معتبرترین منبع متصل شوید.",
  },
  {
    question: "آیا رهنورد خودش تیم امدادی به محل اعزام می‌کند؟",
    answer:
      "خیر. رهنورد یک ابزار دیجیتال برای مسیریابی امدادی است. ما تیم عملیاتی نداریم، بلکه شما را به گروه‌هایی وصل می‌کنیم که آمادگی خود را برای کمک اعلام کرده‌اند و توسط ما تایید شده‌اند.",
  },
  {
    question: "فرآیند راستی‌آزمایی (Verification) چگونه انجام می‌شود؟",
    answer:
      "تیم داوطلبان ما (بیش از ۲۰ نفر) با بررسی سوابق میدانی، تاییدات مردمی و استفاده از الگوریتم‌های هوش مصنوعی، هویت و عملکرد ارائه‎‌دهندگان را بررسی می‌کنند. تنها در صورت احراز صلاحیت و اطمینان از «امن بودن»، نام آن‌ها در اپلیکیشن نمایش داده می‌شود.",
  },
  {
    question: "آیا استفاده از رهنورد هزینه‌ای دارد؟",
    answer:
      "خیر. تمام خدمات رهنورد و تمامی گروه‌هایی که در این پلتفرم معرفی می‌شوند، به صورت داوطلبانه و رایگان (یا با هزینه‌های عام‌المنفعه اعلام شده) فعالیت می‌کنند.",
  },
  {
    question: "امنیت اطلاعات من چگونه حفظ می‌شود؟",
    answer:
      "رهنورد با رعایت حداکثر استانداردهای امنیتی طراحی شده است. ما تا جای ممکن از ذخیره‌سازی داده‌های حساس کاربران خودداری می‌کنیم و هدف ما صرفاً ایجاد اتصال سریع بین شما و امدادرسان است.",
  },
  {
    question: "اگر در لیست امدادرسانان متوجه مورد مشکوکی شدم چه کنم؟",
    answer:
      "امنیت شبکه ما به گزارش‌های شما وابسته است. در کنار نام هر امدادرسان، گزینه‌ای برای «گزارش تخلف یا خطا» وجود دارد. تیم ما بلافاصله گزارش‌ها را بررسی و در صورت لزوم، دسترسی آن واحد را مسدود می‌کند.",
  },
  {
    question: "چگونه می‌توانم به عنوان امدادرسان یا داوطلب به رهنورد بپیوندم؟",
    answer:
      "ما همواره به دنبال گسترش شبکه یاری هستیم. از طریق بخش «همکاری با ما» می‌توانید درخواست خود را ارسال کنید. پس از طی مراحل راستی‌آزمایی توسط تیم فنی و انسانی ما، به لیست اضافه خواهید شد.",
  },
  {
    question: "رهنورد در قبال کیفیت خدمات امدادرسانان چه مسئولیتی دارد؟",
    answer:
      "رهنورد تمام تلاش خود را برای تایید صلاحیت ارائه‌دهندگان به کار می‌بندد؛ اما با توجه به ماهیت داوطلبانه و بحرانی شرایط، مسئولیت نهایی خدمات بر عهده گروه‌های ارائه‌دهنده است و رهنورد به عنوان یک تسهیل‌گر عمل می‌کند.",
  },
];

function FAQAccordionItem({
  item,
  isOpen,
  onClick,
}: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 text-right bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
      >
        <span className="text-lg font-semibold text-gray-800">
          {item.question}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 bg-gray-50 text-gray-700 text-base leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(faqData.length - 1);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">
        سوالات متداول (FAQ)
      </h2>
      <div className="space-y-2">
        {faqData.map((item, index) => (
          <FAQAccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
