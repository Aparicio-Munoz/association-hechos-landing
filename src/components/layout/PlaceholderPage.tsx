import { Construction } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { Button, buttonClasses } from "@/components/ui/Button";

/**
 * Página honesta para rutas que hoy no tienen contenido real detrás
 * (`/registro`, `/login`, `/privacidad`, `/terminos`) — evita el 404
 * sin fingir que la funcionalidad o el texto legal ya existen.
 */
export function PlaceholderPage({
  title,
  body,
  backLabel,
  contactLabel,
  contactHref,
}: {
  title: string;
  body: string;
  backLabel: string;
  contactLabel: string;
  contactHref: string;
}) {
  return (
    <main
      id="contenido"
      className="flex min-h-[70vh] items-center justify-center bg-canvas pt-32 pb-20"
    >
      <Container width="prose" className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Construction size={26} aria-hidden />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {/* `Link` de next-intl: preserva /en si el visitante viene en inglés. */}
          <Link href="/" className={buttonClasses()}>
            {backLabel}
          </Link>
          <Button variant="secondary" href={contactHref}>
            {contactLabel}
          </Button>
        </div>
      </Container>
    </main>
  );
}
