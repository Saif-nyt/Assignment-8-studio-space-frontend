"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import StudioForm from "@/components/studio-form";
import { toast } from "@/components/ui/toast";

const API_URL = "http://localhost:5001";

export default function EditStudioPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function loadStudio() {
      try {
        const res = await fetch(`${API_URL}/studios/${id}`, {
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          signal: controller.signal,
        });

        if (res.status === 404) {
          setError("This listing could not be found.");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch studio");
        }

        const data = await res.json();

        if (!data || !data._id) {
          setError("This listing could not be found.");
          return;
        }

        setStudio(data);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError(
          "Could not load this listing. Make sure the backend is running and try again."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadStudio();

    return () => controller.abort();
  }, [id]);

  async function handleUpdate(payload) {
    const res = await fetch(`${API_URL}/studios/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (res.status === 413) {
      throw new Error(
        "The photos are too large to upload. Try a smaller image or paste an image URL instead."
      );
    }

    if (res.status === 404) {
      throw new Error("This listing no longer exists.");
    }

    if (res.status === 403) {
      throw new Error("You can only edit listings that you own.");
    }

    if (!res.ok) {
      throw new Error("Could not save your changes. Please try again.");
    }

    toast.add({
      title: "Listing updated",
      description: "Your changes are live. Taking you to your listings…",
      type: "success",
    });

    await new Promise((resolve) => setTimeout(resolve, 1200));

    router.push("/my-listings");
    router.refresh();
  }

  if (loading) {
    return (
      <StatusScreen
        title="Loading your listing"
        description="Fetching the details you saved earlier."
      />
    );
  }

  if (error) {
    return (
      <StatusScreen
        title="Listing unavailable"
        description={error}
        action={
          <Link
            href="/studios"
            className="rounded-full bg-amber-500 px-6 py-3 text-base font-bold text-black transition hover:bg-amber-400"
          >
            Back to studios
          </Link>
        }
      />
    );
  }

  return (
    <StudioForm
      mode="edit"
      studio={studio}
      host={{ name: studio?.ownerName, email: studio?.ownerEmail }}
      onSubmit={handleUpdate}
    />
  );
}

function StatusScreen({ title, description, action }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08090b] px-5 py-16 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111214] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
          Private listing
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-base leading-7 text-slate-400">{description}</p>
        {action && <div className="mt-6 flex justify-center">{action}</div>}
      </div>
    </main>
  );
}
