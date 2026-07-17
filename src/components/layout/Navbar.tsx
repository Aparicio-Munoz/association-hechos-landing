"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/layout/Container";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Button } from "@/components/ui/Button";
import { useScrollState } from "@/hooks/useScrollState";
import { cn } from "@/lib/cn";

export interface NavbarLabels {
  navLabel: string;
  formacion: string;
  empleo: string;
  comunidad: string;
  nosotros: string;
  entrar: string;
  unete: string;
  abrirMenu: string;
  cerrarMenu: string;
  idioma: string;
}

/** Enlace de sección con el subrayado ámbar que crece desde el centro. */
function NavLink({
  href,
  children,
  onClick,
  className,
  style,
}: {
  href: string;
  children: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={style}
      className={cn(
        "relative py-1 font-medium text-ink transition-colors duration-150 hover:text-brand",
        "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0",
        "after:-translate-x-1/2 after:rounded-full after:bg-accent",
        "after:transition-[width] after:duration-150 after:ease-salida",
        "hover:after:w-full focus-visible:after:w-full",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function Navbar({
  labels,
  locale,
}: {
  labels: NavbarLabels;
  locale: Locale;
}) {
  const { scrolled, hidden } = useScrollState();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Menú abierto: Escape cierra y el scroll del fondo se bloquea.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Si el viewport cruza a desktop con el menú abierto, se cierra:
  // evita quedar con el scroll bloqueado por un panel que ya no se ve.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const links = [
    { href: "#formacion", label: labels.formacion },
    { href: "#empleo", label: labels.empleo },
    { href: "#comunidad", label: labels.comunidad },
    { href: "#nosotros", label: labels.nosotros },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-canvas/85 backdrop-blur-md",
        "transition-[transform,border-color,box-shadow] duration-250 ease-ambos",
        scrolled ? "border-line shadow-xs" : "border-transparent",
        // Ocultamiento solo móvil; nunca con el menú abierto.
        hidden && !open && "-translate-y-full md:translate-y-0",
      )}
    >
      <Container className="flex h-15 items-center justify-between md:h-17">
        {/* Logo oficial de hechos + wordmark de la asociación */}
        <Link
          href="/"
          onClick={close}
          aria-label="Asociación Hechos · Inicio"
          className="flex items-center gap-2.5"
        >
          <Image
            src="/images/logo-hechos.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-10 w-10"
          />
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            Asociación <span className="text-brand">Hechos</span>
          </span>
        </Link>

        {/* Navegación desktop */}
        <nav
          aria-label={labels.navLabel}
          className="hidden items-center gap-8 text-sm md:flex"
        >
          {links.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher locale={locale} label={labels.idioma} />
          <Button variant="ghost" size="sm" href="/login">
            {labels.entrar}
          </Button>
          <Button size="sm" href="/registro">
            {labels.unete}
          </Button>
        </div>

        {/* Toggle móvil: hamburguesa ⇄ X (morph 200ms) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? labels.cerrarMenu : labels.abrirMenu}
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center rounded-full md:hidden"
        >
          <span
            aria-hidden
            className={cn(
              "block h-0.5 w-5 rounded-full bg-ink transition-transform duration-200 ease-ambos",
              open && "translate-y-1 rotate-45",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "mt-1.5 block h-0.5 w-5 rounded-full bg-ink transition-transform duration-200 ease-ambos",
              open && "-translate-y-1 -rotate-45",
            )}
          />
        </button>
      </Container>

      {/* Panel móvil a pantalla completa (bajo la barra, que conserva la X) */}
      <div
        id="menu-movil"
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-15 bottom-0 z-40 flex flex-col overflow-y-auto bg-canvas px-6 pb-8 pt-8 md:hidden",
          "transition-[opacity,transform] duration-250 ease-ambos",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label={labels.navLabel} className="flex flex-col gap-6">
          {links.map((l, i) => (
            <NavLink
              key={l.href}
              href={l.href}
              onClick={close}
              className={cn(
                "w-fit text-xl transition-[opacity,transform,color] duration-250 ease-salida",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
              // Cascada de 40ms por enlace, solo al abrir.
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <div className="mb-2 self-center">
            <LocaleSwitcher locale={locale} label={labels.idioma} />
          </div>
          <Button variant="ghost" href="/login" className="w-full">
            {labels.entrar}
          </Button>
          <Button size="lg" href="/registro" className="w-full">
            {labels.unete}
          </Button>
        </div>
      </div>
    </header>
  );
}
