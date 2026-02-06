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
      <body className="bg-linear-to-br from-blue-200 via-transparent to-blue-200">
        <JsonLd data={[getOrganizationSchema(), getWebSiteSchema()]} />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
