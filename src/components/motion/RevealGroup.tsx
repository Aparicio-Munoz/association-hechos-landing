"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE_SALIDA = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE_SALIDA } },
};

/**
 * Cascada declarativa para grillas de tarjetas: un solo
 * `staggerChildren` en vez de calcular delays a mano por hijo. Sin
 * `filter: blur` a propósito — a diferencia de `Reveal` (usado en
 * momentos puntuales), esto se repite muchas veces por página y el
 * blur de composición sí se nota en el frame rate a esa escala.
 */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div className={className} variants={item}>
      {children}
    </m.div>
  );
}
