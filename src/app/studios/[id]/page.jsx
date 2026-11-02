import Image from "next/image";
import BookWorkshopNowButton from "../../../components/BookWorkshopNowButton";

export const dynamic = "force-dynamic";

export default async function StudioDetailsPage({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:5001/studios/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch studio details");
  }

  const studio = await res.json();
  const title = studio.title || "Studio Workspace";
  const category = studio.category || "Studio";
  const rating = studio.rating || 5.0;
  const reviewCount = studio.reviewCount || 1;
  const location = studio.location || "Location not specified";
  const hourlyRate = studio.hourlyRate || 0;
  const securityDeposit = studio.securityDeposit || 0;
  const maxCapacity = studio.maxCapacity ? `${studio.maxCapacity} people` : "Flexible";
  const overview = studio.overview || "No overview provided.";
  const amenities = studio.amenities || [];
  const reviews = studio.reviews || [{ name: "Verified Creator", date: "Nov 2, 2026", rating: 5, comment: "Amazing space with great equipment and environment." }];
  const mainImage = studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1600";

  return (
    <div className="min-h-screen bg-[#090d14] pb-24 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900 shadow-2xl">
          <div className="relative h-[480px] w-full md:h-[540px]">
            <Image width={1600} height={900} src={mainImage} alt={title} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090d14]/80 via-transparent to-black/30" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full border border-slate-700/60 bg-slate-800/80 px-3 py-1 text-xs font-semibold text-slate-300">{category}</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{Number(rating).toFixed(1)}</span>
                  <span className="font-normal text-slate-400">({reviewCount})</span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">{title}</h1>
                <button type="button" className="shrink-0 rounded-full border border-slate-800 bg-[#111622] p-3 text-slate-300 transition hover:text-white">
                  <svg className="h-5 w-5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                <svg className="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{location}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800/80 bg-[#111622] p-5">
                <p className="mb-1 text-xs font-medium text-slate-400">Hourly rate</p>
                <p className="text-2xl font-black text-white">${hourlyRate}.00</p>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-[#111622] p-5">
                <p className="mb-1 text-xs font-medium text-slate-400">Security deposit</p>
                <p className="text-2xl font-black text-white">${securityDeposit}.00</p>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-[#111622] p-5">
                <p className="mb-1 text-xs font-medium text-slate-400">Max capacity</p>
                <p className="text-2xl font-black text-white">{maxCapacity}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white">Overview</h2>
              <p className="text-sm leading-relaxed font-normal text-slate-300">{overview}</p>
            </div>

            {amenities.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Amenities</h2>
                <div className="flex flex-wrap gap-2.5">
                  {amenities.map((amenity, index) => (
                    <div key={`${amenity}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-[#111622] px-4 py-2 text-xs font-medium text-slate-300">
                      <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-[2.5] text-cyan-400" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white">Upcoming booked slots</h2>
              <p className="text-sm font-normal text-slate-400">Wide open — no confirmed bookings yet.</p>
            </div>

            <div className="space-y-6 border-t border-slate-800/80 pt-4">
              <h2 className="text-xl font-bold text-white">Reviews ({reviews.length})</h2>
              <div className="space-y-4 rounded-2xl border border-slate-800/80 bg-[#111622] p-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg key={index} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <textarea rows={3} placeholder="How was your session?" className="w-full resize-none rounded-xl border border-slate-800 bg-[#181f2e] p-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-500" />
                <div className="flex justify-start">
                  <button type="button" className="rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-500">
                    Submit review
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-3xl border border-slate-800/80 bg-[#111622] p-6 shadow-2xl">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800 text-sm font-bold text-white">
                  {studio.ownerName?.charAt(0) || "H"}
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{studio.ownerName || "Host"}</p>
                  <p className="text-xs text-slate-400">Hosting since November 2026</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#181f2e] px-3 py-2">
                  <span>Response time</span>
                  <span className="font-bold text-white">Within 1 hour</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#181f2e] px-3 py-2">
                  <span>Availability</span>
                  <span className="font-bold text-emerald-400">Open</span>
                </div>
              </div>

              <div className="mt-6">
                <BookWorkshopNowButton
                  studioId={id}
                  studioTitle={title}
                  hourlyRate={hourlyRate}
                  securityDeposit={securityDeposit}
                  availabilityText="Available Tue, Nov 3 · 10:00-12:00"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
