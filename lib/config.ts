import type { Metadata } from "next";
import siteConfig from "../site.config.json";

export type SiteConfig = typeof siteConfig;
export type NavigationItem = SiteConfig["navigation"]["main"][number];
export type Product = SiteConfig["products"]["list"][number];
export type Service = SiteConfig["services"]["list"][number];
export type WorkItem = SiteConfig["work"]["items"][number];
export type ValueItem = SiteConfig["company"]["values"][number];
export type ContactAction = SiteConfig["pages"]["contact"]["actions"][number];

const config = siteConfig;

export function getSiteConfig(): SiteConfig {
  return config;
}

export function getSiteTheme() {
  return config.ui.theme;
}

export function getNavigation() {
  return config.navigation.main;
}

export function getFooter() {
  return config.footer;
}

export function getCompany() {
  return config.company;
}

export function getHomePage() {
  return config.pages.home;
}

export function getProductsPage() {
  return config.pages.products;
}

export function getAboutPage() {
  return config.pages.about;
}

export function getWorkPage() {
  return config.pages.work;
}

export function getServicesPage() {
  return config.pages.services;
}

export function getContactPage() {
  return config.pages.contact;
}

export function getSharedPageContent() {
  return config.pages.shared;
}

export function getProducts() {
  return config.products.list;
}

export function getProductSlugs() {
  return config.products.list.map((product) => product.slug);
}

export function getProductBySlug(slug: string) {
  return config.products.list.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  const featured = config.products.featuredSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));

  return featured;
}

export function getRelatedProducts(slug: string) {
  const related = config.products.relatedBySlug[slug as keyof typeof config.products.relatedBySlug] ?? [];
  return related
    .map((relatedSlug) => getProductBySlug(relatedSlug))
    .filter((product): product is Product => Boolean(product));
}

export function getServices() {
  return config.services.list;
}

export function getWorkItems() {
  return config.work.items;
}

export function getContactActions() {
  return config.pages.contact.actions;
}

export function normalizeAssetPath(src: string) {
  if (!src) {
    return src;
  }

  if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) {
    return src;
  }

  return `/${src.replace(/^\.?\//, "")}`;
}

export function getAbsoluteUrl(route: string) {
  const base = config.site.baseUrl.replace(/\/$/, "");
  const normalizedRoute = normalizeAssetPath(route);

  if (!normalizedRoute || normalizedRoute === "/") {
    return base;
  }

  if (/^https?:\/\//.test(normalizedRoute)) {
    return normalizedRoute;
  }

  return `${base}${normalizedRoute}`;
}

export function toPhoneHref(phone: string) {
  return `tel:${phone}`;
}

export function toMailHref(email: string) {
  return `mailto:${email}`;
}

export function toWhatsappHref(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createMetadata(input: MetadataInput = {}): Metadata {
  const title = input.title
    ? config.seo.titleTemplate.replace("%s", input.title)
    : config.seo.defaultTitle;
  const description = input.description ?? config.seo.defaultDescription;
  const url = getAbsoluteUrl(input.path ?? "/");
  const image = input.image ?? config.assets.defaultOgImage;

  return {
    title,
    description,
    keywords: config.seo.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      locale: "ar_SY",
      type: "website",
      siteName: config.site.name,
      images: [
        {
          url: getAbsoluteUrl(image),
          alt: config.site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getAbsoluteUrl(image)],
    },
  };
}

export function getOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.company.name,
    url: config.site.baseUrl,
    logo: getAbsoluteUrl(config.assets.logo.src),
    description: config.seo.defaultDescription,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: config.company.contact.phones.sales,
        contactType: "sales",
        areaServed: "SY",
      },
    ],
  };
}

export function getBreadcrumbStructuredData(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function getProductStructuredData(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((image) => getAbsoluteUrl(image.src)),
    brand: {
      "@type": "Brand",
      name: config.company.name,
    },
    category: product.category,
  };
}
