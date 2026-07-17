"use client";

import { useEffect, useState } from "react";

/**
 * Estado de scroll para la navbar (spec de animación §8):
 * - `scrolled`: pasó el umbral → aparecen borde y sombra.
 * - `hidden`: scrolleando hacia abajo (solo se aplica en móvil);
 *   cualquier scroll hacia arriba la revela de inmediato.
 */
export function useScrollState(threshold = 8, hideAfter = 80) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > threshold);
      if (y < lastY) {
        setHidden(false);
      } else if (y > lastY && y > hideAfter) {
        // Solo con movimiento descendente real: recargar la página a mitad
        // de scroll no debe esconder la barra.
        setHidden(true);
      }
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, hideAfter]);

  return { scrolled, hidden };
}
