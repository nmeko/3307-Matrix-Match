"use client"

import { useState } from "react"
import { HelpCircle, X, Lightbulb } from "lucide-react"

interface HelpPanelProps {
  hint?: string
  definition?: string
}

export function HelpPanel({ hint, definition }: HelpPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"hint" | "definition">("hint")
  const [showTip, setShowTip] = useState(true)

  if (!hint && !definition) return null

  return (
    <>
      {showTip && (
        <div className="fixed bottom-20 right-6 md:bottom-24 md:right-8 bg-yellow-100 border-4 border-amber-400 p-4 rounded-2xl max-w-xs shadow-lg z-30 animate-scaleIn">
          <button
            onClick={() => setShowTip(false)}
            className="absolute -top-2 -right-2 bg-amber-400 border-2 border-foreground p-1 rounded-full hover:bg-amber-500 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex gap-3 items-start">
            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-bold text-amber-900">
              💡 Stuck? Click the yellow button below to get a hint or definition!
            </p>
          </div>
        </div>
      )}

      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-amber-400 border-4 border-foreground p-4 rounded-full shadow-lg hover:-translate-y-1 transition-all z-40 active:translate-y-1"
        title="Get help"
      >
        <HelpCircle className="w-6 h-6 text-foreground" />
      </button>

      {/* Help Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-background border-4 border-foreground rounded-2xl p-6 max-w-md w-full shadow-lg animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-primary">Need Help?</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {hint && (
                <button
                  onClick={() => setActiveTab("hint")}
                  className={`px-4 py-2 font-bold rounded-lg border-2 transition-all ${
                    activeTab === "hint"
                      ? "bg-amber-400 border-foreground text-foreground"
                      : "bg-gray-100 border-gray-300 text-gray-600 hover:border-foreground"
                  }`}
                >
                  Hint
                </button>
              )}
              {definition && (
                <button
                  onClick={() => setActiveTab("definition")}
                  className={`px-4 py-2 font-bold rounded-lg border-2 transition-all ${
                    activeTab === "definition"
                      ? "bg-blue-400 border-foreground text-foreground"
                      : "bg-gray-100 border-gray-300 text-gray-600 hover:border-foreground"
                  }`}
                >
                  Definition
                </button>
              )}
            </div>

            {/* Content */}
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 min-h-[100px] flex items-center">
              <p className="text-base font-medium leading-relaxed text-foreground">
                {activeTab === "hint" ? hint : definition}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-6 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg border-2 border-foreground hover:bg-blue-700 transition-colors"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  )
}
