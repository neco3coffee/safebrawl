# 対話の際に仕様する言語
人間の開発者は日本人です。なので日本語で回答を生成してください。

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SafeBrawl is a Brawl Stars companion app for tracking player profiles, battle logs, and identifying cheaters. It is a monorepo with three apps deployed on Cloudflare.

## Repository Structure

```
apps/
  app/       - Main Next.js app (Cloudflare Pages via OpenNext), port 3333
  web/       - Landing page (Next.js static, Cloudflare Pages), port 3111
  api/       - Hono API proxy (Cloudflare Workers)
packages/
  shared/    - Shared React components used by both Next.js apps
_user/       - E2E tests (Cucumber + Playwright BDD)
```

## Commands

### Development
```bash
# Run main app
npm run dev --prefix apps/app       # http://localhost:3333

# Run landing page
npm run dev --prefix apps/web       # http://localhost:3111

# Run API (Cloudflare Worker)
npm run dev --prefix apps/api       # wrangler dev
```

### Lint
```bash
npm run lint                        # lint all workspaces
npm run lint --prefix apps/app      # lint specific workspace
```

### Testing
```bash
npm test                            # Cucumber BDD tests (_user/**/*.feature)
npm run test:playwright             # Playwright E2E tests
npm run test:ui                     # Playwright interactive UI mode
npm run test:report                 # Show Playwright HTML report
```

### Deploy
```bash
npm run deploy:production --prefix apps/app   # deploy app to production
npm run deploy:development --prefix apps/app  # deploy app to development
```

## Architecture

### apps/app (Main App)

- **Framework**: Next.js 15 + React 19, deployed to Cloudflare Pages via `@opennextjs/cloudflare`
- **Routing**: App Router with `[locale]` dynamic segment for i18n (ja/en). Default locale is `ja`.
- **i18n**: `next-intl` — message files at `app/_i18n/messages/{ja,en}.json`, routing config at `app/_i18n/routing.ts`
- **Styling**: Tailwind CSS v4 + SCSS modules (`.module.scss`) per component. shadcn/ui components are in `app/components/ui/`.
- **Path aliases**: `@/*` maps to `app/*`, `shared/*` maps to `packages/shared/*`
- **Data fetching**: Server components fetch Brawl Stars API data via `PROXY_TARGET_URL` env var (the Hono proxy). Uses `next: { revalidate: N }` for ISR caching.
- **Client state**: Searched player history is persisted in `localStorage` via `SearchedPlayerToLocalStorage` client component.

Key pages:
- `app/[locale]/home` — player tag search input
- `app/[locale]/players/[tag]` — player profile with battle log
- `app/[locale]/players/[tag]/brawlers` — player's brawler collection
- `app/[locale]/clubs/[tag]` — club detail

Global layout (`app/[locale]/layout.tsx`) wraps all locale pages with `FooterNav`, `BackButton`, and `ReloadButton`.

### apps/api

- **Framework**: Hono on Cloudflare Workers
- Acts as a proxy to the Brawl Stars API, keeping the API key server-side
- `PROXY_TARGET_URL` binding is configured via wrangler

### packages/shared

- Contains React components shared between `apps/app` and `apps/web`
- `PageList` component shows all planned pages with their implementation status and cache strategy
- Imported in apps via the `shared/*` path alias

### E2E Tests (_user/)

- BDD tests written in Gherkin (`.feature` files) with Playwright step implementations (`.steps.ts`)
- Cucumber config: `cucumber.config.js` at root
- Playwright config: `playwright.config.ts` at root, `testDir: './👤user'`
- Tests run against `BASE_URL` env var (default: `http://localhost:3000`)
- The web server auto-starts `apps/app` on port 3000 during test runs
