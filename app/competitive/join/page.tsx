"use client"

import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Check, Trophy, X } from "lucide-react"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MatrixDisplay } from "@/components/ui/matrix-display"
import { useGame } from "@/lib/game-context"
import { useTranslation } from "@/lib/use-translation"
import { LoadingText, TILES, optionLabel } from "@/lib/quiz-ui"
import { playTone } from "@/lib/sound"
import { cleanCode, importKeys, isCode, makeKeys, publicPart, seal, verify, type Envelope, type HostMsg, type KeyPair, type Result, type Top } from "@/lib/classroom/protocol"
import { classGamesAvailable, openRoom, type Room, type RoomStatus } from "@/lib/classroom/transport"
import { findQuestion, questionText } from "@/lib/classroom/questions"

type View =
  | { v: "form" }
  | { v: "finding" }
  | { v: "asking" }
  | { v: "waiting" }
  | { v: "question"; round: number; i: number; qid: string; total: number; endsAt: number; chosen?: string }
  | { v: "reveal"; qid: string; answer: string; me?: Result; top: Top; chosen?: string }
  | { v: "end"; me?: Result; top: Top }
  | { v: "stopped"; reason: "noRoom" | "notLetIn" | "removedFromGame" | "roomClosed" | "roomLocked" | "twoHosts" }

// Each tab is its own player; a reload keeps the same id and key so the host lets it straight back in.
type Seat = { code: string; pid: string; name: string; pub: JsonWebKey; priv: JsonWebKey; host?: JsonWebKey }
const SEAT = "matrix-match-seat"

