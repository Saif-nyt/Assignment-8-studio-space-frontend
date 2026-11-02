"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import TextField from "@/components/text-field";
import GoogleIcon from "@/components/google-icon";
import {
  IconArrowLeft,
  IconCamera,
  IconCheck,
  IconLock,
  IconMail,
  IconPhoto,
  IconUser,
} from "@tabler/icons-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (value) => value.length >= 8 },
  { label: "One uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { label: "One lowercase letter", test: (value) => /[a-z]/.test(value) },
];

const initialForm = {
  name: "",
  email: "",
  photoUrl: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const passwordValid = PASSWORD_RULES.every((rule) =>
    rule.test(form.password)
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Enter your name to create an account.");
      return;
    }

    if (!form.email.trim()) {
      setError("Enter your email address.");
      return;
    }

    if (!passwordValid) {
      setError("Your password does not meet all the requirements below.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await authClient.signUp.email(
        {
          email: form.email.trim(),
          password: form.password,
          name: form.name.trim(),
          image: form.photoUrl.trim() || undefined,
          callbackURL: "/",
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            router.replace("/");
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Could not create your account.");
          },
        }
      );
    } catch {
      setError("Could not create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignUp = () => {
    setError("Google sign-up is not connected yet. Use the form below.");
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
        <div className="w-full min-w-0 max-w-[430px]">
          <Link
            href="/"
            className="mb-10 flex items-center gap-3 lg:hidden"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/80 text-amber-300">
              <IconCamera size={17} stroke={1.8} />
            </span>
            <span className="text-xl font-semibold tracking-tight text-white">
              StudioSpace
            </span>
          </Link>

          <h1 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white lg:text-[40px]">
            Create your account
          </h1>
          <p className="mt-2 text-[15px] text-slate-400">
            Book studios by the hour, or list your own.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleGoogleSignUp}
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
              label="Name"
              name="name"
              value={form.name}
              onChange={update}
              placeholder="Priya Nakamura"
              autoComplete="name"
              icon={<IconUser size={17} stroke={1.7} />}
              required
            />

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
              label="Photo URL"
              name="photoUrl"
              type="url"
              value={form.photoUrl}
              onChange={update}
              placeholder="https://images.example.com/me.jpg"
              autoComplete="url"
              icon={<IconPhoto size={17} stroke={1.7} />}
            />

            <div>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={update}
                placeholder="••••••••"
                autoComplete="new-password"
                icon={<IconLock size={17} stroke={1.7} />}
                required
              />

              <ul className="mt-2.5 space-y-1.5">
                {PASSWORD_RULES.map((rule) => {
                  const met = rule.test(form.password);

                  return (
                    <li
                      key={rule.label}
                      className={`flex items-center gap-2 text-[13px] transition-colors ${
                        met ? "text-emerald-400" : "text-slate-500"
                      }`}
                    >
                      <IconCheck size={12} stroke={2.5} />
                      <span>{rule.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <TextField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={update}
              placeholder="••••••••"
              autoComplete="new-password"
              icon={<IconLock size={17} stroke={1.7} />}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="h-[52px] w-full rounded-full bg-[#f5a623] text-[15px] font-semibold text-[#141414] transition hover:bg-[#ffb733] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-7 text-[15px] text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-amber-400 transition hover:text-amber-300"
            >
              Log in
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

