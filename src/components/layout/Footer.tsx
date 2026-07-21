import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SocialLinks } from "@/components/layout/SocialLinks";
import {
  SITE_NAME,
  SUPPORT_ADDRESS,
  SUPPORT_EMAIL,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
} from "@/lib/site";

/**
 * Cierre institucional en azul-950: hasta el suelo es identidad.
 *
 * Dirección, teléfono y correo son datos reales y públicos de
 * Asociación Hechos (verificados en hechos.eu/contacto), no
 * placeholders — ver constantes en `@/lib/site`. La columna
 * "Programas" reutiliza los mismos 5 nombres/enlaces reales de
 * `Programs.tsx` (vía el namespace `programs`) para no duplicar ni
 * desalinear esa información en dos lugares del sitio.
 */
export async function Footer() {
  const t = await getTranslations("footer");
  const tp = await getTranslations("programs");
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: t("linkMission"), href: "#mision" },
    { label: t("linkValues"), href: "#valores" },
    { label: t("linkNews"), href: "#actualidad" },
    { label: t("linkHelp"), href: "#ayudar" },
    { label: t("linkPartners"), href: "#empresas" },
    { label: t("linkContact"), href: "#contacto" },
    { label: t("linkLogin"), href: "/login" },
  ];

  // Mismos nombres y destinos reales que las 5 tarjetas de Programs.tsx.
  const programLinks = [
    { label: tp("item1Title"), href: "#empleabilidad" },
    { label: tp("item2Title"), href: "#formacion" },
    { label: tp("item3Title"), href: "#contacto" },
    { label: tp("item4Title"), href: "#contacto" },
    { label: tp("item5Title"), href: "/registro" },
  ];

  const legalLinks = [
    { label: t("linkPrivacy"), href: "/privacidad" },
    { label: t("linkTerms"), href: "/terminos" },
  ];

  const socialLabels = {
    facebook: t("socialFacebook"),
    instagram: t("socialInstagram"),
    x: t("socialX"),
    youtube: t("socialYoutube"),
    linkedin: t("socialLinkedin"),
  };

  return (
    <footer className="bg-azul-950 text-azul-200">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo-hechos.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full bg-niebla-0/95 p-0.5"
            />
            <span className="font-display text-lg font-bold text-niebla-0">
              {SITE_NAME}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-azul-200/80">
            {t("tagline")}
          </p>

          {/* Datos de contacto reales — no placeholders. */}
          <ul className="mt-5 flex flex-col gap-2.5 text-sm text-azul-200/80">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-azul-300" aria-hidden />
              <span>{SUPPORT_ADDRESS}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-azul-300" aria-hidden />
              <a
                href={`tel:${SUPPORT_PHONE_TEL}`}
                className="transition-colors duration-150 hover:text-niebla-0"
              >
                {SUPPORT_PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-azul-300" aria-hidden />
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="transition-colors duration-150 hover:text-niebla-0"
              >
                {SUPPORT_EMAIL}
              </a>
            </li>
          </ul>

          <SocialLinks labels={socialLabels} className="mt-6" />
        </div>

        <nav aria-label={t("colQuickLinks")}>
          <p className="text-sm font-semibold text-niebla-0">{t("colQuickLinks")}</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-azul-200/80 transition-colors duration-150 hover:text-niebla-0"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("colPrograms")}>
          <p className="text-sm font-semibold text-niebla-0">{t("colPrograms")}</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {programLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-azul-200/80 transition-colors duration-150 hover:text-niebla-0"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-azul-800/60">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-azul-200/70 sm:flex-row">
          <span>
            © {year} {SITE_NAME}
          </span>
          <div className="flex items-center gap-4">
            {legalLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors duration-150 hover:text-niebla-0"
              >
                {l.label}
              </a>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
