# Matrix Match

A browser game for learning matrix operations, built for CS 3307. Players work through levels from matrix basics to determinants and inverses, with hints and explanations, then test themselves in a timed competitive mode.

**Play it:** https://nmeko.github.io/3307-Matrix-Match/ (free, in the browser, nothing to install)

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Radix UI · Framer Motion · Vitest

## Features

- **Regular mode:** three levels (Matrix Basics, Matrix Operations, Matrix Master), each with Easy, Medium and Hard rounds. Three attempts per question, a hint panel, worked explanations, and progress that unlocks as you pass rounds.
- **Competitive mode:** five timed questions per difficulty, scored on accuracy, speed and answer streaks, with a final rank.
- **Five languages:** English, Spanish, Mandarin, Hindi and Arabic (laid out right to left), switchable at any time.
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
| `pnpm test` | Checks every question: the answer is one of its options, and each translation lists its options in the same order as English |

## Hosting

The game is a static site, so it's hosted for free on GitHub Pages. Every push to `main` runs `.github/workflows/pages.yml`, which builds it with the repository name as the path prefix and publishes it. One-time setup: **Settings → Pages → Source: GitHub Actions**.

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
