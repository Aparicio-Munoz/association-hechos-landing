import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Acordeón nativo (<details>): cero JS, contenido indexable por Google
 * incluso colapsado. Gestión honesta de expectativas (precio, docs,
 * certificados — exclusión de Visión §11).
 */
export async function Faq() {
  const t = await getTranslations("faq");
  const items = [1, 2, 3, 4, 5, 6] as const;

  return (
    <section className="bg-canvas py-20 sm:py-28">
      <Container width="prose">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-3">
          {items.map((i) => (
            <Reveal key={i}>
              <details
                className="group rounded-lg border border-line bg-elevated px-5 open:shadow-sm"
                {...(i === 1 ? { open: true } : {})}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-ink marker:hidden">
                  {t(`q${i}`)}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-ink-mute transition-transform duration-200 ease-ambos group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="pb-4 text-ink-soft">{t(`a${i}`)}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-8 text-center">
          <a
            href="#contacto"
            className="text-sm font-semibold text-brand hover:text-brand-strong"
          >
            {t("contactCta")}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
