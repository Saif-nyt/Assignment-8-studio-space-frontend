"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import StudioForm from "@/components/studio-form";
import { authClient } from "@/lib/auth-client";

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b10] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-amber-500" />
          <p className="text-sm font-medium text-slate-400">
            Loading your account...
          </p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  async function handleCreate(payload) {
    const API_BASE =  process.env.NEXT_PUBLIC_BACKEND_URL || "https://assignment-8-studio-space-backend.vercel.app" || "http://localhost:5001";

    let jwtToken;
    try {
      jwtToken = await authClient.api.getToken();
    } catch {}

    if (!jwtToken) {
      router.push("/login");
      return;
    }

    const res = await fetch(`${API_BASE}/add-studio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken.token}`,
      },
      body: JSON.stringify({
        ...payload,
        ownerName: user.name || "Studio owner",
        ownerEmail: user.email,
        ownerImage: user.image || "",
        rating: 5,
      }),
      credentials: "include",
    });

    if (res.status === 413) {
      throw new Error(
        "That photo is too large to upload. Try a smaller image or paste an image URL instead.",
      );
    }

    if (!res.ok) {
      throw new Error("Could not publish the listing. Please try again.");
    }

    router.push("/studios");
    router.refresh();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080b10] px-4 py-12 text-white sm:px-6 lg:px-10 lg:py-16">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1500px]">
        {/* Header */}
        <div className="mb-10 lg:mb-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-amber-500" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
              Studio Owner
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                List your
                <span className="text-amber-500"> studio.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Turn your creative space into an opportunity. Share your studio
                with creators, professionals and people looking for their next
                perfect workspace.
              </p>
            </div>

            {/* Owner Information */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "Studio owner"}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/15 font-bold text-amber-400">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-white">
                  {user.name || "Studio owner"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Listing as studio owner
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-[#10151e] shadow-2xl shadow-black/30">
          <div className="border-b border-white/[0.07] px-6 py-6 sm:px-10 lg:px-12">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Studio information
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
              Complete the details below to create your studio listing.
            </p>
          </div>

          <div className="w-full p-5 sm:p-8 lg:p-12">
            <StudioForm
              mode="add"
              host={{
                name: user.name || "Studio owner",
                email: user.email,
                image: user.image || "",
              }}
              onSubmit={handleCreate}
            />
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs leading-6 text-slate-500">
          Make sure your studio information is accurate before publishing.
        </p>
      </div>
    </main>
  );
}
