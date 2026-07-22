import { NextResponse } from "next/server";
import { AUTH_ENABLED } from "@/lib/feature-flags";
import { backendUrl } from "@/lib/session";

/** Punto de entrada del botón "Continuar con Google": el navegador
 * nunca navega directo al backend (mismo principio que el resto del
 * auth vía BFF), así que rebota aquí antes de iniciar el handshake
 * real de OAuth en `GET {BACKEND_URL}/auth/google`. */
export async function GET() {
  if (!AUTH_ENABLED) {
    return NextResponse.json(
      { message: "El inicio de sesión estará disponible próximamente." },
      { status: 503 },
    );
  }

  return NextResponse.redirect(`${backendUrl()}/auth/google`);
}
