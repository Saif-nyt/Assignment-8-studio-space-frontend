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
        const response = await fetch(`${process.env.BACKEND_URL || "http://localhost:5001"}/studios/featured`, {
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
      <section className="bg-slate-50 px-4 py-14 text-slate-900 sm:px-6 md:px-10 dark:bg-slate-950 dark:text-slate-50">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">Loading featured studios...</p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[420px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800 sm:h-[440px]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-slate-50 px-4 py-14 text-center text-slate-900 sm:px-6 md:px-10 dark:bg-slate-950 dark:text-slate-50">
        <p className="text-slate-500 dark:text-slate-400">{error}</p>
      </section>
    );
  }

  return (
    <section className="featured-section bg-slate-50 px-4 py-14 text-slate-900 sm:px-6 md:px-10 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Featured
            </p>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Top-rated spaces this week
            </h2>
          </div>

          <button
            onClick={() => router.push("/studios")}
            className="inline-flex items-center justify-center gap-3 self-start rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-amber-500 hover:text-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-amber-400 dark:hover:text-amber-400 sm:self-auto"
          >
            View all
            <span className="text-lg">→</span>
          </button>
        </div>

        {studios.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">No featured studios yet</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Check back soon for featured creative spaces.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {studios.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900 dark:hover:border-amber-500/60 dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <div className="relative h-[240px] overflow-hidden sm:h-[260px]">
                  <Image
                    width={100}
                    height={100}
                    src={studio.image || "/placeholder-studio.jpg"}
                    alt={studio.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-slate-900/10" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-800 backdrop-blur-md shadow-sm dark:bg-slate-800/80 dark:text-slate-100">
                    {studio.category}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(studio._id)}
                    aria-label="Toggle favorite"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-xl text-slate-800 backdrop-blur-md shadow-sm transition hover:bg-white dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    <span
                      className={
                        favorites.includes(studio._id)
                          ? "text-red-500"
                          : "text-slate-800"
                      }
                    >
                      {favorites.includes(studio._id) ? "♥" : "♡"}
                    </span>
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 truncate text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                      {studio.title}
                    </h3>

                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
                      ★ {Number(studio.rating || 0).toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
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

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                        ${studio.hourlyRate}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">/hr</span>
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
