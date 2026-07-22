import { getTranslations } from "next-intl/server";
import { Bell } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/**
 * Filas de lista, no tarjetas: contraste de textura deliberado con
 * Cursos (visual) — la sobriedad tipográfica comunica seriedad laboral.
 *
 * Honestidad: antes mostraba fechas inventadas ("hace 2 días") para
 * simular vacantes reales y recientes. Se reemplaza por un badge
 * "Ejemplo" — mismo criterio que Courses.tsx: esto ilustra el tipo de
 * vacante que conectaremos con jóvenes (Creando Puentes), no ofertas
 * reales ya publicadas.
 */
export async function Employment() {
  const t = await getTranslations("employment");

  const jobs = [
    { role: t("job1Role"), category: t("job1Category") },
    { role: t("job2Role"), category: t("job2Category") },
    { role: t("job3Role"), category: t("job3Category") },
  ];

  return (
    <section id="empleabilidad" className="bg-canvas py-24 sm:py-32 lg:py-36">
      <Container width="prose">
        <SectionIntro
          align="left"
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

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
              <Badge
                tone="neutral"
                className="shrink-0 border border-dashed border-line"
              >
                {t("previewBadge")}
              </Badge>
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
