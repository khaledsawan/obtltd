import { ProductCard } from "@/components/cards/product-card";
import type { Product } from "@/lib/config";

type ProductsGridSectionProps = {
  products: Product[];
};

export function ProductsGridSection({ products }: ProductsGridSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
