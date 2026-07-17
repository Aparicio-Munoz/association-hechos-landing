import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

/**
 * Segundo "momento de marca": banda azul-950 profunda con count-up.
 * Cifras del lado de la oferta (ciertas desde el día uno) — la marca
 * se llama Hechos; no se inflan números.
 */
export async function Statistics() {
  const t = await getTranslations("statistics");

  const stats = [
    { to: 35, suffix: "+", label: t("stat1Label") },
    { to: 80, suffix: "+", label: t("stat2Label") },
    { to: 2, label: t("stat3Label") },
    { static: "24/7", label: t("stat4Label") },
  ];

  return (
    <>
      <SectionDivider from="bg-subtle" to="text-azul-950" />

      <section className="relative overflow-hidden bg-azul-950 py-20 text-white sm:py-24">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-azul-500/15 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-azul-400/10 blur-3xl" />
        </div>

        <Container className="relative">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
          </Reveal>

          <dl className="mt-12 grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {stats.map((s) => (
              <Reveal key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl font-bold text-white sm:text-5xl">
                  {s.static ?? (
                    <CountUp to={s.to!} suffix={s.suffix} delay={200} />
                  )}
                </dd>
                <dd className="mt-2 text-sm text-azul-200" aria-hidden>
                  {s.label}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <SectionDivider from="bg-azul-950" to="text-canvas" mirror />
    </>
  );
}
