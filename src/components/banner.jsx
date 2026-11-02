"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { IconArrowRight, IconChevronLeft, IconChevronRight, IconCamera, } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const slides = [
    {
        eyebrow: "FILM STAGES",
        title: "Your next scene starts here",
        description: "Soundstages with lighting grids, green screens and drive-in access.",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80",
    },
    {
        eyebrow: "CREW READY",
        title: "From concept to capture, all in one place",
        description: "Book premium studio spaces, production-ready gear and on-site support.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    },
    {
        eyebrow: "HOST YOUR SPACE",
        title: "Turn your studio into a revenue engine",
        description: "List your venue, manage bookings and grow your creative community.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    },
];
const Banner = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        const syncTheme = () => setIsLightMode(document.documentElement.classList.contains("light"));

        syncTheme();

        const observer = new MutationObserver(syncTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % slides.length);
        }, 5000);

        return () => {
            observer.disconnect();
            window.clearInterval(timer);
        };
    }, []);

    const currentSlide = slides[activeIndex];
    const goToSlide = (index) => setActiveIndex(index);
    const goToPrevious = () => setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
    const goToNext = () => setActiveIndex((current) => (current + 1) % slides.length);
    const overlayStart = isLightMode ? "rgba(255, 255, 255, 0.76)" : "rgba(2, 7, 17, 0.82)";
    const overlayMid = isLightMode ? "rgba(255, 255, 255, 0.58)" : "rgba(2, 7, 17, 0.62)";
    const overlayEnd = isLightMode ? "rgba(255, 255, 255, 0.2)" : "rgba(2, 7, 17, 0.38)";

    return (_jsxs("div", { className: cn("relative isolate min-h-[900px] overflow-hidden transition-colors duration-200", isLightMode ? "bg-slate-50 text-slate-900" : "bg-[#020d17] text-white"), children: [_jsx("div", { className: "absolute inset-0", children: slides.map((slide, index) => (_jsx("div", { "aria-hidden": index !== activeIndex, className: cn("absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out", index === activeIndex ? "opacity-100" : "opacity-0"), style: {
                        backgroundImage: `linear-gradient(90deg, ${overlayStart} 0%, ${overlayMid} 28%, ${overlayEnd} 100%), url(${slide.image})`,
                    } }, slide.eyebrow))) }), _jsx("div", { className: cn("absolute inset-0", isLightMode ? "bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.10),_transparent_36%)]" : "bg-[radial-gradient(circle_at_center,_rgba(255,180,0,0.12),_transparent_36%)]") }), _jsx("main", { className: "relative z-20 mx-auto flex max-w-[1600px] items-center px-5 pb-20 pt-14 lg:px-8 lg:pb-12 lg:pt-24", children: _jsxs("div", { className: "grid w-full items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]", children: [_jsxs("div", { className: "max-w-[720px]", children: [_jsx(Badge, { className: cn("px-3 py-1 text-[0.68rem] font-semibold tracking-[0.28rem]", isLightMode ? "border-amber-500/25 bg-amber-500/10 text-amber-700" : "border-[#f7b21a]/40 bg-[#f7b21a]/10 text-[#f9d77f]") , children: currentSlide.eyebrow }), _jsx("h1", { className: cn("mt-8 max-w-[700px] text-5xl font-black leading-[0.92] tracking-[-0.06em] md:text-7xl lg:text-[6.3rem]", isLightMode ? "text-slate-900" : "text-white"), children: currentSlide.title }), _jsx("p", { className: cn("mt-7 max-w-[540px] text-lg leading-relaxed md:text-[1.6rem] md:leading-[1.3]", isLightMode ? "text-slate-600" : "text-slate-200"), children: currentSlide.description }), _jsxs("div", { className: "mt-10 flex flex-wrap items-center gap-4", children: [_jsxs("a", { href: "/studios", className: cn(buttonVariants({ variant: "default", size: "lg" }), "inline-flex items-center gap-2 rounded-full border border-[#f7b21a] bg-[#f7b21a] px-6 py-3 text-base font-semibold text-[#121b2b] shadow-[0_0_30px_rgba(247,178,26,0.35)] transition hover:bg-[#ffbf38]"), children: ["Explore Studios", _jsx(IconArrowRight, { size: 18 })] }), _jsx("a", { href: "/studios", className: cn(buttonVariants({ variant: "outline", size: "lg" }), "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-base font-semibold shadow-[0_0_25px_rgba(15,23,42,0.35)] backdrop-blur-sm transition", isLightMode ? "border-slate-200 bg-white/80 text-slate-900 hover:bg-slate-100" : "border-white/25 bg-white/5 text-white hover:bg-white/10") , children: "Host Your Space" })] })] }), _jsx("div", { className: "hidden min-h-[430px] items-end justify-end lg:flex", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { type: "button", "aria-label": "Previous slide", onClick: goToPrevious, className: cn("flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-sm transition", isLightMode ? "border-slate-200 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-white" : "border-white/20 bg-black/25 text-white hover:border-white/40 hover:bg-white/10"), children: _jsx(IconChevronLeft, { size: 22 }) }), _jsx("button", { type: "button", "aria-label": "Next slide", onClick: goToNext, className: cn("flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-sm transition", isLightMode ? "border-slate-200 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-white" : "border-white/20 bg-black/25 text-white hover:border-white/40 hover:bg-white/10"), children: _jsx(IconChevronRight, { size: 22 }) })] }) })] }) }), _jsx("div", { className: "absolute bottom-8 left-5 z-20 flex items-center gap-3 md:left-10", children: slides.map((slide, index) => (_jsx("button", { type: "button", "aria-label": `Go to slide ${index + 1}`, onClick: () => goToSlide(index), className: cn("h-2.5 rounded-full transition-all duration-300", index === activeIndex ? "w-12 bg-[#f7b21a]" : isLightMode ? "w-8 bg-slate-300 hover:bg-slate-400" : "w-8 bg-white/35 hover:bg-white/60") }, slide.eyebrow))) }), _jsxs("div", { className: "absolute bottom-7 right-5 z-20 flex items-center gap-3 lg:hidden", children: [_jsx("button", { type: "button", "aria-label": "Previous slide", onClick: goToPrevious, className: cn("flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-sm", isLightMode ? "border-slate-200 bg-white/80 text-slate-700" : "border-white/20 bg-black/25 text-white"), children: _jsx(IconChevronLeft, { size: 18 }) }), _jsx("button", { type: "button", "aria-label": "Next slide", onClick: goToNext, className: cn("flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-sm", isLightMode ? "border-slate-200 bg-white/80 text-slate-700" : "border-white/20 bg-black/25 text-white"), children: _jsx(IconChevronRight, { size: 18 }) })] }), _jsx("div", { className: cn("pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[260px] lg:block", isLightMode ? "bg-gradient-to-l from-white/80 to-transparent" : "bg-gradient-to-l from-[#01070d]/70 to-transparent") }), _jsx("div", { className: cn("pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[220px] lg:block", isLightMode ? "bg-gradient-to-r from-white/80 to-transparent" : "bg-gradient-to-r from-[#020d17]/85 to-transparent") }), _jsx("div", { className: cn("pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32", isLightMode ? "bg-gradient-to-t from-slate-100 via-slate-100/60 to-transparent" : "bg-gradient-to-t from-[#020d17] via-[#020d17]/40 to-transparent") })] }));
};
export { Banner };
export default Banner;
