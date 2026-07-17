"use client";

import { m, useReducedMotion } from "framer-motion";

const EASE_SALIDA = [0.22, 1, 0.36, 1] as const;

/**
 * Los tres trazos convergiendo en un punto (spec: "el único momento
 * decorativo de la página" — dibuja literalmente "centralizar").
 * `pathLength` anima de 0→1 al entrar en viewport, una sola vez.
 */
export function DrawPaths() {
  const reduce = useReducedMotion();
  const hidden = { pathLength: 0 };
  const show = { pathLength: 1 };

  const paths = [
    "M30,4 C30,60 150,60 150,110",
    "M150,4 L150,110",
    "M270,4 C270,60 150,60 150,110",
  ];

  return (
    <svg
      viewBox="0 0 300 120"
      preserveAspectRatio="none"
      className="h-28 w-full max-w-xs text-azul-300/70 sm:max-w-sm"
      aria-hidden
    >
      {paths.map((d, i) => (
        <m.path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          initial={reduce ? show : hidden}
          whileInView={show}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_SALIDA }}
        />
      ))}
      <m.circle
        cx={150}
        cy={112}
        r={5}
        className="fill-glow"
        initial={reduce ? { scale: 1 } : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.3, delay: 0.5, ease: EASE_SALIDA }}
      />
    </svg>
  );
}
