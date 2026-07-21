import { getTranslations } from "next-intl/server";
import { HeartHandshake, Lock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Cierre real de la landing (antes el link "Escríbenos" apuntaba a
 * `/contacto`, una ruta que no existe). Hereda el momento de marca en
 * azul que antes ocupaba el CTA final, y suma las 3 garantías de
 * confianza que antes vivían en "Nosotros" — tienen más sentido como
 * cierre que como dato institucional a mitad de página.
 *
 * TODO(contacto real): reemplazar el correo placeholder por el
 * definitivo en cuanto la asociación confirme dominio y canal oficial.
 */
export async function Contact() {
  const t = await getTranslations("contact");

  const email = t("email");
  const guarantees = [
    { icon: Lock, text: t("guarantee1") },
    { icon: ShieldCheck, text: t("guarantee2") },
    { icon: HeartHandshake, text: t("guarantee3") },
  ];

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-linear-to-br from-azul-700 to-azul-900 py-20 text-niebla-0 sm:py-28"
    >
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-azul-400/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-niebla-0/5 blur-3xl" />
      </div>

      <Container className="relative flex flex-col items-center text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-azul-100">
            {t("kicker")}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-azul-100">{t("body")}</p>
        </Reveal>

        <Reveal delay={100} className="mt-8">
          <Button variant="inverse" size="lg" href={`mailto:${email}`}>
            {t("cta")}
          </Button>
        </Reveal>

        <Reveal
          delay={180}
          className="mt-14 flex flex-col items-center gap-4 border-t border-niebla-0/15 pt-10 sm:flex-row sm:gap-8"
        >
          {guarantees.map((g) => (
            <span
              key={g.text}
              className="flex items-center gap-2.5 text-sm font-medium text-azul-100"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-niebla-0/10">
                <g.icon size={16} aria-hidden />
              </span>
              {g.text}
            </span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
