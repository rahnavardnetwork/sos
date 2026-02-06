import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  JsonLd,
} from "@/lib/seo/structured-data";
import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "./layout-client";

// Generate metadata for the root layout
export const metadata: Metadata = generateSEOMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* Structured Data for SEO */}
        <JsonLd data={[getOrganizationSchema(), getWebSiteSchema()]} />

        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme Color */}
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="bg-linear-to-br from-blue-200 via-transparent to-blue-200">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
