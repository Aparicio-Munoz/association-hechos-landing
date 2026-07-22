import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import { Briefcase, Building2, Calendar, LayoutGrid, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { CountUp } from "@/components/motion/CountUp";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

type Stat = {
  icon: ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  label: string;
  featured?: boolean;
} & ({ pending: true } | { pending: false; value: number; note?: string });

/**
 * "Nuestro impacto" — de cifras de producto (cursos, ofertas, idiomas,
 * ya mostradas en Hero/Partners) a indicadores institucionales reales.
 * De los 5 indicadores pedidos, solo uno es verificable hoy sin
 * depender de un dato oficial externo: "programas activos" — es un
 * hecho del propio sitio (los 5 programas de `Programs.tsx`), no una
 * cifra inventada. Los otros 4 no tienen dato oficial todavía, así que
 * se muestran como placeholders inequívocos — nunca como un número que
 * parezca real.
 */
export async function Impact() {
  const t = await getTranslations("impact");

  const stats: Stat[] = [
    {
      icon: LayoutGrid,
      label: t("programsLabel"),
      pending: false,
      value: 5,
      note: t("programsNote"),
      featured: true,
    },
    { icon: Calendar, label: t("yearsLabel"), pending: true },
    { icon: Users, label: t("youthLabel"), pending: true },
    { icon: Building2, label: t("companiesLabel"), pending: true },
    { icon: Briefcase, label: t("hiredLabel"), pending: true },
  ];

  return (
    <>
      <SectionDivider from="bg-subtle" to="text-azul-950" />

      <section id="impacto" className="relative overflow-hidden bg-azul-950 py-24 text-niebla-0 sm:py-32 lg:py-36">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-azul-500/15 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-azul-400/10 blur-3xl" />
        </div>

        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-azul-300">
              {t("kicker")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-azul-100/90">
              {t("subtitle")}
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s) => (
              <RevealItem
                key={s.label}
                className={cn(s.featured && "sm:col-span-2")}
              >
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border border-niebla-0/10 bg-niebla-0/[0.05] p-7 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
                    "transition-[transform,border-color,background-color,box-shadow] duration-200 ease-salida",
                    "hover:-translate-y-1 hover:border-niebla-0/20 hover:bg-niebla-0/[0.07] hover:shadow-glow-sm",
                    s.featured && "sm:flex-row sm:items-center sm:gap-8",
                  )}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-niebla-0/10 text-azul-100">
                    <s.icon size={22} aria-hidden />
                  </span>

                  <div className="mt-5 sm:mt-0">
                    {s.pending ? (
                      <>
                        <Badge
                          tone="neutral"
                          className="border border-dashed border-niebla-0/25 bg-transparent text-azul-100"
                        >
                          {t("pendingBadge")}
                        </Badge>
                        <p className="mt-3 font-display text-3xl font-bold text-niebla-0/30">
                          —
                        </p>
                      </>
                    ) : (
                      <p className="font-display text-4xl font-bold text-niebla-0 sm:text-5xl">
                        <CountUp to={s.value} delay={200} />
                      </p>
                    )}

                    <p className="mt-2 text-base font-medium text-azul-100">
                      {s.label}
                    </p>
                    <p className="mt-1 text-sm text-azul-200/70">
                      {s.pending ? t("pendingNote") : s.note}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <SectionDivider from="bg-azul-950" to="text-canvas" mirror />
    </>
  );
}
