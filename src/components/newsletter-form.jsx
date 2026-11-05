"use client";

import { useState } from "react";
import { showToast } from "@/lib/toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = email.trim();

    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      showToast({
        title: "Check your email",
        description: "Enter a valid email address to join the newsletter.",
        type: "error",
      });
      return;
    }

    setEmail("");

    showToast({
      title: "You are on the list",
      description: "Studio drops and hosting tips will land in your inbox.",
      type: "success",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-md">
      <p className="text-sm font-semibold text-white">
        Studio drops, straight to your inbox
      </p>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          aria-label="Email address for newsletter"
          className="min-h-[46px] flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/60"
        />

        <button
          type="submit"
          className="min-h-[46px] rounded-xl bg-amber-400 px-5 text-sm font-bold text-[#111827] transition hover:bg-amber-300"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}
