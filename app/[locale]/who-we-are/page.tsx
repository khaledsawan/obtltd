import { createMetadata, getDirection, getWhoWeAreV2, resolveLocale, toLocalizedPath } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

type Params = { locale: string };
const isRemoteSrc = (src: string) => /^https?:\/\//.test(src);

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const { locale } = await params;
    const currentLocale = resolveLocale(locale);
    const page = getWhoWeAreV2(currentLocale);

    return createMetadata({
        title: page.hero.title,
        description: page.hero.description,
        path: toLocalizedPath(currentLocale, "/who-we-are"),
    });
}


export default async function LocalizedWorkPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { locale } = await params;
    const currentLocale = resolveLocale(locale);
    const page = getWhoWeAreV2(currentLocale);
    const dir = getDirection(currentLocale);

    return (
        <div
            dir={dir}
            lang={currentLocale}
            className="overflow-x-hidden bg-background text-foreground"
        >
            <main>
                {/* Hero */}
                <section className="relative min-h-screen overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src={page.hero.image.src}
                            alt={page.hero.image.alt}
                            fill
                            priority
                            className="object-cover grayscale"
                        />

                        <div
                            className={`absolute inset-0 ${dir === "rtl"
                                ? "bg-gradient-to-l from-background via-background/90 to-transparent"
                                : "bg-gradient-to-r from-background via-background/90 to-transparent"
                                }`}
                        />
                    </div>

                    <div className="relative z-10 min-h-screen max-w-[1440px] mx-auto px-6 lg:px-20">
                        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 items-center">
                            <div>
                                <span className="mb-4 block text-x font-bold uppercase tracking-[0.2em] text-primary">
                                    {page.hero.eyebrow}
                                </span>

                                <h1 className="mb-6 text-5xl lg:text-7xl font-bold leading-tight">
                                    {page.hero.title}
                                </h1>

                                <p className="max-w-xl text-lg text-muted-foreground">
                                    {page.hero.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-24 bg-background">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">

                        {/* Header */}
                        <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
                            <div className="lg:col-span-7">
                                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                    {page.mission.eyebrow}
                                </span>

                                <h2 className="text-4xl font-bold text-text">
                                    {page.mission.title}
                                </h2>
                            </div>

                            <div className="lg:col-span-5">
                                <p className="text-muted">
                                    {page.mission.description}
                                </p>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid md:grid-cols-3 gap-6">

                            {page.mission.cards.map((card, index) => {

                                // IMAGE / PRIMARY CARD
                                if (card.type === "image") {
                                    return (
                                        <div
                                            key={index}
                                            className="md:col-span-2 rounded-2xl border border-border bg-surface p-8"
                                        >
                                            {card.title && (
                                                <h3 className="text-2xl font-semibold mb-3 text-text">
                                                    {card.title}
                                                </h3>
                                            )}

                                            {card.description && (
                                                <p className="mb-6 text-muted">
                                                    {card.description}
                                                </p>
                                            )}

                                            <div className="relative h-72 w-full overflow-hidden rounded-xl">
                                                {card.image?.src && (
                                                    <Image
                                                        src={card.image.src}
                                                        alt={card.image.alt?.en ?? ""}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>


                                        </div>
                                    );
                                }

                                // STAT CARD
                                if (card.type === "stat") {
                                    return (
                                        <div
                                            key={index}
                                            className="rounded-2xl bg-primary !text-white p-8 flex flex-col min-h-[280px]"
                                        >
                                            {/* TITLE */}
                                            {card.title && (
                                                <div className="text-x font-semibold opacity-90">
                                                    {card.title}
                                                </div>
                                            )}

                                            {/* DESCRIPTION */}
                                            {card.description && (
                                                <p className="mt-2 text-m leading-relaxed opacity-80">
                                                    {card.description}
                                                </p>
                                            )}

                                            {/* SPACE (push KPI down) */}
                                            <div className="flex-1" />

                                            {/* LABEL */}
                                            {card.label && (
                                                <div className="text-x font-bold uppercase tracking-[0.2em] opacity-70">
                                                    {card.label}
                                                </div>
                                            )}

                                            {/* VALUE */}
                                            <div className="mt-2 text-5xl md:text-6xl font-bold leading-none tracking-tight">
                                                {card.value}
                                            </div>
                                        </div>
                                    );
                                }

                                // LINK CARD
                                if (card.type === "link") {
                                    return (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-border bg-surface p-8 flex flex-col justify-between"
                                        >
                                            <div>
                                                {card.title && (
                                                    <h3 className="mb-3 text-2xl font-semibold text-text">
                                                        {card.title}
                                                    </h3>
                                                )}

                                                {card.description && (
                                                    <p className="text-muted">
                                                        {card.description}
                                                    </p>
                                                )}
                                            </div>

                                            {card.cta && (
                                                <div className="group">
                                                    {/* card content */}
                                                    <Link
                                                        href={card.cta.href}
                                                        className={`mt-8 inline-flex items-center gap-2 font-semibold transition-all hover:opacity-80 ${dir === "rtl" ? "flex-row-reverse" : "flex-row"
                                                            }`}
                                                    >
                                                        <span className="relative">
                                                            {card.cta.label}
                                                            <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                                                        </span>

                                                        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                className={`h-5 w-5 transition-transform duration-300 ${dir === "rtl" ? "rotate-180" : ""
                                                                    }`}
                                                            >
                                                                <path d="M5 12h14" />
                                                                <path d="m12 5 7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                // BANNER CARD
                                if (card.type === "banner") {
                                    return (
                                        <div
                                            key={index}
                                            className="relative md:col-span-2 h-[320px] overflow-hidden rounded-2xl border border-border"
                                        >
                                            {card.image?.src && (
                                                <Image
                                                    src={card.image.src}
                                                    alt={card.image.alt?.en ?? ""}
                                                    fill
                                                    className="object-cover opacity-70"
                                                />
                                            )}

                                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/70 to-transparent p-8">
                                                {card.title && (
                                                    <h3 className="text-2xl font-semibold mb-2 text-text">
                                                        {card.title}
                                                    </h3>
                                                )}

                                                {card.description && (
                                                    <p className="text-muted">
                                                        {card.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </div>
                </section>

                {/* Leadership */}
                {/* <section className="bg-muted/30 py-24">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="text-center mb-16">
                            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                {page.leadership.eyebrow}
                            </span>

                            <h2 className="text-4xl font-bold">
                                {page.leadership.title}
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {page.leadership.members.map((member, index) => (
                                <div key={index}>
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                                        {member.image?.src && (
                                            <Image
                                                src={member.image.src}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>

                                    <h3 className="text-xl font-semibold">
                                        {member.name}
                                    </h3>

                                    <p className="text-primary text-sm uppercase tracking-widest mt-1 mb-3">
                                        {member.position}
                                    </p>

                                    {member.bio && (
                                        <p className="text-muted-foreground">
                                            {member.bio}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* Global Footprint */}
                <section className="relative overflow-hidden bg-[#0c0d0f] py-24">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03]">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="container mx-auto px-6 lg:px-12 relative">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className={dir === "rtl" ? "lg:order-2" : ""}>
                                <span className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                    <span className="h-px w-8 bg-primary/40" />
                                    {page.footprint.eyebrow}
                                </span>

                                <h2 className="text-5xl font-bold mb-12 leading-tight text-white">
                                    {page.footprint.title}
                                </h2>

                                <div className="space-y-6">
                                    {page.footprint.locations.map((location, index) => (
                                        <div
                                            key={index}
                                            className="group relative border-l-2 border-white/10 pl-6 transition-all duration-300 hover:border-primary"
                                        >
                                            <div className="absolute -left-px top-0 h-0 w-0.5 bg-primary transition-all duration-500 group-hover:h-full" />

                                            <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-primary">
                                                {location.city}
                                            </h3>

                                            {location.description && (
                                                <p className="text-white/50 mt-2 leading-relaxed transition-colors duration-300 group-hover:text-white/70">
                                                    {location.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`relative ${dir === "rtl" ? "lg:order-1" : ""}`}>
                                <div className="relative aspect-square overflow-hidden rounded-full border border-white/10">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-primary/5" />

                                    {page.footprint.image?.src && (
                                        <Image
                                            src={page.footprint.image.src}
                                            alt="Global Footprint"
                                            fill
                                            className="object-cover opacity-40 transition-all duration-700 hover:opacity-60 hover:scale-105"
                                        />
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
                                </div>

                                {/* Decorative Ring */}
                                <div className="absolute -inset-4 rounded-full border border-primary/10 animate-pulse" />
                                <div className="absolute -inset-8 rounded-full border border-primary/5" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-16 md:py-24 pb-24 md:pb-32">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-10 mb-12 md:mb-20">
                            <h2 className="max-w-3xl text-3xl md:text-5xl font-bold leading-tight">
                                {page.values.title}
                            </h2>

                            <Link
                                href={page.values.cta.href}
                                className="group inline-flex items-center gap-2 self-start rounded-xl bg-primary px-6 md:px-8 py-3 md:py-4 font-semibold !text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                            >
                                {page.values.cta.label}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border-y sm:border-y-0 sm:border-l">
                            {page.values.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative p-6 md:p-10 transition-all duration-300 hover:bg-surface-alt/50"
                                >
                                    <span className="block text-5xl md:text-6xl font-bold text-primary mb-4 md:mb-6 transition-all duration-300 group-hover:text-primary/50 group-hover:scale-110 origin-left">
                                        {item.number}
                                    </span>

                                    <div className="absolute top-0 right-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />

                                    {item.title && (
                                        <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 transition-colors duration-300 group-hover:text-primary">
                                            {item.title}
                                        </h3>
                                    )}

                                    {item.description && (
                                        <p className="text-muted leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}