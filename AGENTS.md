# StudioSpace

Hourly studio-booking frontend: Next.js 16 App Router, React 19, Tailwind v4, shadcn UI on Base UI. Frontend only; API at `http://localhost:5001`. No local DB, tests, or CI.

## Commands
- `npm run dev` – Turbopack dev server (`:3000`). Keeps the managed block; backend must run at `:5001`.
- `npm run build` – Verifies static routes; `/studios/[id]` stays dynamic.
- `npm run lint` – ESLint reports 3 errors + 2 warnings (specific files). Do not expect zero.
- `npx tsc --noEmit` – Typecheck passes; only `SkeletonCard.tsx` is typed, others are JSX.

## Read before editing source
- Many files are transpiled output (import `_jsx` from `react/jsx-runtime`); match the existing JSX style per file.
- `app/studios/page.jsx` imports `Studio` (default export) from `StudioCard`; do not change import behavior.
- `@/*` maps to `src/*`; `cn` re‑exported from `@/lib/utils`. `components/ui/*` import `cn` from `"cn"` and Base UI primitives.
- `next.config.mjs` enables `reactCompiler: true` and loads CSS via `@tailwindcss/turbopack`. Keep both.
- `images.remotePatterns` lists 9 allowed image hosts; add new hosts to the list if needed.
- `studios/[id]/page.jsx` uses `export const dynamic = "force-dynamic"` and `cache: "no-store"`; keep both.
- Tailwind tokens, colors, radii, dark mode live in `src/app/globals.css` (`@theme inline`, CSS vars, `.dark`).

## App conventions
- Root layout wraps pages in `src/components/site-chrome.jsx` (client); it hides Navbar/Footer on auth prefixes (`/sign-up`, `/signin`, `/sign-in`, `/login`, `/register`). Do not add per‑page chrome.
- `navbar.jsx` is a client component that calls `authClient.useSession()`. When a session exists it shows an avatar menu (Dashboard, Add New Studio, My Studio Listings, My Bookings, Logout); otherwise shows Login/Register. Links point to `/dashboard`, `/my-studios`, `/my-bookings` (not yet implemented).
- Auth is better‑auth: client in `src/lib/auth-client.js` (`createAuthClient()`, same‑origin); server in `src/lib/auth.js` (Mongo adapter). Handler in `src/app/api/auth/[...all]/route.js` – the `[...all]` folder name must stay exact.
- `MONGODB_URI` is an Atlas URI without a database path; `client.db()` would use the default `test` DB. `MONGODB_DB` (default `Studio-space`) selects the real DB. better‑auth auto‑creates `user`, `session`, `account`, `verification` collections next to the `bookings` collection.
- Screens: `/sign-up` and `/login` (shared `components/text-field.jsx` + `google-icon.jsx`). `authClient.signUp.email` / `signIn.email` redirect to `/`; `/signin` redirects to `/login`. Google auth and password reset are stubs that only set an inline message. Password must be at least 8 characters.
- `BookWorkshopNowButton` ignores its props; it reads `useParams` but hardcodes title, rate ($240), deposit, and date. Treat it as non‑authoritative for studio data.
- Missing routes linked from UI: `/about`, `/my-bookings`, `/privacy`, `/terms`. Implement or add placeholders.

## API contract (backend must be running)
- Base URL is hardcoded `http://localhost:5001`; no env var. Without the backend, `/studios` shows error state and `/studios/[id]` throws.
- `GET /studios` → array of studio objects. `GET /studios/:id` → `_id, title, category, location, overview, hourlyRate, securityDeposit, maxCapacity, amenities[], rating, image, ownerName, ownerImage, ownerEmail`.
- `POST /add-studio` → inserts studio shape; requires `credentials: "include"`. `image` is a base64 data URL compressed to 1600 px; exceeding size yields `413`.
- `POST /bookings` → payload `{ studioId, studioTitle, bookingDate, startTime, durationHours, noteToHost, totalAmount }` with `credentials: "include"`. `409` indicates slot already reserved.
- `/studios` data fetched in a client component; `/studios/[id]` fetched in an async server component.