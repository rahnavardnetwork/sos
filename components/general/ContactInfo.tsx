export default function ContactInfo() {
  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ارتباط با ما</h2>
        <p className="text-gray-600">
          برای دریافت اطلاعات بیشتر و پشتیبانی با ما در تماس باشید
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <a
          href="https://t.me/rahnavard_support"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-linear-to-br from-blue-50 to-white p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                تلگرام
              </h3>
              <p className="text-sm text-gray-600">پشتیبانی سریع ۲۴ ساعته</p>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>

        <a
          href="https://instagram.com/rahnavard"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-linear-to-br from-pink-50 to-white p-6 rounded-xl border border-gray-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                اینستاگرام
              </h3>
              <p className="text-sm text-gray-600">اخبار و به‌روزرسانی‌ها</p>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-pink-500/0 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      </div>
    </section>
  );
}
