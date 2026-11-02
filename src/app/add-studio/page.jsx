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
      <main className="flex min-h-screen items-center justify-center bg-[#08090b] text-white">
        <p className="text-sm text-slate-300">Loading your account…</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  async function handleCreate(payload) {
    const res = await fetch("http://localhost:5001/add-studio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        "That photo is too large to upload. Try a smaller image or paste an image URL instead."
      );
    }

    if (!res.ok) {
      throw new Error("Could not publish the listing. Please try again.");
    }

    router.push("/studios");
    router.refresh();
  }

  return (
    <StudioForm
      mode="add"
      host={{
        name: user.name || "Studio owner",
        email: user.email,
        image: user.image || "",
      }}
      onSubmit={handleCreate}
    />
  );
}
