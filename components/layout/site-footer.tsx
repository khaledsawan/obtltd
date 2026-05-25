"use client";

import { getFooter, resolveLocale } from "@/lib/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function GroupsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M16 11a4 4 0 1 0-8 0" />
      <path d="M4 20c0-3 3-5 8-5s8 2 8 5" />
      <circle cx="12" cy="7" r="3" />
    </svg>
  );
}

function CorporateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21v-4h6v4" />
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </svg>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const locale = resolveLocale(pathname.split("/")[1]);
  const footer = useMemo(() => getFooter(locale), [locale]);

  const iconMap: Record<string, React.ReactNode> = {
    mail: <MailIcon />,
    location_on: <LocationIcon />,
    public: <GlobeIcon />,
    groups: <GroupsIcon />,
    corporate_fare: <CorporateIcon />,
  };

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-20">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Summary */}
          <div className="md:col-span-2">
            <h2 className="mb-6 text-3xl font-black text-text">OBT Ltd</h2>
            <p className="max-w-md leading-7 text-muted">
              {footer.summary}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-text">
              {footer.quickLinksTitle}
            </h4>

            <ul className="space-y-4">
              {footer.quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-text">
              {footer.contactTitle}
            </h4>

            <div className="space-y-4 text-muted">
              {footer.contacts.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary">
                    {iconMap[item.icon]}
                  </span>

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-primary"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
          <span className="text-center text-sm text-muted md:text-left">
            {footer.legal}
          </span>
        </div>
      </div>
    </footer>
  );
}