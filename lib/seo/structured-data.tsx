/**
 * Structured Data (Schema.org JSON-LD) Components
 * اسکیماهای داده‌های ساختار یافته برای موتورهای جستجو
 *
 * These components help search engines understand the context and purpose
 * of our YMYL (Your Money or Your Life) humanitarian platform
 */

import { SITE_CONFIG } from "./metadata";

/**
 * Organization Schema - اسکیمای سازمان
 * Establishes Rahnavard as a trustworthy humanitarian organization
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: [SITE_CONFIG.namePersian, SITE_CONFIG.nameEnglish],
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      width: 512,
      height: 512,
    },
    description: SITE_CONFIG.description.persian,
    sameAs: [
      `https://twitter.com/${SITE_CONFIG.socialMedia.twitter}`,
      `https://instagram.com/${SITE_CONFIG.socialMedia.instagram}`,
      `https://t.me/${SITE_CONFIG.socialMedia.telegram}`,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.contactEmail,
      contactType: "Emergency Services",
      availableLanguage: ["Persian", "English"],
      areaServed: "IR",
    },
    areaServed: {
      "@type": "Country",
      name: "Iran",
    },
    knowsAbout: [
      "Emergency Aid",
      "Volunteer Networks",
      "Medical Assistance",
      "Legal Counseling",
      "Mental Health Support",
      "Crisis Management",
    ],
    slogan: SITE_CONFIG.tagline.persian,
  };
}

/**
 * WebSite Schema - اسکیمای وب‌سایت
 * Enables site search box in Google results
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description.persian,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["fa", "en"],
  };
}

/**
 * FAQ Schema - اسکیمای سوالات متداول
 * Displays FAQs directly in search results
 */
export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Service Schema - اسکیمای خدمات
 * Describes the services we offer
 */
export function getServiceSchema(service: {
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    serviceType: service.serviceType,
    areaServed: service.areaServed || "IR",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: SITE_CONFIG.url,
      servicePhone: "",
      availableLanguage: ["Persian", "English"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Emergency Aid Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "کمک پزشکی اورژانسی",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "مشاوره حقوقی",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "حمایت روانی",
          },
        },
      ],
    },
  };
}

/**
 * LocalBusiness Schema for Location Pages
 * اسکیمای کسب‌وکار محلی برای صفحات مکان‌محور
 */
export function getLocalBusinessSchema(location: {
  city: string;
  neighborhood?: string;
  region?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: `رهنورد - شبکه امداد ${location.city}`,
    description: `شبکه داوطلبان و کمک‌رسانی اضطراری در ${location.city}`,
    url: `${SITE_CONFIG.url}/location/${location.city}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: "IR",
    },
    geo: {
      "@type": "GeoCoordinates",
      // These would be dynamically generated based on city
    },
    areaServed: {
      "@type": "City",
      name: location.city,
    },
    openingHours: "24/7",
    availableService: [
      {
        "@type": "Service",
        name: "امداد اضطراری",
        serviceType: "Emergency Response",
      },
    ],
  };
}

/**
 * BreadcrumbList Schema - اسکیمای لینک‌های مسیر
 * Shows navigation path in search results
 */
export function getBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Article Schema for Blog Posts
 * اسکیمای مقاله برای پست‌های وبلاگ
 */
export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    image: article.image || SITE_CONFIG.image,
    keywords: article.keywords?.join(", "),
    inLanguage: "fa",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

/**
 * HowTo Schema for Guides
 * اسکیمای راهنما برای مقالات آموزشی
 */
export function getHowToSchema(guide: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.name,
    description: guide.description,
    totalTime: guide.totalTime,
    step: guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Component to inject JSON-LD into page
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
          }}
        />
      ))}
    </>
  );
}
