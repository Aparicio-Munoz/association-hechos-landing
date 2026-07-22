"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/** Nombres nativos: cada idioma se anuncia en su propia lengua. */
const nativeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

/**
 * Selector ES/EN (RNF-008). Mini-pill del sistema: el idioma activo
 * lleva relleno brand; cada enlace declara `lang` y `hreflang` para
 * que lectores de pantalla pronuncien el nombre en su propio idioma.
 */
export function LocaleSwitcher({
  locale,
  label,
  dark = false,
}: {
  locale: Locale;
  label: string;
  /** Sobre el Hero oscuro (solo home, sin scroll): superficie de vidrio
   * en vez de la píldora clara habitual. */
  dark?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex rounded-full border p-0.5 text-xs font-semibold",
        dark ? "border-white/20" : "border-line",
      )}
    >
      {routing.locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            lang={code}
            hrefLang={code}
            aria-label={nativeNames[code]}
            aria-current={active ? "true" : undefined}
            tabIndex={active ? -1 : undefined}
            className={cn(
              "rounded-full px-3 py-1 uppercase transition-colors duration-150",
              active
                ? dark
                  ? "pointer-events-none bg-white/15 text-niebla-0"
                  : "pointer-events-none bg-brand text-on-brand"
                : dark
                  ? "text-azul-100/80 hover:text-niebla-0"
                  : "text-ink-soft hover:text-ink",
            )}
          >
            {code}
          </Link>
        );
      })}
    </div>
  );
}
