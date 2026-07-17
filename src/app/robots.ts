import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Spec SEO §14: se bloquea lo que requiere sesión; CSS/JS libres. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/perfil", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
