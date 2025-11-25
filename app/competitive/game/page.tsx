"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, Suspense, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Trophy, Clock, Zap, X, Check } from "lucide-react"
import { useGame } from "@/lib/game-context"
import { useTranslation } from "@/lib/use-translation"

const COMPETITIVE_QUESTIONS = {
  easy: [
    {
      id: "c1",
      question: "How many rows in this matrix?",
      translations: {
        es: { question: "¿Cuántas filas hay en esta matriz?" },
        zh: { question: "这个矩阵有多少行？" },
        hi: { question: "इस मैट्रिक्स में कितनी पंक्तियां हैं?" },
        ar: { question: "كم عدد الصفوف في هذه المصفوفة؟" },
      },
      matrix: [
        [1, 2],
        [3, 4],
      ],
      answer: "2",
      time: 15,
    },
    {
      id: "c2",
      question: "What is at R1, C1?",
      translations: {
        es: { question: "¿Qué hay en R1, C1?" },
        zh: { question: "R1, C1处是什么？" },
        hi: { question: "R1, C1 पर क्या है?" },
        ar: { question: "ما هو في R1, C1؟" },
      },
      matrix: [
        [5, 6],
        [7, 8],
      ],
      answer: "5",
      time: 15,
    },
    {
      id: "c3",
      question: "Is this a square matrix?",
      translations: {
        es: { question: "¿Es una matriz cuadrada?" },
        zh: { question: "这是一个正方矩阵吗？" },
        hi: { question: "क्या यह एक वर्ग मैट्रिक्स है?" },
        ar: { question: "هل هذه مصفوفة مربعة؟" },
      },
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
      ],
      answer: "no",
      time: 15,
    },
    {
      id: "c4",
      question: "How many elements total?",
      translations: {
        es: { question: "¿Cuántos elementos en total?" },
        zh: { question: "总共有多少个元素？" },
        hi: { question: "कुल कितने तत्व हैं?" },
        ar: { question: "كم عدد العناصر الإجمالي؟" },
      },
      matrix: [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      answer: "6",
      time: 15,
    },
    {
      id: "c5",
      question: "Sum of first row?",
      translations: {
        es: { question: "¿Suma de la primera fila?" },
        zh: { question: "第一行的和是多少？" },
        hi: { question: "पहली पंक्ति का योग?" },
        ar: { question: "مجموع الصف الأول؟" },
      },
      matrix: [
        [2, 3],
        [4, 5],
      ],
      answer: "5",
      time: 15,
    },
  ],
  medium: [
    {
      id: "m1",
      question: "Diagonal sum (trace)?",
      translations: {
        es: { question: "¿Suma diagonal (traza)?" },
        zh: { question: "对角线和（迹）？" },
        hi: { question: "विकर्ण योग (ट्रेस)?" },
        ar: { question: "مجموع القطر (الأثر)؟" },
      },
      matrix: [
        [3, 0],
        [0, 4],
      ],
      answer: "7",
      time: 12,
    },
    {
      id: "m2",
      question: "Element at R2, C2?",
      translations: {
        es: { question: "¿Elemento en R2, C2?" },
        zh: { question: "R2, C2处的元素？" },
        hi: { question: "R2, C2 पर तत्व?" },
        ar: { question: "العنصر في R2, C2؟" },
      },
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      answer: "5",
      time: 12,
    },
    {
      id: "m3",
      question: "Add: [1,2] + [3,4] = ?",
      translations: {
        es: { question: "Añadir: [1,2] + [3,4] = ?" },
        zh: { question: "添加: [1,2] + [3,4] = ?" },
        hi: { question: "जोड़ें: [1,2] + [3,4] = ?" },
        ar: { question: "أضف: [1,2] + [3,4] = ؟" },
      },
      matrix: [
        [1, 2],
        [3, 4],
      ],
      answer: "[4,6]",
      time: 12,
    },
    {
      id: "m4",
      question: "Matrix dimensions?",
      translations: {
        es: { question: "¿Dimensiones de la matriz?" },
        zh: { question: "矩阵尺寸？" },
        hi: { question: "मैट्रिक्स आयाम?" },
        ar: { question: "أبعاد المصفوفة؟" },
      },
      matrix: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      answer: "2x4",
      time: 12,
    },
    {
      id: "m5",
      question: "Last column sum?",
      translations: {
        es: { question: "¿Suma de la última columna?" },
        zh: { question: "最后一列的和？" },
        hi: { question: "अंतिम स्तंभ का योग?" },
        ar: { question: "مجموع العمود الأخير؟" },
      },
      matrix: [
        [1, 5],
        [2, 6],
        [3, 7],
      ],
      answer: "18",
      time: 12,
    },
  ],
  hard: [
    {
      id: "h1",
      question: "Matrix transpose [1,2;3,4]?",
      translations: {
        es: { question: "¿Transposición de matriz [1,2;3,4]?" },
        zh: { question: "矩阵转置 [1,2;3,4]?" },
        hi: { question: "मैट्रिक्स स्थानांतरण [1,2;3,4]?" },
        ar: { question: "تبديل المصفوفة [1,2;3,4]؟" },
      },
      matrix: [
        [1, 2],
        [3, 4],
      ],
      answer: "[1,3;2,4]",
      time: 10,
    },
    {
      id: "h2",
      question: "Determinant of 2x2?",
      translations: {
        es: { question: "¿Determinante de 2x2?" },
        zh: { question: "2x2的行列式？" },
        hi: { question: "2x2 का निर्धारक?" },
        ar: { question: "محدد 2x2؟" },
      },
      matrix: [
        [2, 3],
        [1, 4],
      ],
      answer: "5",
      time: 10,
    },
    {
      id: "h3",
      question: "Identity matrix sum?",
      translations: {
        es: { question: "¿Suma de matriz identidad?" },
        zh: { question: "单位矩阵和？" },
        hi: { question: "पहचान मैट्रिक्स योग?" },
        ar: { question: "مجموع مصفوفة الهوية؟" },
      },
      matrix: [
        [1, 0],
        [0, 1],
      ],
      answer: "2",
      time: 10,
    },
    {
      id: "h4",
      question: "Row 1 × 2 = ?",
      translations: {
        es: { question: "¿Fila 1 × 2 = ?" },
        zh: { question: "第1行 × 2 = ?" },
        hi: { question: "पंक्ति 1 × 2 = ?" },
        ar: { question: "الصف 1 × 2 = ؟" },
      },
      matrix: [[3, 4]],
      answer: "[6,8]",
      time: 10,
    },
    {
      id: "h5",
      question: "Zero matrix check?",
      translations: {
        es: { question: "¿Comprobación de matriz cero?" },
        zh: { question: "零矩阵检查？" },
        hi: { question: "शून्य मैट्रिक्स जांच?" },
        ar: { question: "فحص مصفوفة الأصفار؟" },
      },
      matrix: [
        [0, 0],
        [0, 0],
      ],
      answer: "yes",
      time: 10,
    },
  ],
}

function CompetitiveGameContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { gameSettings } = useGame()
  const t = useTranslation()

  const playerName = searchParams.get("name") || "Player"
  const difficulty = (searchParams.get("difficulty") || "easy") as keyof typeof COMPETITIVE_QUESTIONS

  const questions = COMPETITIVE_QUESTIONS[difficulty]
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(questions[0].time)
  const [inputAnswer, setInputAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const currentQuestion = questions[currentQIndex]
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
  }, [currentQIndex, gameSettings.language])

  // Timer countdown
  useEffect(() => {
    if (showResult || gameOver) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [currentQIndex, showResult, gameOver])

  const handleTimeout = () => {
    setIsCorrect(false)
    setShowResult(true)
    setStreak(0)
    setTimeout(nextQuestion, 2000)
  }

  const handleSubmit = () => {
    const correct = inputAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      const speedBonus = Math.floor((timeLeft / currentQuestion.time) * 500)
      const basePoints = 1000
      const streakBonus = streak * 200
      const totalPoints = basePoints + speedBonus + streakBonus

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
      setCurrentQIndex((prev) => prev + 1)
      setTimeLeft(questions[currentQIndex + 1].time)
      setInputAnswer("")
      setShowResult(false)
    } else {
      setGameOver(true)
      if (score > 3000) {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } })
      }
    }
  }

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
                <div className="space-y-4">
                  <input
                    type="text"
                    value={inputAnswer}
                    onChange={(e) => setInputAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="Type answer..."
                    className="w-full p-6 text-center text-3xl font-bold border-4 border-black rounded-xl focus:border-blue-500 focus:outline-none"
                    autoFocus
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={!inputAnswer.trim()}
                    className="game-btn w-full text-2xl h-16"
                  >
                    SUBMIT
                  </Button>
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
                    <p className="text-xl font-bold text-muted-foreground">Answer: {currentQuestion.answer}</p>
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
