
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function BookWorkshopNowButton({
    studioId,
    studioTitle = "Stage 9 Soundstage",
    hourlyRate = 240,
    securityDeposit = 1000,
    availabilityText = "Available Tue, Nov 3 · 10:00-12:00",
}) {
    const params = useParams();
    const routeStudioId = params?.id;
    const resolvedStudioId = studioId || routeStudioId;
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [hours, setHours] = useState(2);

    const studio = {
        _id: resolvedStudioId,
        title: studioTitle,
        hourlyRate,
        securityDeposit,
        availabilityText,
    };

    const totalAmount = Number(hourlyRate) * hours;

    async function handleBookingSubmit(event) {
        event.preventDefault();

        if (!user?.email) {
            alert("Please sign in to book a studio.");
            return;
        }

        setBookingLoading(true);
        const form = event.currentTarget;
        const formData = Object.fromEntries(new FormData(form));
        const payload = {
            studioId: resolvedStudioId,
            studioTitle: studio.title,
            email: user.email.trim().toLowerCase(),
            userName: user.name || user.email,
            bookingDate: formData.bookingDate,
            startTime: formData.startTime,
            durationHours: Number(formData.durationHours),
            noteToHost: formData.noteToHost,
            totalAmount,
        };
        try {
            const res = await fetch(`${process.env.BACKEND_URL || "http://localhost:5001"}/bookings`, {
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
        }
        catch (err) {
            console.error(err);
            alert("Could not place booking. Please try again.");
        }
        finally {
            setBookingLoading(false);
        }
    }
    return _jsxs("div", {
      className: "p-8",
      children: [
        _jsx("button", {
          onClick: () => setIsModalOpen(true),
          className:
            "bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition",
          children: "Book Workspace Now",
        }),
        isModalOpen &&
          _jsx("div", {
            className:
              "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4",
            children: _jsxs("div", {
              className:
                "bg-[#121619] border border-zinc-800 text-white max-w-lg w-full p-6 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-200",
              children: [
                _jsxs("div", {
                  className: "flex items-start justify-between mb-4",
                  children: [
                    _jsxs("div", {
                      children: [
                        _jsxs("h2", {
                          className: "text-xl font-bold",
                          children: ["Book ", studio.title],
                        }),
                        _jsxs("p", {
                          className: "text-xs text-zinc-400 mt-0.5",
                          children: [
                            "$",
                            studio.hourlyRate,
                            ".00 per hour \u00B7 deposit $",
                            studio.securityDeposit.toLocaleString(),
                            ".00",
                          ],
                        }),
                      ],
                    }),
                    _jsx("button", {
                      onClick: () => setIsModalOpen(false),
                      className:
                        "text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition",
                      children: _jsxs("svg", {
                        className:
                          "w-5 h-5 stroke-current fill-none stroke-[2]",
                        viewBox: "0 0 24 24",
                        children: [
                          _jsx("line", {
                            x1: "18",
                            y1: "6",
                            x2: "6",
                            y2: "18",
                          }),
                          _jsx("line", {
                            x1: "6",
                            y1: "6",
                            x2: "18",
                            y2: "18",
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                _jsxs("form", {
                  onSubmit: handleBookingSubmit,
                  className: "space-y-4",
                  children: [
                    _jsxs("div", {
                      className: "grid grid-cols-3 gap-3",
                      children: [
                        _jsxs("div", {
                          children: [
                            _jsx("label", {
                              className:
                                "block text-[11px] font-semibold text-zinc-400 mb-1",
                              children: "Date",
                            }),
                            _jsx("input", {
                              name: "bookingDate",
                              type: "date",
                              required: true,
                              defaultValue: "2026-11-03",
                              className:
                                "w-full bg-[#1a1f24] border border-zinc-700 text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-amber-500",
                            }),
                          ],
                        }),
                        _jsxs("div", {
                          children: [
                            _jsx("label", {
                              className:
                                "block text-[11px] font-semibold text-zinc-400 mb-1",
                              children: "Start",
                            }),
                            _jsxs("select", {
                              name: "startTime",
                              required: true,
                              defaultValue: "10:00",
                              className:
                                "w-full bg-[#1a1f24] border border-zinc-700 text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-amber-500",
                              children: [
                                _jsx("option", {
                                  value: "09:00",
                                  children: "09:00",
                                }),
                                _jsx("option", {
                                  value: "10:00",
                                  children: "10:00",
                                }),
                                _jsx("option", {
                                  value: "11:00",
                                  children: "11:00",
                                }),
                                _jsx("option", {
                                  value: "12:00",
                                  children: "12:00",
                                }),
                              ],
                            }),
                          ],
                        }),
                        _jsxs("div", {
                          children: [
                            _jsx("label", {
                              className:
                                "block text-[11px] font-semibold text-zinc-400 mb-1",
                              children: "Hours",
                            }),
                            _jsxs("select", {
                              name: "durationHours",
                              value: hours,
                              onChange: (e) => setHours(Number(e.target.value)),
                              className:
                                "w-full bg-[#1a1f24] border border-zinc-700 text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-amber-500",
                              children: [
                                _jsx("option", { value: 1, children: "1 hr" }),
                                _jsx("option", { value: 2, children: "2 hr" }),
                                _jsx("option", { value: 4, children: "4 hr" }),
                                _jsx("option", { value: 8, children: "8 hr" }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      children: [
                        _jsx("label", {
                          className:
                            "block text-[11px] font-semibold text-zinc-400 mb-1",
                          children: "Note to host (optional)",
                        }),
                        _jsx("textarea", {
                          name: "noteToHost",
                          rows: 2,
                          placeholder: "What are you shooting or recording?",
                          className:
                            "w-full bg-[#1a1f24] border border-zinc-700 text-white text-xs p-3 rounded-lg focus:outline-none focus:border-amber-500",
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className:
                        "flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 p-2.5 rounded-lg",
                      children: [
                        _jsxs("svg", {
                          className:
                            "w-3.5 h-3.5 stroke-current fill-none stroke-[2]",
                          viewBox: "0 0 24 24",
                          children: [
                            _jsx("circle", { cx: "12", cy: "12", r: "10" }),
                            _jsx("polyline", { points: "12 6 12 12 16 14" }),
                          ],
                        }),
                        _jsx("span", { children: studio.availabilityText }),
                      ],
                    }),
                    _jsxs("div", {
                      className:
                        "flex items-center justify-between pt-2 border-t border-zinc-800",
                      children: [
                        _jsxs("span", {
                          className: "text-xs text-zinc-400",
                          children: [
                            hours,
                            " hr \u00D7 $",
                            studio.hourlyRate,
                            ".00",
                          ],
                        }),
                        _jsxs("span", {
                          className: "text-2xl font-black text-white",
                          children: ["$", totalAmount, ".00"],
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className: "flex items-center justify-end gap-3 pt-3",
                      children: [
                        _jsx("button", {
                          type: "button",
                          onClick: () => setIsModalOpen(false),
                          className:
                            "px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg transition",
                          children: "Cancel",
                        }),
                        _jsx("button", {
                          type: "submit",
                          disabled: bookingLoading,
                          className:
                            "px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs rounded-lg transition",
                          children: bookingLoading
                            ? "Booking..."
                            : "Confirm booking",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    });
}