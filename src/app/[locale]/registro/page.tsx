import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { Footer } from "@/components/layout/Footer";
import { SUPPORT_EMAIL } from "@/lib/site";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "placeholderPages" });
  return { title: t("platformTitle"), robots: { index: false, follow: true } };
}

/** La plataforma de cursos/empleo aún no existe (ver memoria del proyecto):
 * honesto "en construcción" en vez de un 404 en cada CTA de "Únete gratis". */
export default async function RegistroPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("placeholderPages");

  return (
    <>
      <PlaceholderPage
        title={t("platformTitle")}
        body={t("platformBody")}
        backLabel={t("backCta")}
        contactLabel={t("contactCta")}
        contactHref={`mailto:${SUPPORT_EMAIL}`}
      />
      <Footer />
    </>
  );
}
