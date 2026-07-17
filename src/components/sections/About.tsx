import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Lock, ShieldCheck, HeartHandshake } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";

/** Sección de confianza institucional (SRS: información institucional). */
export async function About() {
  const t = await getTranslations("about");

  const guarantees = [
    { icon: Lock, text: t("guarantee1") },
    { icon: ShieldCheck, text: t("guarantee2") },
    { icon: HeartHandshake, text: t("guarantee3") },
  ];

  return (
    <section id="nosotros" className="bg-canvas py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        {/* Panel visual de marca con el logo oficial (fotos reales pendientes) */}
        <Reveal className="order-last lg:order-first">
          <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-azul-700 to-azul-950 p-10 shadow-lg">
            <div
              aria-hidden
              className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-azul-400/20 blur-3xl"
            />
            <div className="relative flex flex-col items-center gap-5 py-6 text-center">
              <Image
                src="/images/logo-hechos.png"
                alt="Logo de Asociación Hechos"
                width={120}
                height={120}
                className="h-28 w-28 rounded-full bg-white/95 p-1 shadow-md"
              />
              <p className="font-display text-2xl font-bold text-white">hechos</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              {t("kicker")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              {t("body")}
            </p>
          </Reveal>

          <ul className="mt-8 flex flex-col gap-3">
            {guarantees.map((g) => (
              <Reveal key={g.text} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <g.icon size={18} aria-hidden />
                </span>
                <span className="font-medium text-ink">{g.text}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={80}>
            <Link
              href="/contacto"
              className="mt-8 inline-flex text-sm font-semibold text-brand hover:text-brand-strong"
            >
              {t("contactCta")} →
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
