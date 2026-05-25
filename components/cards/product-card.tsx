import Link from "next/link";
import { MediaFrame } from "@/components/shared/media-frame";
import type { Product } from "@/lib/config";
import { getSiteConfig, resolveLocale, toLocalizedPath } from "@/lib/config";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const labels = getSiteConfig().ui.labels;
  const locale = resolveLocale(getSiteConfig().site.locale);

  return (
    <article className="grid gap-4 rounded-sm border border-border bg-white p-4 shadow-[0_14px_35px_rgba(12,13,15,0.05)]">
      <MediaFrame
        src={product.image.src}
        alt={product.image.alt.ar ?? ""}
        className="aspect-[4/3]"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />
      <div className="grid gap-3">
        <p className="text-xs font-bold tracking-[0.18em] text-primary">{product.category.ar ?? ""}</p>
        <h3 className="text-xl font-black text-text">{product.title.ar ?? ""}</h3>
        <p className="text-sm leading-7 text-muted">{(product.specs?.[0] ? `${product.specs[0].label.ar ?? ""}: ${product.specs[0].value.ar ?? ""}` : "")}</p>
        <Link
          href={toLocalizedPath(locale, `/products/${product.slug}`)}
          className="inline-flex min-h-11 items-center text-sm font-bold text-text hover:text-primary"
        >
          {labels.viewDetails}
        </Link>
      </div>
    </article>
  );
}
