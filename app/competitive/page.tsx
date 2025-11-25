"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/use-translation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Clock, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function CompetitiveLobby() {
  const router = useRouter()
  const t = useTranslation()
  const [playerName, setPlayerName] = useState("")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")

  const handleStart = () => {
    if (!playerName.trim()) {
      alert("Please enter your name!")
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
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-4 border-white bg-white/90 backdrop-blur-sm w-12 h-12"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl z-10"
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

          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="font-bold text-sm text-blue-900">{t("timedQuestions")}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="font-bold text-sm text-green-900">{t("speedBonus")}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="font-bold text-sm text-purple-900">{t("highScore")}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-bold text-lg mb-2">{t("yourName")}</label>
                <Input
                  type="text"
                  placeholder={t("enterYourName")}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="border-4 border-black text-xl p-6 font-bold"
                  maxLength={20}
                />
              </div>

              <div>
                <label className="block font-bold text-lg mb-3">{t("selectDifficulty")}</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["easy", "medium", "hard"] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={`
                        p-4 rounded-xl border-4 font-bold text-lg transition-all uppercase
                        ${
                          difficulty === diff
                            ? "border-black bg-black text-white scale-105 shadow-lg"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }
                        ${diff === "easy" ? "hover:bg-green-50" : diff === "medium" ? "hover:bg-yellow-50" : "hover:bg-red-50"}
                      `}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={handleStart}
              className="w-full h-16 text-2xl font-black bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 border-4 border-black rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {t("startGameButton")} 🚀
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
