"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export interface GoogleCallbackLabels {
  connecting: string;
  error: string;
  backToLogin: string;
}

/** El backend redirige aquí con `#at=...&rt=...` en el fragment (nunca
 * llega a ningún log de servidor). Este componente cliente es el único
 * lugar donde ese fragment se lee — inmediatamente se cambia por las
 * cookies httpOnly reales vía POST a /api/auth/google/callback. */
export function GoogleCallbackClient({ labels: t }: { labels: GoogleCallbackLabels }) {
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = params.get("at");
    const refreshToken = params.get("rt");

    if (!accessToken || !refreshToken) {
      queueMicrotask(() => setFailed(true));
      return;
    }

    fetch("/api/auth/google/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, refreshToken }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("exchange failed");
        router.push("/cuenta");
        router.refresh();
      })
      .catch(() => setFailed(true));
  }, [router]);

  if (failed) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm font-medium text-error-500">{t.error}</p>
        <Button variant="secondary" href="/login">
          {t.backToLogin}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm text-ink-soft">
      <Loader2 className="animate-spin" size={18} aria-hidden />
      {t.connecting}
    </div>
  );
}
