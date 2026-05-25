"use client";

import { getHeaderActions, getNavigation, resolveLocale } from "@/lib/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden>
      <path strokeLinecap="round" d="M12 4v10" />
      <path strokeLinecap="round" d="M8 10l4 4 4-4" />
      <path strokeLinecap="round" d="M5 20h14" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const locale = resolveLocale(pathname.split("/")[1]);
  const nav = useMemo(() => getNavigation(locale), [locale]);
  const actions = useMemo(() => getHeaderActions(locale), [locale]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur shadow-[0px_10px_30px_rgba(26,26,26,0.04)]">
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-4 px-5 lg:px-20">
        <Link href={`/${locale}`} className="text-2xl font-black tracking-tight text-text" onClick={() => setOpen(false)}>
          OBT Ltd
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {nav.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative transition-all duration-300 ${active
                  ? "text-lg font-black text-primary"
                  : "text-sm font-semibold text-muted hover:text-primary"
                  }`}
              >
                {item.label}

                {active && (
                  <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={actions.whatsapp.href}
            className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary px-4 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-black"
          >
            <WhatsappIcon />
            <span>{actions.whatsapp.label}</span>
          </Link>
          <Link
            href={actions.catalog.href}
            className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold !text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
          >
            <span>{actions.catalog.label}</span>
            <DownloadIcon />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-text transition-colors hover:bg-surface-alt md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-border bg-white px-5 py-4 md:hidden" aria-label="Mobile navigation">
          <ul className="grid gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`inline-flex min-h-11 w-full items-center rounded-lg border px-4 transition-all ${pathname === item.href
                    ? "border-primary text-base font-bold text-primary"
                    : "border-border text-sm font-semibold text-text hover:border-primary/30 hover:text-primary"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={actions.whatsapp.href}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-black"
              >
                <WhatsappIcon />
                <span>{actions.whatsapp.label}</span>
              </Link>
            </li>
            <li>
              <Link
                href={actions.catalog.href}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold !text-white"
              >
                <span>{actions.catalog.label}</span>
                <DownloadIcon />
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}