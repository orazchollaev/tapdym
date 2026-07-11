import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Tailwind sinif birlestirme yardimcisi (shadcn-vue standardi). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
