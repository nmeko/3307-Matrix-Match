"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Copy, Lock, Trophy, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MatrixDisplay } from "@/components/ui/matrix-display"
import { useGame } from "@/lib/game-context"
import { useTranslation } from "@/lib/use-translation"
import { TILES, optionLabel } from "@/lib/quiz-ui"
import {
  admit, answerCounts, createGame, endGame, newRound, removePlayer, requestJoin, reveal, standings, startQuestion,
  submitAnswer, GRACE_MS, type HostState, type Standing,
} from "@/lib/classroom/host-game"
import { importKeys, makeKeys, newCode, publicPart, seal, verify, type Envelope, type HostMsg, type KeyPair, type Result } from "@/lib/classroom/protocol"
import { classGamesAvailable, openRoom, type Room, type RoomStatus } from "@/lib/classroom/transport"
import { CLASS_DIFFICULTIES, findQuestion, pickQuestions, questionText, type ClassDifficulty } from "@/lib/classroom/questions"

const SAVE = "matrix-match-host"
type Saved = { code: string; difficulty: ClassDifficulty; pub: JsonWebKey; priv: JsonWebKey; state: HostState }

function loadSaved(): Saved | null {
  try {
    return JSON.parse(sessionStorage.getItem(SAVE) || "null")
  } catch {
    return null
  }
}

function resultsOf(s: HostState): { results: Record<string, Result>; top: { name: string; score: number }[]; list: Standing[] } {
  const list = standings(s)
  const results: Record<string, Result> = {}
  for (const st of list) {
    const p = s.players[st.pid]
    results[st.pid] = { ok: p.lastOk, points: p.lastPoints, score: st.score, rank: st.rank }
  }
  return { results, top: list.slice(0, 5).map(({ name, score }) => ({ name, score })), list }
}

