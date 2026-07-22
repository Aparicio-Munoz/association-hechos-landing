import { getTranslations } from "next-intl/server";
import {
  Award,
  Equal,
  Eye,
  HeartHandshake,
  Handshake,
  Leaf,
  Scale,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

/**
 * "Nuestros Valores" — los 8 valores institucionales reales de
 * Asociación Hechos (hechos.eu/quienes-somos), reescritos en nuestras
 * propias palabras, nunca copiados literalmente. Tarjetas puramente
 * informativas (sin CTA): por eso no usan `Card hover` (esa elevación
 * está reservada a contenido clicable, ver Card.tsx) — la interacción
 * vive en el propio ícono, que invierte de color y gira al pasar el
 * cursor, y en el borde, que se tiñe de azul.
 */
export async function Values() {
  const t = await getTranslations("values");

  const values = [
    { icon: Scale, title: t("item1Title"), body: t("item1Body") },
    { icon: HeartHandshake, title: t("item2Title"), body: t("item2Body") },
    { icon: Users, title: t("item3Title"), body: t("item3Body") },
    { icon: Equal, title: t("item4Title"), body: t("item4Body") },
    { icon: Leaf, title: t("item5Title"), body: t("item5Body") },
    { icon: Handshake, title: t("item6Title"), body: t("item6Body") },
    { icon: Eye, title: t("item7Title"), body: t("item7Body") },
    { icon: Award, title: t("item8Title"), body: t("item8Body") },
  ];

  return (
    <section id="valores" className="bg-canvas py-24 sm:py-32 lg:py-36">
      <Container>
        <SectionIntro kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <RevealItem key={v.title}>
              <div
                className={[
                  "group h-full rounded-2xl border border-line/70 bg-elevated/85 p-6 shadow-sm backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)]",
                  "transition-colors duration-200 ease-salida hover:border-azul-300/70",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    "bg-brand-soft text-brand",
                    "transition-all duration-300 ease-salida",
                    "group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-on-brand",
                  ].join(" ")}
                >
                  <v.icon size={22} aria-hidden />
                </span>
                <p className="mt-4 font-semibold text-ink">{v.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {v.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
