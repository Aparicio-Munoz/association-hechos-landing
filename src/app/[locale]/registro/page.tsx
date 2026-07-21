import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { RegistroForm } from "@/components/auth/RegistroForm";
import { AUTH_ENABLED } from "@/lib/feature-flags";
import { SUPPORT_EMAIL } from "@/lib/site";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!AUTH_ENABLED) {
    const t = await getTranslations({ locale, namespace: "placeholderPages" });
    return { title: t("platformTitle"), robots: { index: false, follow: true } };
  }
  const t = await getTranslations({ locale, namespace: "auth" });
  return { title: t("registerTitle"), robots: { index: false, follow: true } };
}

export default async function RegistroPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  // AUTH_ENABLED off: el backend real todavía no es público (ver
  // src/lib/feature-flags.ts) — evita exponer un formulario que fallaría.
  if (!AUTH_ENABLED) {
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

  const t = await getTranslations("auth");

  return (
    <>
      <main id="contenido" className="flex min-h-[70vh] items-center justify-center bg-canvas py-20">
        <Container width="prose" className="w-full max-w-md">
          <div className="rounded-xl border border-line bg-elevated p-8 shadow-sm">
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
              {t("registerTitle")}
            </h1>
            <p className="mt-2 text-sm text-ink-soft">{t("registerSubtitle")}</p>
            <div className="mt-6">
              <RegistroForm
                labels={{
                  nameLabel: t("nameLabel"),
                  lastNameLabel: t("lastNameLabel"),
                  emailLabel: t("emailLabel"),
                  passwordLabel: t("passwordLabel"),
                  passwordHint: t("passwordHint"),
                  registerCta: t("registerCta"),
                  registerPendingCta: t("registerPendingCta"),
                  genericError: t("genericError"),
                  requiredFieldsError: t("requiredFieldsError"),
                }}
              />
            </div>
            <p className="mt-6 text-center text-sm text-ink-soft">
              {t("hasAccount")}{" "}
              <Link href="/login" className="font-medium text-brand hover:underline">
                {t("goToLogin")}
              </Link>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