export default function HostPage() {
  const t = useTranslation()
  const { gameSettings } = useGame()
  const [difficulty, setDifficulty] = useState<ClassDifficulty>("easy")
  const [code, setCode] = useState<string | null>(null)
  const [state, setState] = useState<HostState | null>(null)
  const [status, setStatus] = useState<RoomStatus>("connecting")
  const [now, setNow] = useState(() => Date.now())
  const [copied, setCopied] = useState(false)

  const stateRef = useRef<HostState | null>(null)
  const keysRef = useRef<KeyPair | null>(null)
  const roomRef = useRef<Room | null>(null)
  const meta = useRef<{ code: string; difficulty: ClassDifficulty } | null>(null)

  const send = useCallback(async (body: HostMsg) => {
    if (keysRef.current && roomRef.current) roomRef.current.send(await seal("host", body, keysRef.current))
  }, [])

  const commit = useCallback((next: HostState) => {
    stateRef.current = next
    setState(next)
    const k = keysRef.current
    if (k && meta.current) {
      const saved: Saved = { ...meta.current, pub: k.publicJwk, priv: k.privateJwk, state: next }
      try {
        sessionStorage.setItem(SAVE, JSON.stringify(saved))
      } catch {}
    }
  }, [])

  /** Tells one player (or everyone) what's happening now: used after joins, rejoins and every step. */
  const syncMsg = useCallback((s: HostState, to?: string): HostMsg => {
    const qid = s.questionIds[s.index]
    if (s.phase === "question")
      return { t: "question", round: s.round, i: s.index, qid, total: s.questionIds.length, endsIn: Math.max(s.startedAt + s.durationMs - Date.now(), 0), to }
    if (s.phase === "reveal") {
      const { results, top } = resultsOf(s)
      return { t: "reveal", i: s.index, qid, answer: findQuestion(qid)?.answer ?? "", results, top, to }
    }
    if (s.phase === "end") {
      const { results, top } = resultsOf(s)
      return { t: "end", results, top, to }
    }
    return { t: "lobby", to }
  }, [])

  const doReveal = useCallback(() => {
    const s = stateRef.current
    if (!s || s.phase !== "question") return
    const next = reveal(s, findQuestion(s.questionIds[s.index])?.answer ?? "")
    commit(next)
    void send(syncMsg(next))
  }, [commit, send, syncMsg])

  const onMessage = useCallback(
    async (env: Envelope) => {
      if (env.from !== "player") return
      const body = env.body
      if (body.t === "join") {
        if (typeof body.pid !== "string" || body.pid.length > 64 || !body.key || !(await verify(env, body.key))) return
        const s = stateRef.current
        if (!s) return
        const { state: next, outcome } = requestJoin(s, body.pid, body.name, publicPart(body.key))
        if (next !== s) commit(next)
        if (outcome === "admitted" || outcome === "rejoined") {
          await send({ t: "admit", to: body.pid, name: next.players[body.pid].name })
          await send(syncMsg(next, body.pid))
        } else if (outcome === "locked" || outcome === "removed") {
          await send({ t: "reject", to: body.pid, reason: outcome })
        }
      } else if (body.t === "answer") {
        const s = stateRef.current
        const player = s?.players[body.pid]
        if (!s || !player || !(await verify(env, player.key))) return
        const next = submitAnswer(stateRef.current!, body.pid, body.round, body.i, body.choice, Date.now())
        if (next === stateRef.current) return
        commit(next)
        // Everyone has answered: no need to wait for the clock
        if (Object.keys(next.answers).length >= Object.keys(next.players).length) doReveal()
      }
    },
    [commit, doReveal, send, syncMsg],
  )

  const connect = useCallback(
    async (c: string, keys: KeyPair, s: HostState, d: ClassDifficulty) => {
      keysRef.current = keys
      meta.current = { code: c, difficulty: d }
      commit(s)
      setCode(c)
      setDifficulty(d)
      roomRef.current = await openRoom(c, (env) => void onMessage(env), setStatus)
    },
    [commit, onMessage],
  )

  // A reload (or an accidental refresh mid-lesson) picks the game back up from this tab's storage.
  useEffect(() => {
    const saved = loadSaved()
    if (!saved || !classGamesAvailable) return
    void importKeys(saved.pub, saved.priv).then((keys) => connect(saved.code, keys, saved.state, saved.difficulty))
    return () => roomRef.current?.close()
  }, [connect])

  // "hello" every 3 seconds lets students find the game and notice if the host disappears.
  useEffect(() => {
    if (!code) return
    const hello = () => {
      const s = stateRef.current
      if (s && keysRef.current) void send({ t: "hello", key: keysRef.current.publicJwk, phase: s.phase, locked: s.locked })
    }
    hello()
    const timer = setInterval(hello, 3000)
    return () => clearInterval(timer)
  }, [code, send, status])

  // Countdown display, and reveal when time (plus a little network grace) runs out.
  useEffect(() => {
    if (state?.phase !== "question") return
    const tick = setInterval(() => setNow(Date.now()), 250)
    const end = setTimeout(doReveal, Math.max(state.startedAt + state.durationMs + GRACE_MS - Date.now(), 0))
    return () => {
      clearInterval(tick)
      clearTimeout(end)
    }
  }, [state?.phase, state?.startedAt, state?.durationMs, doReveal])

  const create = async () => {
    await connect(newCode(), await makeKeys(), createGame(pickQuestions(difficulty)), difficulty)
  }

  const goTo = (index: number) => {
    const s = stateRef.current!
    if (index >= s.questionIds.length) {
      const next = endGame(s)
      commit(next)
      void send(syncMsg(next))
      return
    }
    const q = findQuestion(s.questionIds[index])!
    const next = startQuestion(s, index, q.time * 1000, Date.now())
    commit(next)
    void send(syncMsg(next))
  }

  const update = (fn: (s: HostState) => HostState, after?: (s: HostState) => void) => {
    const next = fn(stateRef.current!)
    commit(next)
    after?.(next)
  }

  const closeGame = async () => {
    await send({ t: "closed" })
    roomRef.current?.close()
    try {
      sessionStorage.removeItem(SAVE)
    } catch {}
    window.location.href = window.location.pathname.replace(/host\/?$/, "")
  }

  if (!classGamesAvailable) {
    return (
      <Shell t={t}>
        <p className="text-lg font-bold">{t("classNotSetUp")}</p>
      </Shell>
    )
  }

  // Step 1: pick a difficulty
  if (!code || !state) {
    return (
      <Shell t={t}>
        <h1 className="text-3xl font-black">{t("hostClass")}</h1>
        <p className="text-muted-foreground font-medium">{t("hostDesc")}</p>
        <fieldset>
          <legend className="font-bold text-lg mb-3">{t("selectDifficulty")}</legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CLASS_DIFFICULTIES.map((d) => (
              <button
                key={d}
                aria-pressed={difficulty === d}
                onClick={() => setDifficulty(d)}
                className={`p-4 rounded-xl border-4 font-bold text-lg transition-all ${difficulty === d ? "border-black bg-black text-white" : "border-gray-400 bg-white hover:border-black"}`}
              >
                {t(d)}
              </button>
            ))}
          </div>
        </fieldset>
        <Button onClick={create} className="w-full h-14 text-xl font-black border-4 border-black bg-purple-700 hover:bg-purple-800 text-white">
          {t("createGame")}
        </Button>
      </Shell>
    )
  }

  const joinUrl = `${window.location.origin}${window.location.pathname.replace(/host\/?$/, "join/")}?code=${code}`
  const players = Object.entries(state.players)
  const q = state.index >= 0 ? findQuestion(state.questionIds[state.index]) : undefined
  const { list } = resultsOf(state)

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-red-600 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3 bg-white border-4 border-black rounded-2xl p-4">
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">{t("roomCode")}</p>
            <p className="text-4xl md:text-5xl font-black tracking-[0.2em]" aria-live="polite">
              {code}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {status !== "connected" && (
              <span role="status" className="px-3 py-1 rounded-full bg-yellow-200 font-bold text-sm">
                {status === "lost" ? t("connectionLost") : t("connecting")}
              </span>
            )}
            <span className="flex items-center gap-1 px-3 py-2 rounded-full bg-blue-100 font-bold">
              <Users className="w-5 h-5" aria-hidden="true" /> {players.length} {t("players")}
            </span>
            <Button variant="outline" onClick={closeGame} className="h-11 border-2 border-black bg-white text-black font-bold">
              <X className="w-5 h-5" aria-hidden="true" /> {t("endGame")}
            </Button>
          </div>
        </header>

        {state.phase === "lobby" && (
          <section className="bg-white border-4 border-black rounded-2xl p-6 space-y-6">
            <div>
              <p className="font-bold">{t("studentsJoinAt")}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <code className="px-3 py-2 bg-gray-100 rounded-lg break-all text-sm">{joinUrl}</code>
                <Button
                  variant="outline"
                  className="h-10 border-2 border-black bg-white text-black font-bold"
                  onClick={() => {
                    void navigator.clipboard?.writeText(joinUrl).then(() => {
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    })
                  }}
                >
                  <Copy className="w-4 h-4" aria-hidden="true" /> {copied ? t("copied") : t("copyLink")}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t("onlyHostSees")}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2 font-bold cursor-pointer">
                <input type="checkbox" className="w-5 h-5" checked={state.autoAdmit} onChange={(e) => update((s) => ({ ...s, autoAdmit: e.target.checked }))} />
                {t("letEveryoneIn")}
              </label>
              <label className="flex items-center gap-2 font-bold cursor-pointer">
                <input type="checkbox" className="w-5 h-5" checked={state.locked} onChange={(e) => update((s) => ({ ...s, locked: e.target.checked }))} />
                <Lock className="w-4 h-4" aria-hidden="true" /> {t("lockRoom")}
              </label>
            </div>

            {state.pending.length > 0 && (
              <div>
                <h2 className="font-black text-xl mb-2">
                  {t("waitingToJoin")} ({state.pending.length})
                </h2>
                <ul className="space-y-2">
                  {state.pending.map((p) => (
                    <li key={p.pid} className="flex items-center justify-between gap-2 p-3 rounded-xl border-2 border-yellow-500 bg-yellow-50">
                      <span className="font-bold break-all">{p.name}</span>
                      <span className="flex gap-2 shrink-0">
                        <Button
                          className="h-10 bg-green-700 hover:bg-green-800 text-white font-bold"
                          onClick={() =>
                            update(
                              (s) => admit(s, p.pid),
                              (s) => {
                                void send({ t: "admit", to: p.pid, name: s.players[p.pid].name }).then(() => send(syncMsg(s, p.pid)))
                              },
                            )
                          }
                        >
                          <Check className="w-4 h-4" aria-hidden="true" /> {t("admit")}
                        </Button>
                        <Button
                          variant="outline"
                          className="h-10 border-2 border-black bg-white text-black font-bold"
                          onClick={() => update((s) => removePlayer(s, p.pid), () => void send({ t: "reject", to: p.pid, reason: "declined" }))}
                        >
                          {t("decline")}
                        </Button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="font-black text-xl mb-2">{t("players")}</h2>
              {players.length === 0 ? (
                <p className="text-muted-foreground font-medium">{t("noPlayersYet")}</p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {players.map(([pid, p]) => (
                    <li key={pid} className="flex items-center gap-1 ps-3 pe-1 py-1 rounded-full bg-blue-100 border-2 border-blue-300 font-bold">
                      <span className="break-all">{p.name}</span>
                      <button
                        aria-label={`${t("remove")} ${p.name}`}
                        onClick={() => update((s) => removePlayer(s, pid), () => void send({ t: "reject", to: pid, reason: "removed" }))}
                        className="p-1.5 rounded-full hover:bg-blue-200"
                      >
                        <X className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Button
              disabled={players.length === 0}
              onClick={() => goTo(0)}
              className="w-full h-14 text-xl font-black border-4 border-black bg-green-700 hover:bg-green-800 text-white"
            >
              {t("startForEveryone")} ({state.questionIds.length} {t("questions")} · {t(difficulty)})
            </Button>
          </section>
        )}

        {(state.phase === "question" || state.phase === "reveal") && q && (
          <section className="bg-white border-4 border-black rounded-2xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 font-bold">
              <span>
                {t("question")} {state.index + 1}/{state.questionIds.length}
              </span>
              {state.phase === "question" ? (
                <span className="flex items-center gap-4">
                  <span aria-live="polite">
                    {Object.keys(state.answers).length}/{players.length} {t("answered")}
                  </span>
                  <span className="text-3xl font-black tabular-nums" aria-hidden="true">
                    {Math.max(Math.ceil((state.startedAt + state.durationMs - now) / 1000), 0)}
                  </span>
                </span>
              ) : null}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-center">{questionText(q, gameSettings.language)}</h2>
            {q.matrix && (
              <div className="flex justify-center">
                <MatrixDisplay data={q.matrix} />
              </div>
            )}
            <ul className={`grid gap-3 ${q.options.length === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
              {q.options.map((opt, i) => {
                const counts = answerCounts(state, q.options)
                const right = state.phase === "reveal" && opt === q.answer
                const faded = state.phase === "reveal" && !right
                return (
                  <li
                    key={opt}
                    className={`${TILES[i].className} ${faded ? "opacity-40" : ""} flex items-center gap-4 rounded-xl border-4 border-black p-5 text-2xl md:text-3xl font-black text-white`}
                  >
                    <span aria-hidden="true">{TILES[i].shape}</span>
                    <span className="flex-1">{optionLabel(opt, t)}</span>
                    {state.phase === "reveal" && (
                      <span className="flex items-center gap-2">
                        {right && <Check className="w-8 h-8" aria-label={t("correct")} />}
                        <span className="text-xl">{counts[i]}</span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
            {state.phase === "question" ? (
              <Button onClick={doReveal} className="w-full h-12 text-lg font-bold border-2 border-black">
                {t("showAnswer")}
              </Button>
            ) : (
              <>
                <Leaderboard list={list.slice(0, 5)} t={t} />
                <Button onClick={() => goTo(state.index + 1)} className="w-full h-14 text-xl font-black border-4 border-black bg-green-700 hover:bg-green-800 text-white">
                  {state.index + 1 < state.questionIds.length ? t("next") : t("seeResults")}
                </Button>
              </>
            )}
          </section>
        )}

        {state.phase === "end" && (
          <section className="bg-white border-4 border-black rounded-2xl p-6 space-y-6 text-center">
            <Trophy className="w-20 h-20 mx-auto text-yellow-500 fill-yellow-400" aria-hidden="true" />
            <h2 className="text-4xl font-black">{t("classRanks")}</h2>
            <Leaderboard list={list} t={t} />
            <Button
              onClick={() => update((s) => newRound(s, pickQuestions(difficulty)), (s) => void send(syncMsg(s)))}
              className="w-full h-14 text-xl font-black border-4 border-black bg-purple-700 hover:bg-purple-800 text-white"
            >
              {t("newRound")}
            </Button>
          </section>
        )}
      </div>
    </main>
  )
}

function Leaderboard({ list, t }: { list: Standing[]; t: (k: string) => string }) {
  return (
    <div className="text-start">
      <h3 className="font-black text-xl mb-2">{t("leaderboard")}</h3>
      <ol className="space-y-2">
        {list.map((s) => (
          <li key={s.pid} className={`flex items-center gap-3 p-3 rounded-xl border-2 ${s.rank === 1 ? "border-yellow-500 bg-yellow-50" : "border-gray-300"}`}>
            <span className="w-8 text-center font-black text-xl">{s.rank}</span>
            <span className="flex-1 font-bold break-all">{s.name}</span>
            <span className="font-black tabular-nums">{s.score.toLocaleString()}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Shell({ children, t }: { children: React.ReactNode; t: (k: string) => string }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-red-600 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white border-4 border-black rounded-2xl p-6 md:p-8 space-y-6 relative">
        <Link
          href="/competitive"
          aria-label={t("goBack")}
          className="inline-flex items-center gap-2 font-bold rounded-full border-2 border-black px-4 py-2 bg-white hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 rtl:rotate-180" aria-hidden="true" /> {t("goBack")}
        </Link>
        {children}
      </div>
    </main>
  )
}
