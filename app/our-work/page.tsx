import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { WorkGallerySection } from "@/components/sections/work-gallery-section";
import { SectionShell } from "@/components/layout/section-shell";
import { createMetadata, getWorkPage, getSiteConfig } from "@/lib/config";

const page = getWorkPage();

export const metadata = createMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: "/our-work",
});

export default function WorkPage() {
  const labels = getSiteConfig().ui.labels;

  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} description={page.hero.description} />
      <SectionShell>
        <div className="grid gap-8">
          <h2 className="text-3xl font-black text-text">{labels.partners}</h2>
          <WorkGallerySection />
        </div>
      </SectionShell>
      <ContactCtaSection />
    </>
  );
}
