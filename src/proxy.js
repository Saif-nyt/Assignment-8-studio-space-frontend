import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import BookWorkshopNowButton from "./components/BookWorkshopNowButton";
import { se } from "date-fns/locale";
import { headers } from "next/headers";
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
//   return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: [
    "/my-studios/:path*",
    "/my-bookings/:path*",
    "/add-studio/:path*",
    "/dashboard/:path*",
    "/book-workshop/:path*",
  ],
};
