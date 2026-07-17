import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { SITE_NAME } from "@/lib/site";

/** Cierre institucional en azul-950: hasta el suelo es identidad. */
export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  const cols = [
    {
      title: t("colPlatform"),
      links: [
        { label: t("linkCourses"), href: "#formacion" },
        { label: t("linkJobs"), href: "#empleo" },
        { label: t("linkCommunity"), href: "#comunidad" },
        { label: t("linkLogin"), href: "/login" },
      ],
    },
    {
      title: t("colAssociation"),
      links: [
        { label: t("linkAbout"), href: "#nosotros" },
        { label: t("linkContact"), href: "/contacto" },
        { label: t("linkPrivacy"), href: "/privacidad" },
        { label: t("linkTerms"), href: "/terminos" },
      ],
    },
  ];

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
              className="h-10 w-10 rounded-full bg-white/95 p-0.5"
            />
            <span className="font-display text-lg font-bold text-white">
              {SITE_NAME}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-azul-200/80">
            {t("tagline")}
          </p>
        </div>

        {cols.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-semibold text-white">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-azul-200/80 transition-colors duration-150 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-azul-800/60">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-azul-200/70 sm:flex-row">
          <span>
            © {year} {SITE_NAME}
          </span>
          <span>{t("madeWith")}</span>
        </Container>
      </div>
    </footer>
  );
}
