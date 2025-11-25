"use client"

import Link from "next/link"
import { useGame } from "@/lib/game-context"
import { useTranslation } from "@/lib/use-translation"

export default function RegularModeMenu() {
  const { levels } = useGame()
  const t = useTranslation()

  console.log("[v0] Total levels loaded:", levels.length)
  levels.forEach((level, index) => {
    console.log(`[v0] Level ${level.id} (${level.name}):`, {
      easy: level.subLevels?.easy ? `${level.subLevels.easy.questions.length} questions` : "MISSING",
      medium: level.subLevels?.medium ? `${level.subLevels.medium.questions.length} questions` : "MISSING",
      hard: level.subLevels?.hard ? `${level.subLevels.hard.questions.length} questions` : "MISSING",
    })
  })

  const getTranslatedDescription = (levelId: number): string => {
    const descriptionKeys: Record<number, string> = {
      1: "learnMatrix",
      2: "addingSubtracting",
      3: "advancedMultiplication",
    }
    return t(descriptionKeys[levelId] || "")
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <header className="flex items-center gap-4 mb-8">
          <Link href="/">
            <button
              className="rounded-full border-4 border-foreground w-12 h-12 bg-transparent text-2xl hover:opacity-80 transition-opacity flex items-center justify-center"
              aria-label="Go back"
            >
              ←
            </button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-black bg-white border-4 border-foreground px-6 py-2 rounded-xl shadow-lg">
            {t("selectALevel")}
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            <div key={level.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
              <div
                className={`h-full border-4 border-foreground shadow-lg relative overflow-hidden transition-opacity ${level.locked ? "bg-muted opacity-80" : "bg-white"}`}
              >
                {level.locked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10 backdrop-blur-[1px]">
                    <span className="text-6xl opacity-50">🔒</span>
                  </div>
                )}

                {/* Card Header */}
                <div className="bg-primary text-primary-foreground border-b-4 border-foreground p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-black">
                      {level.id}. {level.name}
                    </h2>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-6">
                  <p className="font-medium text-muted-foreground min-h-[3rem]">{getTranslatedDescription(level.id)}</p>

                  <div className="space-y-3">
                    {(["easy", "medium", "hard"] as const).map((diff) => {
                      const subLevel = level.subLevels?.[diff]

                      console.log(`[v0] Level ${level.id} - ${diff}:`, subLevel ? "EXISTS" : "MISSING")

                      if (!subLevel) return null

                      const isLocked =
                        diff === "medium"
                          ? !level.subLevels?.easy?.passed
                          : diff === "hard"
                            ? !level.subLevels?.medium?.passed
                            : false

                      return (
                        <Link
                          key={diff}
                          href={level.locked || isLocked ? "#" : `/regular/game/${level.id}/${diff}`}
                          className={level.locked || isLocked ? "pointer-events-none" : ""}
                        >
                          <div
                            className={`
                            group flex items-center justify-between p-3 rounded-lg border-2 border-foreground transition-all
                            ${subLevel.passed ? "bg-green-100" : "bg-white hover:bg-yellow-50 hover:-translate-y-1 hover:shadow-md"}
                            ${isLocked ? "opacity-50 bg-gray-100" : "cursor-pointer"}
                          `}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`
                                w-8 h-8 rounded-full flex items-center justify-center border-2 border-foreground font-bold text-sm
                                ${diff === "easy" ? "bg-green-400" : diff === "medium" ? "bg-yellow-400" : "bg-red-400"}
                              `}
                              >
                                {diff[0].toUpperCase()}
                              </div>
                              <span className="font-bold capitalize">{diff}</span>
                            </div>

                            <div className="w-5 h-5 flex items-center justify-center">
                              {subLevel.passed ? (
                                <span className="text-xl">⭐</span>
                              ) : isLocked ? (
                                <span className="text-lg">🔒</span>
                              ) : (
                                <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">▶️</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
