import { createMetadata, getDirection, getProductsPageV2, getProductsV2, resolveLocale, toLocalizedPath } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const currentLocale = resolveLocale(locale);
  const page = getProductsPageV2(currentLocale);
  return createMetadata({
    title: page.hero.title,
    description: page.hero.description,
    path: toLocalizedPath(currentLocale, "/products"),
  });
}

export default async function ProductsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const currentLocale = resolveLocale(locale);
  const page = getProductsPageV2(currentLocale);
  const products = getProductsV2(currentLocale);
  const dir = getDirection(currentLocale);

  return (
    <div dir={dir} lang={currentLocale} className="bg-background text-text">
      {/* HERO */}
      <section className="bg-white border-b border-border">
        <header className="mx-auto max-w-[1440px] px-6 pb-16 pt-28 lg:px-20 lg:pb-24 lg:pt-32">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {page.hero.eyebrow}
          </p>

          <h1 className="mb-6 text-4xl font-black leading-[1.1] md:text-5xl lg:text-6xl">
            {page.hero.title}
          </h1>

          <p className="max-w-3xl text-base leading-8 text-muted md:text-lg">
            {page.hero.description}
          </p>
        </header>
      </section>

      {/* PRODUCTS */}
      <section className="bg-[#f9f9f9] px-5 py-24 lg:px-20">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#e8e8e8] bg-white shadow-[0px_6px_18px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0px_20px_60px_rgba(0,0,0,0.12),0px_0px_30px_rgba(212,175,55,0.15)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f2f2f2]">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={product.slug === products[0]?.slug}
                />

                {product.badge ? (
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary">
                    {product.badge}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                  {product.category}
                </p>

                <h2 className="mb-4 text-2xl font-black transition-colors group-hover:text-primary">
                  {product.title}
                </h2>

                <div className="mb-6 grid gap-2">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between border-b border-[#eeeeee] pb-2 text-sm"
                    >
                      <span className="text-muted">{spec.label}</span>
                      <span className="font-bold text-text">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={toLocalizedPath(currentLocale, `/products/${product.slug}`)}
                  className="mt-auto inline-flex min-h-11 items-center justify-center rounded-md border border-text px-4 py-3 text-sm font-bold text-text transition-all hover:border-primary hover:bg-primary hover:text-black"
                >
                  {page.cardCta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary px-5 py-20 pb-28 md:pb-36 lg:px-20 text-black">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-3xl font-black">
              {page.catalogCta.title}
            </h2>
            <p className="text-base leading-8 text-black/80">
              {page.catalogCta.description}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href={page.catalogCta.primaryButton.href}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:scale-105 hover:bg-[#f9f9f9]"
            >
              {page.catalogCta.primaryButton.label}
            </Link>

            <Link
              href={page.catalogCta.secondaryButton.href}
              className="group relative inline-flex min-h-11 items-center justify-center rounded-md border border-black/60 px-6 py-3 text-sm font-bold text-black overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 scale-x-0 origin-left bg-black transition-transform duration-300 group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                {page.catalogCta.secondaryButton.label}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
