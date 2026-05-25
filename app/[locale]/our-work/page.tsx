import { createMetadata, getDirection, getWorkPageV2, resolveLocale, toLocalizedPath } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

type Params = { locale: string };
const isRemoteSrc = (src: string) => /^https?:\/\//.test(src);

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const currentLocale = resolveLocale(locale);
  const page = getWorkPageV2(currentLocale);

  return createMetadata({
    title: page.hero.title,
    description: page.hero.description,
    path: toLocalizedPath(currentLocale, "/our-work"),
    image: page.projects[0]?.image.src,
  });
}

export default async function LocalizedWorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  const currentLocale = resolveLocale(locale);
  const page = getWorkPageV2(currentLocale);
  const dir = getDirection(currentLocale);

  return (
    <div
      dir={dir}
      lang={currentLocale}
      className="overflow-x-hidden bg-background text-text"
    >
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface pt-28 pb-24 px-5 lg:px-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <span className="mb-6 inline-flex items-center rounded-full bg-surface-alt px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {page.hero.eyebrow}
          </span>

          <h1 className="mb-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            {page.hero.title.split(page.hero.highlight)[0]}
            <span className="text-primary"> {page.hero.highlight}</span>
          </h1>

          <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
            {page.hero.description}
          </p>

          <div className="mt-10 h-[2px] w-28 bg-primary opacity-80" />
        </div>

        {/* soft background glow */}
        <div className="pointer-events-none absolute -top-40 right-[-120px] h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
      </section>

      {/* PROJECTS */}
      <section className="bg-background">
        {page.projects.map((project, index) => {
          const reverse = index % 2 === 1;
          const isEven = index % 2 === 0;

          return (
            <div
              key={project.title}
              className={`px-5 py-28 lg:px-20 ${isEven ? "bg-white" : "bg-[#f9f9f9]"
                }`}
            >
              <div
                className={`mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 md:gap-24 ${reverse ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
              >
                {/* IMAGE */}
                <div className="group w-full md:w-3/5 overflow-hidden rounded-lg border border-border bg-white shadow-[0px_10px_30px_rgba(26,26,26,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0px_25px_70px_rgba(0,0,0,0.12)]">
                  <div className="relative aspect-[1.65/1] overflow-hidden">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      unoptimized={isRemoteSrc(project.image.src)}
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* TEXT */}
                <div className="w-full md:w-2/5">
                  <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {project.category}
                  </span>

                  <h2 className="mb-6 text-3xl font-black md:text-4xl">
                    {project.title}
                  </h2>

                  <p className="mb-10 text-sm leading-8 text-muted md:text-base">
                    {project.description}
                  </p>

                  <Link
                    href={project.caseCta.href}
                    className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] transition-all hover:text-primary"
                  >
                    <span className="relative">
                      {project.caseCta.label}
                      <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>

                    <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="bg-text px-5 py-24 pb-32 md:pb-40 text-white lg:px-20">
        <div className="mx-auto w-full max-w-[1440px] text-center">
          <h3 className="mb-6 text-3xl font-black md:text-4xl">
            {page.cta.title}
          </h3>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            {page.cta.description}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href={page.cta.primary.href}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-black transition-all hover:scale-105 hover:opacity-90"
            >
              {page.cta.primary.label}
            </Link>

            <Link
              href={page.cta.secondary.href}
              className="group relative inline-flex min-h-11 items-center justify-center rounded-md border border-white/50 px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 scale-x-0 origin-left bg-white transition-transform duration-300 group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                {page.cta.secondary.label}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}