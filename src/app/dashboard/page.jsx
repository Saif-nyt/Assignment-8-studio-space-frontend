"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconBriefcase,
  IconCalendar,
  IconCirclePlus,
  IconClockHour4,
  IconInbox,
} from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

const API_BASE_URL = "http://localhost:5001";

const emptyStats = {
  studios: 0,
  bookings: 0,
  pending: 0,
};

export default function DashboardPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const userName = session?.user?.name || "Anonymous";
  const userEmail = session?.user?.email;

  const [stats, setStats] = useState(emptyStats);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) return;

    let cancelled = false;
    const normalizedEmail = userEmail.trim().toLowerCase();

    async function loadStats() {
      try {
        const [studiosRes, bookingsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/studios`, { credentials: "include" }),
          fetch(
            `${API_BASE_URL}/my-bookings/${encodeURIComponent(normalizedEmail)}`,
            { credentials: "include" }
          ),
        ]);

        const studios = studiosRes.ok ? await studiosRes.json() : [];
        const bookings = bookingsRes.ok ? await bookingsRes.json() : [];

        if (cancelled) return;

        const ownedStudios = Array.isArray(studios)
          ? studios.filter(
              (studio) =>
                (studio.ownerEmail || "").trim().toLowerCase() ===
                normalizedEmail
            )
          : [];

        const bookingList = Array.isArray(bookings) ? bookings : [];
        const pendingRequests = bookingList.filter(
          (booking) =>
            String(booking.status || "PENDING").toUpperCase() === "PENDING"
        ).length;

        setStats({
          studios: ownedStudios.length,
          bookings: bookingList.length,
          pending: pendingRequests,
        });
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        if (!cancelled) {
          setStatsLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, [userEmail]);

  const isStatsLoading =
    sessionLoading || (statsLoading && Boolean(userEmail));
  const displayedStats = userEmail ? stats : emptyStats;

  const summaryCards = [
    {
      icon: IconInbox,
      value: displayedStats.studios,
      label: "Studio listings",
      caption: "Spaces you host",
    },
    {
      icon: IconCalendar,
      value: displayedStats.bookings,
      label: "Bookings made",
      caption: "Sessions you requested",
    },
    {
      icon: IconClockHour4,
      value: displayedStats.pending,
      label: "Pending requests",
      caption: "Awaiting host approval",
    },
  ];

  return (
    <main className="min-h-screen bg-[#020b14] px-5 py-10 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1180px] pt-4 lg:pt-8">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#f7b21a]">
            Dashboard
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-white md:text-[3.2rem] md:leading-[1.08]">
            Welcome back, {userName}
          </h1>

          <p className="mt-3 text-base text-slate-400 md:text-lg">
            Your spaces, your bookings and everything waiting on a host&apos;s reply.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {summaryCards.map(({ icon: Icon, value, label, caption }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0b1118] px-5 py-5 shadow-[0_16px_40px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f7b21a]/20 bg-[#f7b21a]/8 text-[#f7b21a]">
                  <Icon size={18} stroke={1.8} />
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-full text-[#f7b21a]">
                  <IconArrowUpRight size={17} stroke={2} />
                </div>
              </div>

              <div className="mt-8 text-[2.8rem] font-black leading-none tracking-[-0.06em] text-white">
                {isStatsLoading ? "—" : value}
              </div>

              <div className="mt-3 text-[1.05rem] font-medium text-white/95">
                {label}
              </div>

              <div className="mt-1 text-sm text-slate-400">{caption}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Link
            href="/add-studio"
            className="rounded-[22px] border border-white/10 bg-[#0b1118] px-5 py-7 transition hover:border-white/15 hover:bg-[#101923]"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[1.2rem] font-semibold text-white">
                Host a new space
              </h2>
            </div>

            <p className="max-w-[380px] text-[0.96rem] leading-7 text-slate-400">
              Add photos, set your hourly rate and start taking bookings this week.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f7b21a] px-5 py-3 text-sm font-semibold text-[#111827] shadow-[0_0_25px_rgba(247,178,26,0.28)] transition hover:bg-[#f9be3d]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-[#f7b21a]">
                <IconCirclePlus size={14} stroke={2.2} />
              </span>
              Add new studio
            </div>
          </Link>

          <Link
            href="/studios"
            className="rounded-[22px] border border-white/10 bg-[#0b1118] px-5 py-7 transition hover:border-white/15 hover:bg-[#101923]"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[1.2rem] font-semibold text-white">
                Find your next room
              </h2>
            </div>

            <p className="max-w-[420px] text-[0.96rem] leading-7 text-slate-400">
              Browse verified spaces by craft, rate and capacity — booked by the hour.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 text-white">
                <IconBriefcase size={12} stroke={2} />
              </span>
              Explore studios
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
