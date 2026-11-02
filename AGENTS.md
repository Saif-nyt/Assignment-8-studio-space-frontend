<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace

Hourly studio-booking frontend: Next.js 16 App Router, React 19, Tailwind v4, shadcn UI on Base UI. This repo is frontend only — the API is a separate service expected at `http://localhost:5001`; there are no server routes, database, tests, or CI here. The README is still the create-next-app template; trust `package.json` and `next.config.mjs` over it.

## Commands

- `npm run dev` — Turbopack dev server on `:3000`. It also rewrites the managed block above; keep that block in diffs.
- `npm run build` / `npm start`
- `npm run lint` — whole-repo ESLint. It is not clean today (generated `src/components/ui/*`, `src/hooks/use-mobile.js`, and some app files); check that you did not add errors rather than expecting zero.
- `npx tsc --noEmit` — there is no typecheck script. `tsconfig.json` includes `.ts`/`.tsx` plus a few explicitly listed `.jsx` files, so most `.jsx` app code is not type-checked.

## Next 16 specifics

- `next.config.mjs` enables `cacheComponents` and `partialPrefetching`. Dynamic data (`params`, uncached `fetch`) must sit inside `<Suspense>` or be cached with `"use cache"`, otherwise the build fails with "uncached or runtime data during prerendering" (the current `/studios/[id]` page hits this). Read `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` and the `use-cache` directive docs before changing data fetching.
- React Compiler is enabled; don't add `useMemo`/`useCallback` by default.
- Tailwind v4 has no `tailwind.config.*`: theme tokens, colors, radii, and dark mode live in `src/app/globals.css` (`@theme inline`, CSS variables, `.dark`).
- `images.remotePatterns` allows only `images.unsplash.com`. Using `<Image>` with an API-provided URL from another host fails; add the host in `next.config.mjs` or use `<img>` as existing components do.

## Layout and conventions

- `@/*` maps to `src/*`. App code imports `cn` from `@/lib/utils` (a re-export of the `cn` package).
- The root layout adds `Navbar` and `Footer` to every route; do not add them per page.
- `src/components/ui/*` is shadcn output configured as `base-lyra`, JSX-only, Tabler icons, Base UI primitives. Add components with `npx shadcn add <name>`; don't hand-edit them or rewrite their imports (`@base-ui/react/*`, `cn` from `"cn"`).
- The bookable URL surface is still partial: footer/auth links point at `/about`, `/add-studio`, `/my-bookings`, `/privacy`, and `/terms`, but those routes do not exist yet.
- `BookWorkshopNowButton` ignores its `studio` prop and hardcodes the title, rate, deposit, and date — don't treat it as the source of truth for studio data.

## API contract used by the app

- `GET /studios` returns an array; `GET /studios/:id` returns `_id, title, category, location, overview, hourlyRate, securityDeposit, maxCapacity, amenities[], rating, image, ownerName, ownerImage, ownerEmail`.
- `POST /bookings` takes `{ studioId, studioTitle, bookingDate, startTime, durationHours, noteToHost, totalAmount }` with `credentials: "include"`; `409` means the slot is already reserved.
- `/studios` fetches in a client component, while `/studios/[id]` fetches in an async server component. The backend must be running for either page to show data.
