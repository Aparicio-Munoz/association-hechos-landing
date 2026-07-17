import { getTranslations } from "next-intl/server";
import { ArrowRight, Bell } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Button } from "@/components/ui/Button";

/**
 * Filas de lista, no tarjetas: contraste de textura deliberado con
 * Cursos (visual) — la sobriedad tipográfica comunica seriedad laboral.
 */
export async function Employment() {
  const t = await getTranslations("employment");

  const jobs = [
    { role: t("job1Role"), category: t("job1Category"), time: t("job1Time") },
    { role: t("job2Role"), category: t("job2Category"), time: t("job2Time") },
    { role: t("job3Role"), category: t("job3Category"), time: t("job3Time") },
  ];

  return (
    <section id="empleo" className="bg-canvas py-20 sm:py-28">
      <Container width="prose">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              {t("kicker")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t("title")}
            </h2>
          </div>
          <a
            href="#empleo"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-strong"
          >
            {t("cta")}
            <ArrowRight
              size={16}
              className="transition-transform duration-150 ease-salida group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </Reveal>

        <RevealGroup className="mt-10 divide-y divide-line rounded-lg border border-line bg-elevated">
          {jobs.map((j) => (
            <RevealItem
              key={j.role}
              className="flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-150 hover:bg-brand-soft"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{j.role}</p>
                <p className="text-sm text-ink-soft">{j.category}</p>
              </div>
              <span className="shrink-0 text-sm text-ink-mute">{j.time}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-azul-200 bg-azul-50 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                <Bell size={18} aria-hidden />
              </span>
              <p className="font-medium text-azul-800">{t("bannerTitle")}</p>
            </div>
            <Button href="/registro" className="w-full shrink-0 sm:w-auto">
              {t("bannerCta")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
