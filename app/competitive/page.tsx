"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/use-translation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Clock, Zap, User, Users, Presentation } from "lucide-react"
import { motion } from "framer-motion"

// Same "random" layout on the server and in the browser (Math.random would differ and break hydration).
const bubble = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export default function CompetitiveLobby() {
  const router = useRouter()
  const t = useTranslation()
  const [playerName, setPlayerName] = useState("")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [nameError, setNameError] = useState(false)

  const handleStart = () => {
    if (!playerName.trim()) {
      setNameError(true)
      return
    }
    router.push(`/competitive/game?name=${encodeURIComponent(playerName)}&difficulty=${difficulty}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: bubble(i, 1) * 100 + 20,
              height: bubble(i, 2) * 100 + 20,
              left: `${bubble(i, 3) * 100}%`,
              top: `${bubble(i, 4) * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: bubble(i, 5) * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: bubble(i, 6) * 2,
            }}
          />
        ))}
      </div>

      <div className="absolute top-4 start-4 z-10">
        <Link
          href="/"
          aria-label={t("goBack")}
          className="flex items-center justify-center rounded-full border-4 border-black bg-white w-12 h-12 shadow-md hover:-translate-y-0.5 transition-transform focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowLeft className="w-6 h-6 text-black rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl z-10 mt-16 md:mt-0"
      >
        <Card className="border-4 border-white shadow-lg bg-white">
          <CardHeader className="text-center pb-4 border-b-4 border-black bg-gradient-to-r from-yellow-400 to-orange-400">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              className="inline-block"
            >
              <Trophy className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
            </motion.div>
            <CardTitle className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">
              {t("competitiveModeLobby")}
            </CardTitle>
            <p className="text-white font-bold text-lg">{t("raceAgainstTime")}</p>
          </CardHeader>

          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/competitive/join/"
                className="flex items-start gap-3 p-4 rounded-xl border-4 border-black bg-blue-50 hover:bg-blue-100 hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <Users className="w-8 h-8 text-blue-700 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block font-black text-lg">{t("joinClass")}</span>
                  <span className="block text-sm font-medium text-muted-foreground">{t("joinDesc")}</span>
                </span>
              </Link>
              <Link
                href="/competitive/host/"
                className="flex items-start gap-3 p-4 rounded-xl border-4 border-black bg-purple-50 hover:bg-purple-100 hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              >
                <Presentation className="w-8 h-8 text-purple-700 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block font-black text-lg">{t("hostClass")}</span>
                  <span className="block text-sm font-medium text-muted-foreground">{t("hostDesc")}</span>
                </span>
              </Link>
            </div>

            <div className="border-t-4 border-black pt-6">
              <h2 className="flex items-center gap-2 text-2xl font-black">
                <User className="w-7 h-7" aria-hidden="true" /> {t("playSolo")}
              </h2>
              <p className="font-medium text-muted-foreground">{t("soloDesc")}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div className="p-2 sm:p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="font-bold text-xs sm:text-sm text-blue-900">{t("timedQuestions")}</p>
              </div>
              <div className="p-2 sm:p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="font-bold text-xs sm:text-sm text-green-900">{t("speedBonus")}</p>
              </div>
              <div className="p-2 sm:p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="font-bold text-xs sm:text-sm text-purple-900">{t("highScore")}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="solo-name" className="block font-bold text-lg mb-2">
                  {t("yourName")}
                </label>
                <Input
                  id="solo-name"
                  type="text"
                  placeholder={t("enterYourName")}
                  value={playerName}
                  aria-invalid={nameError}
                  aria-describedby={nameError ? "solo-name-error" : undefined}
                  onChange={(e) => {
                    setPlayerName(e.target.value)
                    setNameError(false)
                  }}
                  className="border-4 border-black text-xl p-6 font-bold"
                  maxLength={20}
                />
                {nameError && (
                  <p id="solo-name-error" role="alert" className="mt-2 font-bold text-red-700">
                    {t("enterNameFirst")}
                  </p>
                )}
              </div>

              <div>
                <p className="block font-bold text-lg mb-3">{t("selectDifficulty")}</p>
                <div className="grid grid-cols-3 gap-3">
                  {(["easy", "medium", "hard"] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      aria-pressed={difficulty === diff}
                      className={`
                        p-4 rounded-xl border-4 font-bold text-lg transition-all
                        ${
                          difficulty === diff
                            ? "border-black bg-black text-white scale-105 shadow-lg"
                            : "border-gray-400 bg-white text-black hover:border-black"
                        }
                        ${diff === "easy" ? "hover:bg-green-50" : diff === "medium" ? "hover:bg-yellow-50" : "hover:bg-red-50"}
                      `}
                    >
                      {t(diff)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={handleStart}
              className="w-full h-16 text-2xl font-black text-white bg-gradient-to-r from-green-700 to-blue-700 hover:from-green-800 hover:to-blue-800 border-4 border-black rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {t("startGameButton")} 🚀
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
