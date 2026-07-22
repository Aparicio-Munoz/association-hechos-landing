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
      <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand-soft/70 px-3.5 py-1 text-sm font-semibold tracking-wide text-brand backdrop-blur-sm">
        {kicker}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
