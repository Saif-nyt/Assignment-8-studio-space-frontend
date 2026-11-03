"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IconCalendar,
  IconCamera,
  IconCirclePlus,
  IconLayoutGrid,
  IconList,
  IconLogout,
  IconMenu2,
  IconMoon,
  IconSun,
  IconX,
} from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#HowBookingWorks" },
  { label: "About Us", href: "/about" },
];

const ACCOUNT_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: IconLayoutGrid },
  { label: "Add New Studio", href: "/add-studio", icon: IconCirclePlus },
  { label: "My Studio Listings", href: "/my-studios", icon: IconList },
  { label: "My Bookings", href: "/my-bookings", icon: IconCalendar },
];

function getInitials(user) {
  const name = user?.name?.trim();

  if (name) {
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  if (user?.email) return user.email[0].toUpperCase();

  return "U";
}

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("studio-space-theme");
    const preferredTheme =
      savedTheme ||
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");

    setTheme(preferredTheme);
    document.documentElement.classList.toggle(
      "dark",
      preferredTheme === "dark",
    );
    document.documentElement.classList.toggle(
      "light",
      preferredTheme === "light",
    );
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("studio-space-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onPointerDown = (event) => {
      if (!mobileMenuRef.current?.contains(event.target)) {
        setMobileOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const isActive = (href) =>
    !href.includes("#") &&
    (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const handleHashLinkClick = (event, href) => {
    if (!href.startsWith("/#")) return;

    if (pathname !== "/") return;

    event.preventDefault();

    document.getElementById("HowBookingWorks")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileOpen(false);
    setOpen(false);
    window.history.pushState(null, "", href);
  };

  async function handleLogout() {
    setOpen(false);
    setMobileOpen(false);
    await authClient.signOut();
    router.replace("/");
    router.refresh();
  }

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full overflow-visible border-b backdrop-blur-sm transition-colors duration-200",
        theme === "dark"
          ? "border-white/10 bg-[#020d17]/80"
          : "border-slate-200 bg-white/90 shadow-[0_1px_0_rgba(15,23,42,0.06)]",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-2 px-3 py-3 sm:px-5 sm:py-4 lg:px-8">
        <Link
          href="/"
          className={cn(
            "flex min-w-0 shrink items-center gap-2 sm:gap-3",
            theme === "dark" ? "text-white" : "text-slate-900",
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7b21a] text-[#0b1220] shadow-[0_0_25px_rgba(247,178,26,0.5)] sm:h-10 sm:w-10">
            <IconCamera size={18} stroke={2.5} />
          </div>

          <span className="truncate text-xl font-black tracking-[-0.04em] sm:text-2xl lg:text-[2rem]">
            Studio<span className="text-[#f7b21a]">Space</span>
          </span>
        </Link>

        <nav
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium md:flex",
            theme === "dark" ? "text-slate-300" : "text-slate-600",
          )}
        >
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(event) => handleHashLinkClick(event, item.href)}
                className={cn(
                  "relative py-1 transition-colors duration-200",
                  active
                    ? theme === "dark"
                      ? "text-white"
                      : "text-slate-900"
                    : theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-slate-900",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-[#f7b21a]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleTheme}
            className={cn(
              "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors sm:h-10 sm:w-10",
              theme === "dark"
                ? "border-white/10 bg-white/5 text-amber-300 hover:border-white/20 hover:bg-white/10"
                : "border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200",
            )}
          >
            {theme === "dark" ? (
              <IconSun size={18} stroke={2} />
            ) : (
              <IconMoon size={18} stroke={2} />
            )}
          </button>

          {isPending ? (
            <span className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-white/5 sm:h-10 sm:w-10" />
          ) : user ? (
            <div ref={menuRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-label={`Open account menu for ${user.name || user.email}`}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-[#f7b21a]/80 bg-[#221a0b] text-[13px] font-bold text-[#f7b21a] transition hover:border-[#f7b21a] sm:h-10 sm:w-10"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(user)
                )}
              </button>

              {open && (
                <div
                  role="menu"
                  className={cn(
                    "absolute right-0 top-[calc(100%+10px)] z-[60] w-[min(88vw,300px)] overflow-hidden rounded-lg border text-left shadow-[0_24px_70px_rgba(0,0,0,0.6)]",
                    theme === "dark"
                      ? "border-white/10 bg-[#0d1014]"
                      : "border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]",
                  )}
                >
                  <div className="px-4 pb-3.5 pt-4">
                    <p
                      className={cn(
                        "truncate text-[15px] font-semibold",
                        theme === "dark" ? "text-white" : "text-slate-900",
                      )}
                    >
                      {user.name}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 truncate text-[12px]",
                        theme === "dark" ? "text-slate-400" : "text-slate-500",
                      )}
                    >
                      {user.email}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "border-t py-1.5",
                      theme === "dark"
                        ? "border-white/[0.07]"
                        : "border-slate-200",
                    )}
                  >
                    {ACCOUNT_LINKS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium transition",
                          theme === "dark"
                            ? "text-slate-200 hover:bg-white/[0.05] hover:text-white"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                        )}
                      >
                        <item.icon size={18} stroke={1.7} />
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div
                    className={cn(
                      "border-t",
                      theme === "dark"
                        ? "border-white/[0.07]"
                        : "border-slate-200",
                    )}
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-[14px] font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                    >
                      <IconLogout size={18} stroke={1.7} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  "hidden rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm transition sm:inline-flex",
                  theme === "dark"
                    ? "border-white/10 bg-white/5 text-white/90 hover:border-white/20 hover:bg-white/10"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100",
                )}
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-full border border-[#f7b21a] bg-[#f7b21a] px-3 py-2 text-xs font-semibold text-[#121b2b] shadow-[0_0_25px_rgba(247,178,26,0.3)] transition hover:bg-[#ffbf38] sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Register
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className={cn(
              "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition md:hidden sm:h-10 sm:w-10",
              theme === "dark"
                ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200",
            )}
          >
            {mobileOpen ? <IconX size={19} /> : <IconMenu2 size={19} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className={cn(
            "absolute right-3 top-[calc(100%+8px)] z-[60] w-[min(88vw,280px)] rounded-2xl border p-2 shadow-[0_24px_70px_rgba(0,0,0,0.6)] md:hidden",
            theme === "dark"
              ? "border-white/10 bg-[#0d141a]/95"
              : "border-slate-200 bg-white/95",
          )}
        >
          <nav
            className={cn(
              "flex flex-col gap-1 text-sm font-medium",
              theme === "dark" ? "text-slate-300" : "text-slate-600",
            )}
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(event) => {
                  handleHashLinkClick(event, item.href);
                  setMobileOpen(false);
                }}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-left transition",
                  theme === "dark"
                    ? "hover:bg-white/5 hover:text-white"
                    : "hover:bg-slate-100 hover:text-slate-900",
                  isActive(item.href) &&
                    (theme === "dark"
                      ? "bg-white/5 text-white"
                      : "bg-slate-100 text-slate-900"),
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {!user && (
            <div
              className={cn(
                "mt-2 grid grid-cols-2 gap-2 border-t pt-2",
                theme === "dark" ? "border-white/10" : "border-slate-200",
              )}
            >
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-full border py-2 text-center text-sm font-medium",
                  theme === "dark"
                    ? "border-white/15 bg-white/5 text-white"
                    : "border-slate-200 bg-white text-slate-700",
                )}
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-[#f7b21a] py-2 text-center text-sm font-semibold text-[#121b2b]"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export { Navbar };
