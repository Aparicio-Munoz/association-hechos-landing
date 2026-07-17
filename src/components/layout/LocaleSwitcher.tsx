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
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={label}
      className="flex rounded-full border border-line p-0.5 text-xs font-semibold"
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
                ? "pointer-events-none bg-brand text-on-brand"
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
