import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { Banner } from "@/components/banner";
import FeaturedSection from "@/components/FeaturedSection";
import HowBookingWorks from "@/components/HowBookingWorks";
import ProtectionSection from "@/components/ProtectionSection";
import React from 'react';

const categories = [
    {
        name: "Photo Studios",
        count: "24 spaces",
        image:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Film Stages",
        count: "18 spaces",
        image:
            "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Podcast Lounges",
        count: "12 spaces",
        image:
            "https://images.unsplash.com/photo-1497019403270-2d24d3482f0a?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Music Suites",
        count: "16 spaces",
        image:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Art Workshops",
        count: "9 spaces",
        image:
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Creative Offices",
        count: "14 spaces",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    },
];

const page = () => {
    return (_jsxs("div", { children: [_jsx(Banner, {}), _jsx(FeaturedSection, {}), _jsxs("section", { className: "bg-[#050b12] px-6 py-20 text-white md:px-10", children: [_jsxs("div", { className: "mx-auto max-w-[1600px]", children: [_jsxs("div", { className: "mb-10 flex flex-wrap items-end justify-between gap-6", children: [_jsxs("div", { children: [_jsx("p", { className: "mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f4b63a]", children: "Browse all" }), _jsx("h2", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: "Explore by category" })] }), _jsx(Link, { href: "/studios", className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#f4b63a]/60 hover:text-[#f4b63a]", children: ["Browse all categories", " ", _jsx("span", { children: "→" })] })] }),     _jsx("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", children: categories.map((category) => (_jsx(Link, { href: `/studios?category=${encodeURIComponent(category.name)}`, className: "group overflow-hidden rounded-[22px] border border-white/10 bg-[#0d141d] transition duration-300 hover:-translate-y-1 hover:border-[#f4b63a]/50 hover:bg-[#111a22]", children: _jsxs("div", { children: [_jsx("div", { className: "relative h-44 overflow-hidden", children: [_jsx("img", { src: category.image, alt: category.name, className: "h-full w-full object-cover transition duration-500 group-hover:scale-105" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" }), _jsx("span", { className: "absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm", children: category.count })] }), _jsxs("div", { className: "flex items-center justify-between gap-4 p-5", children: [_jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold text-white", children: category.name }), _jsx("p", { className: "mt-1 text-sm text-slate-400", children: "Hand-picked spaces" })] }), _jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-[#f4b63a] transition group-hover:border-[#f4b63a]/60 group-hover:bg-[#171d26]", children: "→" })] })] }) }, category.name)) ) })]}), _jsx(HowBookingWorks, {}), _jsx(ProtectionSection, {})] })] }));};
export default page;
