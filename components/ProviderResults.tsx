import React, { useEffect, useState } from "react";
import { ProviderCard } from "./ProviderCard";

interface Provider {
  id: string;
  name: string;
  description_persian?: string;
  logo_url?: string;
  provider_type?: string;
  province?: string;
  city?: string;
  online_services?: boolean;
  categories?: string[];
  phone?: string;
  email?: string;
  telegram?: string;
  whatsapp?: string;
  signal?: string;
  response_speed?: string;
}

interface ProviderResultsProps {
  filters: {
    categoryId?: string;
    province?: string;
    isOnline?: boolean;
    isOutOfIran?: boolean;
  };
  onBack: () => void;
}

export const ProviderResults: React.FC<ProviderResultsProps> = ({
  filters,
  onBack,
}) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, [filters]);

  const fetchProviders = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.categoryId) params.append("categoryId", filters.categoryId);
      if (filters.province) params.append("province", filters.province);
      if (filters.isOnline) params.append("isOnline", "true");
      if (filters.isOutOfIran) params.append("isOutOfIran", "true");

      const response = await fetch(`/api/providers?${params.toString()}`);
      const data = await response.json();
      setProviders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching providers:", error);
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-700">در حال بارگذاری...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 p-6"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-blue-600 flex items-center gap-2 hover:text-blue-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            بازگشت
          </button>
          <div className="text-gray-600">
            {providers.length} ارائه‌دهنده یافت شد
          </div>
        </div>

        {/* Results */}
        {providers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              نتیجه‌ای یافت نشد
            </h3>
            <p className="text-gray-600">
              با فیلترهای انتخابی شما، ارائه‌دهنده‌ای پیدا نشد.
            </p>
            <button
              onClick={onBack}
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              تغییر فیلترها
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
