import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { getCompany, getHomePage } from "@/lib/config";

export function CompanyIntroSection() {
  const company = getCompany();
  const intro = getHomePage().intro;

  return (
    <SectionShell muted>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading title={intro.title} description={intro.description} />
        <div className="grid gap-4 rounded-sm border border-border bg-white p-6">
          <p className="text-base leading-8 text-muted">{company.about.summary}</p>
          <p className="text-base leading-8 text-muted">{company.about.foundation}</p>
          <p className="text-base leading-8 text-text">{company.about.core}</p>
        </div>
      </div>
    </SectionShell>
  );
}
