"use client"

import Link from "next/link"
import { ArrowLeft, Lock, Play, Star } from "lucide-react"
import { useGame } from "@/lib/game-context"
import { useTranslation } from "@/lib/use-translation"
import { levelText } from "@/lib/translations"

const DIFFS = ["easy", "medium", "hard"] as const
const DIFF_COLOR = { easy: "bg-green-400", medium: "bg-yellow-400", hard: "bg-red-400" }

export default function RegularModeMenu() {
  const { levels, gameSettings } = useGame()
  const t = useTranslation()

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <header className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            aria-label={t("goBack")}
            className="shrink-0 rounded-full border-4 border-foreground w-12 h-12 bg-white flex items-center justify-center shadow-md hover:-translate-y-0.5 transition-transform focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ArrowLeft className="w-6 h-6 rtl:rotate-180" aria-hidden="true" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-black bg-white border-4 border-foreground px-6 py-2 rounded-xl shadow-lg">
            {t("selectALevel")}
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            <div key={level.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="h-full border-4 border-foreground shadow-lg bg-white">
                <div className="bg-primary text-primary-foreground border-b-4 border-foreground p-6">
                  <h2 className="text-2xl font-black">
                    {level.id}. {levelText(level, "name", gameSettings.language)}
                  </h2>
                </div>

                <div className="p-6 space-y-6">
                  <p className="font-medium text-muted-foreground min-h-[3rem]">
                    {levelText(level, "description", gameSettings.language)}
                  </p>

                  <ul className="space-y-3">
                    {DIFFS.map((diff) => {
                      const subLevel = level.subLevels[diff]
                      const isLocked =
                        level.locked ||
                        (diff === "medium" && !level.subLevels.easy.passed) ||
                        (diff === "hard" && !level.subLevels.medium.passed)
                      const row = (
                        <>
                          <span className="flex items-center gap-3">
                            <span
                              aria-hidden="true"
                              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-foreground font-bold text-sm ${DIFF_COLOR[diff]}`}
                            >
                              {t(diff).charAt(0)}
                            </span>
                            <span className="font-bold">{t(diff)}</span>
                          </span>
                          {subLevel.passed ? (
                            <span className="flex items-center gap-1 text-sm font-bold text-green-800">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-600" aria-hidden="true" /> {t("passed")}
                            </span>
                          ) : isLocked ? (
                            <span className="flex items-center gap-1 text-sm font-bold text-gray-600">
                              <Lock className="w-4 h-4" aria-hidden="true" /> {t("locked")}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-sm font-bold text-primary">
                              <Play className="w-4 h-4 fill-current rtl:rotate-180" aria-hidden="true" /> {t("play")}
                            </span>
                          )}
                        </>
                      )
                      const base = "flex items-center justify-between p-3 rounded-lg border-2 transition-all"
                      return (
                        <li key={diff}>
                          {isLocked ? (
                            <div className={`${base} border-gray-400 bg-gray-100 text-gray-600`} aria-disabled="true">
                              {row}
                            </div>
                          ) : (
                            <Link
                              href={`/regular/game/${level.id}/${diff}`}
                              className={`${base} border-foreground ${subLevel.passed ? "bg-green-100" : "bg-white"} hover:bg-yellow-50 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-primary`}
                            >
                              {row}
                            </Link>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
