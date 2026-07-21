import { NextResponse } from "next/server";
import { backendUrl, clearSessionCookies, getRefreshToken } from "@/lib/session";

export async function POST() {
  const refreshToken = await getRefreshToken();

  if (refreshToken) {
    // Revoca la SesionRefresco en el backend. Best-effort: si el
    // backend no responde, igual borramos la cookie local — el
    // usuario debe poder cerrar sesión aunque el backend esté caído.
    await fetch(`${backendUrl()}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    }).catch(() => undefined);
  }

  await clearSessionCookies();
  return NextResponse.json({ ok: true });
}
