import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

const fallbackImage =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <main className="min-h-screen bg-[#020b14] px-5 py-10 text-white md:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-[18px] border border-white/10 bg-[#0b1118] p-8 text-center">
          <h1 className="text-2xl font-bold text-white">Not logged in</h1>
          <p className="mt-2 text-slate-400">Please sign in to view your bookings.</p>
        </div>
      </main>
    );
  }

  const email = user.email.trim().toLowerCase();

  let bookings = [];

  try {
    const res = await fetch(
      `http://localhost:5001/my-bookings/${encodeURIComponent(email)}`,
      {
        credentials: "include",
        cache: "no-store",
      }
    );

    if (res.ok) {
      const text = await res.text();
      const parsed = text ? JSON.parse(text) : [];
      bookings = Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error("Failed to fetch bookings", error);
    bookings = [];
  }

  const prettifyDate = (value) => {
    if (!value) return "Date not set";
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#020b14] px-5 py-10 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-[980px] pt-4 lg:pt-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#f4b63a]">
          Bookings
        </p>

        <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] text-white md:text-[4rem] md:leading-[0.96]">
          My bookings
        </h1>

        <p className="mt-4 max-w-[700px] text-[17px] font-normal leading-relaxed text-slate-400">
          Every session you&apos;ve requested, confirmed or wrapped — with receipts ready to download.
        </p>

        {bookings.length === 0 ? (
          <div className="mt-10 rounded-[18px] border border-white/10 bg-[#0b1118] px-6 py-12 text-center shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-[18px] border border-white/10 bg-white/5 text-3xl text-white">
              ✓
            </div>
            <h2 className="mt-5 text-[1.5rem] font-bold text-white">No bookings yet</h2>
            <p className="mt-2 text-sm text-slate-400">
              Book a studio to see your upcoming sessions here.
            </p>
            <Link
              href="/studios"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#f4b63a] px-5 py-3 text-sm font-bold text-[#111827] shadow-[0_0_18px_rgba(244,182,58,0.25)] transition hover:bg-[#f7c04f]"
            >
              Browse studios
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-5">
            {bookings.map((booking, index) => {
              const bookingDate = booking.bookingDate || booking.date || "Date not set";
              const startTime = booking.startTime || booking.time || "--:--";
              const duration = booking.durationHours || booking.hours || 1;
              const total = booking.totalAmount ?? booking.total ?? 0;
              const title = booking.studioTitle || booking.title || `Booking ${index + 1}`;
              const status = booking.status || "PENDING";
              const studioId = booking.studioId || booking.id || booking._id;
              const image = booking.image || booking.studioImage || fallbackImage;
              const formattedDate = prettifyDate(bookingDate);
              const isCancelled = String(status).toUpperCase() === "CANCELLED";
              const isPending = String(status).toUpperCase() === "PENDING";

              return (
                <div
                  key={booking._id || `${title}-${index}`}
                  className="rounded-[18px] border border-white/10 bg-[#0b1118] px-4 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-1 items-start gap-4">
                      <div className="h-[110px] w-[110px] overflow-hidden rounded-[12px] border border-white/10 bg-slate-800">
                        <Image  width={100} height={100} 
                          src={image}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1 pt-1">
                        <h2 className="text-[1.05rem] font-bold tracking-[-0.03em] text-white sm:text-[1.3rem]">
                          {title}
                        </h2>

                        <div className="mt-2 flex items-center gap-2 text-[13px] text-slate-400">
                          <svg className="h-4 w-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span>{formattedDate}</span>
                          <span className="text-slate-500">•</span>
                          <span>
                            {startTime} - {startTime ? `${String(Number(startTime.split(":")[0]) + duration).padStart(2, "0")}:00` : "--:--"}
                          </span>
                          <span>({duration} hr)</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1">
                      <span
                        className={[
                          "inline-flex items-center justify-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]",
                          isPending
                            ? "border-[#c89211]/50 bg-[#b57a14]/20 text-[#f4b63a]"
                            : isCancelled
                              ? "border-[#d14e5a]/50 bg-[#7a2638]/20 text-[#f98996]"
                              : "border-[#b7a244]/40 bg-[#5d3c01]/30 text-[#f4d68e]",
                        ].join(" ")}
                      >
                        {status || "PENDING"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Total
                        </p>
                        <p className="mt-2 text-[2rem] font-black tracking-[-0.04em] text-white">
                          ${Number(total).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {!isCancelled && (
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-[#cf4a4a]/60 bg-[#1a0d12] px-4 py-2 text-sm font-semibold text-[#ff9a9a] transition hover:bg-[#281016]"
                          >
                            <svg className="h-4 w-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="9" />
                              <path d="M15 9L9 15M9 9l6 6" />
                            </svg>
                            Cancel booking
                          </button>
                        )}

                        {studioId ? (
                          <Link
                            href={`/studios/${studioId}`}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:text-white"
                          >
                            <svg className="h-4 w-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                              <path d="M12 22s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                              <circle cx="12" cy="11" r="2.5" />
                            </svg>
                            View studio
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:text-white"
                          >
                            <svg className="h-4 w-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                              <path d="M12 22s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                              <circle cx="12" cy="11" r="2.5" />
                            </svg>
                            View studio
                          </button>
                        )}
                      </div>
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
};

export default page;
