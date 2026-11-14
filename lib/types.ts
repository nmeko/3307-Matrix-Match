export type Difficulty = "Easy" | "Medium" | "Hard"

export type Question = {
  id: string
  question: string
  matrix?: number[][]
  additionalMatrix?: number[][]
  options?: string[]
  correctAnswer: string
  explanation: string
  type: "multiple-choice" | "input" | "matrix-fill" | "true-false"
  hint?: string
  definition?: string
  translations?: Partial<Record<"es" | "zh" | "hi" | "ar", QuestionTranslation>>
}

/** Any question text or data, overridden for one language. */
export type QuestionTranslation = Partial<Omit<Question, "id" | "type" | "translations">>

export type SubLevel = {
  id: string
  difficulty: Difficulty
  questions: Question[]
  passed: boolean
}

export type Level = {
  id: number
  name: string
  description: string
  locked: boolean
  translations?: {
    es?: {
      name?: string
      description?: string
    }
    zh?: {
      name?: string
      description?: string
    }
    hi?: {
      name?: string
      description?: string
    }
    ar?: {
      name?: string
      description?: string
    }
  }
  subLevels: {
    easy: SubLevel
    medium: SubLevel
    hard: SubLevel
  }
}

export type GameSettings = {
  language: "English" | "Spanish" | "Mandarin" | "Hindi" | "Arabic"
  soundEnabled: boolean
  highContrast: boolean
  textSize: "normal" | "large" | "larger" | "largest"
}
