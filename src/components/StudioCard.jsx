'use client'

import Image from "next/image";
import Link from "next/link";



export default function StudioCard({ studio }) {
  const currency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111722] transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
      {/* Studio Image */}
      <div className="relative h-56 overflow-hidden bg-[#1a2230]">
        <Image
        width={100}
        height={100}
          src={studio.image}
          alt={studio.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
          {studio.category}
        </span>

        {/* Rating */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          <svg
            className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            viewBox="0 0 20 20"
          >
            <path d="m10 1.5 2.6 5.3 5.9.9-4.25 4.15 1 5.85L10 14.9l-5.25 2.8 1-5.85L1.5 7.7l5.9-.9L10 1.5Z" />
          </svg>
          {Number(studio.rating).toFixed(1)}
        </div>

        {/* Price on image */}
        <div className="absolute bottom-4 left-4">
          <p className="text-xs text-white/70">Starting from</p>
          <p className="text-2xl font-bold text-white">
            {currency(studio.hourlyRate)}
            <span className="text-sm font-normal text-white/70"> / hour</span>
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-amber-400">
            {studio.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
            <svg
              className="h-4 w-4 shrink-0 text-amber-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
            >
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>{studio.location}</span>
          </div>
        </div>

        {/* Overview */}
        {/* <p className="mb-5 min-h-[60px] text-sm leading-6 text-slate-400">
          {studio.overview}
        </p> */}

        {/* Quick Details */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Security deposit
            </p>
            <p className="mt-1 text-base font-semibold text-white">
              {currency(studio.securityDeposit)}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Max capacity
            </p>
            <p className="mt-1 text-base font-semibold text-white">
              {studio.maxCapacity} people
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-5">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
            What's included
          </p>

          <div className="flex flex-wrap gap-2">
            {studio.amenities?.length > 0 ? (
              studio.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-300"
                >
                  {amenity}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">
                No amenities listed
              </span>
            )}
          </div>
        </div>

        {/* Owner */}
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={studio.ownerImage}
              alt={studio.ownerName}
              className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
            />

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Hosted by
              </p>
              <p className="truncate text-sm font-medium text-white">
                {studio.ownerName}
              </p>
            </div>
          </div>

          <Link
            href={`/studios/${studio._id}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-black transition-all hover:bg-amber-400"
          >
            View studio
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
