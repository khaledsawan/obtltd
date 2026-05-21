import Link from "next/link";
import { MediaFrame } from "@/components/shared/media-frame";
import type { Product } from "@/lib/config";
import { getSiteConfig } from "@/lib/config";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const labels = getSiteConfig().ui.labels;

  return (
    <article className="grid gap-4 rounded-sm border border-border bg-white p-4 shadow-[0_14px_35px_rgba(12,13,15,0.05)]">
      <MediaFrame
        src={product.images[0].src}
        alt={product.images[0].alt}
        className="aspect-[4/3]"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />
      <div className="grid gap-3">
        <p className="text-xs font-bold tracking-[0.18em] text-primary">{product.category}</p>
        <h3 className="text-xl font-black text-text">{product.title}</h3>
        <p className="text-sm leading-7 text-muted">{product.summary}</p>
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex min-h-11 items-center text-sm font-bold text-text hover:text-primary"
        >
          {labels.viewDetails}
        </Link>
      </div>
    </article>
  );
}
