import { NextResponse } from "next/server";
import { AUTH_ENABLED } from "@/lib/feature-flags";
import { setSessionCookies } from "@/lib/session";

/** Recibe { accessToken, refreshToken } que la página cliente
 * `auth/google/callback` extrajo del fragment de la URL (nunca
 * llegan aquí por query string, así que no quedan en logs del
 * servidor) y los convierte en las mismas cookies httpOnly que usa
 * el login por correo/contraseña. */
export async function POST(request: Request) {
  if (!AUTH_ENABLED) {
    return NextResponse.json(
      { message: "El inicio de sesión estará disponible próximamente." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  if (!body?.accessToken || !body?.refreshToken) {
    return NextResponse.json(
      { message: "Faltan los tokens de la sesión de Google." },
      { status: 400 },
    );
  }

  await setSessionCookies({
    accessToken: body.accessToken,
    refreshToken: body.refreshToken,
  });
  return NextResponse.json({ ok: true });
}
