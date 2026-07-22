import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

/**
 * Manifest mínimo: reutiliza nombre y colores de marca ya existentes.
 * Los íconos son el isotipo solo (círculo + llama, sin el wordmark
 * "hechos") — es lo que se ve como ícono de app en Android/PWA, igual
 * que el favicon del navegador. Ver public/favicon.svg para la fuente
 * vectorial y src/app/[locale]/layout.tsx para el resto de <link> de
 * ícono (pestaña, apple-touch-icon).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Hechos",
    description:
      "Formación gratuita, empleabilidad y acompañamiento para personas migrantes.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfdfe",
    theme_color: "#0b6e9c",
    icons: [
      {
        src: "/icon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/android-chrome-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
