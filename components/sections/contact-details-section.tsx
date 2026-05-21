import { ContactList } from "@/components/shared/contact-list";
import { SectionShell } from "@/components/layout/section-shell";
import { getContactPage, getSiteConfig } from "@/lib/config";

export function ContactDetailsSection() {
  const page = getContactPage();
  const config = getSiteConfig();

  return (
    <SectionShell>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <h2 className="text-3xl font-black text-text">{config.ui.labels.contactInfo}</h2>
          <p className="text-base leading-8 text-muted">{page.hero.description}</p>
        </div>
        <div className="rounded-sm border border-border bg-surface p-6">
          <ContactList />
        </div>
      </div>
    </SectionShell>
  );
}
