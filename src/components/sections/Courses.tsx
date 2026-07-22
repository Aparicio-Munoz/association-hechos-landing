import { getTranslations } from "next-intl/server";
import { PlayCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/SectionIntro";
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
    <section id="formacion" className="bg-subtle py-24 sm:py-32 lg:py-36">
      <Container>
        <SectionIntro
          align="left"
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

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
                  {/* Honestidad: esto ilustra cómo se verá el catálogo, no
                      cursos reales ya publicados — mismo criterio que
                      Impact/SuccessStories/News. */}
                  <Badge
                    tone="neutral"
                    className="absolute left-2 top-2 border border-dashed border-niebla-0/40 bg-azul-950/40 text-niebla-0 backdrop-blur-sm"
                  >
                    {t("previewBadge")}
                  </Badge>
                  <PlayCircle
                    size={44}
                    className="absolute inset-0 m-auto text-niebla-0/90 transition-transform duration-400 ease-salida group-hover:scale-105"
                    aria-hidden
                  />
                  {/* Scrim teñido de azul-950, nunca negro puro (regla del sistema). */}
                  <span className="absolute bottom-2 right-2 rounded-sm bg-azul-950/50 px-2 py-0.5 text-xs font-medium text-niebla-0 backdrop-blur-sm">
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
