import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * OG image generada en build por idioma (spec SEO §4), con el logo
 * oficial embebido sobre gradiente azul de la identidad.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Asociación Hechos";

const copy = {
  es: {
    title: "Aprende. Encuentra empleo. Pertenece.",
    subtitle: "Cursos gratis, empleo y comunidad para personas migrantes",
  },
  en: {
    title: "Learn. Find work. Belong.",
    subtitle: "Free courses, jobs & community for migrants",
  },
} as const;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = copy[locale === "en" ? "en" : "es"];

  const logo = await readFile(
    join(process.cwd(), "public/images/logo-hechos-512.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0c5878 0%, #0a2a3b 100%)",
          color: "#fcfdfe",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logoSrc} width={92} height={92} alt="" />
          <span style={{ fontSize: 34, fontWeight: 700 }}>Asociación Hechos</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 70,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {t.title}
          </div>
          <div style={{ fontSize: 32, color: "#a6dcf3" }}>{t.subtitle}</div>
        </div>

        <div
          style={{
            display: "flex",
            height: 10,
            width: 220,
            background: "#27b4e9",
            borderRadius: 999,
          }}
        />
      </div>
    ),
    size,
  );
}
