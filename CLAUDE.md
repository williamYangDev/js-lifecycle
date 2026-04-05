# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Run everything (dev mode):**
```bash
npm run dev          # starts both server (port 3001) and client (port 5173) concurrently
```

**Workspace-specific:**
```bash
npm run dev --workspace=server      # Express server only, with hot reload via tsx watch
npm run dev --workspace=client      # Vite dev server only
npm run build --workspace=server    # tsc → dist/
npm run build --workspace=client    # tsc + vite build → dist/
npm run lint --workspace=server
npm run lint --workspace=client
```

## Architecture

This is an **npm workspaces monorepo** with two packages:

- **`client/`** — React 18 + TypeScript, bundled with Vite. Entry: `client/src/main.tsx`. Vite proxies `/api/*` → `http://localhost:3001` so the frontend never hardcodes the backend URL.
- **`server/`** — Express 4 + TypeScript, compiled with `tsc` (CommonJS output to `dist/`). Dev mode uses `tsx watch` for hot reload. Entry: `server/src/index.ts`.

### API conventions

- All backend routes are prefixed with `/api`
- CORS is configured to allow `http://localhost:5173` (Vite dev server)
- The only route so far is `GET /api/health`

### TypeScript configs

- Server: `"module": "CommonJS"` targeting Node (strict mode)
- Client: `"module": "ESNext"` with `"moduleResolution": "bundler"` for Vite (no emit, strict mode)

### ESLint

- Server uses `eslint.config.mjs` (`.mjs` extension required because server tsconfig targets CommonJS)
- Client uses `eslint.config.js` (ESM via `"type": "module"` in client/package.json)
