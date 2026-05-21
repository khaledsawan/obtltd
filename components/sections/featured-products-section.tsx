import { ProductCard } from "@/components/cards/product-card";
import { CtaLink } from "@/components/shared/cta-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { getFeaturedProducts, getSiteConfig } from "@/lib/config";

export function FeaturedProductsSection() {
  const config = getSiteConfig();
  const products = getFeaturedProducts().slice(0, 6);

  return (
    <SectionShell muted>
      <div className="grid gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title={config.ui.labels.featuredProducts}
            description="مجموعة مختارة من أبرز المنتجات التي تعكس طبيعة حلولنا الصناعية والتجارية."
          />
          <CtaLink href="/products" label={config.ui.labels.viewAllProducts} variant="secondary" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
