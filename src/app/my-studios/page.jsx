import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import DeleteStudioButton from "@/components/DeleteStudioButton";
import { normalizeCategory } from "@/lib/studio-categories";

function IconPlus() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-4 w-4"
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M12 20h9" strokeLinecap="round" />
      <path
        d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M3 6h18" strokeLinecap="round" />
      <path d="M8 6V4h8v2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M19 6l-1 14H6L5 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 11v6M14 11v6" strokeLinecap="round" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
    >
      <path
        d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    redirect("/login");
  }

  const email = user.email.trim().toLowerCase();

  let data = [];
  let fetchError = false;

  try {
    const API_BASE =  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";
    const res = await fetch(`${API_BASE}/studios`, {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch studios: ${res.status}`);
    }

    const studios = await res.json();

    data = Array.isArray(studios)
      ? studios.filter(
          (studio) => (studio.ownerEmail || "").trim().toLowerCase() === email,
        )
      : [];
  } catch (error) {
    console.error("Failed to fetch studio listings:", error);
    fetchError = true;
  }

  const hasListings = data.length > 0;

  return (
    <main className="min-h-screen bg-[#020b14] px-5 py-10 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px] pt-4 lg:pt-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#f4b63a]">
              Hosting
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-white md:text-[4rem] md:leading-[0.96]">
              My studio listings
            </h1>

            <p className="mt-3 text-base text-slate-400">
              {hasListings
                ? `${data.length} ${data.length === 1 ? "space" : "spaces"} published on StudioSpace.`
                : "No spaces published yet."}
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f4b63a] px-5 py-3 text-sm font-bold text-[#111827] shadow-[0_0_18px_rgba(244,182,58,0.25)] transition hover:bg-[#f7c04f]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-[#f4b63a]">
              <IconPlus />
            </span>
            Add new studio
          </Link>
        </div>

        {fetchError ? (
          <div className="rounded-[18px] border border-red-500/20 bg-[#0b1118] px-6 py-10 text-center">
            <h2 className="text-xl font-bold text-white">
              Unable to load your studios
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Please check your backend server and try again.
            </p>
          </div>
        ) : hasListings ? (
          <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[#0b1118] shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left">
                <thead className="bg-[#0d1420] text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Space</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4">Rate</th>
                    <th className="px-5 py-4">Capacity</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((studio) => (
                    <tr
                      key={studio._id}
                      className="border-t border-white/10 bg-[#0b1118]"
                    >
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[10px] border border-white/10 bg-[#101827]">
                            {studio.image ? (
                              <Image
                                width={120}
                                height={120}
                                src={studio.image}
                                alt={studio.title || "Studio"}
                                sizes="60px"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a2332] to-[#0d1219] text-[10px] font-bold uppercase text-slate-400">
                                Studio
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="text-base font-bold text-white">
                              {studio.title || "Untitled studio"}
                            </div>

                            <div className="mt-1 inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                              {normalizeCategory(studio.category) || "Creative space"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5 text-slate-300">
                        <div className="flex items-center gap-2 text-sm md:text-base">
                          <span className="text-slate-400">
                            <IconMapPin />
                          </span>
                          {studio.location || "Location not set"}
                        </div>
                      </td>

                      <td className="px-5 py-5 text-base font-semibold text-white">
                        ${Number(studio.hourlyRate || 0)}/hr
                      </td>

                      <td className="px-5 py-5 text-sm text-slate-300 md:text-base">
                        {studio.maxCapacity || 0} people
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-2.5">
                          <Link
                            href={`/studios/edit/${studio._id}`}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-200 transition hover:border-white/20 hover:bg-white/5"
                            aria-label="Update studio"
                          >
                            <IconPencil />
                          </Link>

                          <DeleteStudioButton studioId={studio._id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-[18px] border border-white/10 bg-[#0b1118] px-6 py-12 text-center shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-[18px] border border-white/10 bg-white/5 text-3xl text-white">
              +
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              No studios yet
            </h2>

            <p className="mt-2 text-base text-slate-400">
              Start by creating your first studio listing to get booked.
            </p>

            <Link
              href="/add-studio"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#f4b63a] px-5 py-3 text-sm font-bold text-[#111827] shadow-[0_0_18px_rgba(244,182,58,0.25)] transition hover:bg-[#f7c04f]"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-[#f4b63a]">
                <IconPlus />
              </span>
              Add new studio
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
