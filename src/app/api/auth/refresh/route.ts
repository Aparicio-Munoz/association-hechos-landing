import { NextResponse } from "next/server";
import { refreshSession } from "@/lib/session";

/** Refresco explícito, disparado por el cliente antes de una acción
 * que necesite sesión fresca. */
export async function POST() {
  const tokens = await refreshSession();
  if (!tokens) {
    return NextResponse.json({ message: "La sesión expiró." }, { status: 401 });
  }
  return NextResponse.json({ usuario: tokens.usuario });
}
