import { createMetadata, getDirection, getHomePageV2, resolveLocale, toLocalizedPath } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

type Params = { locale: string };

const isRemoteSrc = (src: string) => /^https?:\/\//.test(src);

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden>
      <path strokeLinecap="round" d="M12 4v10" />
      <path strokeLinecap="round" d="M8 10l4 4 4-4" />
      <path strokeLinecap="round" d="M5 20h14" />
    </svg>
  );
}

function ContactIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "map-pin":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    default:
      return <CheckIcon />;
  }
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-primary shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M8 12.5l2.3 2.3L16 9.8" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <path strokeLinecap="round" d="M4 12l16-8-5 16-3-6-8-2z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 ${className || ""}`} aria-hidden>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const currentLocale = resolveLocale(locale);
  const page = getHomePageV2(currentLocale);

  return createMetadata({
    title: page.hero.title,
    description: page.hero.description,
    path: toLocalizedPath(currentLocale, "/"),
    image: page.hero.media.src,
  });
}

export default async function LocalizedHomePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const currentLocale = resolveLocale(locale);
  const page = getHomePageV2(currentLocale);
  const dir = getDirection(currentLocale);
  const isRTL = dir === "rtl";

  return (
    <div dir={dir} lang={currentLocale} className="overflow-x-hidden bg-background text-text">

      {/* Hero */}
      <section className="relative flex min-h-[870px] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={page.hero.media.src}
            alt={page.hero.media.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized={isRemoteSrc(page.hero.media.src)}
          />
          <div className={`absolute inset-0 ${isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-white via-white/80 to-transparent`} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 lg:px-20">
          <div className="max-w-2xl">
            <span className="mb-6 inline-block text-xs font-bold uppercase tracking-[0.14em] text-primary">
              {page.hero.eyebrow}
            </span>
            <h1 className="mb-8 text-4xl font-black leading-tight text-text md:text-6xl">{page.hero.title}</h1>
            <p className="mb-12 max-w-lg text-base leading-8 text-muted md:text-lg">{page.hero.description}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={page.hero.primary.href}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-10 py-4 text-sm font-bold !text-white shadow-sm transition-all hover:opacity-90"
              >
                <span>{page.hero.primary.label}</span>
                <DownloadIcon />
              </Link>
              <Link href={page.hero.secondary.href} className="group inline-flex min-h-11 items-center rounded-lg border border-text px-10 py-4 text-sm font-bold text-surfacez transition-all hover:bg-text">
                <span className="transition-colors duration-300 group-hover:text-white">{page.hero.secondary.label}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto w-full max-w-[1440px] px-5 py-20 md:py-28 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src={page.about.media.src} alt={page.about.media.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" unoptimized={isRemoteSrc(page.about.media.src)} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 right-0 w-48 rounded-2xl border border-border/60 bg-white/90 backdrop-blur-sm p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:w-56 md:-right-3">
              <p className="mb-1 text-3xl font-black text-primary md:text-4xl">{page.about.stats.value}</p>
              <p className="text-xs text-muted leading-relaxed">{page.about.stats.text}</p>
            </div>
            <div className="absolute -top-4 -left-4 -z-10 h-32 w-32 rounded-2xl bg-primary/10 md:-top-6 md:-left-6" />
          </div>

          <div>
            <span className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <span className="h-px w-10 bg-primary" />
              {page.about.eyebrow || "About Us"}
            </span>
            <h2 className="mb-6 text-3xl font-black leading-tight text-text md:text-4xl lg:text-5xl">{page.about.title}</h2>
            <p className="mb-10 text-base leading-8 text-muted">{page.about.description}</p>
            <ul className="space-y-4">
              {page.about.bullets.map((item, index) => (
                <li key={item.title} className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-surface-alt/80" style={{ transitionDelay: `${index * 50}ms` }}>
                  <span className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <CheckIcon />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-text transition-colors duration-300 group-hover:text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="relative overflow-hidden bg-surface px-5 py-20 md:py-28 lg:px-20">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, black 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="relative mx-auto w-full max-w-[1440px]">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <span className="h-px w-8 bg-primary/40" />
              {page.services.eyebrow}
              <span className="h-px w-8 bg-primary/40" />
            </span>
            <h2 className="text-3xl font-black text-text md:text-4xl lg:text-5xl">{page.services.title}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.services.list.map((item, index) => (
              <article
                key={item.title}
                className="group relative rounded-2xl border border-border bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20"
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-primary scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                <span className="mb-6 block text-4xl font-black text-primary/50 transition-all duration-300 group-hover:text-primary/20">0{index + 1}</span>
                <h3 className="mb-4 text-xl font-black text-text transition-colors duration-300 group-hover:text-primary">{item.title}</h3>
                <p className="text-sm leading-7 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="mx-auto w-full max-w-[1440px] px-5 py-20 md:py-28 lg:px-20">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-primary">
            <span className="h-px w-8 bg-primary/40" />
            {page.featured.eyebrow}
            <span className="h-px w-8 bg-primary/40" />
          </span>
          <h2 className="text-3xl font-black text-text md:text-4xl lg:text-5xl">{page.featured.title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {page.featured.list.map((item, index) => (
            <article
              key={item.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized={isRemoteSrc(item.image.src)} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute top-4 left-4 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-text">Featured</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 text-xl font-black text-text transition-colors duration-300 group-hover:text-primary">{item.title}</h3>
                <p className="mb-8 flex-1 text-sm leading-7 text-muted">{item.description}</p>
                <Link href={item.href} className="group/link relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-5 py-3 text-s font-bold !text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <span className="relative z-10">{page.featured.cta}</span>
                  <ArrowIcon className={`relative z-10 transition-transform duration-300 group-hover/link:translate-x-1 ${isRTL ? "rotate-180 group-hover/link:-translate-x-1" : ""}`} />
                  <span className="absolute inset-0 bg-black/10 scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="relative overflow-hidden bg-text px-5 py-20 md:py-28 text-white lg:px-20">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {page.metrics.map((item, index) => (
            <div key={item.label} className="group relative" style={{ transitionDelay: `${index * 75}ms` }}>
              {index > 0 && <div className="absolute top-1/2 -translate-y-1/2 left-0 hidden h-12 w-px bg-white/10 md:block" />}
              <p className="mb-3 text-4xl font-black text-primary transition-all duration-300 group-hover:scale-110 md:text-5xl">{item.value}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-white/40 transition-colors duration-300 group-hover:text-white/80">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto w-full max-w-[1440px] px-5 py-20 md:py-28 lg:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <span className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <span className="h-px w-8 bg-primary/40" />
              {page.contact.eyebrow || "Get in Touch"}
            </span>
            <h2 className="mb-6 text-3xl font-black leading-tight text-text md:text-4xl lg:text-5xl">{page.contact.title}</h2>
            <p className="mb-12 text-base leading-8 text-muted">{page.contact.description}</p>

            <div className="mb-12 space-y-4">
              {page.contact.details.map((item) => (
                <div key={item.label} className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <ContactIcon icon={item.icon} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">{item.label}</p>
                    <p className="mt-0.5 text-sm text-muted">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-surface-alt p-6 transition-all duration-300 hover:shadow-md md:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <SendIcon />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-text">{page.contact.catalogCard.title}</h3>
                  <p className="text-sm text-muted">{page.contact.catalogCard.text}</p>
                </div>
              </div>
              <Link href={page.contact.catalogCard.button.href} className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-m font-bold !text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5">
                <SendIcon />
                <span>{page.contact.catalogCard.button.label}</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-white p-6 shadow-sm md:p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {page.contact.form.fields.slice(0, 2).map((field) => (
                  <label key={field.label} className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{field.label}</span>
                    <input type={field.type} className="min-h-12 w-full rounded-xl border border-border/50 bg-surface px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted/40 hover:border-primary/30" placeholder={field.placeholder} />
                  </label>
                ))}
              </div>

              {page.contact.form.fields.slice(2).map((field) =>
                field.type === "textarea" ? (
                  <label key={field.label} className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{field.label}</span>
                    <textarea className="min-h-32 w-full rounded-xl border border-border/50 bg-surface px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted/40 hover:border-primary/30 resize-none" placeholder={field.placeholder} />
                  </label>
                ) : (
                  <label key={field.label} className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{field.label}</span>
                    <input type={field.type} className="min-h-12 w-full rounded-xl border border-border/50 bg-surface px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted/40 hover:border-primary/30" placeholder={field.placeholder} />
                  </label>
                ),
              )}

              <button type="button" className="group min-h-12 w-full rounded-xl bg-text px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-text/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                {page.contact.form.submit}
              </button>
            </form>

            <div className="mt-8 border-t border-border/50 pt-8">
              <Link href={page.contact.map.href} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <iframe
                    src={page.contact.map.mapUrl}
                    width="100%"
                    height="100%"
                    className="absolute inset-0 border-0 transition-transform duration-700 hover:scale-105"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={page.contact.map.alt}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}