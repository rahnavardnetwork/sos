"use client";

import { useState } from "react";

interface ReviewFormProps {
  providerId: string;
  reviews: any[];
  onSubmit: () => void;
}

export default function ReviewForm({
  providerId,
  reviews,
  onSubmit,
}: ReviewFormProps) {
  const [vote, setVote] = useState<1 | -1 | null>(null);
  const [confidence, setConfidence] = useState(3);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (vote === null) {
      setError("لطفاً یک گزینه انتخاب کنید");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const token = localStorage.getItem("rep_session");
      const response = await fetch("/api/rep/submit-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          providerId,
          vote,
          confidence,
          notes: notes.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "خطایی در ثبت ریویو رخ داد");
      }

      setSuccess(true);
      setVote(null);
      setConfidence(3);
      setNotes("");

      setTimeout(() => {
        onSubmit();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-linear-to-l from-indigo-50 to-blue-50">
        <h3 className="text-lg font-bold text-gray-900">
          نظر خود را بیان کنید
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          تصمیم گیری کنید این ارائه‌دهنده قابل اعتماد است یا نه
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Vote Selection */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            نظر شما
          </label>

          <div className="space-y-2">
            <button
              onClick={() => setVote(1)}
              className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                vote === 1
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white hover:border-green-300"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  vote === 1
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300"
                }`}
              >
                {vote === 1 && <span className="text-white text-sm">✓</span>}
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">قابل اعتماد ✓</p>
                <p className="text-xs text-gray-600">
                  این ارائه‌دهنده قابل اعتماد و معتبر است
                </p>
              </div>
            </button>

            <button
              onClick={() => setVote(-1)}
              className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                vote === -1
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-white hover:border-red-300"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  vote === -1 ? "border-red-500 bg-red-500" : "border-gray-300"
                }`}
              >
                {vote === -1 && <span className="text-white text-sm">✗</span>}
              </div>
              <div className="text-right">
                <p className="font-bold text-red-700">خطرناک ✗</p>
                <p className="text-xs text-gray-600">
                  این ارائه‌دهنده مشکوک و نابود است
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Confidence Slider */}
        {vote !== null && (
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              میزان اطمینان شما ({confidence}/5)
            </label>

            <div className="space-y-3">
              <input
                type="range"
                min="1"
                max="5"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />

              <div className="flex justify-between text-xs text-gray-500">
                <span>خیلی کم اطمینان</span>
                <span>کاملاً مطمئن</span>
              </div>

              <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition ${
                      i <= confidence
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => setConfidence(i)}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        {vote !== null && (
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              یادداشت‌های شما (اختیاری)
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="دلایل نظر خود را شرح دهید (به رپ‌های دیگر نیز نمایش داده می‌شود)"
              maxLength={500}
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
            />

            <div className="text-xs text-gray-500 mt-2 text-left">
              {notes.length}/500
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              ✓ ریویو شما با موفقیت ثبت شد
            </p>
          </div>
        )}
      </div>

      {/* Footer Button */}
      {vote !== null && (
        <div className="p-6 border-t border-gray-200 bg-white">
          <button
            onClick={handleSubmit}
            disabled={isLoading || success}
            className={`w-full py-3 px-4 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
              isLoading || success
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
            }`}
          >
            {isLoading && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            )}
            {success ? "✓ ثبت شد" : isLoading ? "در حال ثبت..." : "ثبت ریویو"}
          </button>
        </div>
      )}
    </div>
  );
}
