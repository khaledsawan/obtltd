import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/layout/section-shell";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <SectionShell className="border-b border-border/70 bg-surface">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
    </SectionShell>
  );
}
