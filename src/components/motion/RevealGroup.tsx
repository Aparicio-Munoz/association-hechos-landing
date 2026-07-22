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
 *
 * `amount: "some"` (no un número, p. ej. 0.2) a propósito: el umbral
 * se evalúa contra la caja del grupo COMPLETO, que en listas largas
 * (Programs.tsx: 5 filas apiladas en móvil) puede medir miles de
 * píxeles. Un 20% de esa altura supera el propio viewport en móvil
 * (imposible de satisfacer nunca), y en desktop es una ventana de
 * cruce tan angosta que un scroll rápido/continuo hace que el
 * navegador salte esa lectura exacta del IntersectionObserver, dejando
 * la animación atascada en `hidden` para siempre (once:true no
 * reintenta). "some" dispara con el primer píxel visible: la ventana
 * de disparo pasa a ser "todo el recorrido de scroll donde el grupo
 * roza el viewport", inmune a ese salto de umbral sea cual sea la
 * altura del contenido o la velocidad del scroll.
 *
 * `margin: "400px 0px"` amplía además el area que el propio
 * IntersectionObserver considera "viewport" (equivale a su
 * `rootMargin`). Con scroll extremo (toda la pagina en pocos segundos)
 * incluso "some" puede tener una ventana de deteccion mas corta que el
 * intervalo real entre lecturas del observer bajo carga - visto una
 * vez en produccion como caso limite (Contacto/Faq, cerca del final de
 * una pagina muy larga). El margen le da al observer varios cientos de
 * pixeles de mas para capturar la lectura antes de que el elemento
 * termine de cruzar, sin adelantar la animacion de forma perceptible.
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
      viewport={{ once: true, amount: "some", margin: "400px 0px" }}
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
