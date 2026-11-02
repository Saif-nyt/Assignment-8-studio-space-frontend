
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelBookingButton({ bookingId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const res = await fetch(
        `process.env.BACKEND_URL/${bookingid}`||` http://localhost:5001/my-booking/${bookingId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("Could not cancel your booking.");
      }

      alert("Booking cancelled successfully.");
      router.refresh();
    } catch (error) {
      console.error("Cancellation error:", error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCancel}
      type="button"
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-[#cf4a4a]/60 bg-[#1a0d12] px-4 py-2 text-sm font-semibold text-[#ff9a9a] transition hover:bg-[#281016] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        "Cancelling..."
      ) : (
        <>
          <svg
            className="h-4 w-4 fill-none stroke-current stroke-[2]"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M15 9L9 15M9 9l6 6" />
          </svg>
          Cancel booking
        </>
      )}
    </button>
  );
}
