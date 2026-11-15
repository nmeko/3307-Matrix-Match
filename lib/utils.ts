import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// twMerge lets a className override a variant's colors (bg-white beats bg-primary);
// without it the stylesheet order decides, which hid "Back to Levels" (white on white).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
