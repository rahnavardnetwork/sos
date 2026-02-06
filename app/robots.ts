import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rahnavard.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/rep/",
          "/login",
          "/create-rep",
          "/_next/",
          "/private/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/rep/", "/login", "/create-rep"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/rep/", "/login", "/create-rep"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
