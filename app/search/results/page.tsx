"use client";

import { ProviderCard } from "@/components/ProviderCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

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

function ResultsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const params = new URLSearchParams();
        const categoryId = searchParams.get("categoryId");
        const province = searchParams.get("province");
        const isOnline = searchParams.get("isOnline");
        const isOutOfIran = searchParams.get("isOutOfIran");

        if (categoryId) params.set("categoryId", categoryId);
        if (province) params.set("province", province);
        if (isOnline) params.set("isOnline", isOnline);
        if (isOutOfIran) params.set("isOutOfIran", isOutOfIran);

        const response = await fetch(`/api/providers?${params.toString()}`);
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">در حال جستجو...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-600 flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          بازگشت
        </button>

        <h1 className="text-2xl font-bold mb-6">نتایج جستجو</h1>

        {providers.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center">
            <p className="text-gray-600">نتیجه‌ای یافت نشد</p>
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
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          در حال بارگذاری...
        </div>
      }
    >
      <ResultsPageContent />
    </Suspense>
  );
}
