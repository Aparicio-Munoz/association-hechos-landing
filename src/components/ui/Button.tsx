import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Sistema de botones (Sistema Hechos §6).
 * Regla: solo `primary` usa ámbar — el color de acción está reservado
 * a la conversión. Pill siempre: lo interactivo pequeño es redondo.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[background-color,border-color,box-shadow,transform] duration-200 ease-salida " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:bg-inset disabled:text-ink-mute";

const variants = {
  // Relleno en degradé sutil (de-accent a accent-hover) en vez de plano:
  // misma acción, un poco más de profundidad. El glow solo aparece en
  // hover — la superficie en reposo se queda discreta.
  primary:
    "bg-linear-to-b from-accent to-accent-hover text-on-accent " +
    "hover:-translate-y-0.5 hover:shadow-glow-md " +
    "active:translate-y-0 active:shadow-xs active:from-accent-active active:to-accent-active",
  secondary:
    "border border-brand/40 text-brand hover:-translate-y-0.5 hover:border-brand hover:bg-brand-soft hover:shadow-sm",
  ghost: "text-brand hover:-translate-y-px hover:bg-brand-soft",
  google:
    "border border-line bg-elevated text-ink hover:-translate-y-0.5 hover:bg-subtle hover:shadow-sm",
  // Para fondos de marca oscuros (CTA final): relleno claro, texto azul.
  // 'niebla-0' en vez de 'white' literal: sigue siendo parte de la paleta.
  inverse: "bg-niebla-0 text-azul-800 hover:-translate-y-0.5 hover:bg-azul-50 hover:shadow-md",
} as const;

const sizes = {
  lg: "h-13 px-7 text-base", // 52px — hero y CTA final
  md: "h-12 px-6 text-base", // 48px — estándar (target táctil)
  sm: "h-9 px-4 text-sm", // 36px — contextos densos (navbar desktop)
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

/** Clases del sistema de botones, para componer con otros elementos
 * (p. ej. el `Link` de next-intl, que sí preserva el prefijo de idioma). */
export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
} & (
  | ({ href: string } & ComponentPropsWithoutRef<"a">)
  | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    return <a {...(props as ComponentPropsWithoutRef<"a">)} className={classes} />;
  }
  return (
    <button
      type="button"
      {...(props as ComponentPropsWithoutRef<"button">)}
      className={classes}
    />
  );
}
