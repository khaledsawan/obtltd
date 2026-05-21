import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ProductDetailSections } from "@/components/sections/product-detail-sections";
import {
  createMetadata,
  getBreadcrumbStructuredData,
  getProductBySlug,
  getProductSlugs,
  getProductStructuredData,
} from "@/lib/config";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return createMetadata();
  }

  return createMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/products/${product.slug}`,
    image: product.images[0].src,
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productStructuredData = getProductStructuredData(product);
  const breadcrumbStructuredData = getBreadcrumbStructuredData([
    { name: "الرئيسية", path: "/" },
    { name: "المنتجات", path: "/products" },
    { name: product.title, path: `/products/${product.slug}` },
  ]);

  return (
    <>
      <ProductDetailSections product={product} />
      <ContactCtaSection />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
    </>
  );
}
