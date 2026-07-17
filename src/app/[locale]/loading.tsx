import Image from "next/image";

/** Pantalla de carga: el logo oficial con un latido suave sobre el fondo base. */
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-canvas">
      <Image
        src="/images/logo-hechos.png"
        alt="Cargando Asociación Hechos"
        width={72}
        height={72}
        priority
        className="h-18 w-18 animate-pulse"
      />
    </div>
  );
}
