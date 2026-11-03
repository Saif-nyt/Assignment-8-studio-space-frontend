"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { showToast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://assignment-8-studio-space-backend.vercel.app";

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function BookWorkshopNowButton({
  studioId,
  studioTitle = "Stage 9 Soundstage",
  hourlyRate = 240,
  securityDeposit = 1000,
  availabilityText = "Available",
}) {
  const router = useRouter();
  const params = useParams();

  const routeStudioId = params?.id;
  const resolvedStudioId = studioId || routeStudioId;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [hours, setHours] = useState(2);
  const [bookingDate, setBookingDate] = useState(getTodayDate());
  const [startTime, setStartTime] = useState("10:00");
  const [noteToHost, setNoteToHost] = useState("");

  const totalAmount = Number(hourlyRate) * hours;

  async function handleBookingSubmit(event) {
    event.preventDefault();

    if (!user?.email) {
      showToast({
        title: "Sign in required",
        description: "Please sign in to book a studio.",
        type: "error",
      });

      router.push("/login");
      return;
    }

    if (!resolvedStudioId) {
      showToast({
        title: "Studio not found",
        description: "Please refresh the page and try again.",
        type: "error",
      });
      return;
    }

    if (!bookingDate || !startTime || !hours) {
      showToast({
        title: "Missing information",
        description: "Please complete all required booking fields.",
        type: "error",
      });
      return;
    }

    setBookingLoading(true);

    try {
      const tokenResponse = await authClient.token();
      const token = tokenResponse?.data?.token;

      if (!token) {
        showToast({
          title: "Authentication required",
          description: "Your session may have expired. Please sign in again.",
          type: "error",
        });

        router.push("/login");
        return;
      }

      const payload = {
        studioId: resolvedStudioId,
        studioTitle,
        email: user.email.trim().toLowerCase(),
        userName: user.name || user.email,
        bookingDate,
        startTime,
        durationHours: Number(hours),
        noteToHost: noteToHost.trim(),
        totalAmount,
      };

      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (res.status === 409) {
        showToast({
          title: "Booking unavailable",
          description:
            responseData.message || "This time slot is already reserved.",
          type: "error",
        });
        return;
      }

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to place booking.");
      }

      showToast({
        title: "Reservation submitted",
        description: "Your studio booking request has been received.",
        type: "success",
      });

      setIsModalOpen(false);
      router.push("/my-bookings");
      router.refresh();
    } catch (error) {
      console.error("Booking error:", error);

      showToast({
        title: "Booking failed",
        description:
          error.message || "Could not place booking. Please try again.",
        type: "error",
      });
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <div className="p-8">
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-amber-600 px-6 py-3 font-bold text-white shadow-md transition hover:bg-amber-700"
      >
        Book Workspace Now
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#121619] p-6 text-white shadow-2xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">Book {studioTitle}</h2>

                <p className="mt-1 text-xs text-zinc-400">
                  ${Number(hourlyRate).toFixed(2)} per hour · deposit $
                  {Number(securityDeposit).toLocaleString()}.00
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close booking modal"
                className="rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              >
                <svg
                  className="h-5 w-5 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-zinc-400">
                    Date
                  </label>

                  <input
                    name="bookingDate"
                    type="date"
                    min={getTodayDate()}
                    required
                    value={bookingDate}
                    onChange={(event) => setBookingDate(event.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-[#1a1f24] px-2 py-2.5 text-xs text-white outline-none focus:border-amber-500 sm:px-3"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-zinc-400">
                    Start
                  </label>

                  <select
                    name="startTime"
                    required
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-[#1a1f24] px-2 py-2.5 text-xs text-white outline-none focus:border-amber-500 sm:px-3"
                  >
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-zinc-400">
                    Hours
                  </label>

                  <select
                    name="durationHours"
                    value={hours}
                    onChange={(event) => setHours(Number(event.target.value))}
                    className="w-full rounded-lg border border-zinc-700 bg-[#1a1f24] px-2 py-2.5 text-xs text-white outline-none focus:border-amber-500 sm:px-3"
                  >
                    <option value={1}>1 hr</option>
                    <option value={2}>2 hr</option>
                    <option value={4}>4 hr</option>
                    <option value={8}>8 hr</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-zinc-400">
                  Note to host (optional)
                </label>

                <textarea
                  name="noteToHost"
                  rows={3}
                  value={noteToHost}
                  onChange={(event) => setNoteToHost(event.target.value)}
                  placeholder="What are you shooting or recording?"
                  className="w-full rounded-lg border border-zinc-700 bg-[#1a1f24] p-3 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-emerald-900/60 bg-emerald-950/40 p-2.5 text-[11px] text-emerald-400">
                <svg
                  className="h-4 w-4 shrink-0 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>

                <span>{availabilityText}</span>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                <span className="text-xs text-zinc-400">
                  {hours} hr × ${Number(hourlyRate).toFixed(2)}
                </span>

                <span className="text-2xl font-black text-white">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={bookingLoading}
                  className="rounded-lg bg-zinc-800 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-zinc-700 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="rounded-lg bg-amber-600 px-5 py-2.5 text-xs font-bold text-black transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {bookingLoading ? "Booking..." : "Confirm booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
