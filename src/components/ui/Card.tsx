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
        "rounded-lg border border-line bg-elevated p-6 shadow-sm",
        hover &&
          "transition-[transform,box-shadow,border-color] duration-150 ease-salida hover:-translate-y-0.5 hover:border-azul-300 hover:shadow-md",
        className,
      )}
      {...props}
    />
  );
}
