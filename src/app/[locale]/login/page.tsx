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

/** Misma realidad que /registro: la plataforma todavía no existe. */
export default async function LoginPage({ params }: Params) {
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
