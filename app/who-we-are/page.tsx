import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { AboutStorySection } from "@/components/sections/about-story-section";
import { PageHero } from "@/components/sections/page-hero";
import { ValuesSection } from "@/components/sections/values-section";
import { VisionMissionSection } from "@/components/sections/vision-mission-section";
import { createMetadata, getAboutPage } from "@/lib/config";

const page = getAboutPage();

export const metadata = createMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: "/who-we-are",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} description={page.hero.description} />
      <AboutStorySection />
      <VisionMissionSection />
      <ValuesSection />
      <ContactCtaSection />
    </>
  );
}
