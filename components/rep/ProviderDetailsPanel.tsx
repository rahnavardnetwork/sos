"use client";

interface ProviderDetailsPanelProps {
  provider: any;
}

export default function ProviderDetailsPanel({
  provider,
}: ProviderDetailsPanelProps) {
  if (!provider) return null;

  const { provider: providerData, categories, reviews, evaluation } = provider;

  return (
    <div className="p-6">
      {/* Logo و نام */}
      <div className="mb-8">
        <div className="flex items-start gap-6 mb-6">
          {providerData.logo_url ? (
            <img
              src={providerData.logo_url}
              alt={providerData.name}
              className="w-24 h-24 rounded-xl object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-xl bg-linear-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
              <span className="text-4xl font-bold text-indigo-600">
                {providerData.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {providerData.name}
            </h3>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {providerData.provider_type === "individual"
                  ? "فردی"
                  : "سازمانی"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                {providerData.status === "pending"
                  ? "در انتظار"
                  : providerData.status}
              </span>
            </div>
          </div>
        </div>

        {/* توضیحات */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-gray-900 mb-2">توضیحات</h4>
          <p className="text-gray-700 leading-relaxed">
            {providerData.description_persian}
          </p>
          {providerData.description_english && (
            <>
              <p className="text-gray-500 text-sm mt-3 mb-2">(English)</p>
              <p className="text-gray-600 text-sm">
                {providerData.description_english}
              </p>
            </>
          )}
        </div>
      </div>

      {/* اطلاعات تماس */}
      <div className="mb-8">
        <h4 className="text-lg font-bold text-gray-900 mb-4">اطلاعات تماس</h4>
        <div className="space-y-3">
          {providerData.phone && (
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <svg
                className="w-5 h-5 text-indigo-600 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.32.465.648.928.972 1.372.32.44.631.861.92 1.261l1.53-1.294a1 1 0 011.165.192l3.15 3.15a7 7 0 10-9.938-9.938L2 3z" />
              </svg>
              <a
                href={`tel:${providerData.phone}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                {providerData.phone}
              </a>
            </div>
          )}

          {providerData.email && (
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <svg
                className="w-5 h-5 text-indigo-600 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a
                href={`mailto:${providerData.email}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium break-all"
              >
                {providerData.email}
              </a>
            </div>
          )}

          {providerData.telegram && (
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <svg
                className="w-5 h-5 text-blue-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.82-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.22-.054-.338-.373-.118l-6.869 4.332-2.97-.924c-.644-.213-.658-.644.135-.953l11.593-4.468c.537-.196 1.006.128.832.941z" />
              </svg>
              <a
                href={`https://t.me/${providerData.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                @{providerData.telegram}
              </a>
            </div>
          )}

          {providerData.whatsapp && (
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <svg
                className="w-5 h-5 text-green-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.719.738 5.38 2.137 7.714L2.61 22.727l8.187-2.148c2.238 1.205 4.75 1.84 7.247 1.84 9.744 0 17.667-7.923 17.667-17.667 0-4.709-1.849-9.145-5.207-12.502-3.358-3.358-7.794-5.207-12.502-5.207" />
              </svg>
              <a
                href={`https://wa.me/${providerData.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {providerData.whatsapp}
              </a>
            </div>
          )}

          {providerData.signal && (
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Signal:</span>
              <span className="text-gray-900 font-medium">
                {providerData.signal}
              </span>
            </div>
          )}

          {providerData.social_link && (
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <svg
                className="w-5 h-5 text-indigo-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <a
                href={providerData.social_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 font-medium truncate"
              >
                لینک اجتماعی
              </a>
            </div>
          )}
        </div>
      </div>

      {/* موقعیت جغرافیایی */}
      {(providerData.province || providerData.city) && (
        <div className="mb-8">
          <h4 className="text-lg font-bold text-gray-900 mb-4">موقعیت</h4>
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
            <svg
              className="w-5 h-5 text-red-600 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-900 font-medium">
              {providerData.city
                ? `${providerData.city}, ${providerData.province}`
                : providerData.province}
            </span>
          </div>
        </div>
      )}

      {/* دسته‌بندی */}
      {categories && categories.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-bold text-gray-900 mb-4">دسته‌بندی‌ها</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category: any) => (
              <span
                key={category.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
              >
                {category.name_persian}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* نتیجه ارزیابی اگر وجود داره */}
      {evaluation && (
        <div className="mb-8 p-4 bg-linear-to-l from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg">
          <h4 className="text-lg font-bold text-gray-900 mb-4">
            نتیجه ارزیابی
          </h4>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">وضعیت:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  evaluation.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : evaluation.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : evaluation.status === "dangerous"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {evaluation.status === "approved"
                  ? "تایید شده"
                  : evaluation.status === "rejected"
                    ? "رد شده"
                    : evaluation.status === "dangerous"
                      ? "خطرناک"
                      : "در انتظار"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">درصد اعتماد:</span>
              <span className="text-lg font-bold text-indigo-600">
                {evaluation.trust_percentage}%
              </span>
            </div>

            {evaluation.badge && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">نشان:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    evaluation.badge === "gold"
                      ? "bg-yellow-100 text-yellow-800"
                      : evaluation.badge === "silver"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {evaluation.badge === "gold"
                    ? "🏆 طلایی"
                    : evaluation.badge === "silver"
                      ? "🥈 نقره‌ای"
                      : "🥉 برنزی"}
                </span>
              </div>
            )}

            <div className="pt-3 border-t border-indigo-200">
              <p className="text-sm text-gray-700">
                <strong>توضیح:</strong> {evaluation.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ریویوهای قبلی */}
      {reviews && reviews.length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4">
            ریویوهای ثبت شده ({reviews.length})
          </h4>
          <div className="space-y-3">
            {reviews.map((review: any, index: number) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-900">
                      {review.rep?.full_name || "ناشناس"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(review.created_at).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-sm font-bold ${
                      review.vote === 1
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {review.vote === 1 ? "✓ قابل اعتماد" : "✗ خطرناک"}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-600">اطمینان:</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`w-4 h-4 rounded-full ${
                          i < review.confidence
                            ? "bg-indigo-600"
                            : "bg-gray-300"
                        }`}
                      ></span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 mr-2">
                    ({review.confidence}/5)
                  </span>
                </div>

                {review.notes && (
                  <div className="mt-2 pt-2 border-t border-gray-300">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {review.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
