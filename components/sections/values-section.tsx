import { ValueCard } from "@/components/cards/value-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { getCompany, getSiteConfig } from "@/lib/config";

export function ValuesSection() {
  const values = getCompany().values;
  const labels = getSiteConfig().ui.labels;

  return (
    <SectionShell>
      <div className="grid gap-8">
        <SectionHeading title={labels.whyChooseUs} description="قيمنا توجه طريقة الاختيار والتوريد والمتابعة في كل مشروع نعمل عليه." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {values.map((value) => (
            <ValueCard key={value.title} value={value} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
