"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

export default function DeleteStudioButton({ studioId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this studio listing?",
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5001/delete-studio/${studioId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete studio");
      }

      router.refresh();
    } catch (error) {
      console.error("Delete studio error:", error);
      window.alert(error.message || "Could not delete studio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      type="button"
      disabled={loading}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/30 bg-red-500/5 text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Delete studio"
      title={loading ? "Deleting..." : "Delete studio"}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400" />
      ) : (
        <IconTrash />
      )}
    </button>
  );
}
