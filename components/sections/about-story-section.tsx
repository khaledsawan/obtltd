import { MediaFrame } from "@/components/shared/media-frame";
import { SectionShell } from "@/components/layout/section-shell";
import { getCompany } from "@/lib/config";

export function AboutStorySection() {
  const about = getCompany().about;

  return (
    <SectionShell>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <MediaFrame
          src={about.image.src}
          alt={about.image.alt}
          className="aspect-[4/3] min-h-[300px]"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        <div className="grid gap-4">
          <h2 className="text-3xl font-black text-text sm:text-4xl">{about.title}</h2>
          <p className="text-base leading-8 text-muted">{about.summary}</p>
          <p className="text-base leading-8 text-muted">{about.foundation}</p>
          <p className="text-base leading-8 text-muted">{about.description}</p>
          <p className="text-base leading-8 text-text">{about.core}</p>
        </div>
      </div>
    </SectionShell>
  );
}
