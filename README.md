# DreamyTales (DailyDreamer) — v2

A whimsical bedtime-story generator. Pick a hero, a friend, a theme, a place, a time period, and a creativity level, and get a short, original story built just for that combination.

**Live demo:** https://AliAlperSakar.github.io/DailyDreamer/

This is the **v2 rewrite** of an old university-project prototype, redone with a modern frontend stack for anyone visiting this GitHub profile. The original prototype is kept in [`legacy-flask-prototype/`](./legacy-flask-prototype) for reference — see below for what changed and why.

## Stack

- React 19 + TypeScript
- Vite (build tool)
- Plain CSS (custom properties, component-scoped class names) — no framework, to keep the original hand-crafted look intact
- Zero backend: story generation runs entirely client-side, feedback is stored in `localStorage`
- Deployed automatically to GitHub Pages via GitHub Actions on every push to `v2`

## Why no live AI backend in the demo?

The original prototype called OpenAI's API from a Flask server, using an API key. GitHub Pages only serves static files — it can't run a Python server, and a public static site is not a safe place to keep any API key. Rather than fake it, v2 uses a small hand-written "story engine" (see `src/lib/storyGenerator.ts`) that mixes hero/friend names, theme, place, period, and a creativity dial into a genuinely different story every time — no server, no key, no cost, and it never breaks from an expired credential.

If you want to wire up a real LLM backend again, `legacy-flask-prototype/` has the original Flask + OpenAI integration as a starting point — just supply your own key via the `OPENAI_API_KEY` environment variable (never commit it).

## Running locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## What changed from the original prototype

- **Framework**: a single 900-line Flask/Jinja/vanilla-JS template → React components with typed props (`src/components/`)
- **Styling**: one giant inline `<style>` block → organized CSS with custom properties, reused across a handful of shared components (`Section`, `SegmentedChoice`) instead of copy-pasted per field
- **State**: server-rendered form + hidden inputs + manual DOM queries → a single typed `StoryRequest` object in React state
- **Story generation**: OpenAI Chat Completions call on a Flask backend → local, deterministic-but-varied generator, no network required
- **Feedback**: POST to `/submit_feedback`, appended to a CSV file → saved to the visitor's own browser (`localStorage`)
- **Security**: the original had a live OpenAI API key committed in plain text in `const.py`. It has been redacted in the legacy copy and replaced with an environment-variable read. **If you're the repo owner: that old key is public in git history — rotate it.**
- **Assets**: original PNGs (several multi-MB files) converted to compressed WebP, cutting total image weight from ~14 MB to well under 1 MB

The visual identity — twinkling starry background, purple glass panel, orange ribbon section labels, teal accents, the shaking "Generate" button — is carried over on purpose. That's the part worth keeping.
