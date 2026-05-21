import Link from "next/link";

type CtaLinkProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function CtaLink({
  href,
  label,
  variant = "primary",
  className = "",
}: CtaLinkProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-sm border px-5 py-3 text-sm font-bold";
  const styles =
    variant === "primary"
      ? "border-primary bg-primary text-white hover:bg-navbar hover:border-navbar"
      : "border-border bg-white text-text hover:border-primary hover:text-primary";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`.trim()}>
      {label}
    </Link>
  );
}
