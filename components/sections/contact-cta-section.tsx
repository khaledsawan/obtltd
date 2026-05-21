import { CtaLink } from "@/components/shared/cta-link";
import { SectionShell } from "@/components/layout/section-shell";
import { getSharedPageContent } from "@/lib/config";

export function ContactCtaSection() {
  const cta = getSharedPageContent().contactCta;

  return (
    <SectionShell>
      <div className="grid gap-8 rounded-sm border border-border bg-navbar px-6 py-8 text-white sm:px-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
        <div className="grid gap-4">
          <p className="text-sm font-bold tracking-[0.2em] text-primary">{cta.eyebrow}</p>
          <h2 className="text-balance text-3xl leading-tight font-black text-white sm:text-4xl lg:text-5xl">
            {cta.title}
          </h2>
          <p className="max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{cta.description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:justify-self-end">
          <CtaLink href={cta.primary.href} label={cta.primary.label} className="bg-primary text-white" />
          <CtaLink
            href={cta.secondary.href}
            label={cta.secondary.label}
            variant="secondary"
            className="border-white/30 bg-white/5 text-white hover:border-primary hover:text-primary"
          />
        </div>
      </div>
    </SectionShell>
  );
}
