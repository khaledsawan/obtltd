import { ContactActionsSection } from "@/components/sections/contact-actions-section";
import { ContactDetailsSection } from "@/components/sections/contact-details-section";
import { PageHero } from "@/components/sections/page-hero";
import { createMetadata, getContactPage } from "@/lib/config";

const page = getContactPage();

export const metadata = createMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} description={page.hero.description} />
      <ContactDetailsSection />
      <ContactActionsSection />
    </>
  );
}
