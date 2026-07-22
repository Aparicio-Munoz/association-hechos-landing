"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Desplaza `children` una fracción del scroll de la sección contenedora
 * (parallax ligero). Un solo listener de scroll para todo el Hero — el
 * resto del sitio no paga este costo. Sale del árbol del todo con
 * `prefers-reduced-motion`.
 */
export function Parallax({
  children,
  range = 40,
  className,
}: {
  children: ReactNode;
  /** Desplazamiento máximo en px a lo largo de todo el recorrido. */
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, range]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <m.div ref={ref} style={{ y }} className={className}>
      {children}
    </m.div>
  );
}
