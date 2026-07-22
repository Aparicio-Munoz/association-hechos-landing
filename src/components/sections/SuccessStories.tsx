import { getTranslations } from "next-intl/server";
import { User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SUPPORT_EMAIL } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * "Historias que inspiran" — pensada para ser la sección más emocional
 * de la landing, pero sin un solo testimonio inventado: no hay
 * historias reales verificadas todavía, así que cada tarjeta muestra
 * la ESTRUCTURA (foto, nombre, programa, antes/después/resultado) con
 * un placeholder inequívoco en cada campo, no una cita anónima
 * disfrazada de testimonio real. El peso emocional lo lleva el diseño
 * (banda de marca, copy) y la invitación real a compartir una historia,
 * no contenido fabricado.
 */
export async function SuccessStories() {
  const t = await getTranslations("successStories");

  const gradients = [
    "from-azul-400 to-azul-700",
    "from-azul-500 to-azul-800",
    "from-azul-300 to-azul-600",
  ];

  const programs = [t("program1"), t("program2"), t("program3")];

  const fields = [t("beforeLabel"), t("afterLabel"), t("resultLabel")];

  // TODO(historias reales): reemplazar cada placeholder por una historia
  // real (foto, nombre y relato) en cuanto exista, con consentimiento
  // explícito de la persona.
  const shareHref =
    `mailto:${SUPPORT_EMAIL}?subject=` +
    encodeURIComponent("Quiero compartir mi historia con Hechos");

  return (
    <>
      <SectionDivider from="bg-canvas" to="text-azul-800" />

      <section
        id="historias"
        className="relative overflow-hidden bg-linear-to-br from-azul-800 to-azul-950 py-24 text-niebla-0 sm:py-32 lg:py-36"
      >
        <div aria-hidden className="absolute inset-0">
          <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-azul-400/20 blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-azul-300/10 blur-3xl" />
        </div>

        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-azul-200">
              {t("kicker")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t("titleStart")}{" "}
              <span className="bg-linear-to-r from-azul-200 via-niebla-0 to-azul-200 bg-clip-text text-transparent">
                {t("titleAccent")}
              </span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-azul-100/90">
              {t("subtitle")}
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-3">
            {gradients.map((gradient, i) => (
              <RevealItem key={i}>
                <Card className="flex h-full flex-col">
                  <Badge tone="neutral" className="self-start border border-dashed border-line">
                    {t("placeholderBadge")}
                  </Badge>

                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-niebla-0",
                        gradient,
                      )}
                    >
                      <User size={24} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-semibold italic text-ink-soft">
                        {t("namePlaceholder")}
                      </p>
                      <Badge tone="brand" className="mt-1">
                        {programs[i]}
                      </Badge>
                    </div>
                  </div>

                  <dl className="mt-5 flex flex-1 flex-col gap-3 border-t border-line pt-4 text-sm">
                    {fields.map((label) => (
                      <div key={label} className="flex items-baseline justify-between gap-3">
                        <dt className="font-semibold text-ink">{label}</dt>
                        <dd className="truncate text-ink-soft italic">
                          {t("fieldPlaceholder")}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal
            delay={100}
            className="mt-14 flex flex-col items-center gap-4 rounded-lg border border-niebla-0/15 bg-niebla-0/5 p-6 text-center backdrop-blur-sm sm:flex-row sm:justify-between sm:text-left"
          >
            <div>
              <p className="font-display text-lg font-bold text-niebla-0">
                {t("ctaTitle")}
              </p>
              <p className="mt-1 text-sm text-azul-100/90">{t("ctaBody")}</p>
            </div>
            <Button
              variant="inverse"
              href={shareHref}
              className="w-full shrink-0 sm:w-auto"
            >
              {t("cta")}
            </Button>
          </Reveal>
        </Container>
      </section>

      <SectionDivider from="bg-azul-950" to="text-canvas" mirror />
    </>
  );
}
