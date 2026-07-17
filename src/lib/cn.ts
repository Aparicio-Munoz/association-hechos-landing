import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Une clases y resuelve conflictos de utilidades Tailwind
 * (la última gana de forma determinista, no por orden del CSS generado).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
