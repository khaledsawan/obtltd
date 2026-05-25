import type { Metadata } from "next";
import siteConfig from "../site.config.json";

export type Locale = "ar" | "en";
export type LocalizedText = Record<Locale, string>;
export type SiteConfig = typeof siteConfig;
export type NavigationItem = SiteConfig["navigation"]["main"][number];
export type Product = SiteConfig["productsV2"]["list"][number];
export type ValueItem = SiteConfig["company"]["values"][number];

const config = siteConfig;

export function getSiteConfig(): SiteConfig {
  return config;
}

export function resolveLocale(input?: string): Locale {
  if (input === "en") {
    return "en";
  }
  return "ar";
}

export function localize(value: string | LocalizedText, locale: Locale): string {
  return typeof value === "string" ? value : value[locale] ?? value.ar ?? "";
}

export function toLocalizedPath(locale: Locale, href: string) {
  if (!href.startsWith("/")) {
    return href;
  }
  if (href === "/") {
    return `/${locale}`;
  }
  return `/${locale}${href}`;
}

export function getSiteTheme() {
  return config.ui.theme;
}

export function getCompany() {
  return config.company;
}

export function getNavigation(locale: Locale) {
  return config.navigation.main.map((item) => ({
    href: toLocalizedPath(locale, item.href),
    label: localize(item.label as string | LocalizedText, locale),
  }));
}

export function getHeaderActions(locale: Locale) {
  return {
    whatsapp: {
      label: localize(config.navigation.actions.whatsapp.label, locale),
      href: localize(config.navigation.actions.whatsapp.href, locale),
    },
    catalog: {
      label: localize(config.navigation.actions.catalog.label, locale),
      href: localize(config.navigation.actions.catalog.href, locale),
    },
  };
}

export function getFooter(locale: Locale) {
  return {
    summary: localize(config.footer.summary, locale),
    quickLinksTitle: localize(config.footer.quickLinksTitle, locale),
    contactTitle: localize(config.footer.contactTitle, locale),
    quickLinks: config.footer.quickLinks.map((item) => ({ label: localize(item.label, locale), href: toLocalizedPath(locale, item.href) })),
    contacts: config.footer.contacts.map((item) => ({ icon: item.icon, value: localize(item.value, locale), href: item.href })),
    legal: localize(config.footer.legal, locale),
    social: config.footer.social,
  };
}

export function getProductsPageV2(locale: Locale) {
  return {
    hero: {
      eyebrow: localize(config.pages.productsV2.hero.eyebrow, locale),
      title: localize(config.pages.productsV2.hero.title, locale),
      description: localize(config.pages.productsV2.hero.description, locale),
    },
    cardCta: localize(config.pages.productsV2.cardCta, locale),
    catalogCta: {
      title: localize(config.pages.productsV2.catalogCta.title, locale),
      description: localize(config.pages.productsV2.catalogCta.description, locale),
      primaryButton: {
        label: localize(config.pages.productsV2.catalogCta.primaryButton.label, locale),
        href: localize(config.pages.productsV2.catalogCta.primaryButton.href, locale),
      },
      secondaryButton: {
        label: localize(config.pages.productsV2.catalogCta.secondaryButton.label, locale),
        href: toLocalizedPath(locale, localize(config.pages.productsV2.catalogCta.secondaryButton.href, locale)),
      },
    },
  };
}

export function getHomePageV2(locale: Locale) {
  const home = config.pages.homeV2;
  return {
    hero: {
      eyebrow: localize(home.hero.eyebrow, locale),
      title: localize(home.hero.title, locale),
      description: localize(home.hero.description, locale),
      primary: { label: localize(home.hero.primary.label, locale), href: localize(home.hero.primary.href, locale) },
      secondary: { label: localize(home.hero.secondary.label, locale), href: localize(home.hero.secondary.href, locale) },
      media: { src: home.hero.media.src, alt: localize(home.hero.media.alt, locale) },
    },
    about: {
      eyebrow: localize(home.hero.eyebrow, locale),
      title: localize(home.about.title, locale),
      description: localize(home.about.description, locale),
      stats: { value: localize(home.about.stats.value, locale), text: localize(home.about.stats.text, locale) },
      bullets: home.about.bullets.map((item) => ({
        title: localize(item.title, locale),
        text: localize(item.text, locale),
      })),
      media: { src: home.about.media.src, alt: localize(home.about.media.alt, locale) },
    },
    services: {
      eyebrow: localize(home.services.eyebrow, locale),
      title: localize(home.services.title, locale),
      list: home.services.list.map((item) => ({
        title: localize(item.title, locale),
        description: localize(item.description, locale),
      })),
    },
    featured: {
      eyebrow: localize(home.featured.eyebrow, locale),
      title: localize(home.featured.title, locale),
      cta: localize(home.featured.cta, locale),
      list: home.featured.list.map((item) => ({
        title: localize(item.title, locale),
        description: localize(item.description, locale),
        image: { src: item.image.src, alt: localize(item.image.alt, locale) },
        href: item.href ? toLocalizedPath(locale, localize(item.href, locale)) : toLocalizedPath(locale, "/products"),
      })),
    },
    showcase: {
      eyebrow: localize(home.hero.eyebrow, locale),
      title: localize(home.showcase.title, locale),
      description: localize(home.showcase.description, locale),
      cta: { label: localize(home.showcase.cta.label, locale), href: toLocalizedPath(locale, localize(home.showcase.cta.href, locale)) },
      list: home.showcase.list.map((item) => ({
        title: localize(item.title, locale),
        text: localize(item.text, locale),
        image: { src: item.image.src, alt: localize(item.image.alt, locale) },
      })),
    },
    metrics: home.metrics.map((item) => ({ value: item.value, label: localize(item.label, locale) })),
    contact: {
      eyebrow: localize(home.hero.eyebrow, locale),
      title: localize(home.contact.title, locale),
      description: localize(home.contact.description, locale),
      details: home.contact.details.map((item) => ({
        icon: item.icon,
        label: localize(item.label, locale),
        value: localize(item.value, locale),
      })),
      catalogCard: {
        title: localize(home.contact.catalogCard.title, locale),
        text: localize(home.contact.catalogCard.text, locale),
        button: {
          label: localize(home.contact.catalogCard.button.label, locale),
          href: localize(home.contact.catalogCard.button.href, locale),
        },
      },
      form: {
        fields: home.contact.form.fields.map((field) => ({
          label: localize(field.label, locale),
          placeholder: localize(field.placeholder, locale),
          type: field.type,
        })),
        submit: localize(home.contact.form.submit, locale),
      },
      map: {
        mapUrl: home.contact.map.mapUrl,
        href: home.contact.map.href,
        src: home.contact.map.src,
        alt: localize(home.contact.map.alt, locale),
      },
    },
  };
}

