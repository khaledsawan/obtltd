import type { MetadataRoute } from "next";
import { getProductSlugs, getSiteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteConfig().site.baseUrl;
  const staticRoutes = ["", "/products", "/who-we-are", "/our-work", "/services", "/contact"];
  const productRoutes = getProductSlugs().map((slug) => `/products/${slug}`);

  return [...staticRoutes, ...productRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
