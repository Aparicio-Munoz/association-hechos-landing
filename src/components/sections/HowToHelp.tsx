import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Building2,
  Heart,
  IdCard,
  Package,
  UserPlus,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SUPPORT_EMAIL } from "@/lib/site";
import { cn } from "@/lib/cn";

type Help = {
  icon: ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  title: string;
  body: string;
  cta: string;
  href: string;
  featured?: boolean;
  /** Clase de microinteracción del ícono al hacer hover de la tarjeta. */
  iconHover: string;
};

/**
 * "¿Cómo puedes colaborar?" — las 5 formas reales de colaboración que
 * describe hechos.eu/colabora (donativo, membresía, voluntariado,
 * colaboración empresarial y donación de producto/servicio), no una
 * lista genérica. "Empresas colaboradoras" es una tarjeta-puente hacia
 * `Partners.tsx` (no duplica su contenido, invita a profundizar ahí)
 * — evita repetir dos veces la misma información.
 */
export async function HowToHelp() {
  const t = await getTranslations("howToHelp");

  // TODO(donaciones): reemplazar por un procesador de pagos real
  // (Stripe/PayU/similar) en cuanto la asociación lo tenga listo.
  const donateHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    "Quiero donar a Asociación Hechos",
  )}`;

  // TODO(socios): reemplazar por un formulario/pasarela de cuota
  // recurrente real en cuanto la asociación lo tenga listo.
  const membershipHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    "Quiero hacerme socio/a de Asociación Hechos",
  )}`;

  // TODO(voluntariado): reemplazar por un formulario de postulación
  // real cuando exista un proceso formal de voluntariado.
  const volunteerHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    "Quiero ser voluntario/a en Asociación Hechos",
  )}`;

  // TODO(donación de producto/servicio): reemplazar por un formulario
  // dedicado en cuanto la asociación lo tenga listo.
  const productDonationHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    "Quiero donar productos o servicios a Asociación Hechos",
  )}`;

  const items: Help[] = [
    {
      icon: Heart,
      title: t("item1Title"),
      body: t("item1Body"),
      cta: t("item1Cta"),
      href: donateHref,
      featured: true,
      iconHover: "group-hover:scale-110",
    },
    {
      icon: IdCard,
      title: t("item2Title"),
      body: t("item2Body"),
      cta: t("item2Cta"),
      href: membershipHref,
      iconHover: "group-hover:-rotate-6 group-hover:scale-110",
    },
    {
      icon: UserPlus,
      title: t("item3Title"),
      body: t("item3Body"),
      cta: t("item3Cta"),
      href: volunteerHref,
      iconHover: "group-hover:-rotate-6 group-hover:scale-110",
    },
    {
      icon: Building2,
      title: t("item4Title"),
      body: t("item4Body"),
      cta: t("item4Cta"),
      href: "#empresas",
      iconHover: "group-hover:scale-110",
    },
    {
      icon: Package,
      title: t("item5Title"),
      body: t("item5Body"),
      cta: t("item5Cta"),
      href: productDonationHref,
      iconHover: "group-hover:rotate-6 group-hover:scale-110",
    },
  ];

  return (
    <section id="ayudar" className="bg-subtle py-24 sm:py-32 lg:py-36">
      <Container>
        <SectionIntro kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <RevealItem
              key={it.title}
              className={cn(it.featured && "sm:col-span-2")}
            >
              <Card
                hover
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden p-7",
                  it.featured && "sm:flex-row sm:items-center sm:gap-8 sm:p-8",
                )}
              >
                {/* Halo decorativo: aparece solo con hover, refuerza la elevación */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-azul-300/0 blur-2xl transition-colors duration-300 group-hover:bg-azul-300/20"
                />

                <span
                  className={cn(
                    "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand",
                    "transition-transform duration-300 ease-salida",
                    it.iconHover,
                  )}
                >
                  <it.icon size={24} aria-hidden />
                </span>

                <div className="relative mt-5 flex flex-1 flex-col sm:mt-0">
                  <p className="font-display text-lg font-bold text-ink">
                    {it.title}
                  </p>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">
                    {it.body}
                  </p>

                  <Button
                    variant="secondary"
                    size="sm"
                    href={it.href}
                    className="mt-5 w-fit"
                  >
                    {it.cta}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-150 ease-salida group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Button>
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
