import { Metadata } from "next";
import { SEO_KEYWORDS } from "./keywords";

/**
 * SEO Metadata Generation Utilities
 * ابزارهای تولید متادیتا برای بهینه‌سازی موتورهای جستجو
 */

export const SITE_CONFIG = {
  name: "رهنورد | Rahnavard",
  namePersian: "رهنورد",
  nameEnglish: "Rahnavard",
  tagline: {
    persian: "شبکه کمک‌رسانی اضطراری - اتصال نیازمندان به داوطلبان معتبر",
    english:
      "Emergency Aid Network - Connecting People in Need with Verified Volunteers",
  },
  description: {
    persian:
      "رهنورد یک پلتفرم امن و معتبر برای اتصال افراد نیازمند به داوطلبان و سازمان‌های کمک‌رسان احراز هویت شده در ایران است. دریافت کمک اضطراری در زمینه‌های پزشکی، حقوقی، مالی و روانی.",
    english:
      "Rahnavard is a secure and trusted platform connecting people in crisis with verified volunteers and aid organizations in Iran. Get emergency help for medical, legal, financial, and mental health needs.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rahnavard.org",
  logo: "/images/logo.png",
  image: "/images/meta.jpg",
  keywords: [
    ...SEO_KEYWORDS.primary.persian,
    ...SEO_KEYWORDS.primary.english,
  ].join(", "),
  author: "Rahnavard Team",
  locale: "fa_IR",
  localeAlternate: "en_US",
  type: "website",
  contactEmail: "info@rahnavard.org",
  socialMedia: {
    twitter: "@rahnavard",
    instagram: "@rahnavard_iran",
    telegram: "@rahnavard_official",
  },
};

interface MetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
  noindex?: boolean;
  canonical?: string;
}

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title,
    description = SITE_CONFIG.description.persian,
    keywords = [],
    image = SITE_CONFIG.image,
    url = SITE_CONFIG.url,
    type = "website",
    publishedTime,
    author = SITE_CONFIG.author,
    noindex = false,
    canonical,
  } = options;

  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline.persian}`;

  const allKeywords = [
    ...keywords,
    ...SEO_KEYWORDS.primary.persian,
    ...SEO_KEYWORDS.primary.english,
  ].join(", ");

  const metadata: Metadata = {
    metadataBase: new URL(SITE_CONFIG.url),
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    alternates: {
      canonical: canonical || url,
      languages: {
        "fa-IR": `${SITE_CONFIG.url}/fa`,
        "en-US": `${SITE_CONFIG.url}/en`,
      },
    },
    openGraph: {
      type,
      locale: SITE_CONFIG.locale,
      alternateLocale: [SITE_CONFIG.localeAlternate],
      url,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.socialMedia.twitter,
      creator: SITE_CONFIG.socialMedia.twitter,
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };

  return metadata;
}

/**
 * Generate metadata for aid seeker landing page
 */
export function generateAidSeekerMetadata(city?: string): Metadata {
  const locationSuffix = city ? ` در ${city}` : "";

  return generateMetadata({
    title: `دریافت کمک اضطراری${locationSuffix} - کمک فوری پزشکی، حقوقی و مالی`,
    description: `نیاز به کمک فوری دارید؟ رهنورد شما را به داوطلبان معتبر و سازمان‌های امداد${locationSuffix} متصل می‌کند. دریافت کمک پزشکی، حقوقی، مالی و روانی در کمتر از ۲۴ ساعت.`,
    keywords: [
      ...SEO_KEYWORDS.aidSeeker.highUrgency.persian,
      ...SEO_KEYWORDS.aidSeeker.trust.persian,
      ...(city
        ? SEO_KEYWORDS.aidSeeker.locationBased.persian.map((k) =>
            k.replace("{city}", city),
          )
        : []),
    ],
    image: "/images/aid-seeker-og.jpg",
  });
}

/**
 * Generate metadata for volunteer landing page
 */
export function generateVolunteerMetadata(): Metadata {
  return generateMetadata({
    title: "ثبت نام داوطلبان - پیوستن به شبکه کمک‌رسانی معتبر",
    description:
      "با پیوستن به رهنورد به شبکه داوطلبان معتبر ایران بپیوندید. فرآیند احراز هویت ایمن، شفاف و سریع. تاثیر واقعی بر جامعه بگذارید.",
    keywords: [
      ...SEO_KEYWORDS.volunteer.motivation.persian,
      ...SEO_KEYWORDS.volunteer.verification.persian,
      ...SEO_KEYWORDS.volunteer.impact.persian,
    ],
    image: "/images/volunteer-og.jpg",
  });
}

/**
 * Generate metadata for location-based pages
 */
export function generateLocationMetadata(
  city: string,
  neighborhood?: string,
): Metadata {
  const location = neighborhood ? `${neighborhood}، ${city}` : city;

  return generateMetadata({
    title: `امداد اضطراری ${location} - کمک فوری و داوطلبان محلی`,
    description: `دسترسی سریع به کمک اضطراری در ${location}. شبکه داوطلبان و سازمان‌های معتبر محلی برای کمک پزشکی، حقوقی، مالی و روانی.`,
    keywords: [
      ...SEO_KEYWORDS.aidSeeker.locationBased.persian.map((k) =>
        k.replace("{city}", city),
      ),
      ...SEO_KEYWORDS.services.persian,
    ],
    canonical: `${SITE_CONFIG.url}/location/${city}`,
  });
}

/**
 * Generate metadata for blog posts
 */
export function generateBlogMetadata(
  title: string,
  description: string,
  slug: string,
  publishedTime: string,
  keywords: string[],
): Metadata {
  return generateMetadata({
    title,
    description,
    keywords,
    url: `${SITE_CONFIG.url}/blog/${slug}`,
    type: "article",
    publishedTime,
    canonical: `${SITE_CONFIG.url}/blog/${slug}`,
  });
}

/**
 * Generate FAQ metadata
 */
export function generateFAQMetadata(): Metadata {
  return generateMetadata({
    title: "سوالات متداول - راهنمای کامل رهنورد",
    description:
      "پاسخ به سوالات متداول درباره دریافت کمک اضطراری، ثبت نام داوطلبان، فرآیند احراز هویت، امنیت و حریم خصوصی در رهنورد.",
    keywords: [
      "سوالات متداول رهنورد",
      "راهنمای کمک اضطراری",
      "نحوه استفاده از رهنورد",
      "ثبت نام داوطلب",
    ],
  });
}
