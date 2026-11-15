// Messages between the teacher's browser (host) and students' browsers, and how they're signed.
// Anyone with a game code can listen on its channel, so every message is signed: students pin the
// host's key from its first "hello", and the host pins each student's key from their join request.

export type Result = { ok: boolean; points: number; score: number; rank: number }
export type Top = { name: string; score: number }[]

export type HostMsg =
  | { t: "hello"; key: JsonWebKey; phase: string; locked: boolean }
  | { t: "admit"; to: string; name: string }
  | { t: "reject"; to: string; reason: "declined" | "locked" | "removed" }
  | { t: "question"; round: number; i: number; qid: string; total: number; endsIn: number; to?: string }
  | { t: "reveal"; i: number; qid: string; answer: string; results: Record<string, Result>; top: Top; to?: string }
  | { t: "lobby"; to?: string }
  | { t: "end"; results: Record<string, Result>; top: Top; to?: string }
  | { t: "closed" }

export type PlayerMsg =
  | { t: "join"; pid: string; name: string; key: JsonWebKey }
  | { t: "answer"; pid: string; round: number; i: number; choice: string }

export type Envelope = { from: "host" | "player"; body: HostMsg | PlayerMsg; sig: string }

const ALG = { name: "ECDSA", namedCurve: "P-256" } as const
const SIGN = { name: "ECDSA", hash: "SHA-256" } as const
const enc = new TextEncoder()

export type KeyPair = { privateKey: CryptoKey; publicJwk: JsonWebKey; privateJwk: JsonWebKey }

export async function makeKeys(): Promise<KeyPair> {
  const pair = await crypto.subtle.generateKey(ALG, true, ["sign", "verify"])
  return {
    privateKey: pair.privateKey,
    publicJwk: await crypto.subtle.exportKey("jwk", pair.publicKey),
    privateJwk: await crypto.subtle.exportKey("jwk", pair.privateKey),
  }
}

/** Restores keys saved in this tab, so a reload rejoins the same game as the same player or host. */
export async function importKeys(publicJwk: JsonWebKey, privateJwk: JsonWebKey): Promise<KeyPair> {
  const privateKey = await crypto.subtle.importKey("jwk", privateJwk, ALG, true, ["sign"])
  return { privateKey, publicJwk, privateJwk }
}

/** Only the public parts of a key are compared and sent. */
export function publicPart(k: JsonWebKey): JsonWebKey {
  return { kty: k.kty, crv: k.crv, x: k.x, y: k.y }
}

const b64 = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf)))
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))

export async function seal(from: Envelope["from"], body: Envelope["body"], keys: KeyPair): Promise<Envelope> {
  const sig = await crypto.subtle.sign(SIGN, keys.privateKey, enc.encode(JSON.stringify(body)))
  return { from, body, sig: b64(sig) }
}

export async function verify(env: Envelope, key: JsonWebKey): Promise<boolean> {
  try {
    const pub = await crypto.subtle.importKey("jwk", publicPart(key), ALG, false, ["verify"])
    return await crypto.subtle.verify(SIGN, pub, unb64(env.sig), enc.encode(JSON.stringify(env.body)))
  } catch {
    return false
  }
}

/** Rough shape check before anything else touches a message from the network. */
export function isEnvelope(x: unknown): x is Envelope {
  const e = x as Envelope
  return (
    !!e && (e.from === "host" || e.from === "player") && typeof e.sig === "string" && e.sig.length < 200 &&
    !!e.body && typeof e.body === "object" && typeof (e.body as { t?: unknown }).t === "string" &&
    JSON.stringify(e.body).length < 20_000
  )
}

// No 0/O or 1/I/L, so codes read cleanly off a projector.
const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"

export function newCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6))
  return Array.from(bytes, (b) => CODE_CHARS[b % CODE_CHARS.length]).join("")
}

export function cleanCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)
}

export const isCode = (s: string) => /^[A-HJ-KM-NP-Z2-9]{6}$/.test(s)
