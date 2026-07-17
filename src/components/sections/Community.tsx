import { getTranslations } from "next-intl/server";
import { MessageCircle, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

/** Tercera textura: tarjetas-publicación con comilla. Prueba social orgánica. */
export async function Community() {
  const t = await getTranslations("community");

  const posts = [
    { quote: t("post1Quote"), author: t("post1Author"), meta: t("post1Replies") },
    { quote: t("post2Quote"), author: t("post2Author"), meta: t("post2Replies") },
    { quote: t("post3Quote"), author: t("post3Author"), meta: t("post3Replies") },
  ];

  return (
    <section id="comunidad" className="bg-subtle py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {t("kicker")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3">
          {posts.map((p) => (
            <RevealItem key={p.author}>
              <Card hover className="flex h-full flex-col">
                <Quote size={24} className="text-azul-300" aria-hidden />
                <p className="mt-3 flex-1 text-lg leading-relaxed text-ink">
                  {p.quote}
                </p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-ink-soft">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                      {p.author.charAt(0)}
                    </span>
                    {p.author}
                  </span>
                  <span className="flex items-center gap-1 text-ink-mute">
                    <MessageCircle size={14} aria-hidden />
                    {p.meta}
                  </span>
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={100} className="mt-10 text-center">
          <Button variant="secondary" href="/registro">
            {t("cta")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
