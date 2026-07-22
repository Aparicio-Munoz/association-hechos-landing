"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/layout/Container";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Button } from "@/components/ui/Button";
import { useScrollState } from "@/hooks/useScrollState";
import { cn } from "@/lib/cn";

export interface NavbarLabels {
  navLabel: string;
  mision: string;
  programas: string;
  historias: string;
  contacto: string;
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
  dark,
}: {
  href: string;
  children: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={style}
      className={cn(
        "relative py-1 font-medium transition-colors duration-150",
        dark ? "text-niebla-0/90 hover:text-niebla-0" : "text-ink hover:text-brand",
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
  const pathname = usePathname();

  // Solo la home abre con el Hero oscuro — el resto de las páginas
  // (login, registro, privacidad…) empiezan con fondo claro y la
  // navbar debe verse como siempre ahí, sin importar el scroll.
  const overDarkHero = pathname === "/" && !scrolled && !open;

  // Menú abierto: Escape cierra, el scroll del fondo se bloquea, y el
  // contenido detrás del panel queda `inert` — sin eso, un usuario de
  // teclado puede tabular hacia contenido invisible detrás del overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const main = document.getElementById("contenido");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
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
    { href: "#mision", label: labels.mision },
    { href: "#programas", label: labels.programas },
    { href: "#historias", label: labels.historias },
    { href: "#contacto", label: labels.contacto },
  ];

  return (
    <header
      // Fuera de pantalla (móvil, scroll hacia abajo): también inert,
      // para que no quede enfocable por teclado mientras es invisible.
      inert={hidden && !open}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b",
        "transition-[transform,border-color,background-color,box-shadow] duration-250 ease-ambos",
        overDarkHero
          ? "border-transparent bg-transparent"
          : "border-line/70 bg-canvas/70 shadow-sm backdrop-blur-xl",
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
          <span
            className={cn(
              "font-display text-lg font-bold tracking-tight transition-colors duration-250",
              overDarkHero ? "text-niebla-0" : "text-ink",
            )}
          >
            Asociación{" "}
            <span className={overDarkHero ? "text-azul-300" : "text-brand"}>Hechos</span>
          </span>
        </Link>

        {/* Navegación desktop */}
        <nav
          aria-label={labels.navLabel}
          className="hidden items-center gap-8 text-sm md:flex"
        >
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} dark={overDarkHero}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher locale={locale} label={labels.idioma} dark={overDarkHero} />
          <Button
            variant="ghost"
            size="sm"
            href="/login"
            className={overDarkHero ? "text-niebla-0 hover:bg-white/10" : undefined}
          >
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
              "block h-0.5 w-5 rounded-full transition-transform duration-200 ease-ambos",
              overDarkHero ? "bg-niebla-0" : "bg-ink",
              open && "translate-y-1 rotate-45",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "mt-1.5 block h-0.5 w-5 rounded-full transition-transform duration-200 ease-ambos",
              overDarkHero ? "bg-niebla-0" : "bg-ink",
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
          "fixed inset-x-0 top-15 bottom-0 z-40 flex flex-col overflow-y-auto bg-canvas/98 backdrop-blur-xl px-6 pb-8 pt-8 md:hidden",
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