function JoinGame() {
  const t = useTranslation()
  const { gameSettings } = useGame()
  const params = useSearchParams()
  const [code, setCode] = useState(() => cleanCode(params.get("code") ?? ""))
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [view, setView] = useState<View>({ v: "form" })
  const [status, setStatus] = useState<RoomStatus>("connecting")
  const [stale, setStale] = useState(false)
  const [now, setNow] = useState(() => Date.now())

  const seat = useRef<Seat | null>(null)
  const keys = useRef<KeyPair | null>(null)
  const room = useRef<Room | null>(null)
  const lastHost = useRef(0)
  const viewRef = useRef<View>(view)
  // Who and where, for display (refs can't be read while rendering)
  const [me, setMe] = useState<{ name: string; code: string } | null>(null)

  useEffect(() => {
    viewRef.current = view
  }, [view])

  const sound = (kind: "correct" | "wrong") => gameSettings.soundEnabled && playTone(kind)

  const sendJoin = useCallback(async () => {
    const s = seat.current
    if (s && keys.current && room.current)
      room.current.send(await seal("player", { t: "join", pid: s.pid, name: s.name, key: s.pub }, keys.current))
  }, [])

  const save = () => {
    if (seat.current) setMe({ name: seat.current.name, code: seat.current.code })
    try {
      sessionStorage.setItem(SEAT, JSON.stringify(seat.current))
    } catch {}
  }

  const stop = useCallback((reason: Extract<View, { v: "stopped" }>["reason"]) => {
    room.current?.close()
    room.current = null
    try {
      sessionStorage.removeItem(SEAT)
    } catch {}
    setView({ v: "stopped", reason })
  }, [])

  const onHost = useCallback(
    async (env: Envelope) => {
      const s = seat.current
      if (env.from !== "host" || !s) return
      const body = env.body as HostMsg
      // The first host heard is trusted for this game; anyone else claiming to host is a red flag.
      if (body.t === "hello") {
        if (!body.key || !(await verify(env, body.key))) return
        if (!s.host) {
          s.host = publicPart(body.key)
          save()
          setView((v) => (v.v === "finding" ? { v: "asking" } : v))
          void sendJoin()
        } else if (JSON.stringify(s.host) !== JSON.stringify(publicPart(body.key))) {
          stop("twoHosts")
          return
        }
        lastHost.current = Date.now()
        return
      }
      if (!s.host || !(await verify(env, s.host))) return
      if ("to" in body && body.to && body.to !== s.pid) return
      lastHost.current = Date.now()

      switch (body.t) {
        case "admit":
          s.name = body.name
          save()
          setView((v) => (v.v === "asking" ? { v: "waiting" } : v))
          break
        case "reject":
          stop(body.reason === "locked" ? "roomLocked" : body.reason === "removed" ? "removedFromGame" : "notLetIn")
          break
        case "lobby":
          setView({ v: "waiting" })
          break
        case "question":
          setView((v) =>
            v.v === "question" && v.i === body.i && v.round === body.round
              ? v
              : { v: "question", round: body.round, i: body.i, qid: body.qid, total: body.total, endsAt: Date.now() + body.endsIn },
          )
          break
        case "reveal": {
          const me = body.results[s.pid]
          const prev = viewRef.current
          setView({ v: "reveal", qid: body.qid, answer: body.answer, me, top: body.top, chosen: prev.v === "question" ? prev.chosen : undefined })
          if (me) sound(me.ok ? "correct" : "wrong")
          if (me?.ok) confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
          break
        }
        case "end": {
          const me = body.results[s.pid]
          setView({ v: "end", me, top: body.top })
          if (me && me.rank <= 3) confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } })
          break
        }
        case "closed":
          stop("roomClosed")
          break
      }
    },
    [sendJoin, stop], // eslint-disable-line react-hooks/exhaustive-deps
  )

  const connect = useCallback(
    async (s: Seat) => {
      seat.current = s
      keys.current = await importKeys(s.pub, s.priv)
      save()
      setView({ v: "finding" })
      room.current = await openRoom(s.code, (env) => void onHost(env), setStatus)
      if (s.host) {
        setView({ v: "asking" })
        void sendJoin()
      }
    },
    [onHost, sendJoin],
  )

  // Coming back to this tab after a reload: rejoin the same game.
  useEffect(() => {
    if (!classGamesAvailable) return
    try {
      const saved: Seat | null = JSON.parse(sessionStorage.getItem(SEAT) || "null")
      if (saved && isCode(saved.code)) void connect(saved) // eslint-disable-line react-hooks/set-state-in-effect
    } catch {}
    return () => room.current?.close()
  }, [connect])

  // Keep asking while waiting (the host may have missed it), give up if no game answers,
  // and say so when the host goes quiet.
  useEffect(() => {
    const timer = setInterval(() => {
      const v = viewRef.current.v
      if (v === "asking") void sendJoin()
      if (v === "finding" && !seat.current?.host) stop("noRoom")
      setStale(lastHost.current > 0 && Date.now() - lastHost.current > 10_000)
    }, 8000)
    return () => clearInterval(timer)
  }, [sendJoin, stop])

  useEffect(() => {
    if (view.v !== "question") return
    const tick = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(tick)
  }, [view.v])

  const join = async () => {
    const c = cleanCode(code)
    if (!isCode(c)) return setError(t("noRoom"))
    if (!name.trim()) return setError(t("enterNameFirst"))
    setError("")
    const k = await makeKeys()
    await connect({ code: c, pid: crypto.randomUUID(), name: name.trim().slice(0, 20), pub: k.publicJwk, priv: k.privateJwk })
  }

  const answer = async (choice: string) => {
    const v = viewRef.current
    const s = seat.current
    if (v.v !== "question" || v.chosen || !s || !keys.current || !room.current) return
    // Updated right away so a fast second tap can't send another answer
    viewRef.current = { ...v, chosen: choice }
    setView(viewRef.current)
    room.current.send(await seal("player", { t: "answer", pid: s.pid, round: v.round, i: v.i, choice }, keys.current))
  }

  // Number keys 1-4 answer, like solo mode
  useEffect(() => {
    if (view.v !== "question" || view.chosen) return
    const q = findQuestion(view.qid)
    const onKey = (e: KeyboardEvent) => {
      const i = Number(e.key) - 1
      if (q && i >= 0 && i < q.options.length) void answer(q.options[i])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  if (!classGamesAvailable) return <Card t={t}><p className="text-lg font-bold">{t("classNotSetUp")}</p></Card>

  const banner = (stale || status === "lost") && view.v !== "form" && view.v !== "stopped" && (
    <p role="status" className="fixed top-2 inset-x-2 mx-auto max-w-md z-50 text-center px-4 py-2 rounded-full bg-yellow-200 border-2 border-black font-bold">
      {t("connectionLost")}
    </p>
  )

  if (view.v === "form" || view.v === "stopped")
    return (
      <Card t={t}>
        <h1 className="text-3xl font-black">{t("joinClass")}</h1>
        {view.v === "stopped" && (
          <p role="alert" className="p-3 rounded-xl border-2 border-red-500 bg-red-50 font-bold text-red-800">
            {t(view.reason)}
          </p>
        )}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            void join()
          }}
        >
          <div>
            <label htmlFor="code" className="block font-bold text-lg mb-2">
              {t("roomCode")}
            </label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(cleanCode(e.target.value))}
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              placeholder="ABC234"
              className="border-4 border-black text-3xl h-16 font-black tracking-[0.3em] text-center uppercase"
            />
          </div>
          <div>
            <label htmlFor="name" className="block font-bold text-lg mb-2">
              {t("yourName")}
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              autoComplete="nickname"
              placeholder={t("enterYourName")}
              className="border-4 border-black text-xl h-14 font-bold"
            />
          </div>
          {error && (
            <p role="alert" className="font-bold text-red-700">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full h-14 text-xl font-black border-4 border-black bg-blue-700 hover:bg-blue-800 text-white">
            {t("join")}
          </Button>
        </form>
      </Card>
    )

  if (view.v === "finding" || view.v === "asking" || view.v === "waiting")
    return (
      <Card t={t} wide={false}>
        {banner}
        <div className="text-center space-y-4 py-6" role="status">
          <p className="text-5xl" aria-hidden="true">{view.v === "waiting" ? "🎉" : "⏳"}</p>
          <p className="text-2xl font-black">{view.v === "finding" ? t("connecting") : view.v === "asking" ? t("askingToJoin") : t("youreIn")}</p>
          {me && <p className="font-bold text-muted-foreground">{me.name} · {me.code}</p>}
        </div>
      </Card>
    )

  if (view.v === "question") {
    const q = findQuestion(view.qid)
    if (!q) return <Card t={t}><LoadingText className="font-bold" /></Card>
    const secondsLeft = Math.max(Math.ceil((view.endsAt - now) / 1000), 0)
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-red-600 flex flex-col">
        {banner}
        <div className="bg-white border-b-4 border-black p-3 flex items-center justify-between font-bold">
          <span>{me?.name}</span>
          <span>
            {t("question")} {view.i + 1}/{view.total}
          </span>
          <span className="text-2xl font-black tabular-nums" aria-label={`${secondsLeft}s`}>
            {secondsLeft}
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white border-4 border-black rounded-2xl p-6 space-y-6">
            <h1 className="text-2xl md:text-4xl font-black text-center">{questionText(q, gameSettings.language)}</h1>
            {q.matrix && (
              <div className="flex justify-center">
                <MatrixDisplay data={q.matrix} />
              </div>
            )}
            {view.chosen ? (
              <p role="status" className="text-center text-2xl font-black py-6">
                {t("answerLocked")}
              </p>
            ) : secondsLeft === 0 ? (
              <p role="status" className="text-center text-2xl font-black py-6">
                {t("timesUp")}
              </p>
            ) : (
              <div className={`grid gap-3 ${q.options.length === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
                {q.options.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => void answer(opt)}
                    className={`${TILES[i].className} flex items-center gap-4 rounded-xl border-4 border-black p-5 text-start text-2xl md:text-3xl font-black text-white shadow-[4px_4px_0_0_#000] hover:-translate-y-1 active:translate-y-0 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black`}
                  >
                    <span aria-hidden="true">{TILES[i].shape}</span>
                    <span className="flex-1">{optionLabel(opt, t)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    )
  }

  if (view.v === "reveal")
    return (
      <Card t={t} wide={false}>
        {banner}
        <div className={`text-center space-y-3 p-6 rounded-xl border-4 ${view.me?.ok ? "border-green-600 bg-green-50" : "border-red-600 bg-red-50"}`} role="status">
          {view.me?.ok ? <Check className="w-16 h-16 mx-auto text-green-700" aria-hidden="true" /> : <X className="w-16 h-16 mx-auto text-red-700" aria-hidden="true" />}
          <p className="text-3xl font-black">{view.me?.ok ? t("correct2") : view.chosen ? t("wrong") : t("timesUp")}</p>
          {view.me?.ok ? (
            <p className="text-xl font-bold">+{view.me.points} {t("points")}</p>
          ) : (
            <p className="text-lg font-bold">
              {t("correctWas")}: {optionLabel(view.answer, t)}
            </p>
          )}
          {view.me && (
            <p className="font-bold">
              {t("yourPlace")}: #{view.me.rank} · {view.me.score.toLocaleString()} {t("points")}
            </p>
          )}
        </div>
        <TopList top={view.top} t={t} />
      </Card>
    )

  return (
    <Card t={t} wide={false}>
      {banner}
      <div className="text-center space-y-3">
        <Trophy className="w-20 h-20 mx-auto text-yellow-500 fill-yellow-400" aria-hidden="true" />
        <h1 className="text-4xl font-black">{t("gameOver")}</h1>
        {view.me && (
          <p className="text-2xl font-black">
            {t("yourPlace")}: #{view.me.rank} · {view.me.score.toLocaleString()} {t("points")}
          </p>
        )}
      </div>
      <TopList top={view.top} t={t} />
      <Link href="/competitive" className="block text-center w-full rounded-xl border-4 border-black bg-white py-3 font-black text-lg hover:bg-gray-100">
        {t("backToLobby")}
      </Link>
    </Card>
  )
}

function TopList({ top, t }: { top: Top; t: (k: string) => string }) {
  if (!top.length) return null
  return (
    <div>
      <h2 className="font-black text-xl mb-2">{t("leaderboard")}</h2>
      <ol className="space-y-2">
        {top.map((p, i) => (
          <li key={i} className="flex items-center gap-3 p-2 rounded-xl border-2 border-gray-300">
            <span className="w-6 text-center font-black">{i + 1}</span>
            <span className="flex-1 font-bold break-all">{p.name}</span>
            <span className="font-black tabular-nums">{p.score.toLocaleString()}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Card({ children, t, wide = true }: { children: React.ReactNode; t: (k: string) => string; wide?: boolean }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-red-600 flex items-center justify-center p-4">
      <div className={`w-full ${wide ? "max-w-xl" : "max-w-md"} bg-white border-4 border-black rounded-2xl p-6 md:p-8 space-y-6`}>
        <Link href="/competitive" className="inline-flex items-center gap-2 font-bold rounded-full border-2 border-black px-4 py-2 bg-white hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5 rtl:rotate-180" aria-hidden="true" /> {t("goBack")}
        </Link>
        {children}
      </div>
    </main>
  )
}

export default function JoinPage() {
  return (
    <Suspense fallback={null}>
      <JoinGame />
    </Suspense>
  )
}
