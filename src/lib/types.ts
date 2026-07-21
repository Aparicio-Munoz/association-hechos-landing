/** Formas mínimas del backend real que necesita la landing — mismo
 * contrato que ya usa `admin/src/lib/types.ts`, recortado a lo que un
 * usuario final (no administrador) necesita. */

export interface SessionUser {
  id: string;
  email: string;
  nombre: string;
  apellido: string | null;
  estado: "ACTIVO" | "INACTIVO" | "SUSPENDIDO";
  roles: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  usuario: SessionUser;
}

/** Envoltorio de respuesta 2xx del backend (TransformInterceptor). */
export interface ApiEnvelope<T> {
  data: T;
  timestamp: string;
}

/** Envoltorio de error del backend (AllExceptionsFilter). */
export interface ApiErrorBody {
  error: true;
  statusCode: number;
  path: string;
  timestamp: string;
  message: string | string[];
  code?: string;
}
