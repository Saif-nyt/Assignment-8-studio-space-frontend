import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CancelBookingButton from "@/components/CancelBookingButton";

const fallbackImage =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";

const API_BASE =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://assignment-8-studio-space-backend.vercel.app";

async function getBookings(email, token) {
  try {
    const res = await fetch(
      `${API_BASE}/my-bookings/${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error("Booking API error:", res.status, await res.text());
      return [];
    }

    const data = await res.json();
    const bookings = Array.isArray(data)
      ? data
      : Array.isArray(data.bookings)
        ? data.bookings
        : [];

    const studiosRes = await fetch(`${API_BASE}/studios`, {
      cache: "no-store",
    });

    let studioImages = {};

    if (studiosRes.ok) {
      const studiosData = await studiosRes.json();
      const studios = Array.isArray(studiosData)
        ? studiosData
        : Array.isArray(studiosData.studios)
          ? studiosData.studios
          : [];

      studioImages = Object.fromEntries(
        studios.map((studio) => [
          String(studio._id),
          studio.image || studio.images?.[0] || null,
        ]),
      );
    }

    return bookings.map((booking) => ({
      ...booking,
      image: booking.image || studioImages[String(booking.studioId)] || null,
    }));
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

function prettifyDate(value) {
  if (!value) return "Date not set";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getEndTime(startTime, duration) {
  if (!startTime || !startTime.includes(":")) return "--:--";

  const [hours, minutes] = startTime.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) return "--:--";

  const endMinutes = hours * 60 + minutes + Number(duration) * 60;
  const normalizedMinutes = ((endMinutes % 1440) + 1440) % 1440;

  const endHours = Math.floor(normalizedMinutes / 60);
  const endMinute = normalizedMinutes % 60;

  return `${String(endHours).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
}

function getStatusStyle(status) {
  const normalized = String(status || "PENDING").toUpperCase();

  if (normalized === "CONFIRMED") {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
  }

  if (normalized === "CANCELLED") {
    return "border-red-500/20 bg-red-500/10 text-red-400";
  }

  if (normalized === "COMPLETED") {
    return "border-blue-500/20 bg-blue-500/10 text-blue-400";
  }

  return "border-amber-500/20 bg-amber-500/10 text-amber-400";
}

export default async function MyBookingsPage() {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
    query: {
      disableCookieCache: true,
    },
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <main className="min-h-screen bg-[#020b14] px-5 py-10 text-white md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1440px] rounded-[18px] border border-white/10 bg-[#0b1118] p-10 text-center">
          <h1 className="text-3xl font-bold text-white">Not logged in</h1>

          <p className="mt-3 text-base text-slate-400">
            Please sign in to view your bookings.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-full bg-[#f4b63a] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#f7c04f]"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  const tokenResponse = await auth.api.getToken({
    headers: requestHeaders,
  });

  const token = tokenResponse?.token;

  if (!token) {
    return (
      <main className="min-h-screen bg-[#020b14] px-5 py-10 text-white md:px-8">
        <div className="mx-auto max-w-[1440px] rounded-2xl border border-white/10 bg-[#0b1118] p-10 text-center">
          <h1 className="text-2xl font-bold">Session expired</h1>
          <p className="mt-3 text-slate-400">
            Please sign in again to view your bookings.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-full bg-[#f4b63a] px-6 py-3 text-sm font-bold text-black"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  const email = user.email.trim().toLowerCase();
  const bookings = await getBookings(email, token);

  return (
    <main className="min-h-screen bg-[#020b14] px-5 py-12 text-white md:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-[1440px] pt-4 lg:pt-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f4b63a]">
            Bookings
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">
            My bookings
          </h1>

          <p className="mt-5 max-w-[750px] text-base leading-8 text-slate-400 md:text-lg">
            Every session you&apos;ve requested, confirmed or wrapped — all in
            one place.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0b1118] px-6 py-16 text-center shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl text-white">
              ✓
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              No bookings yet
            </h2>

            <p className="mt-3 text-base text-slate-400">
              Book a studio to see your sessions here.
            </p>

            <Link
              href="/studios"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#f4b63a] px-7 py-3 text-sm font-bold text-[#111827] shadow-[0_0_18px_rgba(244,182,58,0.25)] transition hover:bg-[#f7c04f]"
            >
              Browse studios
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => {
              const bookingDate = booking.bookingDate || booking.date;
              const startTime = booking.startTime || booking.time || "--:--";

              const duration = Math.max(
                0,
                Number(booking.durationHours || booking.hours || 1),
              );

              const total = Number(booking.totalAmount ?? booking.total ?? 0);

              const title =
                booking.studioTitle || booking.title || `Booking ${index + 1}`;

              const status = String(booking.status || "PENDING").toUpperCase();

              const studioId = booking.studioId || booking.id;
              const image = booking.image || fallbackImage;

              const isCancelled = status === "CANCELLED";

              return (
                <div
                  key={booking._id || `${title}-${index}`}
                  className="rounded-2xl border border-white/10 bg-[#0b1118] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.18)] transition hover:border-white/20 md:p-7"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-1 gap-5">
                      <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-800 md:h-[140px] md:w-[160px]">
                        <Image
                          fill
                          sizes="(max-width: 768px) 110px, 160px"
                          src={image}
                          alt={title}
                          className="object-cover"
                          unoptimized
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>

                      <div className="min-w-0 pt-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-lg font-bold tracking-tight text-white md:text-2xl">
                            {title}
                          </h2>

                          <span
                            className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(status)}`}
                          >
                            {status}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                          <span>{prettifyDate(bookingDate)}</span>
                          <span className="text-slate-600">•</span>
                          <span>
                            {startTime} - {getEndTime(startTime, duration)}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span>{duration} hr</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Total
                      </p>

                      <p className="mt-2 text-3xl font-black tracking-tight text-white">
                        ${Number.isFinite(total) ? total.toFixed(2) : "0.00"}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {!isCancelled && booking._id && (
                        <CancelBookingButton bookingId={booking._id} />
                      )}

                      {studioId && (
                        <Link
                          href={`/studios/${studioId}`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:text-white"
                        >
                          View studio
                          <span>→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
