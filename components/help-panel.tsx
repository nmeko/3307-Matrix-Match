"use client"

import { useEffect, useState } from "react"
import { HelpCircle, X, Lightbulb } from "lucide-react"
import { useTranslation } from "@/lib/use-translation"

interface HelpPanelProps {
  hint?: string
  definition?: string
}

const TIP_SEEN = "matrix-match-help-tip-seen"

export function HelpPanel({ hint, definition }: HelpPanelProps) {
  const t = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"hint" | "definition">("hint")
  // The "Stuck?" tip shows once per device and hides itself, so it never sits on top of the game.
  const [showTip, setShowTip] = useState(false)

  useEffect(() => {
    let seen = true
    try {
      seen = localStorage.getItem(TIP_SEEN) === "1"
      localStorage.setItem(TIP_SEEN, "1")
    } catch {}
    if (seen) return
    setShowTip(true) // eslint-disable-line react-hooks/set-state-in-effect
    const timer = setTimeout(() => setShowTip(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  if (!hint && !definition) return null
  const tab = activeTab === "hint" && hint ? "hint" : definition ? "definition" : "hint"

  // Sits in the game's top bar (not floating), so it never covers an answer on small screens.
  return (
    <div className="relative">
      {showTip && (
        <div
          role="status"
          className="absolute top-full end-0 mt-3 w-64 bg-yellow-100 border-4 border-amber-400 p-4 pe-8 rounded-2xl shadow-lg z-30 animate-scaleIn"
        >
          <button
            onClick={() => setShowTip(false)}
            aria-label={t("close")}
            className="absolute -top-3 -end-3 bg-amber-400 border-2 border-foreground p-1.5 rounded-full hover:bg-amber-500 transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
          <p className="flex gap-3 items-start text-sm font-bold text-amber-900">
            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            {t("stuckTip")}
          </p>
        </div>
      )}

      <button
        onClick={() => {
          setShowTip(false)
          setIsOpen(true)
        }}
        className="flex items-center gap-1.5 h-10 bg-amber-400 border-2 border-foreground px-3 rounded-full font-bold text-sm hover:bg-amber-300 transition-colors focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <HelpCircle className="w-5 h-5 text-foreground" aria-hidden="true" />
        <span>{t("getHelp")}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
            className="bg-background border-4 border-foreground rounded-2xl p-6 max-w-md w-full shadow-lg animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 id="help-title" className="text-2xl font-black text-primary">
                {t("needHelp")}
              </h3>
              <button onClick={() => setIsOpen(false)} aria-label={t("close")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex gap-2 mb-6" role="tablist">
              {hint && (
                <button
                  role="tab"
                  aria-selected={tab === "hint"}
                  onClick={() => setActiveTab("hint")}
                  className={`px-4 py-2 font-bold rounded-lg border-2 transition-all ${
                    tab === "hint" ? "bg-amber-400 border-foreground text-foreground" : "bg-gray-100 border-gray-400 text-gray-700 hover:border-foreground"
                  }`}
                >
                  {t("hint")}
                </button>
              )}
              {definition && (
                <button
                  role="tab"
                  aria-selected={tab === "definition"}
                  onClick={() => setActiveTab("definition")}
                  className={`px-4 py-2 font-bold rounded-lg border-2 transition-all ${
                    tab === "definition" ? "bg-blue-400 border-foreground text-foreground" : "bg-gray-100 border-gray-400 text-gray-700 hover:border-foreground"
                  }`}
                >
                  {t("definition")}
                </button>
              )}
            </div>

            <div role="tabpanel" className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 min-h-[100px] flex items-center">
              <p className="text-base font-medium leading-relaxed text-foreground">{tab === "hint" ? hint : definition}</p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              autoFocus
              className="w-full mt-6 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg border-2 border-foreground hover:bg-blue-700 transition-colors"
            >
              {t("gotIt")}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
