import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/**
 * Cabeceras de seguridad (aplican a todas las rutas, incluidas /api/*).
 * Todo el sitio es autocontenido (fuentes vía next/font self-hosted,
 * sin scripts/estilos de terceros, sin imágenes externas), así que
 * cada directiva puede quedarse en 'self' sin romper nada.
 *
 * script-src / style-src necesitan 'unsafe-inline' porque Next.js
 * inyecta su propio payload de hidratación y estilos inline sin usar
 * nonces cuando la CSP se define aquí (estáticamente) en vez de por
 * middleware — usar nonces exigiría generarlos por request en
 * `src/proxy.ts`, fuera del alcance de este cambio. 'unsafe-eval' solo
 * se permite en desarrollo (Turbopack/Fast Refresh lo necesitan).
 */
function securityHeaders() {
  const isDev = process.env.NODE_ENV === "development";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");

  return [
    // Política de contenido: limita de dónde puede cargar/ejecutar
    // recursos el navegador, mitigando XSS e inyección de contenido.
    { key: "Content-Security-Policy", value: csp },
    // Bloquea que el sitio se embeba en un <iframe> ajeno (clickjacking).
    // Redundante con `frame-ancestors` a propósito: cubre navegadores
    // que no soportan esa directiva de CSP.
    { key: "X-Frame-Options", value: "DENY" },
    // Impide que el navegador "adivine" el tipo de un recurso distinto
    // al declarado en Content-Type (protección contra MIME-sniffing).
    { key: "X-Content-Type-Options", value: "nosniff" },
    // Al navegar a otro sitio, solo envía origen (no la URL completa)
    // en peticiones cross-origin; completa en same-origin.
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    // Desactiva APIs sensibles del navegador que este sitio no usa.
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
  ];
}

const nextConfig: NextConfig = {
  // Solo importa los módulos de framer-motion/lucide-react realmente
  // usados en vez del paquete completo por archivo — menos JS por chunk.
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders() }];
  },
};

export default withNextIntl(nextConfig);
