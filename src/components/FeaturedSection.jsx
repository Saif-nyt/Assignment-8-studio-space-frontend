"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function FeaturedStudios() {
  const router = useRouter();

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturedStudios = async () => {
      try {
        const response = await fetch("http://localhost:5001/studios/featured", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch featured studios.");
        }

        const data = await response.json();
        setStudios(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Featured studios error:", err);
        setError("Unable to load featured studios.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFeaturedStudios();

    return () => controller.abort();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  if (loading) {
    return (
      <section className="bg-[#090b10] px-6 py-16 text-white md:px-10 max-w-2xl mx-auto">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-8 text-sm text-slate-400">
            Loading featured studios...
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[450px] animate-pulse rounded-2xl bg-[#111820]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#090b10] px-6 py-16 text-center text-white max-w-2xl mx-auto">
        <p className="text-slate-400">{error}</p>
      </section>
    );
  }

  return (
    <section className="bg-[#090b10] px-6 py-16 text-white md:px-10 max-w-3xl mx-auto">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Featured
            </p>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Top-rated spaces this week
            </h2>
          </div>

          <button
            onClick={() => router.push("/studios")}
            className="flex items-center gap-3 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-amber-500 hover:text-amber-400"
          >
            View all
            <span className="text-lg">→</span>
          </button>
        </div>

        {/* Empty State */}
        {studios.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#111820] py-20 text-center">
            <h3 className="text-lg font-semibold">No featured studios yet</h3>
            <p className="mt-2 text-sm text-slate-400">
              Check back soon for featured creative spaces.
            </p>
          </div>
        ) : (
          /* Studio Grid */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-[22px] border border-white/10 bg-[#111820] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/30"
              >
                {/* Image */}
                <div className="relative h-[260px] overflow-hidden sm:h-[300px]">
                  <Image
                    width={100}
                    height={100}
                    src={studio.image || "/placeholder-studio.jpg"}
                    alt={studio.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

                  {/* Category */}
                  <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    {studio.category}
                  </span>

                  {/* Favorite */}
                  <button
                    type="button"
                    onClick={() => toggleFavorite(studio._id)}
                    aria-label="Toggle favorite"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl text-white backdrop-blur-md transition hover:bg-black/80"
                  >
                    <span
                      className={
                        favorites.includes(studio._id)
                          ? "text-red-500"
                          : "text-white"
                      }
                    >
                      {favorites.includes(studio._id) ? "♥" : "♡"}
                    </span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-5">
                  {/* Title and Rating */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 truncate text-lg font-bold tracking-tight text-white">
                      {studio.title}
                    </h3>

                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-400">
                      ★ {Number(studio.rating || 0).toFixed(1)}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                    <svg
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                      />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>

                    <span className="truncate">{studio.location}</span>
                  </div>

                  {/* Price and Button */}
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-2xl font-bold text-white">
                        ${studio.hourlyRate}
                      </span>
                      <span className="text-sm text-slate-400">/hr</span>
                    </div>

                    <button
                      onClick={() => router.push(`/studios/${studio._id}`)}
                      className="rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-amber-400"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
