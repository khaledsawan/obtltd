"use client";

import { getNavigation, getSiteConfig } from "@/lib/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navigation = getNavigation();
  const config = getSiteConfig();

  return (
    <header className="sticky top-0 z-50 border-b border-primary/40 bg-navbar/95 text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-primary bg-white/5 text-primary">
            OBT
          </span>
          <div className="grid gap-1">
            <span className="text-sm font-black text-primary">{config.company.name}</span>
            <span className="text-xs text-white/70">{config.company.tagline}</span>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-primary px-3 py-2 text-sm font-bold text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? "إغلاق" : "القائمة"}
        </button>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-2">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex min-h-11 items-center rounded-sm border px-4 py-2 text-sm font-bold ${active
                        ? "border-primary bg-primary text-white"
                        : "border-transparent text-white/85 hover:border-primary hover:text-primary"
                      }`.trim()}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-primary/40 bg-navbar md:hidden"
        >
          <ul className="mx-auto grid w-full max-w-7xl gap-1 px-4 py-3 sm:px-6">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`inline-flex min-h-11 w-full items-center justify-between rounded-sm border px-4 py-3 text-sm font-bold ${active
                        ? "border-primary bg-primary text-white"
                        : "border-border text-white hover:border-primary hover:text-primary"
                      }`.trim()}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
