"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE_SALIDA = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Desenfocado→nítido además de fade+subir — reservado a momentos
   * puntuales (Hero) por su costo de composición; no se usa en grillas
   * repetidas (ver RevealGroup). */
  blur?: boolean;
}

/**
 * Fade-up al entrar en viewport: dispara una vez, ease-salida.
 * `useReducedMotion` elimina el movimiento — el contenido aparece
 * resuelto, nunca se queda invisible.
 *
 * `amount: "some"` + `margin: "400px 0px"` (no un número, sin margen):
 * ver la nota extensa en RevealGroup.tsx — un umbral por porcentaje
 * contra un bloque alto puede quedar fuera de alcance en viewports
 * cortos, y hasta "some" sin margen puede "saltarse" bajo scroll
 * extremo, dejando el elemento atascado en `hidden` para siempre (dos
 * casos reales encontrados en producción: Programs.tsx y, más raro,
 * Contact/Faq bajo scroll muy rápido de toda la página).
 */
export function Reveal({ children, delay = 0, className, blur = false }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={
        reduce
          ? false
          : { opacity: 0, y: 24, ...(blur && { filter: "blur(10px)" }) }
      }
      whileInView={{ opacity: 1, y: 0, ...(blur && { filter: "blur(0px)" }) }}
      viewport={{ once: true, amount: "some", margin: "400px 0px" }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: EASE_SALIDA }}
    >
      {children}
    </m.div>
  );
}
