import { MediaFrame } from "@/components/shared/media-frame";
import { SectionShell } from "@/components/layout/section-shell";
import { getCompany } from "@/lib/config";

export function VisionMissionSection() {
  const company = getCompany();
  const blocks = [company.vision, company.mission];

  return (
    <SectionShell muted>
      <div className="grid gap-6 md:grid-cols-2">
        {blocks.map((block) => (
          <article key={block.title} className="grid gap-4 rounded-sm border border-border bg-white p-5">
            <MediaFrame
              src={block.image.src}
              alt={block.image.alt}
              className="aspect-[4/3]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="grid gap-2">
              <h2 className="text-2xl font-black text-text">{block.title}</h2>
              <p className="text-base leading-8 text-muted">{block.text}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
