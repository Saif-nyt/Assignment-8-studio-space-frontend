import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconCamera, IconMenu2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
function Navbar() {
    return (_jsx("header", { className: "relative z-30 w-full border-b border-white/10 bg-[#020d17]/80 backdrop-blur-sm", children: _jsxs("div", { className: "mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 lg:px-8", children: [_jsxs(Link, { href: "/", className: "flex items-center gap-3 text-white", children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#f7b21a] text-[#0b1220] shadow-[0_0_25px_rgba(247,178,26,0.5)]", children: _jsx(IconCamera, { size: 18, stroke: 2.5 }) }), _jsxs("span", { className: "text-2xl font-black tracking-[-0.04em] sm:text-[2rem]", children: ["Studio", _jsx("span", { className: "text-[#f7b21a]", children: "Space" })] })] }), _jsx("nav", { className: "hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex", children: [
                        { label: "Home", href: "/" },
                        { label: "Explore Studios", href: "/studios" },
                        { label: "How It Works", href: "#" },
                        { label: "About Us", href: "#" },
                    ].map((item) => (_jsx(Link, { href: item.href, className: "transition-colors duration-200 hover:text-[#f7b21a]", children: item.label }, item.label))) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Link, { href: "/login", className: "hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10 sm:inline-flex", children: "Login" }), _jsx(Link, { href: "/sign-up", className: cn("inline-flex items-center justify-center rounded-full border border-[#f7b21a] bg-[#f7b21a] px-5 py-2.5 text-sm font-semibold text-[#121b2b] shadow-[0_0_25px_rgba(247,178,26,0.3)] transition hover:bg-[#ffbf38]"), children: "Register" }), _jsx("button", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden", children: _jsx(IconMenu2, { size: 18 }) })] })] }) }));
}
export { Navbar };
