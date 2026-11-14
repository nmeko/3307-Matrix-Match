"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, useRef, Suspense, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { COMPETITIVE_QUESTIONS } from "@/lib/competitive-questions"
import { Trophy, Clock, Zap, X, Check } from "lucide-react"
import { useGame } from "@/lib/game-context"

// Quiz-show answer tiles: a color and a shape each, so they read without color too.
const TILES = [
  { className: "bg-red-500", shape: "▲" },
  { className: "bg-blue-500", shape: "◆" },
  { className: "bg-yellow-500", shape: "●" },
  { className: "bg-green-600", shape: "■" },
]

const YES_NO: Record<string, [string, string]> = {
  English: ["Yes", "No"], Spanish: ["Sí", "No"], Mandarin: ["是", "否"], Hindi: ["हाँ", "नहीं"], Arabic: ["نعم", "لا"],
}
const label = (opt: string, language: string) =>
  opt === "yes" ? YES_NO[language]?.[0] ?? "Yes" : opt === "no" ? YES_NO[language]?.[1] ?? "No" : opt

type HighScore = { name: string; score: number; at: number; latest?: boolean }

// Keeps the top 5 scores per difficulty in this browser and returns them, marking the new one.
function saveHighScore(difficulty: string, name: string, score: number): HighScore[] {
  const key = `matrix-match-highscores-${difficulty}`
  let list: HighScore[] = []
  try {
    list = JSON.parse(localStorage.getItem(key) || "[]")
  } catch {}
  const entry = { name: name.slice(0, 20), score, at: Date.now() }
  list = [...list.filter((h) => typeof h.score === "number"), entry].sort((a, b) => b.score - a.score).slice(0, 5)
  try {
    localStorage.setItem(key, JSON.stringify(list))
  } catch {}
  return list.map((h) => ({ ...h, latest: h.at === entry.at }))
}

function CompetitiveGameContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { gameSettings } = useGame()

  const playerName = searchParams.get("name") || "Player"
  const requested = searchParams.get("difficulty") ?? ""
  const difficulty = (requested in COMPETITIVE_QUESTIONS ? requested : "easy") as keyof typeof COMPETITIVE_QUESTIONS

  const questions = COMPETITIVE_QUESTIONS[difficulty]
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(questions[0].time)
  const [chosen, setChosen] = useState<string | null>(null)
  const [highScores, setHighScores] = useState<HighScore[]>([])
  // The final score must include the last answer, which state updates would not have applied yet
  const scoreRef = useRef(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const currentQuestion = questions[currentQIndex]
  // Set synchronously so fast repeat presses can't answer the same question twice
  const answered = useRef(false)
  const totalQuestions = questions.length

  const translatedQuestion = useMemo(() => {
    const langCode =
      gameSettings.language === "English"
        ? "en"
        : gameSettings.language === "Spanish"
          ? "es"
          : gameSettings.language === "Mandarin"
            ? "zh"
            : gameSettings.language === "Hindi"
              ? "hi"
              : "ar"

    if (langCode === "en") {
      return currentQuestion.question
    }

    return (
      currentQuestion.translations?.[langCode as keyof typeof currentQuestion.translations]?.question ||
      currentQuestion.question
    )
  }, [currentQuestion, gameSettings.language])

  // Timer countdown
  useEffect(() => {
    if (showResult || gameOver) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [currentQIndex, showResult, gameOver])

  const handleTimeout = () => {
    if (answered.current) return
    answered.current = true
    setIsCorrect(false)
    setShowResult(true)
    setStreak(0)
    setTimeout(nextQuestion, 2000)
  }

  const handleSubmit = (choice: string) => {
    if (answered.current || gameOver) return
    answered.current = true
    setChosen(choice)
    const correct = choice === currentQuestion.answer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      const speedBonus = Math.floor((timeLeft / currentQuestion.time) * 500)
      const basePoints = 1000
      const streakBonus = streak * 200
      const totalPoints = basePoints + speedBonus + streakBonus

      scoreRef.current += totalPoints
      setScore((prev) => prev + totalPoints)
      setStreak((prev) => prev + 1)
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
    } else {
      setStreak(0)
    }

    setTimeout(nextQuestion, 2000)
  }

  const nextQuestion = () => {
    if (currentQIndex < totalQuestions - 1) {
      answered.current = false
      setCurrentQIndex((prev) => prev + 1)
      setTimeLeft(questions[currentQIndex + 1].time)
      setChosen(null)
      setShowResult(false)
    } else {
      setHighScores(saveHighScore(difficulty, playerName, scoreRef.current))
      setGameOver(true)
    }
  }

  // Handlers are recreated every render, so these effects always see current state.
  useEffect(() => {
    if (timeLeft === 0 && !showResult && !gameOver) handleTimeout()
  }, [timeLeft, showResult, gameOver]) // eslint-disable-line react-hooks/exhaustive-deps

  // Number keys 1-4 pick the matching answer tile
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const i = Number(e.key) - 1
      if (i >= 0 && i < currentQuestion.options.length) handleSubmit(currentQuestion.options[i])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  // Celebrate a high final score once the last answer has been counted
  useEffect(() => {
    if (gameOver && score > 3000) confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } })
  }, [gameOver]) // eslint-disable-line react-hooks/exhaustive-deps

  if (gameOver) {
    const avgScore = Math.round(score / totalQuestions)
    const rank = score > 4000 ? "Master" : score > 3000 ? "Expert" : score > 2000 ? "Intermediate" : "Beginner"

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-4 border-black rounded-2xl p-8 max-w-lg w-full text-center shadow-lg"
        >
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 1 }}>
            <Trophy className="w-24 h-24 mx-auto text-yellow-500 fill-yellow-500 mb-4" />
          </motion.div>
          <h1 className="text-4xl font-black mb-2">GAME OVER!</h1>
          <p className="text-xl font-bold text-muted-foreground mb-6">{playerName}</p>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-xl border-4 border-black mb-6">
            <p className="text-sm font-bold text-white mb-1">Final Score</p>
            <p className="text-5xl font-black text-white">{score.toLocaleString()}</p>
            <p className="text-lg font-bold text-white mt-2">Rank: {rank}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <p className="text-sm font-bold text-blue-900">Questions</p>
              <p className="text-2xl font-black">{totalQuestions}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <p className="text-sm font-bold text-green-900">Avg/Q</p>
              <p className="text-2xl font-black">{avgScore}</p>
            </div>
          </div>

          <div className="text-left mb-6">
            <h2 className="font-black text-lg mb-2 capitalize">Top scores · {difficulty}</h2>
            <ol className="space-y-1">
              {highScores.map((h, i) => (
                <li
                  key={`${h.at}-${i}`}
                  className={`flex justify-between rounded-lg px-3 py-2 border-2 ${h.latest ? "bg-yellow-100 border-yellow-400 font-black" : "bg-gray-50 border-gray-200 font-bold"}`}
                >
                  <span>{i + 1}. {h.name}</span>
                  <span>{h.score.toLocaleString()}</span>
                </li>
              ))}
            </ol>
            <p className="text-xs text-muted-foreground mt-2">Saved on this device.</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => window.location.reload()}
              className="game-btn w-full bg-green-500 border-green-700 hover:bg-green-600"
            >
              Play Again
            </Button>
            <Button
              onClick={() => router.push("/competitive")}
              className="game-btn w-full bg-white text-black hover:bg-gray-100"
            >
              Back to Lobby
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  const progressPercent = ((currentQIndex + 1) / totalQuestions) * 100
  const timePercent = (timeLeft / currentQuestion.time) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex flex-col">
      {/* Top HUD */}
      <div className="bg-white border-b-4 border-black p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg border-2 border-black font-black">
            {playerName}
          </div>
          <div className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-lg border-2 border-black">
            <Trophy className="w-5 h-5" />
            <span className="font-black">{score.toLocaleString()}</span>
          </div>
          {streak > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-orange-400 px-3 py-2 rounded-lg border-2 border-black"
            >
              <Zap className="w-4 h-4 text-white" />
              <span className="font-black text-white">{streak}x</span>
            </motion.div>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-muted-foreground">QUESTION</p>
          <p className="text-xl font-black">
            {currentQIndex + 1}/{totalQuestions}
          </p>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="relative h-6 bg-gray-200 border-b-4 border-black">
        <motion.div
          className={`h-full ${timeLeft > 5 ? "bg-green-500" : "bg-red-500 animate-pulse"}`}
          initial={{ width: "100%" }}
          animate={{ width: `${timePercent}%` }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 font-black text-white drop-shadow-lg">
            <Clock className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQIndex}
            initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            className="w-full max-w-3xl"
          >
            <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl md:text-5xl font-black text-center mb-8">{translatedQuestion}</h2>

              {currentQuestion.matrix && (
                <div className="flex justify-center mb-8">
                  <div className="inline-flex items-center gap-2 font-mono text-4xl">
                    <div className="w-4 border-4 border-r-0 border-black self-stretch rounded-l-xl" />
                    <div
                      className="grid gap-4"
                      style={{ gridTemplateColumns: `repeat(${currentQuestion.matrix[0].length}, minmax(0, 1fr))` }}
                    >
                      {currentQuestion.matrix.map((row, rIndex) =>
                        row.map((val, cIndex) => (
                          <div
                            key={`${rIndex}-${cIndex}`}
                            className="flex h-16 w-16 items-center justify-center font-black"
                          >
                            {val}
                          </div>
                        )),
                      )}
                    </div>
                    <div className="w-4 border-4 border-l-0 border-black self-stretch rounded-r-xl" />
                  </div>
                </div>
              )}

              {!showResult ? (
                <div className={`grid gap-3 ${currentQuestion.options.length === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
                  {currentQuestion.options.map((opt, i) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSubmit(opt)}
                      className={`${TILES[i].className} flex items-center gap-4 rounded-xl border-4 border-black p-5 text-left text-2xl md:text-3xl font-black text-white shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-1 active:translate-y-0 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black`}
                    >
                      <span aria-hidden="true" className="text-3xl">{TILES[i].shape}</span>
                      <span className="flex-1">{label(opt, gameSettings.language)}</span>
                      <kbd className="hidden md:inline text-sm font-bold opacity-80">{i + 1}</kbd>
                    </button>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`p-8 rounded-xl border-4 text-center ${isCorrect ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"}`}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {isCorrect ? (
                      <Check className="w-12 h-12 text-green-600" />
                    ) : (
                      <X className="w-12 h-12 text-red-600" />
                    )}
                    <h3 className="text-4xl font-black">{isCorrect ? "CORRECT!" : "WRONG!"}</h3>
                  </div>
                  {!isCorrect && (
                    <p className="text-xl font-bold text-muted-foreground">{chosen === null ? "Time's up! " : ""}Answer: {label(currentQuestion.answer, gameSettings.language)}</p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress */}
      <div className="bg-white border-t-4 border-black p-2">
        <Progress value={progressPercent} className="h-4 rounded-full border-2 border-black" />
      </div>
    </div>
  )
}

export default function CompetitiveGame() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">Loading...</div>
        </div>
      }
    >
      <CompetitiveGameContent />
    </Suspense>
  )
}
