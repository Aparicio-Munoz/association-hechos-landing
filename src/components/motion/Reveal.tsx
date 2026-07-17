"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE_SALIDA = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Fade-up al entrar en viewport (spec de animación): dispara una vez,
 * 400ms, ease-salida. `useReducedMotion` elimina el movimiento —
 * el contenido aparece resuelto, nunca se queda invisible.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: delay / 1000, ease: EASE_SALIDA }}
    >
      {children}
    </m.div>
  );
}
