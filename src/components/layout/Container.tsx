import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Anchos del sistema: prosa 720 · contenido 1140 · bandas anchas 1280. */
const widths = {
  prose: "max-w-[45rem]",
  content: "max-w-[71.25rem]",
  wide: "max-w-[80rem]",
} as const;

interface ContainerProps {
  children: ReactNode;
  width?: keyof typeof widths;
  as?: ElementType;
  className?: string;
  id?: string;
}

export function Container({
  children,
  width = "content",
  as: Tag = "div",
  className,
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn("mx-auto w-full px-4 sm:px-6", widths[width], className)}
    >
      {children}
    </Tag>
  );
}
