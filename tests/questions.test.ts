import { describe, expect, it } from "vitest"
import { GAME_LEVELS } from "@/lib/game-data"

const questions = GAME_LEVELS.flatMap((level) =>
  Object.values(level.subLevels).flatMap((sub) => sub.questions.map((q) => ({ where: `level ${level.id} ${sub.difficulty} ${q.id}`, q }))),
)

describe("question bank", () => {
  it("has questions", () => expect(questions.length).toBeGreaterThan(0))

  it.each(questions)("$where: the correct answer is one of the options", ({ q }) => {
    if (q.type === "multiple-choice" || q.type === "true-false") expect(q.options).toContain(q.correctAnswer)
  })

  // Answers are graded by option position, so every translation must list its options
  // in the same order as English, with its own answer at the same position.
  it.each(questions)("$where: translated options line up with English", ({ q }) => {
    if (!q.options) return
    const correctIndex = q.options.indexOf(q.correctAnswer)
    for (const [lang, tr] of Object.entries(q.translations ?? {})) {
      if (!tr?.options) continue
      expect(tr.options, lang).toHaveLength(q.options.length)
      if (tr.correctAnswer) expect(tr.options.indexOf(tr.correctAnswer), `${lang} answer position`).toBe(correctIndex)
    }
  })
})
