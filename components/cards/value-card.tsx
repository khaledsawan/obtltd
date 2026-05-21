import Image from "next/image";
import type { ValueItem } from "@/lib/config";

type ValueCardProps = {
  value: ValueItem;
};

export function ValueCard({ value }: ValueCardProps) {
  return (
    <article className="grid gap-4 rounded-sm border border-border bg-white p-5 shadow-[0_14px_35px_rgba(12,13,15,0.05)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-accent-soft">
        <Image src={value.icon} alt={value.title} width={24} height={24} />
      </div>
      <div className="grid gap-2">
        <h3 className="text-lg font-black text-text">{value.title}</h3>
        <p className="text-sm leading-7 text-muted">{value.description}</p>
      </div>
    </article>
  );
}
