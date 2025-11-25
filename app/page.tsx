"use client"

import Link from "next/link"
import { GameSettings } from "@/components/game-settings"
import { CharacterGuide } from "@/components/character-guide"
import { MatrixDisplay } from "@/components/ui/matrix-display"
import { useTranslation } from "@/lib/use-translation"
import { Play, Trophy, BookOpen } from "lucide-react"

export default function Home() {
  const t = useTranslation()

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 opacity-20 rotate-12 animate-float">
        <MatrixDisplay
          data={[
            [1, 0],
            [0, 1],
          ]}
          className="text-primary"
        />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 -rotate-12 animate-float" style={{ animationDelay: "1s" }}>
        <MatrixDisplay
          data={[
            [3, 3],
            [0, 7],
          ]}
          className="text-secondary"
        />
      </div>

      {/* Header */}
      <header className="p-4 flex justify-between items-center z-10">
        <h1 className="text-xl md:text-2xl font-black bg-foreground text-background px-4 py-2 rounded-lg -rotate-2">
          3307 Matrix Match
        </h1>
        <GameSettings />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10 gap-8">
        <div className="text-center space-y-4 max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground drop-shadow-sm">
            {t("masterTheMatrix")}{" "}
            <span className="text-primary inline-block hover:scale-110 transition-transform">MATRIX</span>
          </h2>
          <p className="text-lg md:text-xl font-medium text-muted-foreground max-w-md mx-auto">{t("joinTheFun")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-8">
          {/* Regular Mode Card */}
          <Link href="/regular" className="group">
            <div className="game-card bg-white p-8 hover:bg-blue-50 transition-colors h-full flex flex-col items-center text-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen className="w-24 h-24" />
              </div>
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center border-2 border-foreground shadow-md">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <h3 className="text-2xl font-black">{t("regularMode")}</h3>
              <p className="text-muted-foreground font-medium">{t("learnAtYourPace")}</p>
              <div className="mt-auto pt-4">
                <span className="inline-block bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
                  {t("singlePlayer")}
                </span>
              </div>
            </div>
          </Link>

          {/* Competitive Mode Card */}
          <Link href="/competitive" className="group">
            <div className="game-card bg-black p-8 hover:bg-gray-900 transition-colors h-full flex flex-col items-center text-center gap-4 relative overflow-hidden text-white border-primary shadow-lg">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-24 h-24" />
              </div>
              <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center border-2 border-white shadow-md">
                <Trophy className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-black text-white">{t("competitiveMode")}</h3>
              <p className="text-gray-300 font-medium">{t("raceAgainstTime")}</p>
              <div className="mt-auto pt-4">
                <span className="inline-block bg-accent/20 text-accent font-bold px-3 py-1 rounded-full text-sm">
                  {t("timedChallenge")}
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="fixed bottom-0 left-4 pointer-events-none">
          <CharacterGuide message="Hi! Ready to learn?" mood="happy" />
        </div>
      </div>
    </main>
  )
}
