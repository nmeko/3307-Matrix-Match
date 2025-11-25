"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { Level, Difficulty, GameSettings } from "./types"
import { GAME_LEVELS } from "./game-data"

interface GameState {
  levels: Level[]
  completeSubLevel: (levelId: number, difficulty: Difficulty, passed: boolean) => void
  resetProgress: () => void
  gameSettings: GameSettings
  setGameSettings: (settings: Partial<GameSettings>) => void
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
        setLevels(JSON.parse(saved))
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
      localStorage.setItem("matrix-match-progress", JSON.stringify(levels))
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
    }
  }, [gameSettings, isHydrated])

  const completeSubLevel = useCallback((levelId: number, difficulty: Difficulty, passed: boolean) => {
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
