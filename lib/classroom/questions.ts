import { COMPETITIVE_QUESTIONS, type CompetitiveQuestion } from "@/lib/competitive-questions"
import { langCode } from "@/lib/translations"

export type ClassDifficulty = "easy" | "medium" | "hard" | "mixed"
export const CLASS_DIFFICULTIES: ClassDifficulty[] = ["easy", "medium", "hard", "mixed"]

const ALL = Object.values(COMPETITIVE_QUESTIONS).flat()

export function findQuestion(qid: string): CompetitiveQuestion | undefined {
  return ALL.find((q) => q.id === qid)
}

/** Question ids for a class game, shuffled so a replay isn't the same order. */
export function pickQuestions(difficulty: ClassDifficulty): string[] {
  const pool = (difficulty === "mixed" ? ALL : COMPETITIVE_QUESTIONS[difficulty]).map((q) => q.id)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1)
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return difficulty === "mixed" ? pool.slice(0, 10) : pool
}

export function questionText(q: CompetitiveQuestion, language: string): string {
  const code = langCode(language)
  return (code !== "en" && q.translations?.[code]?.question) || q.question
}
