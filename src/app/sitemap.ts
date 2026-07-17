import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Spec SEO §13. Cuando existan las páginas públicas de cursos y
 * vacantes, se añaden aquí generadas desde la fuente de datos
 * (las vacantes salen del sitemap al expirar).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { es: `${SITE_URL}/`, en: `${SITE_URL}/en` };

  // Sin lastModified: una fecha de build "miente" al crawler.
  // Se añadirá cuando provenga de fechas reales de contenido.
  return [
    { url: `${SITE_URL}/`, alternates: { languages } },
    { url: `${SITE_URL}/en`, alternates: { languages } },
  ];
}
