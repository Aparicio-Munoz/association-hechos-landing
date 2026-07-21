import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ApiEnvelope, AuthTokens, SessionUser } from "@/lib/types";

/**
 * Mismo patrón probado en `admin/src/lib/session.ts` (cookies httpOnly,
 * rotación de refresh token), simplificado: cualquier usuario
 * autenticado basta aquí — no hay gate de rol, a diferencia del panel.
 */
const ACCESS_COOKIE = "hechos_at";
const REFRESH_COOKIE = "hechos_rt";

// Coinciden con JWT_ACCESS_EXPIRES_IN / JWT_REFRESH_EXPIRES_IN del
// backend (15m / 7d) — la cookie no debe sobrevivir más que el token
// que contiene.
const ACCESS_MAX_AGE = 15 * 60;
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60;

export function backendUrl(): string {
  const url = process.env.BACKEND_URL;
  if (!url) {
    throw new Error("Falta la variable de entorno BACKEND_URL.");
  }
  return url;
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function setSessionCookies(tokens: {
  accessToken: string;
  refreshToken: string;
}): Promise<void> {
  const store = await cookies();
  store.set(ACCESS_COOKIE, tokens.accessToken, {
    ...cookieOptions,
    maxAge: ACCESS_MAX_AGE,
  });
  store.set(REFRESH_COOKIE, tokens.refreshToken, {
    ...cookieOptions,
    maxAge: REFRESH_MAX_AGE,
  });
}

export async function clearSessionCookies(): Promise<void> {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getAccessToken(): Promise<string | undefined> {
  return (await cookies()).get(ACCESS_COOKIE)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  return (await cookies()).get(REFRESH_COOKIE)?.value;
}

/** Rota el par de tokens usando el refresh token en cookie. Si el
 * refresh también falla (vencido/revocado), limpia la sesión. */
export async function refreshSession(): Promise<AuthTokens | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  const res = await fetch(`${backendUrl()}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  if (!res.ok) {
    await clearSessionCookies();
    return null;
  }

  const body = (await res.json()) as ApiEnvelope<AuthTokens>;
  await setSessionCookies(body.data);
  return body.data;
}

/** DAL real: llama a `GET /auth/me` contra el backend. Si el access
 * token venció, intenta refrescar una vez antes de dar por perdida la
 * sesión. */
export async function verifySession(): Promise<SessionUser | null> {
  let accessToken = await getAccessToken();
  if (!accessToken) {
    const refreshed = await refreshSession();
    if (!refreshed) return null;
    accessToken = refreshed.accessToken;
  }

  let res = await fetch(`${backendUrl()}/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (res.status === 401) {
    const refreshed = await refreshSession();
    if (!refreshed) return null;
    res = await fetch(`${backendUrl()}/auth/me`, {
      headers: { Authorization: `Bearer ${refreshed.accessToken}` },
      cache: "no-store",
    });
  }

  if (!res.ok) return null;
  const body = (await res.json()) as ApiEnvelope<SessionUser>;
  return body.data;
}

/** Para Server Components que exigen sesión (hoy solo `/cuenta`), o
 * redirige a `/login`. */
export async function requireSession(): Promise<SessionUser> {
  const user = await verifySession();
  if (!user) redirect("/login");
  return user;
}
