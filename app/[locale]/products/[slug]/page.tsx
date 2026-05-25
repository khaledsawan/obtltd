import { createMetadata, getDirection, getProductDetailPageV2, getProductSlugs, getSiteConfig, localize, resolveLocale, toLocalizedPath } from "@/lib/config";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Params = { locale: string; slug: string };

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
      <path strokeLinecap="round" d="M12 4v10" />
      <path strokeLinecap="round" d="M8 10l4 4 4-4" />
      <path strokeLinecap="round" d="M5 20h14" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 ${className || ""}`} aria-hidden>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function generateStaticParams() {
  const slugs = getProductSlugs();
  return ["ar", "en"].flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = resolveLocale(locale);
  const detail = getProductDetailPageV2(currentLocale, slug);
  if (!detail) return createMetadata();
  return createMetadata({
    title: detail.product.seo.title,
    description: detail.product.seo.description,
    path: toLocalizedPath(currentLocale, `/products/${slug}`),
    image: detail.product.images[0].src,
  });
}

export default async function LocalizedProductDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const currentLocale = resolveLocale(locale);
  const detail = getProductDetailPageV2(currentLocale, slug);
  if (!detail) return null;
  const dir = getDirection(currentLocale);
  const labels = getSiteConfig().ui.labels;
  const isRTL = dir === "rtl";

  return (
    <div dir={dir} lang={currentLocale} className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-28 lg:px-20">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
        <span>{detail.breadcrumbs.solutions}</span>
        <span className="text-muted/40">/</span>
        <span>{detail.breadcrumbs.products}</span>
        <span className="text-muted/40">/</span>
        <span className="text-primary">{detail.product.title}</span>
      </div>

      {/* Title */}
      <div className="mb-12">
        <h1 className="text-4xl font-black leading-tight text-text md:text-6xl">{detail.product.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted md:text-lg">{detail.subtitle}</p>
      </div>

      {/* Gallery */}
      <div className="mb-16 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-12">
        <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-alt lg:col-span-8">
          <Image
            src={detail.product.images[0].src}
            alt={detail.product.images[0].alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:1024px)100vw,66vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:col-span-4 lg:grid-cols-1">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-alt">
            <Image
              src={detail.product.images[0].src}
              alt={detail.product.images[0].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:1024px)50vw,33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/5" />
          </div>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-alt">
            <Image
              src={detail.product.images[0].src}
              alt={detail.product.images[0].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:1024px)50vw,33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/5" />
          </div>
        </div>
      </div>

      {/* Specs + Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border border-border/50 bg-white p-6 shadow-sm md:p-8 lg:col-span-7">
          <h2 className="mb-8 inline-flex items-center gap-3 text-2xl font-black text-text">
            <span className="h-px w-8 bg-primary/40" />
            {localize(labels.specifications, currentLocale)}
          </h2>
          <div className="divide-y divide-border/50">
            {detail.product.specifications.map((spec) => (
              <div key={spec} className="py-4 text-sm leading-relaxed text-text transition-colors duration-300 hover:text-primary">
                {spec}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="rounded-2xl border border-border/50 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-3">

              <Link
                href={detail.actions.whatsapp.href}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-s font-bold !text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"              >
                <span>{detail.actions.whatsapp.label}</span>
                <ArrowIcon className={`${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href={detail.actions.quote.href}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border/50 px-6 py-3 text-sm font-bold transition-all duration-300 hover:border-text hover:bg-text hover:-translate-y-0.5"
              >
                <span className="text-text transition-colors duration-300 group-hover:text-white">{detail.actions.quote.label}</span>
                <ArrowIcon className={`text-text transition-all duration-300 group-hover:translate-x-1 group-hover:text-white ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-surface-alt/50 p-6 shadow-sm md:p-8">
            {detail.trust.map((item, index) => (
              <div
                key={item.title}
                className="mb-5 last:mb-0"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <p className="font-bold text-text">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-20">
        <div className="mb-10 flex items-center gap-6">
          <h3 className="text-2xl font-black text-text md:text-3xl">{detail.related.title}</h3>
          <span className="hidden h-px flex-1 bg-border/50 md:block" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {detail.related.items.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:1024px)50vw,33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">{item.category}</p>
                <h4 className="mb-4 flex-1 text-lg font-black text-text transition-colors duration-300 group-hover:text-primary">{item.title}</h4>
                <Link
                  href={toLocalizedPath(currentLocale, `/products/${item.slug}`)}
                  className="group/link inline-flex min-h-11 items-center gap-2 text-sm font-bold text-text transition-all duration-300 hover:text-primary"
                >
                  <span>{localize(labels.viewDetails, currentLocale)}</span>
                  <ArrowIcon className={`transition-transform duration-300 group-hover/link:translate-x-1 ${isRTL ? "rotate-180 group-hover/link:-translate-x-1" : ""}`} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}