import { describe, expect, it } from "vitest"
import { cleanCode, importKeys, isCode, isEnvelope, makeKeys, newCode, seal, verify } from "@/lib/classroom/protocol"

describe("signed messages", () => {
  it("verifies with the sender's key only", async () => {
    const host = await makeKeys()
    const other = await makeKeys()
    const env = await seal("host", { t: "admit", to: "p1", name: "Ana" }, host)
    expect(await verify(env, host.publicJwk)).toBe(true)
    expect(await verify(env, other.publicJwk)).toBe(false)
  })

  it("rejects a message changed after signing", async () => {
    const host = await makeKeys()
    const env = await seal("host", { t: "reject", to: "p1", reason: "declined" }, host)
    const forged = { ...env, body: { ...env.body, to: "p2" } }
    expect(await verify(forged, host.publicJwk)).toBe(false)
  })

  it("keeps working after keys are saved and restored", async () => {
    const k = await makeKeys()
    const again = await importKeys(k.publicJwk, k.privateJwk)
    expect(await verify(await seal("player", { t: "answer", pid: "p", round: 1, i: 0, choice: "2" }, again), k.publicJwk)).toBe(true)
  })

  it("drops junk before it reaches the game", () => {
    expect(isEnvelope(null)).toBe(false)
    expect(isEnvelope({ from: "admin", body: { t: "x" }, sig: "" })).toBe(false)
    expect(isEnvelope({ from: "host", body: { t: "x", pad: "y".repeat(30_000) }, sig: "" })).toBe(false)
    expect(isEnvelope({ from: "host", body: { t: "hello" }, sig: "abc" })).toBe(true)
  })
})

describe("game codes", () => {
  it("are 6 easy-to-read characters", () => {
    for (let i = 0; i < 200; i++) expect(isCode(newCode())).toBe(true)
    expect(cleanCode(" ab-c 23x ")).toBe("ABC23X")
    expect(isCode("ABC10I")).toBe(false)
  })
})
