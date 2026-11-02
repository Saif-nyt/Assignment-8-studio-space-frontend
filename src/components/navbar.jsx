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
} from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
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
    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("");

    return initials.toUpperCase();
  }

  if (user?.email) return user.email[0].toUpperCase();

  return "U";
}

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef(null);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const isActive = (href) =>
    !href.includes("#") &&
    (href === "/" ? pathname === "/" : pathname.startsWith(href));

  async function handleLogout() {
    setOpen(false);
    setMobileOpen(false);
    await authClient.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <header className="relative z-30 w-full border-b border-white/10 bg-[#020d17]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7b21a] text-[#0b1220] shadow-[0_0_25px_rgba(247,178,26,0.5)]">
            <IconCamera size={18} stroke={2.5} />
          </div>
          <span className="text-2xl font-black tracking-[-0.04em] sm:text-[2rem]">
            Studio<span className="text-[#f7b21a]">Space</span>
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative py-1 transition-colors duration-200 hover:text-white",
                  active && "text-white"
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

        <div className="flex items-center gap-3">
          {isPending ? (
            <span className="h-10 w-10 animate-pulse rounded-full bg-white/5" />
          ) : user ? (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-label={`Open account menu for ${user.name || user.email}`}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#f7b21a]/80 bg-[#221a0b] text-[13px] font-bold tracking-wide text-[#f7b21a] transition hover:border-[#f7b21a]"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
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
                  className="absolute right-0 top-[calc(100%+10px)] z-50 w-[300px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-white/10 bg-[#0d1014] text-left shadow-[0_24px_70px_rgba(0,0,0,0.6)]"
                >
                  <div className="px-4 pb-3.5 pt-4">
                    <p className="truncate text-[15px] font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="mt-0.5 truncate text-[12px] text-slate-400">
                      {user.email}
                    </p>
                  </div>

                  <div className="border-t border-white/[0.07] py-1.5">
                    {ACCOUNT_LINKS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-slate-200 transition hover:bg-white/[0.05] hover:text-white"
                      >
                        <item.icon size={18} stroke={1.7} />
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-white/[0.07]">
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
                className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10 sm:inline-flex"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  "inline-flex items-center justify-center rounded-full border border-[#f7b21a] bg-[#f7b21a] px-5 py-2.5 text-sm font-semibold text-[#121b2b] shadow-[0_0_25px_rgba(247,178,26,0.3)] transition hover:bg-[#ffbf38]"
                )}
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          >
            <IconMenu2 size={18} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#020d17]/95 px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1 text-sm font-medium text-slate-300">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-2 py-2 transition hover:bg-white/5 hover:text-white",
                  isActive(item.href) && "text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {!user && (
            <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-4">
              <Link
                href="/login"
                className="flex-1 rounded-full border border-white/15 bg-white/5 py-2 text-center text-sm font-medium text-white"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="flex-1 rounded-full bg-[#f7b21a] py-2 text-center text-sm font-semibold text-[#121b2b]"
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
