import { getTranslations } from "next-intl/server";
import {
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { cn } from "@/lib/cn";

/**
 * Tarjeta glass flotante con un programa real (icono + nombre + una
 * línea de su objetivo). Antes mostraba citas de "A. G." / "M. R." —
 * testimonios sin verificar, lo mismo que SuccessStories.tsx evita
 * explícitamente en el resto del sitio. Se reemplaza por información
 * institucional real (los mismos 5 programas de Programs.tsx), nunca
 * inventada.
 */
function FloatingProgram({
  icon: Icon,
  title,
  body,
  className,
}: {
  icon: typeof Briefcase;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute hidden w-60 items-start gap-3 rounded-2xl border border-white/15",
        "bg-white/[0.07] p-4 text-left shadow-glow-md backdrop-blur-2xl",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]",
        "transition-[transform,box-shadow] duration-300 ease-salida hover:-translate-y-1 hover:shadow-glow-lg",
        "animate-float sm:flex",
        className,
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-azul-400/40 to-azul-600/40 text-niebla-0 ring-1 ring-white/20">
        <Icon size={16} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-niebla-0">{title}</p>
        <p className="mt-0.5 text-xs leading-snug text-azul-100/75">{body}</p>
      </div>
    </div>
  );
}

export async function Hero() {
  const t = await getTranslations("hero");

  /**
   * Estadísticas institucionales, no de producto. Solo dos son cifras
   * reales y verificables en hechos.eu: el año de fundación (2003) y
   * el número de programas (5, un hecho del propio sitio — igual que
   * en Impact.tsx). No existe un dato oficial de jóvenes acompañados,
   * así que se muestra como "pendiente de verificación" en vez de
   * inventar un número que parezca real.
   */
  const stats = [
    { kind: "year" as const, value: 2003, label: t("statYearLabel") },
    { kind: "count" as const, value: 5, label: t("statProgramsLabel") },
    { kind: "pending" as const, label: t("statYouthLabel") },
  ];

  const pillars = [
    { icon: GraduationCap, label: t("pillar1") },
    { icon: Briefcase, label: t("pillar2") },
    { icon: Users, label: t("pillar3") },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-azul-950 pb-28 sm:pb-36">
      {/* ── Fondo: malla de gradientes en capas + suelo con perspectiva.
          Cero imágenes, cero layout — solo gradientes y blur, con un
          ligero parallax de scroll en las manchas (nunca en el
          contenido legible). ── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-azul-950 via-azul-950 to-[#040d15]" />

        <Parallax range={60} className="absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-140 w-140 -translate-x-1/2 rounded-full bg-azul-500/20 blur-3xl" />
          <div className="absolute top-10 -right-32 h-120 w-120 rounded-full bg-azul-400/15 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-96 w-96 rounded-full bg-azul-300/10 blur-3xl" />
        </Parallax>

        {/* Luz radial central detrás del titular */}
        <div className="absolute inset-x-0 top-0 h-160 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgb(39_180_233/0.16),transparent_70%)]" />

        {/* Suelo con perspectiva, tipo consola de producto — se apaga
            antes de tocar el contenido, decoración pura. */}
        <div className="absolute inset-x-0 bottom-0 h-72 [mask-image:linear-gradient(to_top,black,transparent)]">
          <div className="absolute inset-0 origin-bottom [transform:perspective(500px)_rotateX(68deg)] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px] opacity-60" />
        </div>
      </div>

      {/*
        Entradas en CSS puro (`animate-enter`), no Framer Motion: este
        contenido está en el viewport inicial (no hay que "revelarlo" al
        hacer scroll), y una animación disparada por JS/IntersectionObserver
        obliga al navegador a esperar la hidratación antes de pintarlo —
        eso fue justo lo que retrasó el LCP ~2.9s en una primera pasada de
        este rediseño. `Reveal`/`RevealGroup` siguen siendo lo correcto
        para el resto de las secciones, que sí están fuera de pantalla al
        cargar.
      */}
      <Container
        width="wide"
        className="grid items-center gap-16 pt-32 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:pt-40"
      >
        {/* ── Columna de texto ── */}
        <div className="flex flex-col items-start text-left">
          <p className="animate-enter flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-sm font-medium text-azul-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
            <Sparkles size={14} className="text-azul-300" aria-hidden />
            {t("badge")}
          </p>

          <h1 className="animate-enter mt-6 max-w-xl font-display text-5xl font-bold tracking-tight text-niebla-0 [animation-delay:80ms] sm:text-6xl lg:text-7xl">
            {t("h1Start")}{" "}
            <span className="bg-linear-to-r from-azul-300 via-azul-200 to-niebla-0 bg-clip-text text-transparent">
              {t("h1Accent")}
            </span>{" "}
            {t("h1End")}
            <span className="text-azul-400">.</span>
          </h1>

          <p className="animate-enter mt-6 max-w-lg text-lg text-azul-100/80 [animation-delay:160ms] sm:text-xl">
            {t("subtitle")}
          </p>

          {/* CTAs: la conversión y el conocer-la-misión no compiten en el mismo peso */}
          <div className="animate-enter mt-8 flex w-full flex-col items-start gap-3 [animation-delay:240ms] sm:w-auto sm:flex-row sm:items-center">
            <Button size="lg" href="/registro" className="w-full sm:w-auto">
              {t("cta")}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="#mision"
              className="w-full border-white/25 text-niebla-0 hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              {t("ctaSecondary")}
            </Button>
          </div>

          <p className="animate-enter mt-4 text-sm text-azul-200/70 [animation-delay:300ms]">
            {t("micro")}
          </p>

          {/* Tarjetas informativas: los tres caminos, sin simular ser un producto */}
          <ul className="animate-enter mt-10 flex flex-wrap gap-3 [animation-delay:340ms]">
            {pillars.map((p) => (
              <li
                key={p.label}
                className="flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.05] px-3.5 py-2.5 text-sm font-medium text-niebla-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-[transform,background-color] duration-200 ease-salida hover:-translate-y-0.5 hover:bg-white/[0.09]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-azul-400/50 to-azul-600/50 text-niebla-0 ring-1 ring-white/15">
                  <p.icon size={14} aria-hidden />
                </span>
                {p.label}
              </li>
            ))}
          </ul>

          {/* Estadísticas institucionales: solo "fundada en" y "programas"
              son cifras reales y verificables; "jóvenes acompañados" no
              tiene dato oficial todavía, así que se marca como pendiente
              en vez de mostrar un número inventado. */}
          <dl className="animate-enter mt-10 flex items-center gap-8 [animation-delay:420ms] sm:gap-12">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-start">
                <dt className="sr-only">{s.label}</dt>
                {s.kind === "pending" ? (
                  <>
                    <dd>
                      <Badge
                        tone="neutral"
                        className="border border-dashed border-white/25 bg-transparent text-azul-200 ring-0"
                      >
                        {t("pendingBadge")}
                      </Badge>
                    </dd>
                    <dd className="mt-2 text-sm text-azul-200/70">{s.label}</dd>
                  </>
                ) : (
                  <>
                    <dd className="font-display text-3xl font-bold text-niebla-0 sm:text-4xl">
                      {s.kind === "count" ? (
                        <CountUp to={s.value} delay={600} />
                      ) : (
                        s.value
                      )}
                    </dd>
                    <dd className="mt-1 text-sm text-azul-200/70" aria-hidden>
                      {s.label}
                    </dd>
                  </>
                )}
              </div>
            ))}
          </dl>
        </div>

        {/* ── Columna visual: composición de vidrio en capas (panel
            trasero + panel de vidrio al frente), ilustración abstracta
            de inclusión y formación (placeholder hasta tener foto real).
            Solo la ilustración es aria-hidden; las FloatingProgram
            llevan texto real y deben quedar legibles para lectores de
            pantalla. ── */}
        <div className="animate-enter-zoom relative mx-auto w-full max-w-md [animation-delay:220ms]">
          {/* Panel trasero: profundidad de "composición", no una tarjeta
              real — puramente decorativo. */}
          <div
            aria-hidden
            className="absolute inset-4 -z-10 rotate-3 rounded-[2rem] bg-linear-to-br from-azul-600/40 to-azul-900/40 blur-md"
          />

          {/* TODO(fotografía real): sustituir esta ilustración por <Image>
              con una foto real de la comunidad de Hechos (con
              consentimiento) en cuanto esté disponible. No usar fotos de
              stock genéricas ni imágenes generadas por IA para
              representar a la comunidad. */}
          <div
            aria-hidden
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-azul-700/90 to-azul-950 shadow-glow-lg"
          >
            {/* Sheen de vidrio: una sola luz diagonal muy discreta. */}
            <div className="absolute inset-0 bg-linear-to-br from-white/12 via-transparent to-transparent" />
            <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-azul-400/25 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-azul-300/15 blur-3xl" />

            <div className="relative flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
              {/* Composición: círculos superpuestos = personas diversas
                  conectadas (inclusión); birrete = formación; corazón =
                  acompañamiento cercano. Arte abstracto propio, no una
                  fotografía simulada. */}
              <div className="relative flex h-32 w-32 items-center justify-center">
                <span className="absolute -left-2 -top-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-niebla-0/10 text-niebla-0/70 ring-1 ring-white/15">
                  <GraduationCap size={22} aria-hidden />
                </span>
                <span className="absolute -right-2 -bottom-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-niebla-0/10 text-niebla-0/70 ring-1 ring-white/15">
                  <HeartHandshake size={22} aria-hidden />
                </span>
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-niebla-0/15 text-niebla-0 shadow-glow-sm ring-1 ring-white/20">
                  <Users size={32} aria-hidden />
                </span>
              </div>
              <p className="max-w-48 text-sm font-medium text-niebla-0/80">
                {t("imageCaption")}
              </p>
            </div>
          </div>

          <FloatingProgram
            className="-top-6 -left-6 lg:-left-14"
            icon={Briefcase}
            title={t("float1Title")}
            body={t("float1Body")}
          />
          <FloatingProgram
            className="-right-4 -bottom-8 [animation-delay:1.8s] lg:-right-12"
            icon={Target}
            title={t("float2Title")}
            body={t("float2Body")}
          />
        </div>
      </Container>
    </section>
  );
}
