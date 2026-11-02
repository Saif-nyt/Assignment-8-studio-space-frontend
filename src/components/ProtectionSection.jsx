import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ProtectionSection() {
    const features = [
        {
            title: "Liability protection",
            description: "Every confirmed booking is backed by up to $1M in liability coverage for hosts and creators.",
            icon: (_jsx("svg", { className: "w-6 h-6 text-[#22d3ee] stroke-current fill-none stroke-[2]", viewBox: "0 0 24 24", children: _jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }) })),
        },
        {
            title: "Verified hosts",
            description: "Hosts confirm their identity and space details before listings go live.",
            icon: (_jsxs("svg", { className: "w-6 h-6 text-[#22d3ee] stroke-current fill-none stroke-[2]", viewBox: "0 0 24 24", children: [_jsx("path", { d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" }), _jsx("path", { d: "M9 12l2 2 4-4" })] })),
        },
        {
            title: "Equipment safety",
            description: "Listed gear is inspected by hosts and security deposits protect both sides.",
            icon: (_jsx("svg", { className: "w-6 h-6 text-[#22d3ee] stroke-current fill-none stroke-[2]", viewBox: "0 0 24 24", children: _jsx("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }) })),
        },
        {
            title: "Creator support",
            description: "Real people on hand seven days a week if something on set doesn't go to plan.",
            icon: (_jsxs("svg", { className: "w-6 h-6 text-[#22d3ee] stroke-current fill-none stroke-[2]", viewBox: "0 0 24 24", children: [_jsx("path", { d: "M3 18v-6a9 9 0 0 1 18 0v6" }), _jsx("path", { d: "M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" })] })),
        },
    ];
    return (_jsxs("section", { className: "relative overflow-hidden bg-slate-50 px-6 py-24 text-slate-900 md:px-12 dark:bg-slate-950 dark:text-slate-50", children: [_jsx("div", { className: "pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-100 blur-[120px] dark:bg-amber-500/10" }), _jsx("div", { className: "pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-100 blur-[120px] dark:bg-cyan-500/10" }), _jsxs("div", { className: "relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 lg:grid-cols-12", children: [_jsxs("div", { className: "space-y-6 lg:col-span-5", children: [_jsx("span", { className: "block text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400", children: "HOST GUARANTEE & CREATOR SUPPORT" }), _jsx("h2", { className: "text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 md:text-5xl dark:text-slate-50", children: "Protected on both sides of the lens" }), _jsx("p", { className: "max-w-md text-base font-normal leading-relaxed text-slate-600 dark:text-slate-300", children: "Whether you’re opening your studio or booking one, StudioSpace keeps every session covered so you can focus on the work." })] }), _jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7", children: features.map((feature) => (_jsxs("div", { className: "space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-7 backdrop-blur-sm transition-colors hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-slate-600", children: [_jsx("div", { children: feature.icon }), _jsx("h3", { className: "text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50", children: feature.title }), _jsx("p", { className: "text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-300", children: feature.description })] }, feature.title))) })] })] }));
}
