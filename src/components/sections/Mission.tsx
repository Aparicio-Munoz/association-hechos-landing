import { getTranslations } from "next-intl/server";
import {
  Briefcase,
  Compass,
  GraduationCap,
  Home,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Card } from "@/components/ui/Card";

/**
 * Primera sección de contenido tras el Hero: explica quién es Hechos y
 * por qué existe antes de mostrar qué se puede hacer en la plataforma.
 * Las 5 tarjetas son las 5 áreas reales de trabajo de la asociación
 * (empleabilidad juvenil, educación, información a migrantes, acogida
 * de menores extranjeros y acompañamiento) — cada una es la dimensión
 * institucional detrás de uno de los 5 programas reales de Programs.tsx,
 * no un módulo de producto.
 */
export async function Mission() {
  const t = await getTranslations("mission");

  const pillars = [
    { icon: Briefcase, title: t("pillar1Title"), body: t("pillar1Body") },
    { icon: GraduationCap, title: t("pillar2Title"), body: t("pillar2Body") },
    { icon: Compass, title: t("pillar3Title"), body: t("pillar3Body") },
    { icon: Home, title: t("pillar4Title"), body: t("pillar4Body") },
    { icon: TrendingUp, title: t("pillar5Title"), body: t("pillar5Body") },
  ];

  return (
    <section id="mision" className="bg-subtle py-20 sm:py-28">
      <Container>
        <SectionIntro kicker={t("kicker")} title={t("title")} subtitle={t("body")} />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <RevealItem key={p.title}>
              <Card className="h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-soft text-brand">
                  <p.icon size={22} aria-hidden />
                </span>
                <p className="mt-4 font-semibold text-ink">{p.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {p.body}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
