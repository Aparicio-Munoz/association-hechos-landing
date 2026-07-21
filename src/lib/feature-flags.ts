/**
 * Flag temporal: registro/login/cuenta requieren un backend público real
 * (ver `BACKEND_URL`). Mientras no exista uno en producción, esta bandera
 * mantiene esas rutas mostrando un "próximamente" en vez de fallar.
 *
 * Retirarlo cuando el backend esté desplegado: basta con poner
 * `AUTH_ENABLED=true` en el entorno (Vercel y `.env.local`) — no hace
 * falta tocar código.
 */
export const AUTH_ENABLED = process.env.AUTH_ENABLED === "true";
