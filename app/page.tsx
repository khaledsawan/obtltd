import { CompanyIntroSection } from "@/components/sections/company-intro-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { HomeHeroSection } from "@/components/sections/home-hero-section";
import { ServicesPreviewSection } from "@/components/sections/services-preview-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { WorkPreviewSection } from "@/components/sections/work-preview-section";
import { createMetadata, getHomePage } from "@/lib/config";

export const metadata = createMetadata({
  title: getHomePage().seo.title,
  description: getHomePage().seo.description,
  path: "/",
  image: getHomePage().hero.media.src,
});

export default function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <CompanyIntroSection />
      <WhyChooseUsSection />
      <FeaturedProductsSection />
      <ServicesPreviewSection />
      <WorkPreviewSection />
      <ContactCtaSection />
    </>
  );
}
