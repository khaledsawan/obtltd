import type { Metadata } from "next";
import "./globals.css";
import {
  createMetadata,
  getOrganizationStructuredData,
  getSiteConfig,
  getSiteTheme,
} from "@/lib/config";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const config = getSiteConfig();
const theme = getSiteTheme();

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationStructuredData = getOrganizationStructuredData();

  return (
    <html
      lang={config.site.locale}
      dir={config.site.direction}
      className="h-full antialiased"
      style={
        {
          "--background": theme.colors.background,
          "--surface": theme.colors.surface,
          "--surface-alt": theme.colors.surfaceAlt,
          "--navbar": theme.colors.navbar,
          "--primary": theme.colors.primary,
          "--text": theme.colors.text,
          "--muted": theme.colors.muted,
          "--border": theme.colors.border,
          "--accent-soft": theme.colors.accentSoft,
          "--font-ar": config.ui.fonts.ar,
          "--font-en": config.ui.fonts.en,
        } as React.CSSProperties
      }
    >
      <body className="min-h-full bg-background text-text">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
      </body>
    </html>
  );
}
