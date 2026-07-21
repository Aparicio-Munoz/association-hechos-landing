import { getTranslations } from "next-intl/server";
import {
  Bell,
  Briefcase,
  Compass,
  FileSignature,
  HandHeart,
  Plus,
  Presentation,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/motion/CountUp";

/**
 * "Empresas que transforman vidas" — reemplaza a la versión simple de
 * Empresas colaboradoras en el mismo lugar (`id="empresas"`).
 *
 * Las 5 tarjetas son las modalidades reales de colaboración empresarial
 * descritas en hechos.eu/colabora y en el programa Creando Puentes
 * (oportunidades laborales, mentoring, talleres, convenios de
 * inserción y voluntariado corporativo) — no una lista de beneficios
 * genéricos para el reclutador.
 *
 * Confianza por honestidad, no por artificio: no hay logos de aliados
 * confirmados todavía, así que la franja de logos lo dice explícitamente
 * en vez de simularlos; las estadísticas son las mismas cifras reales
 * de plataforma ya validadas en `Impact.tsx` (cursos, ofertas, idiomas),
 * no cifras de "empresas" o "vidas transformadas" que no existen.
 */
export async function Partners() {
  const t = await getTranslations("partners");

  const modalities = [
    { icon: Briefcase, title: t("modality1Title"), body: t("modality1Body") },
    { icon: Compass, title: t("modality2Title"), body: t("modality2Body") },
    { icon: Presentation, title: t("modality3Title"), body: t("modality3Body") },
    { icon: FileSignature, title: t("modality4Title"), body: t("modality4Body") },
    { icon: HandHeart, title: t("modality5Title"), body: t("modality5Body") },
  ];

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  return (
    <section id="empresas" className="bg-canvas py-20 sm:py-28">
      <Container>
        <SectionIntro kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        {/* Franja de logos: honesta a propósito — sin aliados falsos */}
        <Reveal delay={60} className="mt-12 rounded-xl bg-subtle p-8 sm:p-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex h-20 items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-line text-sm font-medium text-ink-soft"
              >
                <Plus size={15} aria-hidden />
                {t("logosTitle")}
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-ink-soft">
            {t("logosBody")}
          </p>
        </Reveal>

        {/* Tarjetas de modalidades de colaboración */}
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modalities.map((m) => (
            <RevealItem key={m.title}>
              <Card className="h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-soft text-brand">
                  <m.icon size={22} aria-hidden />
                </span>
                <p className="mt-4 font-semibold text-ink">{m.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {m.body}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Estadísticas reales de plataforma (mismas cifras que Impact.tsx) */}
        <Reveal delay={80}>
          <dl className="mt-14 grid grid-cols-1 gap-8 border-y border-line py-10 text-center sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl font-bold text-ink">
                  <CountUp
                    to={parseInt(s.value, 10)}
                    suffix={s.value.replace(/^[0-9]+/, "")}
                    delay={150}
                  />
                </dd>
                <dd className="mt-2 max-w-40 text-sm text-ink-soft" aria-hidden>
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Llamada a colaborar + CTA */}
        <Reveal delay={100}>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-lg border border-azul-200 bg-azul-50 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                <Bell size={18} aria-hidden />
              </span>
              <div>
                <p className="font-medium text-azul-800">{t("ctaTitle")}</p>
                <p className="text-sm text-azul-700/80">{t("ctaBody")}</p>
              </div>
            </div>
            <Button href="#contacto" className="w-full shrink-0 sm:w-auto">
              {t("cta")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
