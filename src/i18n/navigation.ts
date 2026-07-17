import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Link/usePathname conscientes del idioma: preservan /en automáticamente. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
