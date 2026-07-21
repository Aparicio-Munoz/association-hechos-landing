import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

/** Manifest mínimo: reutiliza nombre, logo y colores de marca ya existentes. */
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
        src: "/images/logo-hechos-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/images/logo-hechos-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
