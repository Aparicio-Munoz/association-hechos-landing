import { NextResponse } from "next/server";
import { AUTH_ENABLED } from "@/lib/feature-flags";
import { backendUrl, setSessionCookies } from "@/lib/session";
import type { ApiEnvelope, ApiErrorBody, AuthTokens } from "@/lib/types";

/** Registro real (RF-001) contra el backend — crea la cuenta y, si
 * sale bien, deja la sesión iniciada de una vez (mismo comportamiento
 * que `AuthService.register` en el backend: registro = login). */
export async function POST(request: Request) {
  if (!AUTH_ENABLED) {
    return NextResponse.json(
      { message: "El registro estará disponible próximamente." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.password || !body?.nombre) {
    return NextResponse.json(
      { message: "Correo, contraseña y nombre son obligatorios." },
      { status: 400 },
    );
  }

  const res = await fetch(`${backendUrl()}/auth/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
      nombre: body.nombre,
      apellido: body.apellido || undefined,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as ApiErrorBody | null;
    const message = Array.isArray(err?.message)
      ? err.message.join(" ")
      : (err?.message ?? "No fue posible completar el registro.");
    return NextResponse.json({ message }, { status: res.status });
  }

  const { data } = (await res.json()) as ApiEnvelope<AuthTokens>;
  await setSessionCookies(data);
  return NextResponse.json({ usuario: data.usuario });
}
