"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { API_BASE, authFetch } from "@/lib/api-auth";

export default function CancelBookingButton({ bookingId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleCancel() {
    setLoading(true);

    try {
      const res = await authFetch(`${API_BASE}/my-booking/${bookingId}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Could not cancel your booking.");
      }

      showToast({
        title: "Booking cancelled",
        description: "Your booking was cancelled successfully.",
        type: "success",
      });

      setShowConfirm(false);
      router.refresh();
    } catch (error) {
      console.error("Cancellation error:", error);

      showToast({
        title: "Cancellation failed",
        description: error.message || "Something went wrong.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        type="button"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full border border-[#cf4a4a]/60 bg-[#1a0d12] px-4 py-2 text-sm font-semibold text-[#ff9a9a] transition hover:bg-[#281016] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          className="h-4 w-4 fill-none stroke-current stroke-[2]"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9L9 15M9 9l6 6" />
        </svg>
        Cancel booking
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#10151e] p-6 shadow-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <svg
                className="h-6 w-6 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M15 9L9 15M9 9l6 6" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-white">
              Cancel this booking?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
              >
                Keep booking
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}
                {loading ? "Cancelling..." : "Yes, cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
