"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Provider {
  id: string;
  name: string;
  description_persian: string;
  description_english?: string;
  provider_type: string;
  logo_url: string | null;
  province: string | null;
  city: string | null;
  created_at: string;
  current_review_count: number;
  reviews_needed: number;
  phone?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  telegram?: string | null;
  signal?: string | null;
  social_link?: string;
  online_services?: boolean;
  response_speed?: string;
  badge?: string;
  categories?: string;
  access_type?: string;
}

interface Review {
  id: string;
  rep_name: string;
  rating: number;
  notes: string;
  created_at: string;
}

// Move Toast Component outside and accept onClose prop
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 left-4 px-6 py-3 rounded-lg shadow-lg text-white z-60 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default function RepDashboard() {
  const router = useRouter();
  const [repUser, setRepUser] = useState<any>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    pending: 0,
    reviewed: 0,
    approved: 0,
    rejected: 0,
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("rep_session");
    const user = localStorage.getItem("rep_user");

    console.log("Session:", session);
    console.log("User:", user);

    if (!session || !user) {
      router.push("/rep/login");
      return;
    }

    const userData = JSON.parse(user);
    setRepUser(userData);

    fetchProviders(session);
    fetchStats(session);
  }, [router]);

  const fetchProviders = async (token: string) => {
    try {
      console.log("Fetching providers with token:", token.slice(0, 20) + "...");
      const response = await fetch("/api/rep/pending-providers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Providers response:", data);

      if (data.success) {
        setProviders(data.providers);
      } else {
        console.error("Providers error:", data.message);
        setToastMessage({
          type: "error",
          message: data.message || "خطا در دریافت ارائه‌دهندگان",
        });
      }
    } catch (error) {
      console.error("Error fetching providers:", error);
      setToastMessage({
        type: "error",
        message: "خطا در دریافت ارائه‌دهندگان",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async (token: string) => {
    try {
      const response = await fetch("/api/rep/dashboard-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleReviewClick = (provider: Provider) => {
    setSelectedProvider(provider);
    setRating(0);
    setNotes("");
    fetchProviderReviews(provider.id);
    setShowModal(true);
  };

  const fetchProviderReviews = async (providerId: string) => {
    try {
      const session = localStorage.getItem("rep_session");
      const response = await fetch(`/api/rep/provider-reviews/${providerId}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      if (!response.ok) {
        console.warn(`API returned ${response.status}: ${response.statusText}`);
        setReviews([]);
        return;
      }

      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        console.warn("API did not return JSON");
        setReviews([]);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };

  const handleSubmitReview = async () => {
    if (!selectedProvider || rating === 0) {
      setToastMessage({
        type: "error",
        message: "لطفا امتیاز را انتخاب کنید",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const session = localStorage.getItem("rep_session");
      if (!session) {
        setToastMessage({
          type: "error",
          message: "جلسه کاری منقضی شده است",
        });
        setIsSubmitting(false);
        return;
      }

      const payload = {
        provider_id: selectedProvider.id,
        rating,
        notes: notes.trim(),
      };

      console.log("Submitting review with payload:", JSON.stringify(payload));

      const response = await fetch(`/api/rep/submit-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      const contentType = response.headers.get("content-type");

      console.log("Response status:", response.status);
      console.log("Response text length:", responseText.length);
      console.log("Response text:", responseText);

      if (!response.ok) {
        console.error(
          `API returned ${response.status}: ${response.statusText}`,
        );

        let errorMessage = "خطا در ثبت نظر. لطفا دوباره تلاش کنید.";

        if (responseText && contentType?.includes("application/json")) {
          try {
            const errorData = JSON.parse(responseText);
            console.error("Error details:", errorData);
            errorMessage =
              errorData.message ||
              errorData.error ||
              errorData.details ||
              errorMessage;
          } catch (parseError) {
            console.warn("Could not parse error response as JSON", parseError);
            errorMessage = `خطا ${response.status}: ${response.statusText}`;
          }
        } else {
          errorMessage = `خطا ${response.status}: ${response.statusText}`;
        }

        setToastMessage({
          type: "error",
          message: errorMessage,
        });
        setIsSubmitting(false);
        return;
      }

      if (!contentType?.includes("application/json")) {
        console.error("API did not return JSON, got:", contentType);
        setToastMessage({
          type: "error",
          message: "خطا در ارتباط با سرور",
        });
        setIsSubmitting(false);
        return;
      }

      const data = JSON.parse(responseText);
      console.log("Success response:", data);

      if (data.success) {
        setToastMessage({
          type: "success",
          message: "نظر شما با موفقیت ثبت شد",
        });
        setTimeout(() => {
          handleReviewSubmitted();
        }, 1500);
      } else {
        setToastMessage({
          type: "error",
          message: data.message || "خطا در ثبت نظر",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setToastMessage({
        type: "error",
        message: "خطا در ارسال درخواست. اتصال اینترنت خود را بررسی کنید.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReviewSubmitted = () => {
    const session = localStorage.getItem("rep_session");
    if (session) {
      fetchProviders(session);
      fetchStats(session);
    }
    setShowModal(false);
    setSelectedProvider(null);
    setRating(0);
    setNotes("");
  };

  const handleLogout = () => {
    localStorage.removeItem("rep_session");
    localStorage.removeItem("rep_user");
    router.push("/rep/login");
  };

  if (!repUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Modal Component
  const ProviderReviewModal = ({
    provider,
    onClose,
  }: {
    provider: Provider;
    onClose: () => void;
  }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-lg w-full h-[95vh] max-w-7xl overflow-hidden flex flex-col"
          dir="rtl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              {provider.logo_url ? (
                <img
                  src={provider.logo_url}
                  alt={provider.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-linear-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                  <span className="text-lg font-bold text-indigo-600">
                    {provider.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {provider.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {provider.provider_type === "individual" ? "فردی" : "سازمانی"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-light"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Main Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 border-l border-gray-200">
              {/* Logo and Images Section */}
              {provider.logo_url && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    تصویر ارائه‌دهنده
                  </h3>
                  <img
                    src={provider.logo_url}
                    alt={provider.name}
                    className="w-48 h-48 rounded-lg object-cover border-2 border-gray-200"
                  />
                </div>
              )}

              {/* Categories Section */}
              {provider.categories && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    دسته‌بندی‌ها
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.categories.split(",").map((cat, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                      >
                        {cat.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Provider Details */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  اطلاعات ارائه‌دهنده
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      توضیحات فارسی
                    </p>
                    <p className="text-sm text-gray-900 mt-1 leading-relaxed">
                      {provider.description_persian}
                    </p>
                  </div>

                  {provider.description_english && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        توضیحات انگلیسی
                      </p>
                      <p className="text-sm text-gray-900 mt-1 leading-relaxed">
                        {provider.description_english}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600">استان</p>
                      <p className="text-sm text-gray-900 mt-1">
                        {provider.province || "نامشخص"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">شهر</p>
                      <p className="text-sm text-gray-900 mt-1">
                        {provider.city || "نامشخص"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        سرعت پاسخ
                      </p>
                      <p className="text-sm text-gray-900 mt-1">
                        {provider.response_speed === "asap"
                          ? "فوری"
                          : provider.response_speed === "hour"
                            ? "ظرف چند ساعت"
                            : provider.response_speed === "day"
                              ? "ظرف یک روز"
                              : "طبق برنامه"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        تاریخ ثبت
                      </p>
                      <p className="text-sm text-gray-900 mt-1">
                        {new Date(provider.created_at).toLocaleDateString(
                          "fa-IR",
                        )}
                      </p>
                    </div>
                  </div>

                  {provider.badge && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm font-medium text-amber-900">
                        🏆 {provider.badge}
                      </p>
                    </div>
                  )}

                  {provider.online_services && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        ✓ این ارائه‌دهنده خدمات آنلاین ارائه می‌دهد
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  اطلاعات تماس
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {provider.phone && (
                    <a
                      href={`tel:${provider.phone}`}
                      className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
                    >
                      <svg
                        className="w-5 h-5 text-blue-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.73 1.365a1 1 0 001.006-.2c.55-.584 1.165-1.179 2.077-2.083.904-.904 1.5-1.527 2.083-2.077a1 1 0 00.2-1.006L15.3 9.75a1 1 0 00.756-.502l4.493-1.498a1 1 0 00.684-.948V5a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-600">تلفن</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {provider.phone}
                        </p>
                      </div>
                    </a>
                  )}

                  {provider.email && (
                    <a
                      href={`mailto:${provider.email}`}
                      className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
                    >
                      <svg
                        className="w-5 h-5 text-blue-600 shrink-0"
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
                      <div className="min-w-0">
                        <p className="text-xs text-gray-600">ایمیل</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {provider.email}
                        </p>
                      </div>
                    </a>
                  )}

                  {provider.whatsapp && (
                    <a
                      href={`https://wa.me/${provider.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition"
                    >
                      <svg
                        className="w-5 h-5 text-green-600 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.364-3.905 6.75-1.745 10.297 1.371 2.199 3.672 3.652 6.246 3.652.683 0 1.376-.057 2.065-.17l.073-.009c3.328 0 6.405-2.353 7.278-5.466.559-1.974.385-4.122-.559-5.815-2.154-4.275-7.15-5.867-11.327-3.867z" />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-600">واتس‌اپ</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {provider.whatsapp}
                        </p>
                      </div>
                    </a>
                  )}

                  {provider.telegram && (
                    <a
                      href={
                        provider.telegram.startsWith("http")
                          ? provider.telegram
                          : `https://t.me/${provider.telegram.replace(/\D/g, "")}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                    >
                      <svg
                        className="w-5 h-5 text-blue-600 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-600">تلگرام</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {provider.telegram}
                        </p>
                      </div>
                    </a>
                  )}

                  {provider.signal && (
                    <a
                      href={`https://signal.me/#p/${provider.signal.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                    >
                      <svg
                        className="w-5 h-5 text-blue-600 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-600">سیگنال</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {provider.signal}
                        </p>
                      </div>
                    </a>
                  )}

                  {provider.social_link && (
                    <a
                      href={provider.social_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition"
                    >
                      <svg
                        className="w-5 h-5 text-purple-600 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-600">شبکه اجتماعی</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          بازدید
                        </p>
                      </div>
                    </a>
                  )}
                </div>
              </div>

              {/* Reviews Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  نظرات دیگر تیم
                </h3>
                <div className="space-y-3">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              review.rating === 1
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {review.rating === 1 ? "✓ تایید" : "✕ رد"}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{review.notes}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(review.created_at).toLocaleDateString(
                            "fa-IR",
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">هیچ نظری ثبت نشده</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Review Tools - Fixed */}
            <div className="w-96 bg-linear-to-b from-gray-50 to-gray-100 p-6 border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                ابزارهای نظر‌دهی
              </h3>

              {/* Rating - Approve/Reject */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  تصمیم
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setRating(1)}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                      rating === 1
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-green-400"
                    }`}
                  >
                    ✓ تایید
                  </button>
                  <button
                    onClick={() => setRating(-1)}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                      rating === -1
                        ? "bg-red-600 text-white shadow-lg"
                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-400"
                    }`}
                  >
                    ✕ رد
                  </button>
                </div>
              </div>

              {/* Progress Status */}
              <div className="mb-8 bg-white rounded-lg p-4 border border-gray-300 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-3">
                  وضعیت بررسی
                </h4>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{provider.current_review_count} / 7</span>
                  <span>
                    {Math.round((provider.current_review_count / 7) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-linear-to-r from-indigo-500 to-indigo-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${(provider.current_review_count / 7) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-3 text-center font-medium">
                  {provider.reviews_needed} ریویو دیگر تا تصمیم نهایی
                </p>
              </div>

              {/* Notes - Scrollable */}
              <div className="mb-6 flex-1 flex flex-col">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  یادداشت‌ها
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="نظرات و یادداشت‌های خود را بنویسید..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm bg-white"
                />
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting || rating === 0}
                  className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? "در حال ثبت..." : "ثبت تصمیم"}
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-4 py-3 bg-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-400 transition"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                داشبورد بررسی
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                خوش آمدید، {repUser.full_name}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
            >
              خروج
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  در انتظار بررسی
                </p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {providers.length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  بررسی شده توسط شما
                </p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {stats.reviewed}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تایید شده</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {stats.approved}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">رد شده</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {stats.rejected}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Providers List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              ارائه‌دهندگان در انتظار بررسی
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              لیست ارائه‌دهندگانی که نیاز به بررسی دارند
            </p>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : providers.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                هیچ تیکتی در انتظار نیست
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                مه ارائه‌دهندگان توسط شما بررسی شده‌اند
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className="p-6 hover:bg-gray-50 transition border-b last:border-b-0"
                >
                  <div className="flex gap-6 items-start">
                    {/* Logo Section */}
                    <div className="shrink-0">
                      {provider.logo_url ? (
                        <img
                          src={provider.logo_url}
                          alt={provider.name}
                          className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-linear-to-br from-indigo-100 to-indigo-200 flex items-center justify-center border border-gray-200">
                          <span className="text-3xl font-bold text-indigo-600">
                            {provider.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Main Info Section */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">
                              {provider.name}
                            </h3>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {provider.provider_type === "individual"
                                ? "فردی"
                                : "سازمانی"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {provider.description_persian}
                          </p>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-3 gap-6 mb-4">
                        {/* Location */}
                        {provider.province && (
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-gray-400 shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                            </svg>
                            <div className="min-w-0">
                              <p className="text-xs text-gray-500">مکان</p>
                              <p className="text-sm text-gray-900 truncate">
                                {provider.city
                                  ? `${provider.city}, ${provider.province}`
                                  : provider.province}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Date */}
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-gray-400 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">تاریخ ثبت</p>
                            <p className="text-sm text-gray-900">
                              {new Date(provider.created_at).toLocaleDateString(
                                "fa-IR",
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Reviews */}
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-gray-400 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">ریویوها</p>
                            <p className="text-sm text-gray-900 font-medium">
                              {provider.current_review_count} / 7
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600">
                            پیشرفت بررسی
                          </span>
                          <span className="text-xs font-medium text-gray-700">
                            {Math.round(
                              (provider.current_review_count / 7) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(provider.current_review_count / 7) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {provider.reviews_needed} ریویو دیگر تا تصمیم نهایی
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 ml-auto">
                      <button
                        onClick={() => handleReviewClick(provider)}
                        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 whitespace-nowrap"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                          />
                        </svg>
                        بررسی
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Modal - Only render when showModal is true AND selectedProvider exists */}
        {showModal && selectedProvider && (
          <ProviderReviewModal
            provider={selectedProvider}
            onClose={() => {
              setShowModal(false);
              setSelectedProvider(null);
              setRating(0);
              setNotes("");
            }}
          />
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <Toast
            type={toastMessage.type}
            message={toastMessage.message}
            onClose={() => setToastMessage(null)}
          />
        )}
      </div>
    </div>
  );
}
