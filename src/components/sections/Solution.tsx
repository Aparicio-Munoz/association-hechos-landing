import { getTranslations } from "next-intl/server";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { Reveal } from "@/components/motion/Reveal";
import { DrawPaths } from "@/components/motion/DrawPaths";

/**
 * Primer "momento de marca": banda azul-800 profunda. Es el pivote
 * emocional de la narrativa — del gris del Problema al color de la
 * Solución. Los tres chips son anclas reales a sus secciones.
 */
export async function Solution() {
  const t = await getTranslations("solution");

  const chips = [
    { icon: GraduationCap, label: t("chip1"), href: "#formacion" },
    { icon: Briefcase, label: t("chip2"), href: "#empleo" },
    { icon: Users, label: t("chip3"), href: "#comunidad" },
  ];

  return (
    <>
      <SectionDivider from="bg-subtle" to="text-azul-800" />

      <section className="relative overflow-hidden bg-azul-800 py-20 text-white sm:py-28">
        {/* Mesh de gradientes azules: profundidad sin imágenes */}
        <div aria-hidden className="absolute inset-0">
          <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-azul-400/25 blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-azul-300/15 blur-3xl" />
        </div>

        <Container className="relative flex flex-col items-center text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-azul-300">
              {t("kicker")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 max-w-xl text-lg text-azul-100/90">
              {t("subtitle")}
            </p>
          </Reveal>

          {/* Fila de iconos-origen alineada con los trazos que convergen */}
          <div className="mt-14 grid w-full max-w-xs grid-cols-3 gap-4 sm:max-w-sm">
            {chips.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-azul-700/60 text-azul-100 ring-1 ring-azul-300/30">
                  <c.icon size={18} aria-hidden />
                </span>
              </div>
            ))}
          </div>

          <DrawPaths />

          {/* Destino de la convergencia + los chips como anclas reales */}
          <div className="-mt-2 flex flex-col items-center gap-6">
            <span className="rounded-full bg-glow px-5 py-2 text-sm font-bold text-azul-950 shadow-cta">
              {t("hub")}
            </span>

            <div className="flex flex-wrap justify-center gap-3">
              {chips.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-azul-300/40 bg-azul-700/40 px-4 text-sm font-medium text-azul-50 backdrop-blur-sm transition-colors duration-150 hover:bg-azul-700/70"
                >
                  <c.icon size={14} aria-hidden />
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider from="bg-azul-800" to="text-canvas" mirror />
    </>
  );
}
