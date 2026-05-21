import Image from "next/image";
import { normalizeAssetPath } from "@/lib/config";

type MediaFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function MediaFrame({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: MediaFrameProps) {
  const normalizedSrc = normalizeAssetPath(src);

  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-border bg-surface shadow-[0_16px_45px_rgba(12,13,15,0.08)] ${className}`.trim()}
    >
      <Image
        src={normalizedSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
