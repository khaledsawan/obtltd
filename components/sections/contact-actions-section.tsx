import { SectionShell } from "@/components/layout/section-shell";
import {
  getContactActions,
  getSiteConfig,
  toMailHref,
  toPhoneHref,
  toWhatsappHref,
  type ContactAction,
} from "@/lib/config";

function getActionHref(action: ContactAction) {
  if (action.type === "email") {
    return toMailHref(action.value);
  }
  if (action.type === "whatsapp") {
    return toWhatsappHref(action.value);
  }

  return toPhoneHref(action.value);
}

export function ContactActionsSection() {
  const actions = getContactActions();
  const labels = getSiteConfig().ui.labels;

  return (
    <SectionShell muted>
      <div className="grid gap-8">
        <div className="grid gap-3">
          <p className="text-sm font-bold tracking-[0.2em] text-primary">{labels.contactUs}</p>
          <h2 className="text-3xl font-black text-text sm:text-4xl">قنوات تواصل مباشرة وسريعة</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => (
            <a
              key={`${action.type}-${action.value}`}
              href={getActionHref(action)}
              className="grid min-h-44 gap-4 rounded-sm border border-border bg-white p-5 shadow-[0_14px_35px_rgba(12,13,15,0.05)] hover:border-primary"
            >
              <p className="text-sm font-bold tracking-[0.14em] text-primary">{action.label}</p>
              <p className="self-end text-xl font-black text-text">{action.value}</p>
            </a>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
