import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { AUTH_ENABLED } from "@/lib/feature-flags";
import { requireSession } from "@/lib/session";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });
  return {
    title: t("kicker"),
    alternates: { canonical: locale === "es" ? "/cuenta" : "/en/cuenta" },
    robots: { index: false, follow: false },
  };
}

/** Placeholder honesto post-login (decisión explícita del usuario):
 * confirma que la sesión es real contra el backend, sin fingir un
 * dashboard que todavía no existe. */
export default async function CuentaPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  // AUTH_ENABLED off: no hay backend público al que verificar sesión
  // (ver src/lib/feature-flags.ts) — manda a /login, que hoy muestra el
  // "próximamente", en vez de intentar `requireSession()` y fallar.
  if (!AUTH_ENABLED) redirect("/login");

  const user = await requireSession();
  const t = await getTranslations("account");

  return (
    <>
      <main id="contenido" className="flex min-h-[70vh] items-center justify-center bg-canvas pt-32 pb-20">
        <Container width="prose" className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
            <UserRound size={26} aria-hidden />
          </span>
          <p className="mt-6 text-sm font-medium uppercase tracking-wide text-brand">
            {t("kicker")}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("title", { nombre: user.nombre })}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t("body")}</p>
          <p className="mt-4 text-sm text-ink-mute">
            {t("emailLabel")}: {user.email}
          </p>
          <div className="mt-8">
            <LogoutButton label={t("logoutCta")} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
