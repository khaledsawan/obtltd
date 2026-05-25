import {
  createMetadata,
  getContactPageV2,
  getDirection,
  resolveLocale,
  toLocalizedPath,
} from "@/lib/config";
import Link from "next/link";

type Params = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  const currentLocale = resolveLocale(locale);
  const page = getContactPageV2(currentLocale);

  return createMetadata({
    title: page.hero.title,
    description: page.hero.description,
    path: toLocalizedPath(currentLocale, "/contact"),

    image: page.mapPanel.image.src,
  });
}

export default async function LocalizedContactPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  const currentLocale = resolveLocale(locale);
  const page = getContactPageV2(currentLocale);
  const dir = getDirection(currentLocale);

  return (
    <div
      dir={dir}
      lang={currentLocale}
      className="min-h-screen bg-[#f9f9f9] text-[#111]"
    >
      <main className="mx-auto w-full max-w-[1440px] px-5 pb-24 pt-28 lg:px-20 lg:pt-32">

        {/* HERO */}
        <section className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
              {page.hero.eyebrow}
            </p>

            <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl">
              {page.hero.title}
            </h1>

            <p className="text-base leading-8 text-[#6b6b6b] md:text-lg">
              {page.hero.description}
            </p>

            <div className="mt-10 h-[2px] w-24 bg-[#d4af37]" />
          </div>

          {/* QUICK CONTACT */}
          <div className="grid gap-5 lg:justify-items-end">
            {page.quickContact.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex min-h-11 items-center gap-4 rounded-lg border border-[#d7c7a2] bg-white px-5 py-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-[#d4af37]"
              >
                {/* ICON */}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f5f0] text-[#d4af37]">
                  {item.icon === "mail" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M4 6h16v12H4z" />
                      <path d="m4 6 8 7 8-7" />
                    </svg>
                  )}

                  {item.icon === "phone" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.31 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.09a2 2 0 0 1 2.11-.45c.8.26 1.64.45 2.5.57A2 2 0 0 1 22 16.92z" />
                    </svg>
                  )}
                </span>

                {/* TEXT */}
                <div className="ml-auto text-right">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6b6b6b]">
                    {item.label}
                  </p>
                  <p className="text-base font-black text-[#111] group-hover:text-[#d4af37]">
                    {item.value}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FORM + MAP */}
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-12">

          {/* FORM */}
          <div className="lg:col-span-5 rounded-xl border border-[#d7c7a2] bg-white p-6 md:p-10 shadow-md">
            <h2 className="mb-8 text-3xl font-black text-[#111]">
              {page.inquiryForm.title}
            </h2>

            <form className="grid gap-6">
              {page.inquiryForm.fields.map((field) => {
                const baseInput =
                  "w-full min-h-11 rounded-lg border border-[#d7c7a2] bg-white px-4 text-sm text-[#111] outline-none transition-all focus:border-[#d4af37] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.15)]";

                if (field.type === "select") {
                  return (
                    <label key={field.label} className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#6b6b6b]">
                      {field.label}
                      <select className={baseInput}>
                        {field.options.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <label key={field.label} className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#6b6b6b]">
                      {field.label}
                      <textarea
                        className={`${baseInput} min-h-32 py-3`}
                        placeholder={field.placeholder}
                      />
                    </label>
                  );
                }

                return (
                  <label key={field.label} className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#6b6b6b]">
                    {field.label}
                    <input
                      type={field.type}
                      className={baseInput}
                      placeholder={field.placeholder}
                    />
                  </label>
                );
              })}

              <button
                type="button"
                className="min-h-11 rounded-lg bg-[#d4af37] px-4 py-3 text-m font-bold !text-white transition hover:scale-[1.02]"
              >
                {page.inquiryForm.submit}
              </button>
            </form>
          </div>

          {/* MAP */}
          <div className="relative overflow-hidden rounded-xl border border-[#d7c7a2] lg:col-span-7 shadow-md">

            {/* MAP */}
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              src={page.mapPanel.mapUrl}
            />

            {/* CARD OVER MAP */}
            <div className="absolute left-6 top-6 z-20 max-w-sm rounded-xl border border-[#d7c7a2] bg-white p-6 shadow-[0px_20px_50px_rgba(0,0,0,0.15)]">
              <h3 className="mb-3 flex items-center gap-2 text-xl font-black text-[#111]">
                <svg
                  className="h-5 w-5 text-[#d4af37]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                {page.mapPanel.title}
              </h3>

              <p className="mb-4 text-sm leading-7 text-[#6b6b6b]">
                {page.mapPanel.description}
              </p>

              <Link
                href={page.mapPanel.cta.href}
                target="_blank"
                className="inline-flex items-center font-bold text-[#d4af37] hover:underline"
              >
                {page.mapPanel.cta.label}
              </Link>
            </div>
          </div>
        </section>

        {/* OFFICES */}
        <section className="mt-20">
          <h2 className="mb-10 text-3xl font-black text-[#111]">
            {page.globalOffices.title}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.globalOffices.list.map((office) => (
              <article
                key={office.city}
                className="rounded-xl border border-[#d7c7a2] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* CITY + PIN */}
                <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6b6b6b]">
                  <svg
                    className="h-4 w-4 text-[#d4af37]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {office.city}
                </p>

                <h3 className="mb-3 text-xl font-black text-[#111]">
                  {office.name}
                </h3>

                <p className="mb-5 text-sm leading-7 text-[#6b6b6b] whitespace-pre-line">
                  {office.address}
                </p>

                <div className="border-t border-[#d7c7a2] pt-4 text-sm font-bold text-[#111]">
                  {office.phone}
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}