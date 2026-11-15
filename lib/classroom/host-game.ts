// The teacher's browser runs the class game: these pure functions are its rules.
// Every function returns a new state and never trusts what players send.

export type Player = { name: string; key: JsonWebKey; score: number; correct: number; lastPoints: number; lastOk: boolean }
export type Pending = { pid: string; name: string; key: JsonWebKey }

export type HostState = {
  round: number
  phase: "lobby" | "question" | "reveal" | "end"
  autoAdmit: boolean
  locked: boolean
  pending: Pending[]
  players: Record<string, Player>
  removed: string[]
  questionIds: string[]
  index: number
  startedAt: number
  durationMs: number
  answers: Record<string, { choice: string; at: number }>
}

export type Standing = { pid: string; name: string; score: number; rank: number }

/** Answers that arrive this long after the timer hits zero still count (network delay). */
export const GRACE_MS = 1500
export const MAX_POINTS = 1000

export function createGame(questionIds: string[]): HostState {
  return {
    round: 1,
    phase: "lobby",
    autoAdmit: false,
    locked: false,
    pending: [],
    players: {},
    removed: [],
    questionIds,
    index: -1,
    startedAt: 0,
    durationMs: 0,
    answers: {},
  }
}

/** Trims, removes control characters and caps at 20 characters; empty names become "Player". */
export function cleanName(raw: unknown): string {
  const name = String(raw ?? "")
    .replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 20)
  return name || "Player"
}

function uniqueName(state: HostState, name: string): string {
  const taken = new Set([...Object.values(state.players).map((p) => p.name), ...state.pending.map((p) => p.name)])
  if (!taken.has(name)) return name
  for (let n = 2; ; n++) if (!taken.has(`${name} ${n}`)) return `${name} ${n}`
}

function addPlayer(state: HostState, p: Pending): HostState {
  const player: Player = { name: p.name, key: p.key, score: 0, correct: 0, lastPoints: 0, lastOk: false }
  return { ...state, pending: state.pending.filter((x) => x.pid !== p.pid), players: { ...state.players, [p.pid]: player } }
}

export type JoinOutcome = "admitted" | "pending" | "rejoined" | "locked" | "removed" | "ignored"

/** A join request. Known players rejoin; the key a pid first used is the only one accepted for it. */
export function requestJoin(state: HostState, pid: string, rawName: unknown, key: JsonWebKey): { state: HostState; outcome: JoinOutcome } {
  const known = state.players[pid] ?? state.pending.find((p) => p.pid === pid)
  if (known) {
    if (JSON.stringify(known.key) !== JSON.stringify(key)) return { state, outcome: "ignored" }
    return { state, outcome: state.players[pid] ? "rejoined" : "pending" }
  }
  if (state.removed.includes(pid)) return { state, outcome: "removed" }
  if (state.locked) return { state, outcome: "locked" }
  const p = { pid, name: uniqueName(state, cleanName(rawName)), key }
  if (state.autoAdmit) return { state: addPlayer(state, p), outcome: "admitted" }
  if (state.pending.length >= 200) return { state, outcome: "ignored" }
  return { state: { ...state, pending: [...state.pending, p] }, outcome: "pending" }
}

export function admit(state: HostState, pid: string): HostState {
  const p = state.pending.find((x) => x.pid === pid)
  return p ? addPlayer(state, p) : state
}

/** Declines a waiting player or removes a playing one; either way they can't come back with the same id. */
export function removePlayer(state: HostState, pid: string): HostState {
  const players = { ...state.players }
  delete players[pid]
  const answers = { ...state.answers }
  delete answers[pid]
  return { ...state, players, answers, pending: state.pending.filter((p) => p.pid !== pid), removed: [...state.removed, pid] }
}

export function startQuestion(state: HostState, index: number, durationMs: number, now: number): HostState {
  return { ...state, phase: "question", index, startedAt: now, durationMs, answers: {} }
}

export function acceptsAnswers(state: HostState, now: number): boolean {
  return state.phase === "question" && now <= state.startedAt + state.durationMs + GRACE_MS
}

/** Only the first answer from a current player, for the current question and round, in time, counts. */
export function submitAnswer(state: HostState, pid: string, round: number, index: number, choice: unknown, now: number): HostState {
  if (!state.players[pid] || round !== state.round || index !== state.index || !acceptsAnswers(state, now)) return state
  if (state.answers[pid] || typeof choice !== "string" || choice.length > 50) return state
  return { ...state, answers: { ...state.answers, [pid]: { choice, at: now } } }
}

/** Points for a correct answer: half for being right, half scaled by how much time was left. */
export function pointsFor(at: number, startedAt: number, durationMs: number): number {
  const left = Math.min(Math.max(1 - (at - startedAt) / durationMs, 0), 1)
  return Math.round(MAX_POINTS / 2 + (MAX_POINTS / 2) * left)
}

export function reveal(state: HostState, correctAnswer: string): HostState {
  if (state.phase !== "question") return state
  const players: Record<string, Player> = {}
  for (const [pid, p] of Object.entries(state.players)) {
    const a = state.answers[pid]
    const ok = a?.choice === correctAnswer
    const points = ok ? pointsFor(a.at, state.startedAt, state.durationMs) : 0
    players[pid] = { ...p, score: p.score + points, correct: p.correct + (ok ? 1 : 0), lastPoints: points, lastOk: ok }
  }
  return { ...state, phase: "reveal", players }
}

export function standings(state: HostState): Standing[] {
  const list = Object.entries(state.players)
    .map(([pid, p]) => ({ pid, name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
  // Equal scores share a place: 1, 2, 2, 4
  return list.map((s) => ({ ...s, rank: list.findIndex((x) => x.score === s.score) + 1 }))
}

export function endGame(state: HostState): HostState {
  return { ...state, phase: "end" }
}

/** A new round with the same class: scores reset, players stay, old answers can't be replayed. */
export function newRound(state: HostState, questionIds: string[]): HostState {
  const players = Object.fromEntries(
    Object.entries(state.players).map(([pid, p]) => [pid, { ...p, score: 0, correct: 0, lastPoints: 0, lastOk: false }]),
  )
  return { ...state, round: state.round + 1, phase: "lobby", players, questionIds, index: -1, answers: {} }
}

/** How many of each option were chosen, for the bar chart after a question. */
export function answerCounts(state: HostState, options: string[]): number[] {
  const counts = options.map(() => 0)
  for (const a of Object.values(state.answers)) {
    const i = options.indexOf(a.choice)
    if (i >= 0) counts[i]++
  }
  return counts
}
