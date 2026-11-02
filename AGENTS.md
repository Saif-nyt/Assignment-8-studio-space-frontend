<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace

Hourly studio-booking frontend: Next.js 16 App Router, React 19, Tailwind v4, shadcn UI on Base UI. Frontend only — the studio/booking API is a separate service at `http://localhost:5001`. The only route handlers here are better-auth's (`app/api/auth/[...all]/route.js`); there is no database of our own, no tests, and no CI. The README is still create-next-app boilerplate; trust `package.json` and `next.config.mjs` over it.

## Commands

- `npm run dev` — Turbopack dev server on `:3000`. It rewrites the managed block above; keep that block in diffs.
- `npm run build` — the only meaningful verification. It passes today (every route static except `/studios/[id]`, which is dynamic) and catches broken imports. `npm start` serves the build.
- `npm run lint` — whole-repo ESLint (script is bare `eslint`). A clean tree already reports 3 errors and 2 warnings, so compare counts instead of expecting zero: `components/ui/carousel.jsx` and `hooks/use-mobile.js` (`react-hooks/set-state-in-effect`), `BookWorkshopNowButton.jsx` (`window.location.href`), plus `<img>` and navigation warnings. Generated `ui/*` failures are not yours to fix.
- `npx tsc --noEmit` — there is no typecheck script, and it barely matters: `checkJs` is off, so the `.jsx` app code is not type-checked and only `SkeletonCard.tsx` is real TS. It currently passes.

## Read before editing source

- Many files are committed **transpiled output**, not JSX: they import `_jsx`/`_jsxs` from `react/jsx-runtime` and build trees as `_jsx("div", { className, children })`. Affected: `app/page.js`, `app/studios/page.jsx`, `banner`, `footer`, `navbar`, `StudioCard`, `SkeletonCard`, `HowBookingWorks`, `ProtectionSection`, `BookWorkshopNowButton`, `lib/highlighter.jsx`, all `components/ui/*`, all `hooks/*`. Authored JSX still lives in `layout.js`, `add-studio/page.jsx`, `sign-up/page.jsx`, `studios/[id]/page.jsx`, `site-chrome.jsx`. Match the file's existing style (or convert the whole file); don't mix styles or mass-reformat.
- `app/studios/page.jsx` imports a named `Studio` from `StudioCard`, which only has a default export. The build tolerates it, so don't "fix" downstream behavior around that import.
- `@/*` maps to `src/*`. `cn` comes from `@/lib/utils`, a one-line re-export of the `cn` npm package. `components/ui/*` instead import `cn` from `"cn"` and primitives from `@base-ui/react/*` — leave those alone and add components with `npx shadcn add <name>` (config: `base-lyra`, JSX not TSX, Tabler icons).

## Next 16 and styling

- `next.config.mjs` sets `reactCompiler: true` (don't add `useMemo`/`useCallback` by default) and a Turbopack rule that loads `*.css` through `@tailwindcss/turbopack`; keep both.
- `images.remotePatterns` allows nine stock-photo hosts (Unsplash, Pexels, Cloudinary, etc.). A studio `image` from any other host makes `<Image>` fail; add the host in `next.config.mjs` or use `<img>`.
- There is no `cacheComponents`/`partialPrefetching`. `studios/[id]/page.jsx` opts out of prerendering with `export const dynamic = "force-dynamic"` plus `cache: "no-store"`; keep both if you touch that fetch or the build will try to reach the API.
- Tailwind v4 has no `tailwind.config.*`: tokens, colors, radii, and dark mode live in `src/app/globals.css` (`@theme inline`, CSS variables, `.dark`).

## App conventions

- The root layout wraps pages in `src/components/site-chrome.jsx`, a client component that hides Navbar/Footer on auth prefixes (`/sign-up`, `/signin`, `/sign-in`, `/login`, `/register`). Don't add chrome per page.
- Auth is better-auth: client in `src/lib/auth-client.js` (`createAuthClient()`, same-origin), server in `src/lib/auth.js` (Mongo adapter), handler in `src/app/api/auth/[...all]/route.js` — the directory name must be exactly `[...all]`. `MONGODB_URI` is an Atlas URI with no database in its path, so `client.db()` would use Mongo's default `test`; `MONGODB_DB` (default `Studio-space`) selects the real database. better-auth auto-creates `user`, `session`, `account`, `verification` (singular names) next to the backend's `bookings` collection. Screens are `/sign-up` and `/login` (shared `components/text-field.jsx` + `google-icon.jsx`), with `authClient.signUp.email` / `signIn.email` redirecting `/`; `/signin` just redirects to `/login`. Google auth and password reset are stubs that only set an inline message. Password minimum is 8 characters.
- Routes linked from the UI but missing: `/about`, `/my-bookings`, `/privacy`, `/terms`. Footer and booking flows point at them.
- `BookWorkshopNowButton` ignores its props: it reads the id via `useParams` but hardcodes the title, rate ($240), deposit, and date. Don't treat it as the source of truth for studio data.

## API contract (backend must be running)

- Base URL is hardcoded `http://localhost:5001` in every fetch; there is no env var. Without the backend, `/studios` shows its error state and `/studios/[id]` throws.
- `GET /studios` returns an array; `GET /studios/:id` returns `_id, title, category, location, overview, hourlyRate, securityDeposit, maxCapacity, amenities[], rating, image, ownerName, ownerImage, ownerEmail`.
- `POST /add-studio` inserts that shape and expects `credentials: "include"`; `image` is a base64 data URL compressed in-browser to 1600px, so `413` means the body is too large.
- `POST /bookings` takes `{ studioId, studioTitle, bookingDate, startTime, durationHours, noteToHost, totalAmount }` with `credentials: "include"`; `409` means the slot is already reserved.
- `/studios` fetches in a client component, while `/studios/[id]` fetches in an async server component.