export function getContactPageV2(locale: Locale) {
  const contact = config.pages.contact.v2;
  return {
    hero: {
      eyebrow: localize(contact.hero.eyebrow, locale),
      title: localize(contact.hero.title, locale),
      description: localize(contact.hero.description, locale),
    },
    quickContact: contact.quickContact.map((item) => ({
      label: localize(item.label, locale),
      value: localize(item.value, locale),
      icon: item.icon,
      href: item.href,
    })),
    inquiryForm: {
      title: localize(contact.inquiryForm.title, locale),
      fields: contact.inquiryForm.fields.map((field) => ({
        label: localize(field.label, locale),
        placeholder: field.placeholder ? localize(field.placeholder, locale) : "",
        type: field.type,
        options: field.options ? field.options.map((option) => localize(option, locale)) : [],
      })),
      submit: localize(contact.inquiryForm.submit, locale),
    },
    mapPanel: {
      mapUrl: contact.mapPanel.mapUrl,
      image: {
        src: contact.mapPanel.image.src,
        alt: localize(contact.mapPanel.image.alt, locale),
      },
      title: localize(contact.mapPanel.title, locale),
      description: localize(contact.mapPanel.description, locale),
      cta: {
        label: localize(contact.mapPanel.cta.label, locale),
        href: contact.mapPanel.cta.href,
      },
    },
    globalOffices: {
      title: localize(contact.globalOffices.title, locale),
      list: contact.globalOffices.list.map((office) => ({
        city: localize(office.city, locale),
        name: localize(office.name, locale),
        address: localize(office.address, locale),
        phone: office.phone,
      })),
    },
  };
}

export function getWorkPageV2(locale: Locale) {
  const work = config.pages.work.v2;
  return {
    hero: {
      eyebrow: localize(work.hero.eyebrow, locale),
      title: localize(work.hero.title, locale),
      highlight: localize(work.hero.highlight, locale),
      description: localize(work.hero.description, locale),
    },
    projects: work.projects.map((project) => ({
      category: localize(project.category, locale),
      title: localize(project.title, locale),
      description: localize(project.description, locale),
      image: { src: project.image.src, alt: localize(project.image.alt, locale) },
      caseCta: { label: localize(project.caseCta.label, locale), href: project.caseCta.href },
    })),
    cta: {
      title: localize(work.cta.title, locale),
      description: localize(work.cta.description, locale),
      primary: { label: localize(work.cta.primary.label, locale), href: work.cta.primary.href },
      secondary: {
        label: localize(work.cta.secondary.label, locale),
        href: toLocalizedPath(locale, localize(work.cta.secondary.href, locale)),
      },
    },
  };
}

export function getProductsV2(locale: Locale) {
  return config.productsV2.list.map((item) => ({
    slug: item.slug,
    category: localize(item.category, locale),
    title: localize(item.title, locale),
    badge: item.badge ? localize(item.badge, locale) : null,
    image: {
      src: item.image.src,
      alt: localize(item.image.alt, locale),
    },
    specs: item.specs.map((spec) => ({
      label: localize(spec.label, locale),
      value: localize(spec.value, locale),
    })),
  }));
}

