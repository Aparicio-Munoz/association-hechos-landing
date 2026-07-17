import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Sistema de botones (Sistema Hechos §6).
 * Regla: solo `primary` usa ámbar — el color de acción está reservado
 * a la conversión. Pill siempre: lo interactivo pequeño es redondo.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[background-color,border-color,box-shadow,transform] duration-150 ease-salida " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:bg-inset disabled:text-ink-mute";

const variants = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover hover:-translate-y-px hover:shadow-cta " +
    "active:bg-accent-active active:translate-y-0 active:shadow-none",
  secondary: "border border-brand text-brand hover:bg-brand-soft",
  ghost: "text-brand hover:bg-brand-soft",
  google: "border border-line bg-elevated text-ink hover:bg-subtle",
  // Para fondos de marca oscuros (CTA final): relleno claro, texto azul.
  inverse: "bg-white text-azul-800 hover:bg-azul-50",
} as const;

const sizes = {
  lg: "h-13 px-7 text-base", // 52px — hero y CTA final
  md: "h-12 px-6 text-base", // 48px — estándar (target táctil)
  sm: "h-9 px-4 text-sm", // 36px — contextos densos (navbar desktop)
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

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
