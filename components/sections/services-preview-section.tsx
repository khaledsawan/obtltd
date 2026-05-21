import { ServiceCard } from "@/components/cards/service-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { getHomePage, getServices } from "@/lib/config";

export function ServicesPreviewSection() {
  const content = getHomePage().servicesPreview;
  const services = getServices();

  return (
    <SectionShell>
      <div className="grid gap-8">
        <SectionHeading title={content.title} description={content.description} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
