import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function HowBookingWorks() {
    const steps = [
        {
            number: "01",
            title: "Find your space",
            description: "Explore studios by category, location and price. Discover the perfect creative space for your next project.",
            icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", className: "w-6 h-6", children: [_jsx("circle", { cx: "11", cy: "11", r: "7.5" }), _jsx("path", { d: "m16.5 16.5 4 4" })] })),
        },
        {
            number: "02",
            title: "Pick your hours",
            description: "Select your preferred date and time. Our live availability system makes scheduling simple and reliable.",
            icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", className: "w-6 h-6", children: [_jsx("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }), _jsx("path", { d: "M16 3v4M8 3v4M3 10h18M8 14h3" })] })),
        },
        {
            number: "03",
            title: "Request & confirm",
            description: "Send your booking request and let the host confirm. Your booking receipt is ready to download.",
            icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", className: "w-6 h-6", children: [_jsx("rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }), _jsx("path", { d: "M2 10h20M6 15h4" })] })),
        },
        {
            number: "04",
            title: "Show up & create",
            description: "Arrive at your studio, meet your host and enjoy a space designed to bring your creative vision to life.",
            icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", className: "w-6 h-6", children: [_jsx("path", { d: "M12 2v4m0 12v4M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83m0-14.14-2.83 2.83m-8.48 8.48-2.83 2.83" }), _jsx("circle", { cx: "12", cy: "12", r: "5" })] })),
        },
    ];
    return (_jsxs("section", { id: "HowBookingWorks", className: "relative overflow-hidden bg-slate-50 py-24 px-6 text-slate-900 md:px-12 md:py-32 dark:bg-slate-950 dark:text-slate-50", children: [_jsx("div", { className: "absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-amber-500/[0.06] blur-[120px] pointer-events-none" }), _jsxs("div", { className: "relative z-10 mx-auto max-w-[1600px]", children: [_jsxs("div", { className: "mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "mb-5 flex items-center gap-3", children: [_jsx("span", { className: "h-px w-8 bg-amber-500" }), _jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-amber-500 dark:text-amber-400", children: "HOW BOOKING WORKS" })] }), _jsxs("h2", { className: "max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl lg:text-6xl", children: ["Your next creative space,", _jsx("span", { className: "block text-slate-500 dark:text-slate-400", children: "just four steps away." })] })] }), _jsx("p", { className: "max-w-sm text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-300", children: "Finding and booking your perfect studio shouldn't be complicated. We've made the entire process effortless." })] }), _jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: steps.map((step, index) => (_jsxs("div", { className: "group relative flex min-h-[310px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/40 hover:shadow-[0_20px_60px_rgba(245,158,11,0.08)] md:p-8 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-amber-500/40 dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)]", children: [_jsxs("div", { children: [_jsxs("div", { className: "mb-12 flex items-center justify-between", children: [_jsx("span", { className: "text-5xl font-light tracking-tighter text-slate-200 transition-colors duration-500 group-hover:text-amber-500/60 dark:text-slate-600", children: step.number }), _jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/[0.07] text-amber-500 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-black", children: step.icon })] }), _jsx("h3", { className: "mb-3 text-xl font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-amber-500 dark:text-slate-50", children: step.title }), _jsx("p", { className: "text-sm leading-7 text-slate-600 dark:text-slate-300", children: step.description })] }), _jsxs("div", { className: "mt-8 flex items-center justify-between", children: [_jsxs("span", { className: "text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400", children: ["Step ", step.number] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-500/40 transition-colors group-hover:bg-amber-400" }), _jsx("span", { className: "h-px w-8 bg-slate-200 transition-colors group-hover:bg-amber-500/40 dark:bg-slate-600" })] })] })] }, step.number))) }), _jsxs("div", { className: "mt-12 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-7 sm:flex-row sm:items-center dark:border-slate-700", children: [_jsx("p", { className: "text-xs tracking-wide text-slate-500 dark:text-slate-400", children: "SIMPLE. SEAMLESS. CREATIVE." }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Your space. Your time. Your creativity." })] })] })] }));
}
