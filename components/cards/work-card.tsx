import { MediaFrame } from "@/components/shared/media-frame";
import type { WorkItem } from "@/lib/config";

type WorkCardProps = {
  item: WorkItem;
};

export function WorkCard({ item }: WorkCardProps) {
  return (
    <article className="grid gap-4 rounded-sm border border-border bg-white p-4 shadow-[0_14px_35px_rgba(12,13,15,0.05)]">
      <MediaFrame
        src={item.image.src}
        alt={item.image.alt}
        className="aspect-[4/3]"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
      />
      <div className="grid gap-2">
        <h3 className="text-xl font-black text-text">{item.title}</h3>
        <p className="text-sm leading-7 text-muted">{item.description}</p>
      </div>
    </article>
  );
}
