import { WorkCard } from "@/components/cards/work-card";
import { getWorkItems } from "@/lib/config";

export function WorkGallerySection() {
  const items = getWorkItems();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <WorkCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
