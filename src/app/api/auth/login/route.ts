import { NextResponse } from "next/server";
import { backendUrl, setSessionCookies } from "@/lib/session";
import type { ApiEnvelope, ApiErrorBody, AuthTokens } from "@/lib/types";

/** Login real (RF-002) por correo/contraseña contra el backend. A
 * diferencia del panel de administración, aquí cualquier usuario
 * autenticado obtiene sesión — no hay gate de rol. */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { message: "Correo y contraseña son obligatorios." },
      { status: 400 },
    );
  }

  const res = await fetch(`${backendUrl()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: body.email, password: body.password }),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as ApiErrorBody | null;
    const message = Array.isArray(err?.message)
      ? err.message.join(" ")
      : (err?.message ?? "No fue posible iniciar sesión.");
    return NextResponse.json({ message }, { status: res.status });
  }

  const { data } = (await res.json()) as ApiEnvelope<AuthTokens>;
  await setSessionCookies(data);
  return NextResponse.json({ usuario: data.usuario });
}
