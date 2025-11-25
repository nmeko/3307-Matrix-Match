import { clsx, type ClassValue } from "clsx"

// This avoids the module loading issue in the Next.js runtime
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
