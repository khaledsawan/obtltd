import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteConfig().site.baseUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
