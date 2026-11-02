'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import StudioCard, { Studio } from "@/components/StudioCard";
import SkeletonCard from "@/components/SkeletonCard";
const CATEGORIES = [
    "All categories",
    "Photo Studios",
    "Film Stages",
    "Podcast Lounges",
    "Music Suites",
    "Art Workshops",
];
export default function ExploreStudiosPage() {
    const [studios, setStudios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("All categories");
    const [maxRate, setMaxRate] = useState(500);
    useEffect(() => {
        const controller = new AbortController();
        async function fetchStudios() {
            try {
                const res = await fetch("http://localhost:5001/studios", {
                    signal: controller.signal,
                });
                if (!res.ok) {
                    throw new Error("Unable to load studios.");
                }
                const data = await res.json();
                if (!Array.isArray(data)) {
                    throw new Error("Invalid studio data received.");
                }
                setStudios(data);
                setError("");
            }
            catch (err) {
                if (err instanceof Error && err.name === "AbortError")
                    return;
                console.error("Studio fetch error:", err);
                setError("We couldn't load the studios. Please try again.");
            }
            finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }
        fetchStudios();
        return () => controller.abort();
    }, []);
    const visibleStudios = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return studios.filter((studio) => {
            const searchableText = [
                studio.title,
                studio.location,
                studio.category,
                studio.overview,
                ...(studio.amenities ?? []),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            const matchesSearch = searchableText.includes(query);
            const matchesCategory = category === "All categories" ||
                studio.category === category;
            const matchesRate = Number(studio.hourlyRate) <= maxRate;
            return matchesSearch && matchesCategory && matchesRate;
        });
    }, [studios, searchQuery, category, maxRate]);
    const resetFilters = () => {
        setSearchQuery("");
        setCategory("All categories");
        setMaxRate(500);
    };
    return (_jsx("main", { className: "min-h-screen bg-[#090b10] text-white", children: _jsxs("div", { className: "mx-auto max-w-[1600px] px-6 py-16 md:px-10", children: [_jsxs("div", { className: "mb-10", children: [_jsxs("div", { className: "mb-4 flex items-center gap-3", children: [_jsx("span", { className: "h-px w-8 bg-amber-500" }), _jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-amber-500", children: "Discover creative spaces" })] }), _jsxs("h1", { className: "text-4xl font-semibold tracking-tight md:text-5xl", children: ["Find your perfect", _jsx("span", { className: "text-white/40", children: " studio." })] }), _jsx("p", { className: "mt-4 max-w-xl text-sm leading-7 text-slate-400 md:text-base", children: "Explore unique creative spaces for photography, filmmaking, podcasts and everything in between." })] }), _jsxs("div", { className: "mb-8 rounded-2xl border border-white/[0.08] bg-[#111722] p-5 md:p-6", children: [_jsxs("div", { className: "grid grid-cols-1 items-end gap-5 md:grid-cols-12", children: [_jsxs("div", { className: "md:col-span-5", children: [_jsx("label", { className: "mb-2 block text-xs font-semibold text-slate-400", children: "Search studios" }), _jsxs("div", { className: "relative", children: [_jsxs("svg", { className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500", fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("path", { d: "m21 21-4.35-4.35" })] }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Studio name, location, amenities...", className: "w-full rounded-xl border border-white/[0.08] bg-[#090e18] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-500" })] })] }), _jsxs("div", { className: "md:col-span-4", children: [_jsx("label", { className: "mb-2 block text-xs font-semibold text-slate-400", children: "Studio category" }), _jsx("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full cursor-pointer appearance-none rounded-xl border border-white/[0.08] bg-[#090e18] px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500", children: CATEGORIES.map((cat) => (_jsx("option", { value: cat, children: cat }, cat))) })] }), _jsxs("div", { className: "md:col-span-3", children: [_jsxs("div", { className: "mb-3 flex items-center justify-between", children: [_jsx("label", { className: "text-xs font-semibold text-slate-400", children: "Maximum hourly rate" }), _jsxs("span", { className: "text-sm font-semibold text-amber-400", children: ["$", maxRate, maxRate === 500 ? "+" : ""] })] }), _jsx("input", { type: "range", min: "50", max: "500", step: "25", value: maxRate, onChange: (e) => setMaxRate(Number(e.target.value)), className: "w-full cursor-pointer accent-amber-500" }), _jsxs("div", { className: "mt-1 flex justify-between text-[10px] text-slate-600", children: [_jsx("span", { children: "$50" }), _jsx("span", { children: "$500+" })] })] })] }), _jsxs("div", { className: "mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4", children: [_jsx("p", { className: "text-xs text-slate-500", children: "Refine your search to find the right creative space." }), _jsx("button", { onClick: resetFilters, className: "text-xs font-semibold text-amber-400 transition hover:text-amber-300", children: "Reset filters \u2197" })] })] }), _jsx("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-white", children: "Explore spaces" }), _jsx("p", { className: "mt-1 text-xs text-slate-500", children: loading
                                    ? "Finding available studios..."
                                    : `${visibleStudios.length} ${visibleStudios.length === 1 ? "studio" : "studios"} found` })] }) }), loading && (_jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 6 }).map((_, i) => (_jsx(SkeletonCard, {}, i))) })), !loading && error && (_jsxs("div", { className: "rounded-2xl border border-red-500/20 bg-red-500/[0.05] py-16 text-center", children: [_jsx("p", { className: "font-semibold text-white", children: "Something went wrong" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: error }), _jsx("button", { onClick: () => window.location.reload(), className: "mt-5 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-400", children: "Try again" })] })), !loading && !error && visibleStudios.length === 0 && (_jsxs("div", { className: "rounded-2xl border border-white/[0.08] bg-[#111722] px-6 py-20 text-center", children: [_jsx("div", { className: "mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-2xl", children: "\u25C7" }), _jsx("h3", { className: "text-lg font-semibold", children: "No studios found" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Try changing your search or adjusting your filters." }), _jsx("button", { onClick: resetFilters, className: "mt-6 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-black hover:bg-amber-400", children: "Clear all filters" })] })), !loading && !error && visibleStudios.length > 0 && (_jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", children: visibleStudios.map((studio) => (_jsx(StudioCard, { studio: studio }, studio._id))) }))] }) }));
}
