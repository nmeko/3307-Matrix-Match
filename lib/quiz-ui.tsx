"use client"

import { useTranslation } from "@/lib/use-translation"

// Quiz-show answer tiles: a color and a shape each, so they read without color too.
export const TILES = [
  { className: "bg-red-600", shape: "▲" },
  { className: "bg-blue-600", shape: "◆" },
  { className: "bg-amber-600", shape: "●" },
  { className: "bg-green-700", shape: "■" },
]

/** Competitive answers are numbers, matrices or "yes"/"no"; only the words need translating. */
export const optionLabel = (opt: string, t: (key: string) => string) => (opt === "yes" || opt === "no" ? t(opt) : opt)

export function LoadingText({ className }: { className?: string }) {
  const t = useTranslation()
  return (
    <p role="status" className={className}>
      {t("loading")}
    </p>
  )
}
