import { defineRouting } from "next-intl/routing";

/**
 * RNF-008: español e inglés.
 * `as-needed` implementa la estructura de URLs de la spec SEO:
 * español en la raíz (/) sin prefijo, inglés bajo /en.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
