import { ServiceCard } from "@/components/cards/service-card";
import { getServices } from "@/lib/config";

export function ServicesGridSection() {
  const services = getServices();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
