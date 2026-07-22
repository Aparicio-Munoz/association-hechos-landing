import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  brand: "bg-azul-100/80 text-azul-700 ring-1 ring-azul-200/70 dark:bg-brand-soft dark:text-brand dark:ring-brand/25",
  accent: "bg-azul-100/80 text-azul-800 ring-1 ring-azul-200/70",
  success: "bg-azul-100/80 text-azul-700 ring-1 ring-azul-200/70",
  neutral: "bg-inset text-ink-soft ring-1 ring-line/70",
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
        "inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium backdrop-blur-sm",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
