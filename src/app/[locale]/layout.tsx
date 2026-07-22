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

/**
 * El chrome del navegador móvil toma el color del fondo en cada modo.
 * `theme-color` exige un valor literal (no lee variables CSS): estos hex
 * son --h-canvas de globals.css en light/dark, no colores nuevos.
 */
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
      locale: locale === "es" ? "es_ES" : "en_US",
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

  const tMeta = await getTranslations({ locale, namespace: "meta" });
  // JSON-LD (schema.org NGO): reutiliza SITE_NAME/SITE_URL/logo ya
  // existentes — nada nuevo que mantener sincronizado a mano.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-hechos-512.png`,
    description: tMeta("description"),
  };

  const t = await getTranslations({ locale, namespace: "nav" });
  const labels: NavbarLabels = {
    navLabel: t("navLabel"),
    mision: t("mision"),
    programas: t("programas"),
    historias: t("historias"),
    contacto: t("contacto"),
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
        {/* Fondo ambiental fijo de todo el sitio: manchas de gradiente muy
            suaves detrás de todo el contenido. Sin imágenes, sin layout —
            se nota sobre todo a través del `backdrop-blur` de las
            tarjetas de vidrio, que dejan de ser "vidrio sobre blanco
            plano". `-z-10` + `pointer-events-none`: puramente decorativo. */}
        <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-[10%] h-160 w-160 rounded-full bg-azul-400/[0.05] blur-3xl dark:bg-azul-400/[0.07]" />
          <div className="absolute top-1/3 -right-40 h-140 w-140 rounded-full bg-azul-300/[0.05] blur-3xl dark:bg-azul-300/[0.06]" />
          <div className="absolute bottom-0 left-1/4 h-120 w-120 rounded-full bg-azul-500/[0.04] blur-3xl dark:bg-azul-500/[0.06]" />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
