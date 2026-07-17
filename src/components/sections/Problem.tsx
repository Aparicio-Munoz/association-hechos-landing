import { getTranslations } from "next-intl/server";
import { FileQuestion, MessagesSquare, UserX } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

/**
 * Sección deliberadamente apagada: sin marca, sin sombra, iconos en
 * gris. El visitante debe reconocerse en el problema antes de que la
 * Solución (siguiente sección) recupere el color — contraste narrativo.
 */
export async function Problem() {
  const t = await getTranslations("problem");

  const cards = [
    { icon: FileQuestion, title: t("card1Title"), body: t("card1Body") },
    { icon: MessagesSquare, title: t("card2Title"), body: t("card2Body") },
    { icon: UserX, title: t("card3Title"), body: t("card3Body") },
  ];

  return (
    <section className="relative bg-subtle py-16 sm:py-20">
      {/* Textura casi imperceptible: puntos finos, sin máscara de color */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(var(--h-line)_1px,transparent_1px)] opacity-60 [background-size:32px_32px]"
      />

      <Container className="relative">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3">
          {cards.map((c) => (
            <RevealItem
              key={c.title}
              className="rounded-lg border border-line/70 bg-canvas/60 p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-inset text-ink-mute">
                <c.icon size={20} aria-hidden />
              </span>
              <p className="mt-4 font-semibold text-ink">{c.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {c.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