export function getProductDetailPageV2(locale: Locale, slug: string) {
  const product = config.productsV2.list.find((item) => item.slug === slug);
  if (!product) return null;
  const details = config.pages.productDetailsV2;
  const fallbackV2 = config.productsV2.list.find((item) => item.slug !== slug);
  const related = config.productsV2.list
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      title: localize(item.title, locale),
      category: localize(item.category, locale),
      image: {
        src: item.image.src,
        alt: localize(item.image.alt, locale),
      },
    }));

  return {
    product: {
      slug: product.slug,
      title: localize(product.title, locale),
      category: localize(product.category, locale),
      description: localize(details.subtitle, locale),
      summary: localize(details.subtitle, locale),
      images: [{ src: product.image.src, alt: localize(product.image.alt, locale) }],
      features: product.specs.map((spec) => `${localize(spec.label, locale)}: ${localize(spec.value, locale)}`),
      uses: [],
      specifications: product.specs.map((spec) => `${localize(spec.label, locale)}: ${localize(spec.value, locale)}`),
      seo: {
        title: localize(product.title, locale),
        description: localize(details.subtitle, locale),
      },
    },
    breadcrumbs: {
      home: localize(details.breadcrumbs.home, locale),
      solutions: localize(details.breadcrumbs.solutions, locale),
      products: localize(details.breadcrumbs.products, locale),
    },
    subtitle: localize(details.subtitle, locale),
    actions: {
      brochure: {
        label: localize(details.actions.brochure.label, locale),
        href: localize(details.actions.brochure.href, locale),
      },
      whatsapp: {
        label: localize(details.actions.whatsapp.label, locale),
        href: details.actions.whatsapp.href,
      },
      quote: {
        label: localize(details.actions.quote.label, locale),
        href: toLocalizedPath(locale, localize(details.actions.quote.href, locale)),
      },
    },
    trust: details.trust.map((item) => ({
      title: localize(item.title, locale),
      text: localize(item.text, locale),
    })),
    related: {
      title: localize(details.related.title, locale),
      items: related.length ? related : (fallbackV2 ? [{
        slug: fallbackV2.slug,
        title: localize(fallbackV2.title, locale),
        category: localize(fallbackV2.category, locale),
        image: { src: fallbackV2.image.src, alt: localize(fallbackV2.image.alt, locale) },
      }] : []),
    },
  };
}

export function getWhoWeAreV2(locale: Locale) {
  const work = config.pages.whoweare.v2;

  // Helper function to check if a value is an empty object
  const isEmptyObject = (value: any): boolean => {
    return value !== null && typeof value === 'object' && Object.keys(value).length === 0;
  };

  const safeLocalize = (text: any, locale: Locale): string => {
    if (!text || isEmptyObject(text)) {
      return "";
    }

    return localize(text, locale);
  };

  return {
    hero: {
      eyebrow: localize(work.hero.eyebrow, locale),
      title: localize(work.hero.title, locale),
      description: localize(work.hero.description, locale),
      image: {
        src: work.hero.image.src,
        alt: localize(work.hero.image.alt, locale)
      }
    },
    mission: {
      eyebrow: localize(work.mission.eyebrow, locale),
      title: localize(work.mission.title, locale),
      description: localize(work.mission.description, locale),
      cards: work.mission.cards.map(card => ({
        type: card.type,
        title: safeLocalize(card.title, locale),
        description: safeLocalize(card.description, locale),
        value: card.value,
        label: safeLocalize(card.label, locale),
        image: card.image,
        cta: card.cta
          ? {
            label: safeLocalize(card.cta.label, locale),
            href: card.cta.href,
          }
          : undefined,
      })),

    },
    leadership: {
      eyebrow: localize(work.leadership.eyebrow, locale),
      title: localize(work.leadership.title, locale),
      members: work.leadership.members.map(member => ({
        name: member.name,
        position: localize(member.position, locale),
        bio: safeLocalize(member.bio, locale),
        image: member.image
      }))
    },
    footprint: {
      eyebrow: localize(work.footprint.eyebrow, locale),
      title: localize(work.footprint.title, locale),
      image: work.footprint.image,
      locations: work.footprint.locations.map(location => ({
        city: localize(location.city, locale),
        description: safeLocalize(location.description, locale) // This fixes the error
      }))
    },
    values: {
      title: localize(work.values.title, locale),
      cta: {
        label: localize(work.values.cta.label, locale),
        href: work.values.cta.href
      },
      items: work.values.items.map(item => ({
        number: item.number,
        title: safeLocalize(item.title, locale),
        description: safeLocalize(item.description, locale)
      }))
    }
  };
}

export function getDirection(locale: Locale) {
  return config.i18n.directions[locale] as "rtl" | "ltr";
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
  return config.productsV2.list;
}

export function getProductSlugs() {
  return config.productsV2.list.map((product) => product.slug);
}

export function getProductBySlug(slug: string) {
  return config.productsV2.list.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  const featured = config.productsV2.list
    .slice(0, 3)
    .map((item) => getProductBySlug(item.slug))
    .filter((product): product is Product => Boolean(product));

  return featured;
}

export function getRelatedProducts(slug: string) {
  return config.productsV2.list
    .filter((product) => product.slug !== slug)
    .slice(0, 3)
    .filter((product): product is Product => Boolean(product));
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


