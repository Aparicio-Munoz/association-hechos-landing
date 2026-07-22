import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { GoogleCallbackClient } from "@/components/auth/GoogleCallbackClient";

type Params = { params: Promise<{ locale: string }> };

// Página técnica de tránsito (redirect de OAuth) — nunca debe indexarse.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function GoogleAuthCallbackPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <main id="contenido" className="flex min-h-[70vh] items-center justify-center bg-canvas pt-32 pb-20">
      <Container width="prose" className="w-full max-w-md">
        <GoogleCallbackClient
          labels={{
            connecting: t("googleCallbackConnecting"),
            error: t("googleCallbackError"),
            backToLogin: t("googleCallbackBackToLogin"),
          }}
        />
      </Container>
    </main>
  );
}
