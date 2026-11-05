"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { API_BASE, authFetch } from "@/lib/api-auth";
import { showToast } from "@/lib/toast";

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className={`h-4 w-4 fill-current ${index < rating ? "" : "opacity-25"}`}
          viewBox="0 0 24 24"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function StudioReviews({ studioId, reviews = [] }) {
  const { data: session } = authClient.useSession();
  const [items, setItems] = useState(reviews);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = comment.trim();

    if (!trimmed) {
      showToast({
        title: "Review not submitted",
        description: "Write a short review before submitting.",
        type: "error",
      });
      return;
    }

    if (!session?.user) {
      showToast({
        title: "Sign in required",
        description: "Please sign in to leave a review.",
        type: "error",
      });
      return;
    }

    if (!studioId) {
      showToast({
        title: "Review not submitted",
        description: "This studio could not be identified.",
        type: "error",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await authFetch(`${API_BASE}/studios/${studioId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: trimmed, rating }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Could not publish your review.");
      }

      const review = result.review || {
        name: session.user.name || "StudioSpace creator",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        rating,
        comment: trimmed,
      };

      setItems((current) => [review, ...current]);
      setComment("");
      setRating(5);

      showToast({
        title: "Review published",
        description: "Thanks for sharing your session feedback.",
        type: "success",
      });
    } catch (error) {
      showToast({
        title: "Review not submitted",
        description:
          error?.message || "Could not publish your review. Please try again.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 border-t border-slate-800/80 pt-4">
      <h2 className="text-xl font-bold text-white">Reviews ({items.length})</h2>

      {items.length > 0 && (
        <div className="space-y-4">
          {items.map((review, index) => (
            <div
              key={`${review.name || "review"}-${index}`}
              className="rounded-2xl border border-slate-800/80 bg-[#111622] p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">
                    {review.name || "Verified Creator"}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {review.date || "Recently"}
                  </p>
                </div>

                <Stars rating={Number(review.rating) || 5} />
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {review.comment || "A great space for a creative session."}
              </p>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-800/80 bg-[#111622] p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white">Leave a review</p>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Rate ${index + 1} stars`}
                onClick={() => setRating(index + 1)}
                className={`transition ${
                  index < rating ? "text-amber-400" : "text-slate-600"
                }`}
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={3}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="How was your session?"
          className="w-full resize-none rounded-xl border border-slate-800 bg-[#181f2e] p-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-500"
        />

        <div className="flex justify-start">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Publishing..." : "Submit review"}
          </button>
        </div>
      </form>
    </div>
  );
}
