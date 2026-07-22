"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GoogleLogo } from "@/components/ui/GoogleLogo";

export interface RegistroFormLabels {
  nameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  passwordLabel: string;
  passwordHint: string;
  registerCta: string;
  registerPendingCta: string;
  genericError: string;
  requiredFieldsError: string;
  continueWithGoogle: string;
  orDivider: string;
}

/** Registro real contra el backend vía `/api/auth/registro`. Registro
 * exitoso = sesión iniciada (mismo comportamiento del backend), así
 * que redirige directo a `/cuenta`. Labels por props: el layout no
 * envía el diccionario completo a componentes cliente. */
export function RegistroForm({ labels: t }: { labels: RegistroFormLabels }) {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nombre || !email || !password) {
      setError(t.requiredFieldsError);
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email, password }),
      });
      const body = (await res.json().catch(() => null)) as { message?: string } | null;
      if (!res.ok) {
        setError(body?.message ?? t.genericError);
        setIsSubmitting(false);
        return;
      }
      router.push("/cuenta");
      router.refresh();
    } catch {
      setError(t.genericError);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className="text-sm font-medium text-ink">
          {t.nameLabel}
        </label>
        <Input
          id="nombre"
          name="nombre"
          autoComplete="given-name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="apellido" className="text-sm font-medium text-ink">
          {t.lastNameLabel}
        </label>
        <Input
          id="apellido"
          name="apellido"
          autoComplete="family-name"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-ink">
          {t.emailLabel}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-ink">
          {t.passwordLabel}
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-xs text-ink-mute">{t.passwordHint}</p>
      </div>
      {error ? (
        <p role="alert" className="text-sm font-medium text-error-500">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
        {isSubmitting ? <Loader2 className="animate-spin" size={18} aria-hidden /> : null}
        {isSubmitting ? t.registerPendingCta : t.registerCta}
      </Button>
      <div className="flex items-center gap-3 text-xs text-ink-mute" role="separator">
        <span className="h-px flex-1 bg-line" />
        {t.orDivider}
        <span className="h-px flex-1 bg-line" />
      </div>
      <Button variant="google" href="/api/auth/google" className="w-full">
        <GoogleLogo size={18} />
        {t.continueWithGoogle}
      </Button>
    </form>
  );
}
