"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface CountUpProps {
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
}

/**
 * Count-up sin dependencias (spec de animación: `dur-celebracion`).
 * SSR pinta el valor final (SEO/no-JS ven la cifra real); al hidratar,
 * si el usuario no prefiere movimiento reducido, anima 0 → valor.
 */
export function CountUp({
  to,
  duration = 1000,
  delay = 0,
  suffix,
  className,
}: CountUpProps) {
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const p = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - p, 4); // frenado suave (ease-salida)
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, delay]);

  return (
    <span className={cn("tabular-nums", className)}>
      {value}
      {suffix}
    </span>
  );
}
