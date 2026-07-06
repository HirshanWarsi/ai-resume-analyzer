# ResumeAI — AI Resume Analyzer (Frontend)

A premium SaaS-style frontend for an AI resume analysis product. Built with
React 19, Vite, Tailwind CSS, shadcn/ui-style primitives, Framer Motion,
React Router, and Lucide icons.

This is a **frontend-only** project: there is no backend, no real API calls,
and no authentication logic. All data shown (stats, analyses, scores,
recommendations) comes from `src/data/sampleData.js` and is purely for
layout and interaction demonstration.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

```bash
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## Pages

- `/login` — glassmorphism login screen
- `/register` — glassmorphism sign-up screen
- `/dashboard` — sidebar + navbar shell, welcome card, stats, recent analyses
- `/upload` — drag-and-drop resume upload with an animated dropzone
- `/analysis` — ATS score gauge, summary, strengths, weaknesses, missing skills, suggestions
- `/job-match` — job description textarea, match score, matching/missing skills, recommendations

## Structure

```
src/
  components/
    ui/          shadcn-style primitives (button, card, input, badge, progress, tabs...)
    layout/      Sidebar, Navbar, DashboardLayout
    auth/        AuthShell (shared glass panel for Login/Register)
    dashboard/   WelcomeCard, StatsGrid, RecentAnalyses, ResumeDropzone
    analysis/    ScoreGauge, ListCard
    jobmatch/    MatchMeter
  data/          sampleData.js — static demo content only
  lib/           cn() helper, ThemeProvider (dark mode)
  pages/         one file per route
```

## Design notes

- Theme: blue/white light mode with a full dark mode (class-based, toggle in navbar).
- Typography: Sora for display/headings, Inter for body copy, JetBrains Mono
  for numeric readouts (ATS score, stats) to give scores a "diagnostic
  scanner" feel.
- Signature motif: the ATS Score Gauge and upload dropzone both use a subtle
  scanning animation, tying back to the product's core action — scanning a
  resume.
- All colors, radii, and shadows are driven by CSS variables in
  `src/index.css` and Tailwind tokens in `tailwind.config.js`, so the theme
  can be retinted from one place.

## Wiring up a real backend

Every "action" (login, register, analyze, match) currently just navigates or
shows static demo data after a short delay. Swap those handlers in
`src/pages/*.jsx` for real API calls when a backend is ready — no other
UI code needs to change.
