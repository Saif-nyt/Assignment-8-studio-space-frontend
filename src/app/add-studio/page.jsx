"use client";

import { useRouter } from "next/navigation";
import StudioForm from "@/components/studio-form";

const ACCOUNT = {
  name: "Anonymous Hacker",
  email: "anonymoushacker001122@gmail.com",
};

export default function AddStudioPage() {
  const router = useRouter();

  async function handleCreate(payload) {
    const res = await fetch("http://localhost:5001/add-studio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        ownerName: ACCOUNT.name,
        ownerEmail: ACCOUNT.email,
        ownerImage: "",
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

  return <StudioForm mode="add" host={ACCOUNT} onSubmit={handleCreate} />;
}
