import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import StudioForm from "@/components/studio-form";

export default async function EditStudioPage({ params }) {
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    redirect("/login");
  }

  
  const { id } = await params;

 
  let studio;

  try {
    const res = await fetch(
      `process.env.BACKEND_URL/studios/${id}` ||
        `http://localhost:5001/studios/${id}`,
      {
        cache: "no-store",
      },
    );

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
    redirect("/my-studios");
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
