import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  hover?: boolean;
} & ComponentPropsWithoutRef<T>;

/**
 * Tarjeta base del sistema (§7): fondo elevado, hairline, radius-lg,
 * sombra-sm. `hover` añade la elevación reservada a contenido clicable
 * — nunca se aplica a tarjetas informativas (Beneficios).
 */
export function Card<T extends ElementType = "div">({
  as,
  hover = false,
  className,
  ...props
}: CardProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-line/70 bg-elevated/85 p-6 shadow-sm backdrop-blur-xl",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
        hover &&
          "transition-[transform,box-shadow,border-color] duration-200 ease-salida hover:-translate-y-1.5 hover:border-azul-300/70 hover:shadow-glow-md",
        className,
      )}
      {...props}
    />
  );
}
