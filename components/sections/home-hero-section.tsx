import { SectionShell } from "@/components/layout/section-shell";
import { CtaLink } from "@/components/shared/cta-link";
import { MediaFrame } from "@/components/shared/media-frame";
import { getHomePage } from "@/lib/config";

export function HomeHeroSection() {
  const hero = getHomePage().hero;

  return (
    <SectionShell className="pb-8 pt-8 sm:pb-10 sm:pt-10 lg:pb-12 lg:pt-12">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="grid gap-6">
          <p className="text-sm font-bold tracking-[0.2em] text-primary">{hero.eyebrow}</p>
          <h1 className="text-balance max-w-3xl text-4xl leading-tight font-black text-text sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{hero.description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href={hero.primary.href} label={hero.primary.label} />
            <CtaLink href={hero.secondary.href} label={hero.secondary.label} variant="secondary" />
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {hero.highlights.map((highlight) => (
              <li
                key={highlight}
                className="min-h-11 rounded-sm border border-border bg-surface px-4 py-3 text-sm font-bold text-text"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <MediaFrame
          src={hero.media.src}
          alt={hero.media.alt}
          priority
          className="aspect-[4/4] min-h-[320px] sm:aspect-[4/3] lg:min-h-[540px]"
          sizes="(max-width: 1024px) 100vw, 42vw"
        />
      </div>
    </SectionShell>
  );
}
