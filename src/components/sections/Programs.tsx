import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import {
  Briefcase,
  CheckCircle2,
  Compass,
  GraduationCap,
  Home,
  Target,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/* ── Ilustraciones abstractas por programa: line-art propio, no fotos
   de stock ni iconos genéricos repetidos. Todas comparten el mismo
   lenguaje (trazo + acentos rellenos) para leerse como una familia. ── */

function CreandoPuentesArt() {
  return (
    <svg viewBox="0 0 100 64" className="h-16 w-16 text-niebla-0" aria-hidden>
      <rect x="14" y="10" width="46" height="34" rx="4" className="fill-niebla-0/25" />
      <rect x="22" y="16" width="46" height="34" rx="4" className="fill-niebla-0/45" />
      <rect x="30" y="22" width="46" height="34" rx="4" className="fill-niebla-0/95" />
      <path d="M46 32 L46 46 L60 39 Z" className="fill-azul-700" />
    </svg>
  );
}

function OrientateArt() {
  return (
    <svg
      viewBox="0 0 100 64"
      className="h-16 w-16 text-niebla-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="20" y="40" width="12" height="18" rx="2" className="fill-niebla-0/45" stroke="none" />
      <rect x="40" y="28" width="12" height="30" rx="2" className="fill-niebla-0/70" stroke="none" />
      <rect x="60" y="12" width="12" height="46" rx="2" className="fill-niebla-0" stroke="none" />
      <path d="M18 32 L46 18 L78 6" opacity="0.6" />
      <circle cx="78" cy="6" r="4" className="fill-niebla-0" stroke="none" />
    </svg>
  );
}

function InformaArt() {
  return (
    <svg
      viewBox="0 0 100 64"
      className="h-16 w-16 text-niebla-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <circle cx="38" cy="32" r="19" opacity="0.55" />
      <circle cx="62" cy="32" r="19" opacity="0.55" />
      <circle cx="50" cy="44" r="19" opacity="0.9" />
    </svg>
  );
}

function HogaresDeAcogidaArt() {
  return (
    <svg
      viewBox="0 0 100 64"
      className="h-16 w-16 text-niebla-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M8 54 Q 30 54 40 38 T 70 20 T 92 10" strokeDasharray="1 8" opacity="0.7" />
      <circle cx="8" cy="54" r="4" className="fill-niebla-0/60" stroke="none" />
      <circle cx="50" cy="29" r="4" className="fill-niebla-0/85" stroke="none" />
      <circle cx="92" cy="10" r="5" className="fill-niebla-0" stroke="none" />
    </svg>
  );
}

function EnfocaArt() {
  return (
    <svg
      viewBox="0 0 100 64"
      className="h-16 w-16 text-niebla-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <line x1="20" y1="46" x2="50" y2="14" opacity="0.5" />
      <line x1="50" y1="14" x2="80" y2="40" opacity="0.5" />
      <line x1="20" y1="46" x2="50" y2="52" opacity="0.5" />
      <line x1="50" y1="52" x2="80" y2="40" opacity="0.5" />
      <circle cx="20" cy="46" r="5" className="fill-niebla-0/70" stroke="none" />
      <circle cx="50" cy="14" r="5" className="fill-niebla-0" stroke="none" />
      <circle cx="80" cy="40" r="5" className="fill-niebla-0/70" stroke="none" />
      <circle cx="50" cy="52" r="5" className="fill-niebla-0/85" stroke="none" />
    </svg>
  );
}

type Program = {
  icon: ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  Art: ComponentType;
  gradient: string;
  title: string;
  body: string;
  benefits: string[];
  cta: string;
  href: string;
};

export async function Programs() {
  const t = await getTranslations("programs");

  const programs: Program[] = [
    {
      icon: Briefcase,
      Art: CreandoPuentesArt,
      gradient: "from-azul-500 to-azul-800",
      title: t("item1Title"),
      body: t("item1Body"),
      benefits: [t("item1Benefit1"), t("item1Benefit2"), t("item1Benefit3")],
      cta: t("item1Cta"),
      href: "#empleabilidad",
    },
    {
      icon: GraduationCap,
      Art: OrientateArt,
      gradient: "from-azul-600 to-azul-900",
      title: t("item2Title"),
      body: t("item2Body"),
      benefits: [t("item2Benefit1"), t("item2Benefit2"), t("item2Benefit3")],
      cta: t("item2Cta"),
      href: "#formacion",
    },
    {
      icon: Compass,
      Art: InformaArt,
      gradient: "from-azul-400 to-azul-700",
      title: t("item3Title"),
      body: t("item3Body"),
      benefits: [t("item3Benefit1"), t("item3Benefit2"), t("item3Benefit3")],
      cta: t("item3Cta"),
      href: "#contacto",
    },
    {
      icon: Home,
      Art: HogaresDeAcogidaArt,
      gradient: "from-azul-700 to-azul-950",
      title: t("item4Title"),
      body: t("item4Body"),
      benefits: [t("item4Benefit1"), t("item4Benefit2"), t("item4Benefit3")],
      cta: t("item4Cta"),
      href: "#contacto",
    },
    {
      icon: Target,
      Art: EnfocaArt,
      gradient: "from-azul-300 to-azul-600",
      title: t("item5Title"),
      body: t("item5Body"),
      benefits: [t("item5Benefit1"), t("item5Benefit2"), t("item5Benefit3")],
      cta: t("item5Cta"),
      href: "/registro",
    },
  ];

  return (
    <section id="programas" className="bg-canvas py-20 sm:py-28">
      <Container>
        <SectionIntro kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <RevealGroup className="relative mt-16 flex flex-col gap-14 lg:mt-20 lg:gap-4">
          {/* Línea de "camino" que conecta los 5 programas — solo desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-line lg:block"
          />

          {programs.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <RevealItem
                key={p.title}
                className="group relative grid grid-cols-1 items-center gap-6 py-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10"
              >
                {/* Ilustración */}
                <div className={cn(reversed ? "lg:order-3" : "lg:order-1")}>
                  <div
                    className={cn(
                      "flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-linear-to-br shadow-md",
                      "transition-transform duration-300 ease-salida group-hover:scale-[1.03]",
                      p.gradient,
                    )}
                  >
                    <p.Art />
                  </div>
                </div>

                {/* Marcador sobre la línea — solo desktop */}
                <div
                  aria-hidden
                  className="order-2 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-canvas bg-brand-soft text-brand shadow-sm lg:flex"
                >
                  <p.icon size={18} />
                </div>

                {/* Tarjeta de contenido */}
                <div className={cn(reversed ? "lg:order-1" : "lg:order-3")}>
                  <div
                    className={cn(
                      "rounded-xl border border-line bg-elevated p-7 shadow-sm sm:p-8",
                      "transition-[transform,box-shadow,border-color] duration-150 ease-salida",
                      "group-hover:-translate-y-0.5 group-hover:border-azul-300 group-hover:shadow-md",
                    )}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-brand lg:hidden">
                      <p.icon size={20} aria-hidden />
                    </span>

                    <h3 className="mt-4 font-display text-2xl font-bold text-ink lg:mt-0">
                      {p.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{p.body}</p>

                    <ul className="mt-4 flex flex-col gap-2">
                      {p.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm text-ink-soft"
                        >
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0 text-brand"
                            aria-hidden
                          />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="secondary"
                      size="sm"
                      href={p.href}
                      className="mt-6"
                    >
                      {p.cta}
                    </Button>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
