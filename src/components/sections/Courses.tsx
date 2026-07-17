import { getTranslations } from "next-intl/server";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

/** Cada curso con su propio degradado azul — sin fotos de stock. */
const thumbGradients = [
  "from-azul-500 to-azul-800",
  "from-azul-400 to-azul-700",
  "from-azul-600 to-azul-900",
];

export async function Courses() {
  const t = await getTranslations("courses");

  const courses = [
    { title: t("course1Title"), duration: t("course1Duration") },
    { title: t("course2Title"), duration: t("course2Duration") },
    { title: t("course3Title"), duration: t("course3Duration") },
  ];

  return (
    <section id="formacion" className="bg-subtle py-20 sm:py-28">
      <Container>
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
            href="#formacion"
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

        <RevealGroup className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {courses.map((c, i) => (
            <RevealItem
              key={c.title}
              className="w-[80%] shrink-0 snap-start sm:w-auto"
            >
              <Card as="article" hover className="group h-full overflow-hidden p-0">
                <div
                  className={`relative aspect-video overflow-hidden bg-linear-to-br ${thumbGradients[i]}`}
                >
                  <PlayCircle
                    size={44}
                    className="absolute inset-0 m-auto text-white/90 transition-transform duration-400 ease-salida group-hover:scale-105"
                    aria-hidden
                  />
                  <span className="absolute bottom-2 right-2 rounded-sm bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                    {c.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <p className="font-semibold text-ink">{c.title}</p>
                  <Badge tone="brand" className="shrink-0">
                    {t("evalBadge")}
                  </Badge>
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
