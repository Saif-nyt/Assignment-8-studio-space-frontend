"use client";

import { usePathname } from "next/navigation";

const CHROMELESS_ROUTES = [
  "/sign-up",
  "/signin",
  "/sign-in",
  "/login",
  "/register",
];

export default function SiteChrome({ navbar, footer, children }) {
  const pathname = usePathname();
  const hideChrome = CHROMELESS_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (hideChrome) return children;

  return (
    <>
      {navbar}
      {children}
      {footer}
    </>
  );
}
