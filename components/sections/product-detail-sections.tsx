import { MediaFrame } from "@/components/shared/media-frame";
import { ProductCard } from "@/components/cards/product-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaLink } from "@/components/shared/cta-link";
import { SectionShell } from "@/components/layout/section-shell";
import { getRelatedProducts, getSiteConfig, type Product } from "@/lib/config";

type ProductDetailSectionsProps = {
  product: Product;
};

export function ProductDetailSections({ product }: ProductDetailSectionsProps) {
  const labels = getSiteConfig().ui.labels;
  const related = getRelatedProducts(product.slug);

  return (
    <>
      <SectionShell className="border-b border-border/70 bg-surface">
        <div className="grid gap-6">
          <Breadcrumbs
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "المنتجات", href: "/products" },
              { label: product.title },
            ]}
          />
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <MediaFrame
              src={product.images[0].src}
              alt={product.images[0].alt}
              priority
              className="aspect-[4/3] min-h-[320px]"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="grid gap-5">
              <p className="text-sm font-bold tracking-[0.2em] text-primary">{product.category}</p>
              <h1 className="text-balance text-4xl leading-tight font-black text-text sm:text-5xl">
                {product.title}
              </h1>
              <p className="text-base leading-8 text-muted sm:text-lg">{product.description}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/contact" label={getSiteConfig().pages.shared.contactCta.primary.label} />
                <CtaLink href="/products" label={labels.backToProducts} variant="secondary" />
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-sm border border-border bg-white p-5">
            <h2 className="mb-4 text-2xl font-black text-text">{labels.features}</h2>
            <ul className="grid gap-3 text-sm leading-7 text-muted">
              {product.features.map((feature) => (
                <li key={feature}>- {feature}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-sm border border-border bg-white p-5">
            <h2 className="mb-4 text-2xl font-black text-text">{labels.uses}</h2>
            <ul className="grid gap-3 text-sm leading-7 text-muted">
              {product.uses.map((use) => (
                <li key={use}>- {use}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-sm border border-border bg-white p-5">
            <h2 className="mb-4 text-2xl font-black text-text">{labels.specifications}</h2>
            <ul className="grid gap-3 text-sm leading-7 text-muted">
              {product.specifications.map((specification) => (
                <li key={specification}>- {specification}</li>
              ))}
            </ul>
          </article>
        </div>
      </SectionShell>

      {related.length ? (
        <SectionShell muted>
          <div className="grid gap-8">
            <h2 className="text-3xl font-black text-text">{labels.relatedProducts}</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </SectionShell>
      ) : null}
    </>
  );
}
