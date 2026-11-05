import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#020b14] px-6 py-20 text-white">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-2">
        <div className="flex justify-center">
          <svg
            viewBox="0 0 320 260"
            role="img"
            aria-label="Illustration of an empty film studio"
            className="w-full max-w-[320px] text-amber-400"
          >
            <rect
              x="24"
              y="58"
              width="272"
              height="164"
              rx="14"
              fill="#0b1118"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M48 194h224"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M70 194v-76h72v76M202 194v-46h48v46"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle
              cx="112"
              cy="80"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M112 44v-12M112 136v-12M76 80H64M160 80h-12M87 55l-8-8M137 105l8 8M137 55l8-8M87 105l-8 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect
              x="46"
              y="24"
              width="34"
              height="20"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M80 34h28M108 34l8-6M108 34l8 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M182 128h24M194 116v24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M256 230h32M32 230h32"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
            Scene not found
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.05em] text-white md:text-6xl">
            404
          </h1>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
            This set is still being built.
          </h2>

          <p className="mt-4 max-w-md text-base leading-8 text-slate-400">
            The page you are looking for has moved, wrapped, or never made it
            past pre-production. Let&apos;s get you back to the studio floor.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#f4b63a] px-6 py-3 text-sm font-bold text-[#111827] transition hover:bg-[#f7c04f]"
            >
              Return to Home
            </Link>

            <Link
              href="/studios"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.08]"
            >
              Explore studios
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
