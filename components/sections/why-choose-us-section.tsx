import { ValueCard } from "@/components/cards/value-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { getCompany, getHomePage } from "@/lib/config";

export function WhyChooseUsSection() {
  const content = getHomePage().whyChooseUs;
  const values = getCompany().values;

  return (
    <SectionShell>
      <div className="grid gap-8">
        <SectionHeading title={content.title} description={content.description} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {values.map((value) => (
            <ValueCard key={value.title} value={value} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
