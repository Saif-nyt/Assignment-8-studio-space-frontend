"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconCamera, IconLock, IconMail } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";
import TextField from "@/components/text-field";
import GoogleIcon from "@/components/google-icon";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85";

const initialForm = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.email.trim()) {
      setError("Enter your email address.");
      return;
    }

    if (!form.password) {
      setError("Enter your password.");
      return;
    }

    setLoading(true);

    try {
      await authClient.signIn.email(
        {
          email: form.email.trim(),
          password: form.password,
          rememberMe: true,
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            router.replace("/");
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Could not log in.");
          },
        }
      );
    } catch {
      setError("Could not log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            setError(ctx.error.message || "Google sign-in failed.");
          },
        }
      );
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setError("Password reset is not connected yet.");
  };

  return (
    <main
      className="flex min-h-screen w-full bg-[#0b0b0c] text-white"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <section className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image
          src={HERO_IMAGE}
          alt="Recording studio with guitars and a mixing console"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/35" />

        <Link
          href="/"
          className="absolute left-8 top-8 z-10 flex items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/80 text-amber-300">
            <IconCamera size={17} stroke={1.8} />
          </span>
          <span className="text-xl font-semibold tracking-tight text-white">
            StudioSpace
          </span>
        </Link>

        <div className="absolute inset-x-0 top-[52%] z-10 px-8 lg:px-10">
          <blockquote className="max-w-[440px] font-serif text-[1.75rem] leading-[1.2] text-white">
            <span className="block">“The room was the missing piece.</span>
            <span className="block">Now it&apos;s just three clicks away.”</span>
          </blockquote>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            Priya N. — editorial photographer, booked 41 sessions this year
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-white/10 pt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            <span>1,240 spaces</span>
            <span>18 cities</span>
            <span>Insured sessions</span>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen w-full min-w-0 items-center justify-center px-6 py-12 lg:w-1/2 lg:border-l lg:border-white/[0.06] lg:px-10">
        <div className="w-full min-w-0 max-w-[500px]">
          <Link href="/" className="mb-10 flex items-center gap-3 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/80 text-amber-300">
              <IconCamera size={17} stroke={1.8} />
            </span>
            <span className="text-xl font-semibold tracking-tight text-white">
              StudioSpace
            </span>
          </Link>

          <h1 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white lg:text-[40px]">
            Welcome back
          </h1>
          <p className="mt-2 text-[15px] text-slate-400">
            Log in to your account
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex h-[52px] w-full items-center justify-center gap-3 rounded-full border border-white/[0.15] bg-[#141416] text-[15px] font-medium text-white transition hover:border-white/25 hover:bg-[#19191c]"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-4">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                or
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-5 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              placeholder="you@example.com"
              autoComplete="email"
              icon={<IconMail size={17} stroke={1.7} />}
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={update}
              placeholder="••••••••"
              autoComplete="current-password"
              icon={<IconLock size={17} stroke={1.7} />}
              action={
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[12px] font-medium text-amber-400 transition hover:text-amber-300"
                >
                  Forgot password?
                </button>
              }
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="h-[52px] w-full rounded-[10px] bg-[#f5a623] text-[15px] font-semibold text-[#141414] transition hover:bg-[#ffb733] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-7 text-[15px] text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-amber-400 transition hover:text-amber-300"
            >
              Create one
            </Link>
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <IconArrowLeft size={16} />
            Back to StudioSpace
          </Link>
        </div>
      </section>
    </main>
  );
}
