import { getTranslations } from "next-intl/server";
import {
  Bell,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  PlayCircle,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { GoogleLogo } from "@/components/ui/GoogleLogo";
import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/cn";

/** Tarjeta glass flotante sobre el mockup (decorativa). */
function FloatingCard({
  icon,
  title,
  body,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute hidden w-64 items-center gap-3 rounded-lg border border-line/60",
        "bg-elevated/75 p-3 text-left shadow-md backdrop-blur-md",
        "animate-float sm:flex",
        className,
      )}
    >
      {icon}
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink">{title}</p>
        <p className="truncate text-xs text-ink-soft">{body}</p>
      </div>
    </div>
  );
}

export async function Hero() {
  const t = await getTranslations("hero");

  const stats = [
    { to: 100, suffix: "%", label: t("statFree") },
    { to: 2, label: t("statLangs") },
    { to: 24, suffix: "/7", label: t("statOpen") },
  ];

  const courses = [
    { title: t("mockCourse1"), progress: 80 },
    { title: t("mockCourse2"), progress: 100 },
    { title: t("mockCourse3"), progress: 35 },
  ];

  const sideNav = [
    { icon: GraduationCap, label: t("mockNavFormacion"), active: true },
    { icon: Briefcase, label: t("mockNavEmpleo") },
    { icon: Users, label: t("mockNavComunidad") },
    { icon: User, label: t("mockNavPerfil") },
  ];

  return (
    <section className="relative isolate overflow-hidden">
      {/* ── Capas de fondo: grid de puntos + auroras teal/ámbar ── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(var(--h-line)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_30%,transparent_75%)]" />
        <div className="absolute -top-40 left-1/2 h-120 w-200 -translate-x-1/2 rounded-full bg-azul-400/15 blur-3xl" />
        <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-azul-300/18 blur-3xl" />
        <div className="absolute top-72 -left-32 h-80 w-80 rounded-full bg-azul-500/10 blur-3xl" />
      </div>

      <Container className="flex flex-col items-center pt-16 pb-24 text-center sm:pt-20 lg:pt-24">
        {/* Badge glass */}
        <p className="animate-enter flex items-center gap-2 rounded-full border border-line/70 bg-elevated/60 px-4 py-1.5 text-sm font-medium text-ink-soft shadow-xs backdrop-blur">
          <Sparkles size={14} className="text-accent" aria-hidden />
          {t("badge")}
        </p>

        {/* H1: storytelling con la palabra-comunidad en degradado */}
        <h1 className="animate-enter mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-ink [animation-delay:80ms] sm:text-6xl lg:text-7xl">
          {t("h1Start")}{" "}
          <span className="bg-linear-to-r from-azul-700 via-azul-500 to-azul-400 bg-clip-text text-transparent">
            {t("h1Accent")}
          </span>
          <span className="text-glow">.</span>
        </h1>

        <p className="animate-enter mt-6 max-w-2xl text-lg text-ink-soft [animation-delay:160ms] sm:text-xl">
          {t("subtitle")}
        </p>

        {/* CTAs */}
        <div className="animate-enter mt-8 flex w-full flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:w-auto sm:flex-row">
          <Button size="lg" href="/registro" className="w-full sm:w-auto">
            {t("cta")}
          </Button>
          <Button
            variant="google"
            size="lg"
            href="/registro"
            className="w-full sm:w-auto"
          >
            <GoogleLogo />
            {t("ctaGoogle")}
          </Button>
        </div>

        <p className="animate-enter mt-4 text-sm text-ink-mute [animation-delay:300ms]">
          {t("micro")}
        </p>

        {/* Estadísticas (RNF: gratuidad, 2 idiomas, 24/7 — todas ciertas) */}
        <dl className="animate-enter mt-12 flex items-center justify-center gap-8 [animation-delay:380ms] sm:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-bold text-ink sm:text-4xl">
                <CountUp to={s.to} suffix={s.suffix} delay={600} />
              </dd>
              <dd className="mt-1 text-sm text-ink-soft" aria-hidden>
                {s.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* ── Mockup de la plataforma (decorativo: aria-hidden) ── */}
        <div
          aria-hidden
          className="animate-enter-zoom relative mt-16 w-full max-w-4xl [animation-delay:450ms]"
        >
          {/* Anillo degradado alrededor de la ventana */}
          <div className="rounded-2xl bg-linear-to-b from-azul-300/50 via-line to-transparent p-px shadow-lg">
            <div className="overflow-hidden rounded-2xl bg-elevated text-left">
              {/* Barra de ventana */}
              <div className="flex items-center gap-4 border-b border-line px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-azul-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-azul-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-azul-400" />
                </div>
                <div className="mx-auto rounded-full bg-inset px-4 py-1 text-xs text-ink-mute">
                  {t("mockUrl")}
                </div>
                <div className="w-10" />
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div className="hidden w-44 shrink-0 border-r border-line p-3 sm:block">
                  <div className="px-2 pb-3 font-display text-sm font-bold text-ink">
                    Hechos
                  </div>
                  <nav className="flex flex-col gap-1">
                    {sideNav.map((item) => (
                      <span
                        key={item.label}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium",
                          item.active
                            ? "bg-brand-soft text-brand"
                            : "text-ink-soft",
                        )}
                      >
                        <item.icon size={14} />
                        {item.label}
                      </span>
                    ))}
                  </nav>
                </div>

                {/* Panel principal: Formación con progreso */}
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-base font-bold text-ink">
                      {t("mockTitle")}
                    </p>
                    <span className="rounded-full bg-azul-50 px-3 py-1 text-xs font-medium text-azul-700">
                      {t("mockChip")}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    {courses.map((c) => (
                      <div
                        key={c.title}
                        className="flex items-center gap-3 rounded-lg border border-line bg-canvas p-3"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand">
                          {c.progress === 100 ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <PlayCircle size={18} />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="truncate text-sm font-medium text-ink">
                              {c.title}
                            </p>
                            <span className="text-xs tabular-nums text-ink-soft">
                              {c.progress}%
                            </span>
                          </div>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-inset">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                c.progress === 100 ? "bg-azul-500" : "bg-azul-700",
                              )}
                              style={{ width: `${c.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="hidden shrink-0 rounded-sm bg-azul-100 px-2 py-0.5 text-[11px] font-medium text-azul-700 md:block dark:bg-brand-soft dark:text-brand">
                          {t("mockBadgeEval")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjetas glass flotantes: los otros dos módulos como historia */}
          <FloatingCard
            className="-top-8 -right-4 lg:-right-14"
            icon={
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-azul-100 text-azul-600">
                <Bell size={16} />
              </span>
            }
            title={t("float1Title")}
            body={t("float1Body")}
          />
          <FloatingCard
            className="-left-6 bottom-10 [animation-delay:1.8s] lg:-left-16"
            icon={
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-azul-100 text-azul-600">
                <CheckCircle2 size={16} />
              </span>
            }
            title={t("float2Title")}
            body={t("float2Body")}
          />
        </div>
      </Container>
    </section>
  );
}
