import { describe, expect, it } from "vitest"
import {
  admit, answerCounts, cleanName, createGame, endGame, GRACE_MS, newRound, pointsFor, removePlayer,
  requestJoin, reveal, standings, startQuestion, submitAnswer, type HostState,
} from "@/lib/classroom/host-game"

const K1 = { kty: "EC", x: "a" } as JsonWebKey
const K2 = { kty: "EC", x: "b" } as JsonWebKey

function lobbyWith(...names: string[]): HostState {
  let s = { ...createGame(["c1", "c2"]), autoAdmit: true }
  names.forEach((n, i) => (s = requestJoin(s, `p${i}`, n, K1).state))
  return s
}

describe("joining", () => {
  it("waits for the teacher unless everyone is let in automatically", () => {
    const { state, outcome } = requestJoin(createGame([]), "p1", "Ana", K1)
    expect(outcome).toBe("pending")
    expect(Object.keys(state.players)).toEqual([])
    expect(Object.keys(admit(state, "p1").players)).toEqual(["p1"])
  })

  it("keeps out players once the game is locked", () => {
    expect(requestJoin({ ...createGame([]), locked: true }, "p1", "Ana", K1).outcome).toBe("locked")
  })

  it("does not let a removed or declined player back in with the same id", () => {
    let s = requestJoin(createGame([]), "p1", "Ana", K1).state
    s = removePlayer(s, "p1")
    expect(requestJoin({ ...s, autoAdmit: true }, "p1", "Ana", K1).outcome).toBe("removed")
  })

  it("lets a player rejoin after a reload, but only with their own key", () => {
    const s = lobbyWith("Ana")
    expect(requestJoin(s, "p0", "Ana", K1).outcome).toBe("rejoined")
    expect(requestJoin(s, "p0", "Mallory", K2).outcome).toBe("ignored")
  })

  it("cleans names and keeps them unique", () => {
    expect(cleanName("  A‮na\u0000  ")).toBe("Ana")
    expect(cleanName("")).toBe("Player")
    expect(cleanName("x".repeat(40))).toHaveLength(20)
    const s = lobbyWith("Ana", "Ana", "Ana")
    expect(Object.values(s.players).map((p) => p.name)).toEqual(["Ana", "Ana 2", "Ana 3"])
  })
})

describe("answering and scoring", () => {
  const start = (s: HostState) => startQuestion(s, 0, 10_000, 1000)

  it("gives 500-1000 points by speed and nothing for wrong answers", () => {
    expect(pointsFor(1000, 1000, 10_000)).toBe(1000)
    expect(pointsFor(6000, 1000, 10_000)).toBe(750)
    expect(pointsFor(11_000, 1000, 10_000)).toBe(500)
    let s = start(lobbyWith("Ana", "Ben"))
    s = submitAnswer(s, "p0", 1, 0, "2", 1000)
    s = submitAnswer(s, "p1", 1, 0, "3", 1000)
    s = reveal(s, "2")
    expect(s.players.p0.score).toBe(1000)
    expect(s.players.p1.score).toBe(0)
  })

  it("counts only the first answer", () => {
    let s = start(lobbyWith("Ana"))
    s = submitAnswer(s, "p0", 1, 0, "3", 2000)
    s = submitAnswer(s, "p0", 1, 0, "2", 2500)
    expect(reveal(s, "2").players.p0.score).toBe(0)
  })

  it("ignores answers from strangers, for other questions or rounds, and after time runs out", () => {
    let s = start(lobbyWith("Ana"))
    s = submitAnswer(s, "stranger", 1, 0, "2", 2000)
    s = submitAnswer(s, "p0", 1, 1, "2", 2000)
    s = submitAnswer(s, "p0", 0, 0, "2", 2000)
    s = submitAnswer(s, "p0", 1, 0, "2", 1000 + 10_000 + GRACE_MS + 1)
    expect(s.answers).toEqual({})
  })

  it("ignores answers that are not short strings", () => {
    let s = start(lobbyWith("Ana"))
    s = submitAnswer(s, "p0", 1, 0, { evil: true }, 2000)
    s = submitAnswer(s, "p0", 1, 0, "x".repeat(51), 2000)
    expect(s.answers).toEqual({})
  })

  it("ranks ties together and counts choices", () => {
    let s = start(lobbyWith("Ana", "Ben", "Cy"))
    s = submitAnswer(s, "p0", 1, 0, "2", 1000)
    s = submitAnswer(s, "p1", 1, 0, "2", 1000)
    s = submitAnswer(s, "p2", 1, 0, "4", 1000)
    expect(answerCounts(s, ["1", "2", "3", "4"])).toEqual([0, 2, 0, 1])
    s = reveal(s, "2")
    expect(standings(s).map((x) => [x.name, x.rank])).toEqual([["Ana", 1], ["Ben", 1], ["Cy", 3]])
  })

  it("starts a new round with the same players and zero scores", () => {
    let s = reveal(submitAnswer(start(lobbyWith("Ana")), "p0", 1, 0, "2", 1000), "2")
    s = newRound(endGame(s), ["m1"])
    expect(s.round).toBe(2)
    expect(s.players.p0.score).toBe(0)
    expect(submitAnswer(startQuestion(s, 0, 10_000, 0), "p0", 1, 0, "2", 10).answers).toEqual({})
  })
})
