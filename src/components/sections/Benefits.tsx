import { getTranslations } from "next-intl/server";
import {
  Bell,
  Briefcase,
  GraduationCap,
  Globe2,
  TrendingUp,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Card } from "@/components/ui/Card";

/**
 * Grilla uniforme, sin hover: un beneficio no es una acción, es una
 * razón. La uniformidad de peso comunica solidez (§5 del sistema).
 */
export async function Benefits() {
  const t = await getTranslations("benefits");

  const items = [
    { icon: GraduationCap, title: t("item1Title"), body: t("item1Body") },
    { icon: Briefcase, title: t("item2Title"), body: t("item2Body") },
    { icon: Bell, title: t("item3Title"), body: t("item3Body") },
    { icon: TrendingUp, title: t("item4Title"), body: t("item4Body") },
    { icon: Users, title: t("item5Title"), body: t("item5Body") },
    { icon: Globe2, title: t("item6Title"), body: t("item6Body") },
  ];

  return (
    <section className="relative overflow-hidden bg-canvas py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azul-50 blur-3xl dark:bg-azul-900/10"
      />

      <Container className="relative">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand">
            {t("kicker")}
          </p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-3 text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <RevealItem key={it.title}>
              <Card className="h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-soft text-brand">
                  <it.icon size={22} aria-hidden />
                </span>
                <p className="mt-4 font-semibold text-ink">{it.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {it.body}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
