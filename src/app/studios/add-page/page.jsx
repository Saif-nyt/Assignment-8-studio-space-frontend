"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function StudioDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const studio = {
    _id: id,
    title: "Stage 9 Soundstage",
    hourlyRate: 240,
    securityDeposit: 1000,
    availabilityText: "Available Tue, Nov 3 · 10:00-12:00",
  };

  const [hours, setHours] = useState(2);
  const totalAmount = studio.hourlyRate * hours;

  async function handleBookingSubmit(event) {
    event.preventDefault();
    setBookingLoading(true);

    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const payload = {
      studioId: studio._id,
      studioTitle: studio.title,
      bookingDate: formData.bookingDate,
      startTime: formData.startTime,
      durationHours: Number(formData.durationHours),
      noteToHost: formData.noteToHost,
      totalAmount,
    };

    try {
      const res = await fetch("http://localhost:5001/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const responseData = await res.json();

      if (res.status === 409) {
        alert(responseData.message || "This time slot is already reserved.");
        setBookingLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to place booking.");
      }

      alert("Reservation submitted successfully!");
      setIsModalOpen(false);
      window.location.href = "/my-bookings";
    } catch (err) {
      console.error(err);
      alert("Could not place booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <div className="p-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition"
      >
        Book Workspace Now
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121619] border border-zinc-800 text-white max-w-lg w-full p-6 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Book {studio.title}</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  ${studio.hourlyRate}.00 per hour · deposit $
                  {studio.securityDeposit.toLocaleString()}.00
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
              >
                <svg
                  className="w-5 h-5 stroke-current fill-none stroke-[2]"
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Date
                  </label>
                  <input
                    name="bookingDate"
                    type="date"
                    required
                    defaultValue="2026-11-03"
                    className="w-full bg-[#1a1f24] border border-zinc-700 text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Start
                  </label>
                  <select
                    name="startTime"
                    required
                    defaultValue="10:00"
                    className="w-full bg-[#1a1f24] border border-zinc-700 text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-amber-500"
                  >
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Hours
                  </label>
                  <select
                    name="durationHours"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full bg-[#1a1f24] border border-zinc-700 text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-amber-500"
                  >
                    <option value={1}>1 hr</option>
                    <option value={2}>2 hr</option>
                    <option value={4}>4 hr</option>
                    <option value={8}>8 hr</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Note to host (optional)
                </label>
                <textarea
                  name="noteToHost"
                  rows={2}
                  placeholder="What are you shooting or recording?"
                  className="w-full bg-[#1a1f24] border border-zinc-700 text-white text-xs p-3 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 p-2.5 rounded-lg">
                <svg
                  className="w-3.5 h-3.5 stroke-current fill-none stroke-[2]"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{studio.availabilityText}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <span className="text-xs text-zinc-400">
                  {hours} hr × ${studio.hourlyRate}.00
                </span>
                <span className="text-2xl font-black text-white">
                  ${totalAmount}.00
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs rounded-lg transition"
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
