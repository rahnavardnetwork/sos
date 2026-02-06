"use client";

import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface NavbarFormProps {
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isLastStep: boolean;
  isSubmitting?: boolean;
}

export default function NavbarForm({
  onNext,
  onBack,
  canGoBack,
  canGoNext,
  isLastStep,
  isSubmitting = false,
}: NavbarFormProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Next Button (Right side in RTL) */}
          <div className="flex-1 flex justify-start">
            {canGoNext && (
              <button
                onClick={onNext}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
              >
                <span>بعدی</span>
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {isLastStep && (
              <button
                onClick={onNext}
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-semibold ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>در حال ارسال...</span>
                  </>
                ) : (
                  <span>ثبت نهایی</span>
                )}
              </button>
            )}
          </div>

          {/* Home Icon (Center) */}
          <div className="shrink-0">
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            >
              <Home className="w-5 h-5 text-gray-700" />
            </Link>
          </div>

          {/* Previous Button (Left side in RTL) */}
          <div className="flex-1 flex justify-end">
            {canGoBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold"
              >
                <ChevronRight className="w-5 h-5" />
                <span>قبلی</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
