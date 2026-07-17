"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Carga solo las features de animación DOM (~15KB) en vez de los ~34KB
 * del paquete completo de Framer Motion. Todo componente de motion/
 * usa `m.div` (no `motion.div`) para respetar este presupuesto.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
