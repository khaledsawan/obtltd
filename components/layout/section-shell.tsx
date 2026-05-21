import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/page-container";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  muted?: boolean;
};

export function SectionShell({
  children,
  className = "",
  containerClassName = "",
  muted = false,
}: SectionShellProps) {
  return (
    <section
      className={`py-12 sm:py-16 lg:py-20 ${muted ? "bg-surface" : "bg-transparent"} ${className}`.trim()}
    >
      <PageContainer className={containerClassName}>{children}</PageContainer>
    </section>
  );
}
