import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowRight, CalendarDays, Megaphone, Newspaper } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SOCIAL_URLS } from "@/components/layout/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

/**
 * Forma que tendrá cada publicación una vez esta sección se conecte a
 * un CMS/API real (blog propio, Sanity/Contentful, o el propio backend
 * NestJS). `date`/`imageUrl`/`href` son opcionales a propósito: hoy no
 * existen (ver `getPlaceholderPosts`), así que la UI los trata como
 * "pendientes" en vez de fabricar un dato que parezca real.
 */
interface NewsPost {
  id: string;
  icon: ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  gradient: string;
  category: string;
  /** ISO date string una vez haya una publicación real; `null` = pendiente. */
  date: string | null;
  title: string;
  excerpt: string;
  /** URL de imagen real de la publicación, una vez exista. */
  imageUrl?: string;
  /** URL del artículo completo, una vez exista. */
  href?: string;
}

/**
 * "Actualidad" — estructura lista para publicaciones reales, sin
 * ninguna todavía: no copiamos ni inventamos noticias de Asociación
 * Hechos, así que cada tarjeta se muestra con su forma completa
 * (categoría, imagen, resumen) pero con los campos que dependen de
 * contenido real marcados como pendientes, igual que ya hacen
 * SuccessStories.tsx e Impact.tsx.
 *
 * TODO(CMS/API): reemplazar `getPlaceholderPosts` por un `fetch` real
 * a la fuente de noticias que se elija — el resto del componente no
 * necesita cambiar, ya espera `date`/`imageUrl`/`href` opcionales.
 */
function getPlaceholderPosts(
  t: Awaited<ReturnType<typeof getTranslations<"news">>>,
): NewsPost[] {
  return [
    {
      id: "1",
      icon: CalendarDays,
      gradient: "from-azul-500 to-azul-800",
      category: t("category1"),
      date: null,
      title: t("titleFallback"),
      excerpt: t("excerptFallback"),
    },
    {
      id: "2",
      icon: Newspaper,
      gradient: "from-azul-600 to-azul-900",
      category: t("category2"),
      date: null,
      title: t("titleFallback"),
      excerpt: t("excerptFallback"),
    },
    {
      id: "3",
      icon: Megaphone,
      gradient: "from-azul-400 to-azul-700",
      category: t("category3"),
      date: null,
      title: t("titleFallback"),
      excerpt: t("excerptFallback"),
    },
  ];
}

export async function News() {
  const t = await getTranslations("news");
  const posts = getPlaceholderPosts(t);

  return (
    <section id="actualidad" className="bg-canvas py-20 sm:py-28">
      <Container>
        <SectionIntro kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-3">
          {posts.map((post) => (
            <RevealItem key={post.id}>
              <Card className="flex h-full flex-col overflow-hidden p-0">
                {/* Imagen: placeholder abstracto hasta tener imagen real
                    del CMS/API — nunca foto de stock ni generada por IA. */}
                <div
                  aria-hidden
                  className={cn(
                    "relative flex aspect-video items-center justify-center bg-linear-to-br",
                    post.gradient,
                  )}
                >
                  <post.icon size={30} className="text-niebla-0/80" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="brand">{post.category}</Badge>
                    <span className="text-xs text-ink-soft">
                      {post.date ?? t("dateFallback")}
                    </span>
                  </div>

                  <p className="mt-3 font-display text-lg font-bold text-ink">
                    {post.title}
                  </p>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>

                  <Badge
                    tone="neutral"
                    className="mt-4 w-fit border border-dashed border-line"
                  >
                    {t("pendingBadge")}
                  </Badge>

                  {post.href ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      href={post.href}
                      className="mt-4 w-fit"
                    >
                      {t("cta")}
                      <ArrowRight size={15} aria-hidden />
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled
                      className="mt-4 w-fit"
                    >
                      {t("cta")}
                      <ArrowRight size={15} aria-hidden />
                    </Button>
                  )}
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Invitación a Instagram: no copiamos sus fotos/videos reales
            (personas reales, sin consentimiento verificado para esta
            plataforma — algunas menores de edad en Hogares de Acogida),
            así que en vez de eso dirigimos al canal real donde ese
            contenido ya existe con su contexto y consentimiento. */}
        <Reveal
          delay={100}
          className="mt-12 flex flex-col items-center gap-4 rounded-lg border border-azul-200 bg-azul-50 p-6 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-on-accent">
              IG
            </span>
            <div>
              <p className="font-medium text-azul-800">{t("instagramTitle")}</p>
              <p className="text-sm text-azul-700/80">{t("instagramBody")}</p>
            </div>
          </div>
          <Button
            href={SOCIAL_URLS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full shrink-0 sm:w-auto"
          >
            {t("instagramCta")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
