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
    return (_jsxs("section", { className: "relative overflow-hidden bg-[#090b10] py-24 md:py-32 px-6 md:px-12 text-white", children: [_jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/[0.06] blur-[120px] rounded-full pointer-events-none" }), _jsxs("div", { className: "max-w-[1600px] mx-auto relative z-10", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-5", children: [_jsx("span", { className: "w-8 h-px bg-amber-500" }), _jsx("span", { className: "text-amber-500 text-xs font-semibold tracking-[0.25em] uppercase", children: "HOW BOOKING WORKS" })] }), _jsxs("h2", { className: "text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12] max-w-2xl", children: ["Your next creative space,", _jsx("span", { className: "block text-white/40", children: "just four steps away." })] })] }), _jsx("p", { className: "text-slate-400 text-sm md:text-base leading-relaxed max-w-sm", children: "Finding and booking your perfect studio shouldn't be complicated. We've made the entire process effortless." })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: steps.map((step, index) => (_jsxs("div", { className: "group relative min-h-[310px] rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#151820] to-[#0e1118] p-7 md:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/40 hover:shadow-[0_20px_60px_rgba(245,158,11,0.08)]", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-12", children: [_jsx("span", { className: "text-5xl font-light tracking-tighter text-white/[0.15] group-hover:text-amber-500/60 transition-colors duration-500", children: step.number }), _jsx("div", { className: "w-12 h-12 rounded-xl border border-amber-500/20 bg-amber-500/[0.07] flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500", children: step.icon })] }), _jsx("h3", { className: "text-xl font-semibold mb-3 tracking-tight group-hover:text-amber-400 transition-colors", children: step.title }), _jsx("p", { className: "text-sm text-slate-400 leading-7", children: step.description })] }), _jsxs("div", { className: "mt-8 flex items-center justify-between", children: [_jsxs("span", { className: "text-[10px] uppercase tracking-[0.2em] text-slate-600", children: ["Step ", step.number] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-400 transition-colors" }), _jsx("span", { className: "w-8 h-px bg-white/10 group-hover:bg-amber-500/40 transition-colors" })] })] })] }, step.number))) }), _jsxs("div", { className: "mt-12 pt-7 border-t border-white/[0.07] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3", children: [_jsx("p", { className: "text-xs text-slate-500 tracking-wide", children: "SIMPLE. SEAMLESS. CREATIVE." }), _jsx("p", { className: "text-xs text-slate-500", children: "Your space. Your time. Your creativity." })] })] })] }));
}
