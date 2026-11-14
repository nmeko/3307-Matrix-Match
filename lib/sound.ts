// Short feedback tones made with the Web Audio API, so the game ships no audio files.
let ctx: AudioContext | null = null

export function playTone(kind: "correct" | "wrong") {
  if (typeof window === "undefined") return
  try {
    ctx ??= new AudioContext()
    const notes = kind === "correct" ? [660, 880] : [220, 180]
    notes.forEach((freq, i) => {
      const osc = ctx!.createOscillator()
      const gain = ctx!.createGain()
      const start = ctx!.currentTime + i * 0.12
      osc.type = kind === "correct" ? "triangle" : "square"
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.15, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18)
      osc.connect(gain).connect(ctx!.destination)
      osc.start(start)
      osc.stop(start + 0.2)
    })
  } catch {
    // Audio can be blocked or unsupported; the game works without it.
  }
}
