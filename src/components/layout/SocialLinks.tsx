import { cn } from "@/lib/cn";

/**
 * Esta versión de lucide-react no incluye logos de marca (Facebook,
 * Instagram, X, YouTube, LinkedIn no existen en el paquete — fueron
 * retirados por política de marca). En vez de dibujar de memoria un
 * ícono de marca complejo (riesgo real de que salga irreconocible),
 * usamos un monograma en una insignia circular — mismo lenguaje visual
 * que el resto de íconos del sitio, cero riesgo de forma rota.
 */
/** Única fuente de verdad para las URLs reales de redes sociales — otros
 * componentes (p. ej. la invitación a Instagram en News.tsx) deben
 * importar de aquí en vez de repetir el enlace. */
export const SOCIAL_URLS = {
  facebook: "https://www.facebook.com/asociacion.hechos",
  instagram: "https://www.instagram.com/asociacionhechos/",
  x: "https://x.com/asochechos",
  youtube: "https://www.youtube.com/channel/UCoEgyoTRFxUojISUHWNNknQ",
  linkedin: "https://www.linkedin.com/company/asociaci%C3%B3n-hechos/",
} as const;

const PLATFORMS = [
  { key: "facebook", monogram: "f", href: SOCIAL_URLS.facebook },
  { key: "instagram", monogram: "IG", href: SOCIAL_URLS.instagram },
  { key: "x", monogram: "X", href: SOCIAL_URLS.x },
  { key: "youtube", monogram: "YT", href: SOCIAL_URLS.youtube },
  { key: "linkedin", monogram: "in", href: SOCIAL_URLS.linkedin },
] as const;

export function SocialLinks({
  labels,
  className,
}: {
  /** Etiquetas accesibles por plataforma (traducidas), en el mismo orden que PLATFORMS. */
  labels: Record<(typeof PLATFORMS)[number]["key"], string>;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {PLATFORMS.map((p) => (
        <a
          key={p.key}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels[p.key]}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full",
            "bg-niebla-0/10 text-xs font-semibold text-azul-200",
            "transition-colors duration-150 ease-salida hover:bg-niebla-0 hover:text-azul-900",
          )}
        >
          <span aria-hidden>{p.monogram}</span>
        </a>
      ))}
    </div>
  );
}
