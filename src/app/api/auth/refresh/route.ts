import { NextResponse } from "next/server";
import { AUTH_ENABLED } from "@/lib/feature-flags";
import { refreshSession } from "@/lib/session";

/** Refresco explícito, disparado por el cliente antes de una acción
 * que necesite sesión fresca. */
export async function POST() {
  if (!AUTH_ENABLED) {
    return NextResponse.json({ message: "La sesión expiró." }, { status: 401 });
  }

  const tokens = await refreshSession();
  if (!tokens) {
    return NextResponse.json({ message: "La sesión expiró." }, { status: 401 });
  }
  return NextResponse.json({ usuario: tokens.usuario });
}
