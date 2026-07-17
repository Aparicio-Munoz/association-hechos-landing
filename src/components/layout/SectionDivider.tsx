import { cn } from "@/lib/cn";

interface SectionDividerProps {
  /** Clase de color de fondo de la sección ANTERIOR (p. ej. "bg-subtle"). */
  from: string;
  /** Clase de texto (currentColor) con el color de la sección SIGUIENTE. */
  to: string;
  variant?: "wave" | "angle";
  /** Espejo horizontal (no vertical): varía la silueta sin romper el
   * orden arriba-transparente / abajo-relleno que hace calzar la costura. */
  mirror?: boolean;
}

/**
 * Rompe la costura recta entre dos secciones. Cero JS: un SVG que
 * "sube" con el color de la sección siguiente sobre el fondo de la
 * anterior. Es lo que evita el efecto "bloques apilados".
 */
export function SectionDivider({
  from,
  to,
  variant = "wave",
  mirror = false,
}: SectionDividerProps) {
  const path =
    variant === "wave"
      ? "M0,40 C360,95 1080,0 1440,45 L1440,100 L0,100 Z"
      : "M0,100 L1440,0 L1440,100 Z";

  return (
    <div aria-hidden className={cn("h-12 w-full sm:h-20", from)}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={cn("h-full w-full", to, mirror && "-scale-x-100")}
      >
        <path d={path} fill="currentColor" />
      </svg>
    </div>
  );
}
