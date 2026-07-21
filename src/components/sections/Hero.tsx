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
        "absolute hidden w-60 items-start gap-3 rounded-lg border border-line/60",
        "bg-elevated/80 p-3.5 text-left shadow-md backdrop-blur-md",
        "animate-float sm:flex",
        className,
      )}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
        <Icon size={15} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-xs leading-snug text-ink-soft">{body}</p>
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
    <section className="relative isolate overflow-hidden">
      {/* ── Capas de fondo: grid de puntos (concentrado a la izquierda,
          para no competir con el retrato) + auroras azules ── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(var(--h-line)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_55%_at_30%_0%,black_25%,transparent_70%)]" />
        <div className="absolute -top-40 left-1/3 h-120 w-200 -translate-x-1/2 rounded-full bg-azul-400/15 blur-3xl" />
        <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-azul-300/18 blur-3xl" />
      </div>

      <Container
        width="wide"
        className="grid items-center gap-16 pt-16 pb-24 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24"
      >
        {/* ── Columna de texto ── */}
        <div className="flex flex-col items-start text-left">
          <p className="animate-enter flex items-center gap-2 rounded-full border border-line/70 bg-elevated/60 px-4 py-1.5 text-sm font-medium text-ink-soft shadow-xs backdrop-blur">
            <Sparkles size={14} className="text-accent" aria-hidden />
            {t("badge")}
          </p>

          <h1 className="animate-enter mt-6 max-w-xl font-display text-4xl font-bold tracking-tight text-ink [animation-delay:80ms] sm:text-5xl lg:text-6xl">
            {t("h1Start")}{" "}
            <span className="bg-linear-to-r from-azul-700 via-azul-500 to-azul-400 bg-clip-text text-transparent">
              {t("h1Accent")}
            </span>{" "}
            {t("h1End")}
            <span className="text-glow">.</span>
          </h1>

          <p className="animate-enter mt-6 max-w-lg text-lg text-ink-soft [animation-delay:160ms] sm:text-xl">
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
              className="w-full sm:w-auto"
            >
              {t("ctaSecondary")}
            </Button>
          </div>

          <p className="animate-enter mt-4 text-sm text-ink-soft [animation-delay:300ms]">
            {t("micro")}
          </p>

          {/* Tarjetas informativas: los tres caminos, sin simular ser un producto */}
          <ul className="animate-enter mt-10 flex flex-wrap gap-3 [animation-delay:340ms]">
            {pillars.map((p) => (
              <li
                key={p.label}
                className="flex items-center gap-2 rounded-lg border border-line bg-elevated px-3.5 py-2 text-sm font-medium text-ink shadow-xs"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
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
                        className="border border-dashed border-line bg-transparent"
                      >
                        {t("pendingBadge")}
                      </Badge>
                    </dd>
                    <dd className="mt-2 text-sm text-ink-soft">{s.label}</dd>
                  </>
                ) : (
                  <>
                    <dd className="font-display text-3xl font-bold text-ink sm:text-4xl">
                      {s.kind === "count" ? (
                        <CountUp to={s.value} delay={600} />
                      ) : (
                        s.value
                      )}
                    </dd>
                    <dd className="mt-1 text-sm text-ink-soft" aria-hidden>
                      {s.label}
                    </dd>
                  </>
                )}
              </div>
            ))}
          </dl>
        </div>

        {/* ── Columna visual: ilustración abstracta de inclusión y
            formación (placeholder hasta tener foto real). Solo la
            ilustración es aria-hidden; las FloatingProgram llevan texto
            real (nombre y objetivo de un programa) y deben quedar
            legibles para lectores de pantalla. ── */}
        <div className="animate-enter-zoom relative mx-auto w-full max-w-md [animation-delay:220ms]">
          {/* TODO(fotografía real): sustituir esta ilustración por <Image>
              con una foto real de la comunidad de Hechos (con
              consentimiento) en cuanto esté disponible. No usar fotos de
              stock genéricas ni imágenes generadas por IA para
              representar a la comunidad. */}
          <div
            aria-hidden
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-linear-to-br from-azul-700 to-azul-950 shadow-lg"
          >
            <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-azul-400/25 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-azul-300/15 blur-3xl" />

            <div className="relative flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
              {/* Composición: círculos superpuestos = personas diversas
                  conectadas (inclusión); birrete = formación; corazón =
                  acompañamiento cercano. Arte abstracto propio, no una
                  fotografía simulada. */}
              <div className="relative flex h-32 w-32 items-center justify-center">
                <span className="absolute -left-2 -top-2 flex h-14 w-14 items-center justify-center rounded-full bg-niebla-0/10 text-niebla-0/70">
                  <GraduationCap size={22} aria-hidden />
                </span>
                <span className="absolute -right-2 -bottom-2 flex h-14 w-14 items-center justify-center rounded-full bg-niebla-0/10 text-niebla-0/70">
                  <HeartHandshake size={22} aria-hidden />
                </span>
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-niebla-0/15 text-niebla-0">
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
