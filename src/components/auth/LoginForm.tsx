"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface LoginFormLabels {
  emailLabel: string;
  passwordLabel: string;
  loginCta: string;
  loginPendingCta: string;
  genericError: string;
  requiredFieldsError: string;
}

/** Login real contra el backend vía `/api/auth/login`. Cualquier
 * usuario autenticado entra — no hay gate de rol (a diferencia del
 * panel de administración). Labels por props, mismo patrón que
 * `RegistroForm`. */
export function LoginForm({ labels: t }: { labels: LoginFormLabels }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) {
      setError(t.requiredFieldsError);
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm font-medium text-error-500">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
        {isSubmitting ? <Loader2 className="animate-spin" size={18} aria-hidden /> : null}
        {isSubmitting ? t.loginPendingCta : t.loginCta}
      </Button>
    </form>
  );
}
