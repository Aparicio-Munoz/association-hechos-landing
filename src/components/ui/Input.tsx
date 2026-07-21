import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Campo de formulario del sistema — mismo hairline/radius que Card,
 * sin traer una librería de formularios para dos pantallas (registro,
 * login). */
export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-elevated px-3.5 text-ink placeholder:text-ink-mute",
        "transition-colors duration-150 ease-salida",
        "focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
