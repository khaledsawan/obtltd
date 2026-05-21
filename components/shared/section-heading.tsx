type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-right";

  return (
    <div className={`max-w-3xl space-y-4 ${alignment}`.trim()}>
      {eyebrow ? (
        <p className="text-sm font-bold tracking-[0.2em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-3xl leading-tight font-black text-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="text-base leading-8 text-muted sm:text-lg">{description}</p> : null}
    </div>
  );
}
