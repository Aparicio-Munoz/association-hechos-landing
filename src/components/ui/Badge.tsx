import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  brand: "bg-azul-100 text-azul-700 dark:bg-brand-soft dark:text-brand",
  accent: "bg-azul-100 text-azul-800",
  success: "bg-azul-100 text-azul-700",
  neutral: "bg-inset text-ink-soft",
} as const;

/** Metadato no interactivo (§9). Rectángulo suave = información, nunca acción. */
export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
