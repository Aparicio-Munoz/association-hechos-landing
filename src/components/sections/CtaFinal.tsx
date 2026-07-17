import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { GoogleLogo } from "@/components/ui/GoogleLogo";
import { Reveal } from "@/components/motion/Reveal";

/** Cierre en espejo con el hero: máxima intención de salida → un clic. */
export async function CtaFinal() {
  const t = await getTranslations("ctaFinal");

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-azul-600 to-azul-900 py-20 text-white sm:py-28">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-azul-400/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <Container className="relative flex flex-col items-center text-center">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-4 text-azul-100">{t("micro")}</p>
        </Reveal>
        <Reveal
          delay={160}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button
            variant="inverse"
            size="lg"
            href="/registro"
            className="w-full sm:w-auto"
          >
            {t("cta")}
          </Button>
          <Button
            variant="google"
            size="lg"
            href="/registro"
            className="w-full sm:w-auto"
          >
            <GoogleLogo />
            {t("ctaGoogle")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
