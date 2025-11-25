"use client"

import { useGame } from "./game-context"
import { getTranslation } from "./translations"

export function useTranslation() {
  const { gameSettings } = useGame()

  return (key: string) => getTranslation(gameSettings.language, key)
}
