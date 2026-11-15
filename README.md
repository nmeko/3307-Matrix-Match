# Matrix Match

A browser game for learning matrix operations, built for CS 3307. Players work through levels from matrix basics to determinants and inverses, with hints and explanations, then test themselves in a timed competitive mode.

**Play it:** https://nmeko.github.io/3307-Matrix-Match/ (free, in the browser, nothing to install)

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Radix UI · Framer Motion · Vitest

## Features

- **Regular mode:** three levels (Matrix Basics, Matrix Operations, Matrix Master), each with Easy, Medium and Hard rounds. Three attempts per question, a hint panel, worked explanations, and progress that unlocks as you pass rounds.
- **Competitive mode:** quiz-show style. Five timed questions per difficulty, answered on four colored tiles (or keys 1–4), scored on accuracy, speed and streaks, with a final rank and a top-5 scoreboard saved on the device.
- **Class games:** a teacher clicks *Host a class game*, shows the 6-character code on the projector, and lets students in one by one (or everyone automatically), then runs timed questions with a live answer count, the right answer revealed, and a leaderboard after each question. Students join from their own phone or laptop with the code. Each class's code is its own game, so two classes playing at once never mix, and a student in another tab can only join if the teacher lets them in. The teacher can remove a player, lock the game, and start a new round with the same class.
- **Five languages:** English, Spanish, Mandarin, Hindi and Arabic (laid out right to left), switchable at any time. In class games every student plays in their own language.
- **Accessibility settings:** high-contrast mode, four text sizes and optional sound effects.
- **Saved progress:** levels and settings persist in the browser's local storage; no account needed.

## Run it

Requirements: Node.js 20.9+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm build` | Static export to `out/` (what GitHub Pages serves) |
| `pnpm lint` | ESLint (Next.js core web vitals + TypeScript rules) |
| `pnpm typecheck` | TypeScript, strict |
| `pnpm test` | Every question's answer and translations, typed-answer grading in every script, all screens' text in all five languages, class-game rules and message signing |

## Hosting

The game is a static site, so it's hosted for free on GitHub Pages. Every push to `main` runs `.github/workflows/pages.yml`, which builds it with the repository name as the path prefix and publishes it. One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Class games: how they work

Class games use [Supabase Realtime](https://supabase.com/docs/guides/realtime) broadcast channels (free tier). Nothing is stored: the teacher's browser runs the game, and messages pass through a channel named after the game code.

- **No impersonation:** every message is signed (ECDSA P-256 in the browser). Students trust the first host they hear and reject anyone else claiming to host; the host pins each student's key from their join request, so nobody can answer for a classmate.
- **Fair scoring:** the teacher's browser times answers, so a student's clock doesn't matter. Only the first answer per question counts, and late answers are ignored.
- **A refresh doesn't end the game:** both the teacher's and students' tabs rejoin where they were.
- **Your own Supabase project:** set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_KEY` (the publishable key) when building.

## How it's built

```text
app/
  page.tsx                                 home: choose a mode
  regular/page.tsx                         level map
  regular/game/[levelId]/[difficulty]/     a regular round
  competitive/                             lobby and timed game
components/                                settings, help panel, guide character, UI primitives
lib/
  game-data.ts                             question bank with translations
  game-context.tsx                         progress and settings (React context + localStorage)
  translations.ts                          interface text in five languages
  sound.ts                                 feedback tones via the Web Audio API
tests/questions.test.ts                    question bank checks
```

Answers are graded by **option position**, so a player picking the Spanish "Verdadero" is checked against the English "True" at the same position. The question bank test guards that alignment.

## Team project

Built as a CS 3307 team project.
