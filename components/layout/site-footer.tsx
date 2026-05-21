import { ContactList } from "@/components/shared/contact-list";
import { getFooter, getSiteConfig } from "@/lib/config";
import Link from "next/link";

export function SiteFooter() {
  const config = getSiteConfig();
  const footer = getFooter();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:px-8">
        <section className="grid gap-4">
          <h2 className="text-xl font-black text-text">{config.company.name}</h2>
          <p className="max-w-xl text-sm leading-7 text-muted">{footer.summary}</p>
        </section>

        <section className="grid gap-4">
          <h2 className="text-lg font-black text-text">{config.ui.labels.quickLinks}</h2>
          <ul className="grid gap-3 text-sm text-muted">
            {footer.quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-4">
          <h2 className="text-lg font-black text-text">{config.ui.labels.contactInfo}</h2>
          <ContactList />
        </section>
      </div>
      <div className="border-t border-border/80 px-4 py-4 text-center text-sm text-muted sm:px-6 lg:px-8">
        {footer.legal}
      </div>
    </footer>
  );
}
