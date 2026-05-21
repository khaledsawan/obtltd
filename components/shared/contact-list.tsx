import { getSiteConfig, toMailHref, toPhoneHref, toWhatsappHref } from "@/lib/config";

export function ContactList() {
  const config = getSiteConfig();
  const labels = config.ui.labels;
  const contact = config.company.contact;

  return (
    <dl className="grid gap-4 text-sm sm:text-base">
      <div className="grid gap-1">
        <dt className="font-bold text-text">{labels.address}</dt>
        <dd className="text-muted">{contact.address}</dd>
      </div>
      <div className="grid gap-1">
        <dt className="font-bold text-text">{labels.phone}</dt>
        <dd className="grid gap-2 text-muted">
          <a href={toPhoneHref(contact.phones.sales)} className="hover:text-primary">
            {contact.phones.sales}
          </a>
          <a href={toPhoneHref(contact.phones.inquiries)} className="hover:text-primary">
            {contact.phones.inquiries}
          </a>
        </dd>
      </div>
      <div className="grid gap-1">
        <dt className="font-bold text-text">{labels.email}</dt>
        <dd>
          <a href={toMailHref(contact.email)} className="text-muted hover:text-primary">
            {contact.email}
          </a>
        </dd>
      </div>
      <div className="grid gap-1">
        <dt className="font-bold text-text">{labels.whatsapp}</dt>
        <dd>
          <a href={toWhatsappHref(contact.whatsapp)} className="text-muted hover:text-primary">
            {contact.whatsapp}
          </a>
        </dd>
      </div>
    </dl>
  );
}
