import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Cabecera "kicker + h2 (+ subtitle)" repetida en la mayoría de las
 * secciones — centralizada para no divergir accidentalmente entre
 * archivos. Las bandas oscuras (Impact/SuccessStories/Contact) usan
 * paletas de texto propias y quedan fuera a propósito.
 */
export function SectionIntro({
  kicker,
  title,
  subtitle,
  align = "center",
  className,
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        {kicker}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
