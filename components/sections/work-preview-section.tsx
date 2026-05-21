import { WorkCard } from "@/components/cards/work-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { getHomePage, getWorkItems } from "@/lib/config";

export function WorkPreviewSection() {
  const content = getHomePage().workPreview;
  const items = getWorkItems().slice(0, 4);

  return (
    <SectionShell muted>
      <div className="grid gap-8">
        <SectionHeading title={content.title} description={content.description} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
