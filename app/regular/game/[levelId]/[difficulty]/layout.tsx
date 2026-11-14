import { GAME_LEVELS } from "@/lib/game-data"

// Static export needs every level/difficulty page listed up front.
export function generateStaticParams() {
  return GAME_LEVELS.flatMap((level) =>
    (["easy", "medium", "hard"] as const).map((difficulty) => ({ levelId: String(level.id), difficulty })),
  )
}

export const dynamicParams = false

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return children
}
