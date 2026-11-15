import { isEnvelope, type Envelope } from "./protocol"

// Public by design: Supabase's publishable key only allows what the project's settings allow.
// Class games only use Realtime "broadcast" channels; nothing is stored.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://pafmnebyuwgsmvqvuhak.supabase.co"
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "sb_publishable_7qbE0anBzLysiEuGK2QeDQ_qBTJgGJY"

// Tests run several "devices" as tabs of one browser, talking over a BroadcastChannel.
const LOCAL = process.env.NEXT_PUBLIC_ROOM_TRANSPORT === "local"

export const classGamesAvailable = LOCAL || (SUPABASE_URL.startsWith("https://") && SUPABASE_KEY.length > 20)

export type RoomStatus = "connecting" | "connected" | "lost"

export type Room = { send: (env: Envelope) => void; close: () => void }

/** Joins the channel for one game code. Messages that aren't well-formed envelopes are dropped here. */
export async function openRoom(code: string, onMessage: (env: Envelope) => void, onStatus: (s: RoomStatus) => void): Promise<Room> {
  const deliver = (payload: unknown) => {
    if (isEnvelope(payload)) onMessage(payload)
  }

  if (LOCAL) {
    const bc = new BroadcastChannel(`matrix-match:${code}`)
    bc.onmessage = (e) => deliver(e.data)
    onStatus("connected")
    return { send: (env) => bc.postMessage(env), close: () => bc.close() }
  }

  const { RealtimeClient } = await import("@supabase/realtime-js")
  const client = new RealtimeClient(`${SUPABASE_URL.replace(/^http/, "ws")}/realtime/v1`, {
    params: { apikey: SUPABASE_KEY },
  })
  const channel = client.channel(`matrix-match:${code}`, { config: { broadcast: { self: false } } })
  channel.on("broadcast", { event: "m" }, ({ payload }) => deliver(payload))
  onStatus("connecting")
  channel.subscribe((status) => onStatus(status === "SUBSCRIBED" ? "connected" : status === "CLOSED" ? "lost" : status === "CHANNEL_ERROR" || status === "TIMED_OUT" ? "lost" : "connecting"))
  return {
    send: (env) => void channel.send({ type: "broadcast", event: "m", payload: env }),
    close: () => {
      void channel.unsubscribe()
      client.disconnect()
    },
  }
}
