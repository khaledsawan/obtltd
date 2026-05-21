import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesGridSection } from "@/components/sections/services-grid-section";
import { SectionShell } from "@/components/layout/section-shell";
import { createMetadata, getServicesPage, getSiteConfig } from "@/lib/config";

const page = getServicesPage();

export const metadata = createMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: "/services",
});

export default function ServicesPage() {
  const labels = getSiteConfig().ui.labels;

  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} description={page.hero.description} />
      <SectionShell>
        <ServicesGridSection />
      </SectionShell>
      <SectionShell muted>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-3">
            <p className="text-sm font-bold tracking-[0.2em] text-primary">{labels.serviceApproach}</p>
            <h2 className="text-3xl font-black text-text sm:text-4xl">{page.process.title}</h2>
          </div>
          <ol className="grid gap-4">
            {page.process.steps.map((step, index) => (
              <li key={step} className="rounded-sm border border-border bg-white p-5 text-base leading-8 text-muted">
                <span className="mb-2 block text-sm font-bold tracking-[0.18em] text-primary">
                  {`0${index + 1}`}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </SectionShell>
      <ContactCtaSection />
    </>
  );
}
