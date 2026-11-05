import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import StudioForm from "@/components/studio-form";

export default async function EditStudioPage({ params }) {
  const { id } = await params;

  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
    query: {
      disableCookieCache: true,
    },
  });

  if (!session?.user?.email) {
    redirect("/login");
  }

  const jwtToken = await auth.api.getToken({
    headers: requestHeaders,
  });

  if (!jwtToken?.token) {
    redirect("/login");
  }

  const user = session.user;

  let studio;

  try {
    const API_BASE =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

    const res = await fetch(`${API_BASE}/studios/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken.token}`,
      },
      cache: "no-store",
    });

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error("Failed to fetch studio");
    }

    studio = await res.json();
  } catch (error) {
    console.error("Error fetching studio:", error);
    throw error;
  }

  if (!studio) {
    notFound();
  }

  if (
    (studio.ownerEmail || "").trim().toLowerCase() !==
    user.email.trim().toLowerCase()
  ) {
    redirect("/my-listings");
  }

  return (
    <main className="min-h-screen bg-[#020b14] px-5 py-10 text-white md:px-8">
      <div className="mx-auto max-w-[1100px] pt-4 lg:pt-8">
        <div className="mb-9">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#f4b63a]">
            Hosting
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Edit your studio
          </h1>

          <p className="mt-3 text-base text-slate-400">
            Update your studio details and save your changes.
          </p>
        </div>

        <StudioForm
          mode="edit"
          studio={studio}
          host={{
            name: studio.ownerName,
            email: studio.ownerEmail,
            image: studio.ownerImage,
          }}
        />
      </div>
    </main>
  );
}
