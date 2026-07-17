import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar, type NavbarLabels } from "@/components/layout/Navbar";
import { routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "@/app/globals.css";

/* Fuentes auto-hospedadas en build (cero peticiones a Google en runtime),
   con fallback ajustado para proteger CLS. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

type Params = { params: Promise<{ locale: string }> };

/** El chrome del navegador móvil toma el color del fondo en cada modo. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfdfe" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1620" },
  ],
};

/** SSG por idioma: / (es) y /en pre-renderizados — condición nº 1 del SEO. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    // Template: las futuras páginas (cursos, vacantes) heredan "· Marca".
    title: { default: t("title"), template: `%s · ${SITE_NAME}` },
    description: t("description"),
    alternates: {
      canonical: locale === "es" ? "/" : "/en",
      languages: { es: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      locale: locale === "es" ? "es_CO" : "en_US",
      // La imagen la aporta opengraph-image.tsx (generada en build).
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Params & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });
  const labels: NavbarLabels = {
    navLabel: t("navLabel"),
    formacion: t("formacion"),
    empleo: t("empleo"),
    comunidad: t("comunidad"),
    nosotros: t("nosotros"),
    entrar: t("entrar"),
    unete: t("unete"),
    abrirMenu: t("abrirMenu"),
    cerrarMenu: t("cerrarMenu"),
    idioma: t("idioma"),
  };

  return (
    <html lang={locale} className={`${inter.variable} ${bricolage.variable}`}>
      {/* bg/color del documento: una sola fuente de verdad en globals.css */}
      <body className="font-sans antialiased">
        {/* Primer elemento enfocable: salto directo al contenido (WCAG 2.4.1) */}
        <a
          href="#contenido"
          className="sr-only z-60 rounded-full bg-elevated px-4 py-2 text-sm font-medium shadow-md focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          {t("saltar")}
        </a>
        {/* Provider sin `messages`: los componentes cliente reciben labels
            por props — al cliente no viaja ningún diccionario completo. */}
        <NextIntlClientProvider messages={null}>
          {/* `hasLocale` ya estrechó el tipo: aquí locale es "es" | "en" */}
          <Navbar labels={labels} locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
