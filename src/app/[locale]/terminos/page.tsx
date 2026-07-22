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
    title: t("termsTitle"),
    alternates: { canonical: locale === "es" ? "/terminos" : "/en/terminos" },
    robots: { index: false, follow: true },
  };
}

/** No se inventan cláusulas legales: honesto hasta que exista un
 * documento real de términos y condiciones revisado por la asociación. */
export default async function TerminosPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("placeholderPages");

  return (
    <>
      <PlaceholderPage
        title={t("termsTitle")}
        body={t("legalBody")}
        backLabel={t("backCta")}
        contactLabel={t("contactCta")}
        contactHref={`mailto:${SUPPORT_EMAIL}`}
      />
      <Footer />
    </>
  );
}
