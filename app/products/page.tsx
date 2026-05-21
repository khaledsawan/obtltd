import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { ProductsGridSection } from "@/components/sections/products-grid-section";
import { SectionShell } from "@/components/layout/section-shell";
import { createMetadata, getProducts, getProductsPage, getSiteConfig } from "@/lib/config";

const page = getProductsPage();

export const metadata = createMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: "/products",
});

export default function ProductsPage() {
  const products = getProducts();
  const categories = getSiteConfig().products.categories;

  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} description={page.hero.description} />
      <SectionShell>
        <div className="grid gap-8">
          <ul className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <li
                key={category}
                className="inline-flex min-h-11 items-center rounded-sm border border-border bg-surface px-4 py-2 text-sm font-bold text-text"
              >
                {category}
              </li>
            ))}
          </ul>
          <ProductsGridSection products={products} />
        </div>
      </SectionShell>
      <ContactCtaSection />
    </>
  );
}
