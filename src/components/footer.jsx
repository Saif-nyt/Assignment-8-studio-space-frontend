import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
const exploreLinks = [
    { label: "Discover studios", href: "/studios" },
    { label: "How it works", href: "/how-it-works" },
    { label: "About StudioSpace", href: "/about" },
];
const hostLinks = [
    { label: "List your space", href: "/add-studio" },
    { label: "Manage listings", href: "/my-bookings" },
];
const socialLinks = [
    {
        label: "Instagram",
        href: "https://instagram.com",
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", className: "w-5 h-5", children: [_jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5" }), _jsx("circle", { cx: "12", cy: "12", r: "4" }), _jsx("circle", { cx: "18", cy: "6", r: "1", fill: "currentColor", stroke: "none" })] })),
    },
    {
        label: "X",
        href: "https://x.com",
        icon: (_jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: _jsx("path", { d: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.1L5.8 22H2.7l7.3-8.4L1.8 2h6.5l4.4 6.5L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" }) })),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: (_jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: _jsx("path", { d: "M5.2 3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0ZM1 8h4v15H1V8Zm7 0h3.8v2.1h.1c.5-1 1.8-2.5 4.1-2.5 4.4 0 5.2 2.9 5.2 6.7V23h-4v-7.7c0-1.8 0-4.1-2.5-4.1s-2.8 1.9-2.8 4V23H8V8Z" }) })),
    },
];
function FooterLinks({ title, links }) {
    return (_jsxs("div", { children: [_jsx("h3", { className: "text-base font-semibold text-white mb-6", children: title }), _jsx("ul", { className: "space-y-5", children: links.map((link) => (_jsx("li", { children: _jsx(Link, { href: link.href, className: "text-base text-slate-400 hover:text-amber-400 transition-colors duration-200", children: link.label }) }, link.href))) })] }));
}
export default async function Footer() {
    const year = new Date().getFullYear();
    return (_jsxs("footer", { className: "relative overflow-hidden bg-[#090d14] text-slate-300 border-t border-white/[0.07]", children: [_jsx("div", { className: "absolute -top-40 left-1/4 w-96 h-96 bg-amber-500/[0.045] blur-[120px] rounded-full pointer-events-none" }), _jsxs("div", { className: "relative max-w-[1600px] mx-auto px-6 sm:px-8", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 py-16 lg:py-20", children: [_jsxs("div", { className: "lg:col-span-5 space-y-7", children: [_jsxs(Link, { href: "/", className: "inline-flex items-center gap-3 group", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-[#111827] shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform duration-300", children: _jsxs("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "9" }), _jsx("path", { d: "M14.3 8 20 18" }), _jsx("path", { d: "M9.7 8h11.5" }), _jsx("path", { d: "m7.4 12 5.7-10" }), _jsx("path", { d: "m9.7 16-5.7-10" }), _jsx("path", { d: "M14.3 16H2.8" }), _jsx("path", { d: "m16.6 12-5.7 10" })] }) }), _jsxs("span", { className: "text-3xl font-bold tracking-tight text-white", children: ["Studio", _jsx("span", { className: "text-amber-400", children: "Space" })] })] }), _jsx("p", { className: "text-base leading-8 text-slate-400 max-w-md", children: "Discover and book inspiring creative spaces by the hour. From sunlit lofts to professional soundstages, find the perfect space for your next idea." }), _jsx("div", { className: "flex items-center gap-3 pt-1", children: socialLinks.map((social) => (_jsx("a", { href: social.href, target: "_blank", rel: "noopener noreferrer", "aria-label": social.label, className: "w-11 h-11 rounded-xl border border-white/10 bg-white/[0.025] flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 hover:bg-amber-400/[0.06] transition-all duration-200", children: social.icon }, social.label))) })] }), _jsx("div", { className: "lg:col-span-3", children: _jsx(FooterLinks, { title: "Explore", links: exploreLinks }) }), _jsxs("div", { className: "lg:col-span-4", children: [_jsx(FooterLinks, { title: "For space owners", links: hostLinks }), _jsxs("div", { className: "mt-9 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.025]", children: [_jsx("p", { className: "text-base font-semibold text-white", children: "Have a creative space?" }), _jsx("p", { className: "text-sm text-slate-400 mt-3 leading-7", children: "Turn your space into an opportunity. Start hosting today." }), _jsxs(Link, { href: "/add-studio", className: "inline-flex items-center gap-2 mt-5 text-base font-semibold text-amber-400 hover:text-amber-300 transition-colors", children: ["Become a host", _jsx("span", { "aria-hidden": "true", children: "\u2192" })] })] })] })] }), _jsxs("div", { className: "border-t border-white/[0.07] py-8 flex flex-col sm:flex-row items-center justify-between gap-5", children: [_jsxs("p", { className: "text-sm text-slate-500", children: ["\u00A9 ", year, " StudioSpace. All rights reserved."] }), _jsxs("div", { className: "flex items-center gap-6 text-sm text-slate-500", children: [_jsx(Link, { href: "/privacy", className: "hover:text-white transition-colors", children: "Privacy" }), _jsx(Link, { href: "/terms", className: "hover:text-white transition-colors", children: "Terms" })] }), _jsx("p", { className: "text-sm text-slate-500", children: "Made for creative minds." })] })] })] }));
}
