"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { Level, Difficulty, GameSettings } from "./types"
import { GAME_LEVELS } from "./game-data"

interface GameState {
  levels: Level[]
  completeSubLevel: (levelId: number, difficulty: Difficulty | Lowercase<Difficulty>, passed: boolean) => void
  resetProgress: () => void
  gameSettings: GameSettings
  setGameSettings: (settings: Partial<GameSettings>) => void
}

type Progress = Record<number, Partial<Record<"easy" | "medium" | "hard", boolean>>>

// Only which sub-levels were passed is saved, so question fixes and new translations reach returning players.
export function progressOf(levels: Level[]): Progress {
  return Object.fromEntries(
    levels.map((l) => [l.id, { easy: l.subLevels.easy.passed, medium: l.subLevels.medium.passed, hard: l.subLevels.hard.passed }]),
  )
}

/** Marks passed sub-levels on the current question bank. Also reads the old format (a full copy of the levels). */
export function applyProgress(saved: unknown): Level[] {
  const progress: Progress = Array.isArray(saved) ? progressOf(saved as Level[]) : ((saved ?? {}) as Progress)
  return GAME_LEVELS.map((level) => {
    const p = progress[level.id] ?? {}
    const sub = (k: "easy" | "medium" | "hard") => ({ ...level.subLevels[k], passed: p[k] === true })
    return { ...level, subLevels: { easy: sub("easy"), medium: sub("medium"), hard: sub("hard") } }
  })
}

const GameContext = createContext<GameState | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [levels, setLevels] = useState<Level[]>(GAME_LEVELS)
  const [gameSettings, setGameSettingsState] = useState<GameSettings>({
    language: "English",
    soundEnabled: true,
    highContrast: false,
    textSize: "normal",
  })
  const [isHydrated, setIsHydrated] = useState(false)

  // Load progress and settings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("matrix-match-progress")
      if (saved) {
        // Saved progress can only be read after mount (localStorage doesn't exist on the server).
        setLevels(applyProgress(JSON.parse(saved))) // eslint-disable-line react-hooks/set-state-in-effect
      }

      const savedSettings = localStorage.getItem("matrix-match-settings")
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setGameSettingsState(settings)

        if (settings.highContrast) {
          document.documentElement.classList.add("high-contrast")
        }
        if (settings.textSize !== "normal") {
          document.documentElement.setAttribute("data-text-size", settings.textSize)
        }
      }
    } catch (e) {
      console.error("[v0] Failed to load settings", e)
    }

    setIsHydrated(true)
  }, [])

  // Save progress whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("matrix-match-progress", JSON.stringify(progressOf(levels)))
    }
  }, [levels, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("matrix-match-settings", JSON.stringify(gameSettings))

      // Apply high-contrast setting to document
      if (gameSettings.highContrast) {
        document.documentElement.classList.add("high-contrast")
      } else {
        document.documentElement.classList.remove("high-contrast")
      }

      // Apply text size setting to document
      if (gameSettings.textSize === "normal") {
        document.documentElement.removeAttribute("data-text-size")
      } else {
        document.documentElement.setAttribute("data-text-size", gameSettings.textSize)
      }

      // Tell browsers and screen readers the language, and lay Arabic out right to left
      const langCode = { English: "en", Spanish: "es", Mandarin: "zh", Hindi: "hi", Arabic: "ar" }[gameSettings.language]
      document.documentElement.lang = langCode
      document.documentElement.dir = langCode === "ar" ? "rtl" : "ltr"
    }
  }, [gameSettings, isHydrated])

  const completeSubLevel = useCallback((levelId: number, difficulty: Difficulty | Lowercase<Difficulty>, passed: boolean) => {
    setLevels((prev) =>
      prev.map((level) => {
        if (level.id !== levelId) return level

        const difficultyKey = difficulty.toLowerCase() as keyof typeof level.subLevels
        const subLevel = level.subLevels[difficultyKey]

        const updatedSubLevel = { ...subLevel, passed: passed || subLevel.passed }

        return {
          ...level,
          subLevels: {
            ...level.subLevels,
            [difficultyKey]: updatedSubLevel,
          },
        }
      }),
    )
  }, [])

  const resetProgress = useCallback(() => {
    setLevels(GAME_LEVELS)
    localStorage.removeItem("matrix-match-progress")
  }, [])

  const setGameSettings = useCallback((settings: Partial<GameSettings>) => {
    setGameSettingsState((prev) => ({ ...prev, ...settings }))
  }, [])

  // Prevent rendering until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return (
      <GameContext.Provider
        value={{ levels: GAME_LEVELS, completeSubLevel, resetProgress, gameSettings, setGameSettings }}
      >
        <div className="min-h-screen bg-background" />
        {children}
      </GameContext.Provider>
    )
  }

  return (
    <GameContext.Provider value={{ levels, completeSubLevel, resetProgress, gameSettings, setGameSettings }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) throw new Error("useGame must be used within a GameProvider")
  return context
}
