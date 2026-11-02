"use client";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020d17] px-6 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium tracking-[0.28rem] text-[#f7b21a] uppercase">Welcome back</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em]">Sign in</h1>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-3 text-sm text-white outline-none transition focus:border-[#f7b21a]" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Password</label>
            <input type="password" placeholder="Enter your password" className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-3 text-sm text-white outline-none transition focus:border-[#f7b21a]" />
          </div>

          <button type="submit" className="w-full rounded-xl border border-[#f7b21a] bg-[#f7b21a] px-4 py-3 text-sm font-semibold text-[#121b2b] transition hover:bg-[#ffbf38]">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
