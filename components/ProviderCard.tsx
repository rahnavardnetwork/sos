import Image from "next/image";
import React from "react";

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

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow w-full">
      <div className="flex items-start gap-4">
        {/* Logo */}
        {provider.logo_url ? (
          <div className="shrink-0">
            <Image
              src={provider.logo_url}
              alt={provider.name}
              width={80}
              height={80}
              className="rounded-xl object-cover"
            />
          </div>
        ) : (
          <div className="shrink-0 w-20 h-20 bg-linear-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {provider.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {provider.name}
          </h3>

          {/* Categories */}
          {provider.categories && provider.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {provider.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            {provider.online_services && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                آنلاین
              </span>
            )}
            {provider.province && (
              <span className="text-sm">
                {provider.city ? `${provider.city}, ` : ""}
                {provider.province}
              </span>
            )}
          </div>

          {/* Description */}
          {provider.description_persian && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {provider.description_persian}
            </p>
          )}

          {/* Response Speed */}
          {provider.response_speed && (
            <div className="mb-4 text-sm text-gray-500">
              سرعت پاسخگویی: {provider.response_speed}
            </div>
          )}

          {/* Contact Buttons - Large and on the Left */}
          <div className="flex flex-wrap gap-3 justify-start">
            {provider.phone && (
              <a
                href={`tel:${provider.phone}`}
                className="flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium text-base"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {provider.phone}
              </a>
            )}
            {provider.telegram && (
              <a
                href={`https://t.me/${provider.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors font-medium text-base"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.61 3.73-.53.37-.99.54-1.38.52-.45-.02-1.33-.25-1.98-.46-.8-.25-1.44-.39-1.39-.82.03-.22.32-.45.88-.68 3.45-1.5 5.75-2.49 6.9-2.97 3.28-1.36 3.96-1.6 4.41-1.6.1 0 .32.02.46.14.12.1.15.24.17.34-.01.1.01.24-.01.36z" />
                </svg>
                تلگرام
              </a>
            )}
            {provider.whatsapp && (
              <a
                href={`https://wa.me/${provider.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium text-base"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                واتساپ
              </a>
            )}
            {provider.signal && (
              <a
                href={`https://signal.me/#p/${provider.signal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-base"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
                سیگنال
              </a>
            )}
            {provider.email && (
              <a
                href={`mailto:${provider.email}`}
                className="flex items-center gap-2 px-5 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium text-base"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                ایمیل
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
