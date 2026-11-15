import { describe, expect, it } from "vitest"
import { answersMatch } from "@/lib/answers"
import { TRANSLATIONS } from "@/lib/translations"
import { applyProgress, progressOf } from "@/lib/game-context"
import { GAME_LEVELS } from "@/lib/game-data"
import { renderToStaticMarkup } from "react-dom/server"
import { createElement } from "react"
import { MathText } from "@/components/math-text"

describe("typed answers", () => {
  it.each([
    ["2", "2"], [" 2 ", "2"], ["2.0", "2"], ["+2", "2"], ["02", "2"], ["2,0", "2"],
    ["٢", "2"], ["۲", "2"], ["२", "2"], ["２", "2"], ["२३", "23"], ["١٦", "16"],
    ["−5", "-5"], ["－5", "-5"], ["True", "true"],
  ])("%s counts as %s", (typed, expected) => expect(answersMatch(typed, expected)).toBe(true))

  it.each([["3", "2"], ["", "0"], ["2x", "2"], ["22", "2"], ["-2", "2"], ["abc", "2"]])(
    "%s does not count as %s",
    (typed, expected) => expect(answersMatch(typed, expected)).toBe(false),
  )
})

describe("translations", () => {
  const en = Object.keys(TRANSLATIONS.en)
  it.each(["es", "zh", "hi", "ar"] as const)("%s has every English key", (lang) => {
    const table = TRANSLATIONS[lang] as Record<string, string>
    expect(en.filter((k) => !table[k])).toEqual([])
  })
})


describe("saved progress", () => {
  it("keeps stars but always uses the current questions", () => {
    const old = structuredClone(GAME_LEVELS)
    old[0].subLevels.easy.passed = true
    old[0].subLevels.easy.questions[0].correctAnswer = "stale"
    const levels = applyProgress(old)
    expect(levels[0].subLevels.easy.passed).toBe(true)
    expect(levels[0].subLevels.easy.questions[0].correctAnswer).toBe(GAME_LEVELS[0].subLevels.easy.questions[0].correctAnswer)
  })
  it("round-trips the new format and ignores junk", () => {
    const levels = applyProgress({ 2: { medium: true } })
    expect(applyProgress(JSON.parse(JSON.stringify(progressOf(levels))))[1].subLevels.medium.passed).toBe(true)
    expect(applyProgress(null)[0].subLevels.easy.passed).toBe(false)
    expect(applyProgress({ 1: { easy: "yes" } })[0].subLevels.easy.passed).toBe(false)
  })
})


describe("matrix notation inside sentences", () => {
  it("keeps the whole expression left to right", () => {
    const html = renderToStaticMarkup(createElement(MathText, { text: "احسب: 2([[1,2],[3,4]]) + [[2,4],[6,8]]؟" }))
    expect(html).toContain('<span dir="ltr" class="inline-block">2([[1,2],[3,4]]) + [[2,4],[6,8]]</span>؟')
  })
  it("leaves plain text alone", () => {
    expect(renderToStaticMarkup(createElement(MathText, { text: "What is at R1, C1?" }))).toBe("What is at R1, C1?")
  })
})
