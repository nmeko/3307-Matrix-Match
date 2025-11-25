"use client"

import { useParams, useRouter } from "next/navigation"
import { useGame } from "@/lib/game-context"
import { useTranslation } from "@/lib/use-translation"
import { useState, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { MatrixDisplay } from "@/components/ui/matrix-display"
import { HelpPanel } from "@/components/help-panel"
import { Progress } from "@/components/ui/progress"
import confetti from "canvas-confetti"

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const { levels, completeSubLevel, gameSettings } = useGame()
  const t = useTranslation()

  const levelId = Number(params.levelId)
  const difficulty = params.difficulty as "easy" | "medium" | "hard"

  const level = levels.find((l) => l.id === levelId)
  const subLevel = level?.subLevels[difficulty]
  const questions = subLevel?.questions || []

  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [attempts, setAttempts] = useState<Record<string, number>>({})
  const [status, setStatus] = useState<Record<string, "unanswered" | "correct" | "failed">>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [inputAnswer, setInputAnswer] = useState("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [showPreGame, setShowPreGame] = useState(true)
  const [gameFinished, setGameFinished] = useState(false)

  const getTranslatedQuestion = useMemo(() => {
    return (question: any) => {
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
        return {
          question: question.question,
          options: question.options,
          explanation: question.explanation,
          hint: question.hint,
          definition: question.definition,
        }
      }

      const translation = question.translations?.[langCode as keyof typeof question.translations]
      return {
        question: translation?.question || question.question,
        options: translation?.options || question.options,
        explanation: translation?.explanation || question.explanation,
        hint: translation?.hint || question.hint,
        definition: translation?.definition || question.definition,
      }
    }
  }, [gameSettings.language])

  const bellAudio = useRef<HTMLAudioElement | null>(null)
  const buzzerAudio = useRef<HTMLAudioElement | null>(null)

  const currentQuestion = questions[currentQIndex]
  const translatedQuestion = useMemo(
    () => (currentQuestion ? getTranslatedQuestion(currentQuestion) : null),
    [currentQIndex, getTranslatedQuestion],
  )
  const currentAttempts = attempts[currentQuestion?.id] || 0
  const currentStatus = status[currentQuestion?.id] || "unanswered"
  const isQuestionDone = currentStatus !== "unanswered"

  const playSound = (type: "correct" | "wrong") => {
    if (gameSettings.soundEnabled) {
      console.log(`[v0] Playing ${type} sound`)
    }
  }

  const handleSubmit = () => {
    if (isQuestionDone || !currentQuestion || !translatedQuestion) return

    let isCorrect = false

    if (currentQuestion.type === "multiple-choice" || currentQuestion.type === "true-false") {
      isCorrect = selectedOption === currentQuestion.correctAnswer
    } else {
      isCorrect = inputAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
    }

    if (isCorrect) {
      playSound("correct")
      setStatus((prev) => ({ ...prev, [currentQuestion.id]: "correct" }))
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      setShowExplanation(true)
    } else {
      playSound("wrong")
      const newAttempts = currentAttempts + 1
      setAttempts((prev) => ({ ...prev, [currentQuestion.id]: newAttempts }))

      if (newAttempts >= 3) {
        setStatus((prev) => ({ ...prev, [currentQuestion.id]: "failed" }))
        setShowExplanation(true)
      }
    }
  }

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1)
      setSelectedOption(null)
      setInputAnswer("")
      setShowExplanation(false)
    } else {
      finishGame()
    }
  }

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1)
      const prevQ = questions[currentQIndex - 1]
      const prevStatus = status[prevQ.id]
      setShowExplanation(prevStatus !== "unanswered")
    }
  }

  const finishGame = () => {
    setGameFinished(true)
    const correctCount = Object.values(status).filter((s) => s === "correct").length
    const passed = correctCount >= 2
    completeSubLevel(levelId, difficulty, passed)

    if (passed) {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } })
    }
  }

  const containerClass = `min-h-screen bg-background flex flex-col ${
    gameSettings.highContrast ? "high-contrast-mode" : ""
  }`
  const textSizeClass =
    gameSettings.textSize === "normal"
      ? "text-base"
      : gameSettings.textSize === "large"
        ? "text-lg"
        : gameSettings.textSize === "larger"
          ? "text-xl"
          : "text-2xl"

  if (!level || !subLevel) return <div className="p-8 text-center font-bold">Level not found!</div>

  if (showPreGame) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-background border-4 border-foreground p-8 rounded-2xl max-w-lg w-full text-center shadow-md">
          <h2 className={`text-3xl font-black mb-4 text-primary ${textSizeClass}`}>
            {t("readyFor")} {level.name}?
          </h2>
          <p className={`text-xl font-bold mb-2 capitalize text-muted-foreground ${textSizeClass}`}>
            {difficulty} {t("mode")}
          </p>
          <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 mb-6 text-left">
            <h3 className={`font-bold text-lg mb-2 ${textSizeClass}`}>{t("instructions")}</h3>
            <ul className={`list-disc list-inside space-y-2 ${textSizeClass}`}>
              <li>{t("threeQuestions")}</li>
              <li>{t("threeAttempts")}</li>
              <li>{t("passTwo")}</li>
            </ul>
          </div>
          <Button onClick={() => setShowPreGame(false)} className="game-btn w-full">
            {t("startGame")}
          </Button>
        </div>
      </div>
    )
  }

  if (gameFinished) {
    const correctCount = Object.values(status).filter((s) => s === "correct").length
    const passed = correctCount >= 2

    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 bg-background ${textSizeClass}`}>
        <div className="max-w-md w-full text-center space-y-6">
          <div
            className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 border-foreground ${passed ? "bg-yellow-400" : "bg-red-400"}`}
          >
            {passed ? <span className="text-6xl">⭐</span> : <span className="text-6xl">✕</span>}
          </div>

          <h1 className="text-4xl font-black">{passed ? t("levelComplete") : t("tryAgain")}</h1>
          <p className="text-xl text-muted-foreground">
            {t("youGot")} {correctCount} {t("outOf")}
          </p>

          <div className="grid grid-cols-3 gap-4 justify-center py-4">
            {questions.map((q, i) => (
              <div key={q.id} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-foreground font-bold ${status[q.id] === "correct" ? "bg-green-400" : "bg-red-400 text-white"}`}
                >
                  {status[q.id] === "correct" ? <span>✓</span> : <span>✕</span>}
                </div>
                <span className="font-bold text-sm">Q{i + 1}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => router.push("/regular")}
              className="game-btn w-full bg-white text-foreground hover:bg-gray-100"
            >
              {t("backToLevels")}
            </Button>
            {!passed && (
              <Button onClick={() => window.location.reload()} className="game-btn w-full">
                {t("retry")}
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <HelpPanel hint={translatedQuestion?.hint} definition={translatedQuestion?.definition} />

      {/* Top Bar */}
      <div className="p-4 border-b-4 border-foreground flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push("/regular")}>
            <span className="text-2xl">←</span>
          </Button>
          <div className="flex flex-col">
            <span className={`font-black uppercase text-xs text-muted-foreground ${textSizeClass}`}>{level.name}</span>
            <span className={`font-bold text-sm capitalize ${textSizeClass}`}>
              {difficulty} • Q{currentQIndex + 1}/3
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <span className="mr-2">↻</span> {t("restart")}
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={(currentQIndex / 3) * 100} className="h-4 rounded-none border-b-4 border-foreground" />

      {/* Game Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Main Question Area */}
        <div className={`flex-1 overflow-y-auto p-6 md:p-12 flex flex-col items-center ${textSizeClass}`}>
          <div key={currentQIndex} className="w-full max-w-3xl space-y-8">
            <div className="space-y-4 text-center">
              <h2
                className={`font-black ${textSizeClass === "text-base" ? "text-2xl md:text-4xl" : textSizeClass === "text-lg" ? "text-3xl md:text-5xl" : "text-4xl md:text-6xl"}`}
              >
                {translatedQuestion?.question}
              </h2>
              {(currentQuestion.matrix || currentQuestion.additionalMatrix) && (
                <div className="py-8 flex flex-col md:flex-row items-center justify-center gap-8">
                  {currentQuestion.matrix && (
                    <MatrixDisplay data={currentQuestion.matrix} className="scale-125 origin-center" />
                  )}
                  {currentQuestion.additionalMatrix && (
                    <>
                      <span className="text-3xl font-bold">+</span>
                      <MatrixDisplay data={currentQuestion.additionalMatrix} className="scale-125 origin-center" />
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Interaction Area */}
            <div className="bg-white p-6 rounded-2xl border-4 border-foreground shadow-md">
              {currentQuestion.type === "multiple-choice" || currentQuestion.type === "true-false" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {translatedQuestion?.options?.map((opt) => (
                    <button
                      key={opt}
                      disabled={isQuestionDone}
                      onClick={() => setSelectedOption(opt)}
                      className={`
                        p-4 rounded-xl border-4 font-bold transition-all
                        ${textSizeClass}
                        ${selectedOption === opt ? "border-primary bg-blue-50 ring-2 ring-primary ring-offset-2" : "border-gray-200 hover:border-gray-400"}
                        ${isQuestionDone && opt === currentQuestion.correctAnswer ? "bg-green-100 border-green-500" : ""}
                        ${isQuestionDone && selectedOption === opt && opt !== currentQuestion.correctAnswer ? "bg-red-100 border-red-500" : ""}
                      `}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    disabled={isQuestionDone}
                    value={inputAnswer}
                    onChange={(e) => setInputAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    className={`w-full p-4 text-center font-bold border-4 border-gray-200 rounded-xl focus:border-primary focus:outline-none ${textSizeClass}`}
                  />
                </div>
              )}

              {/* Explanation / Feedback */}
              {showExplanation && (
                <div
                  className={`mt-6 p-4 rounded-lg border-l-8 ${textSizeClass} ${status[currentQuestion.id] === "correct" ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"}`}
                >
                  <h4 className="font-black text-lg mb-1 flex items-center gap-2">
                    {status[currentQuestion.id] === "correct" ? (
                      <span className="text-2xl">✓</span>
                    ) : (
                      <span className="text-2xl">✕</span>
                    )}
                    {status[currentQuestion.id] === "correct" ? t("correct") : t("incorrect")}
                  </h4>
                  <p className="font-medium text-muted-foreground">{translatedQuestion?.explanation}</p>
                  {status[currentQuestion.id] === "failed" && (
                    <p className="mt-2 font-bold text-primary">
                      {t("correctAnswer")} {currentQuestion.correctAnswer}
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${i < (3 - currentAttempts) ? "bg-primary" : "bg-gray-200"}`}
                    />
                  ))}
                  <span className={`font-bold text-muted-foreground ml-2 text-xs ${textSizeClass}`}>
                    {t("attemptsLeft")}
                  </span>
                </div>

                <div className="flex gap-4">
                  {!isQuestionDone && (
                    <Button onClick={handleSubmit} className="game-btn px-8">
                      {t("submit")}
                    </Button>
                  )}
                  {isQuestionDone && (
                    <Button
                      onClick={handleNext}
                      className="game-btn px-8 bg-green-500 border-green-700 hover:bg-green-600 text-white"
                    >
                      {currentQIndex < questions.length - 1 ? t("nextQuestion") : t("finishLevel")}{" "}
                      <span className="ml-2">→</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Character */}
        <div className="w-full md:w-64 bg-gray-50 border-t-4 md:border-t-0 md:border-l-4 border-foreground p-6 flex flex-col items-center justify-end md:justify-end min-h-[200px]">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {status[currentQuestion?.id] === "correct"
                ? "🎉"
                : status[currentQuestion?.id] === "failed"
                  ? "😔"
                  : "💪"}
            </div>
            <p className={`font-bold text-muted-foreground ${textSizeClass}`}>
              {showExplanation
                ? status[currentQuestion?.id] === "correct"
                  ? "Great job!"
                  : "Don't worry, try the next one!"
                : "You can do it!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
