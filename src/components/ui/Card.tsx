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
        "rounded-lg border border-line/80 bg-elevated/95 p-6 shadow-sm backdrop-blur-sm",
        hover &&
          "transition-[transform,box-shadow,border-color] duration-200 ease-salida hover:-translate-y-1 hover:border-azul-300/70 hover:shadow-glow-sm",
        className,
      )}
      {...props}
    />
  );
}
