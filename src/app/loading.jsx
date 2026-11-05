export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#020b14] px-6 py-20 text-white">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10">
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-amber-400/25 border-t-amber-400" />
        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-amber-400">
          StudioSpace
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Lighting the set...
        </p>
      </div>
    </main>
  );
}
