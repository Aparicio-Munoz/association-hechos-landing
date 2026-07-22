import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { Footer } from "@/components/layout/Footer";
import { SUPPORT_EMAIL } from "@/lib/site";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "placeholderPages" });
  return {
    title: t("privacyTitle"),
    alternates: { canonical: locale === "es" ? "/privacidad" : "/en/privacidad" },
    robots: { index: false, follow: true },
  };
}

/** No se inventa texto legal: la página lo dice tal cual hasta que
 * exista una política de privacidad real revisada por la asociación. */
export default async function PrivacidadPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("placeholderPages");

  return (
    <>
      <PlaceholderPage
        title={t("privacyTitle")}
        body={t("legalBody")}
        backLabel={t("backCta")}
        contactLabel={t("contactCta")}
        contactHref={`mailto:${SUPPORT_EMAIL}`}
      />
      <Footer />
    </>
  );
}
