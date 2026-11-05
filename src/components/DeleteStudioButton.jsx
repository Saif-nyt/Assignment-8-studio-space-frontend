"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { API_BASE, authFetch } from "@/lib/api-auth";

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
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await authFetch(`${API_BASE}/delete-studio/${studioId}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete studio");
      }

      showToast({
        title: "Studio deleted",
        description: "Your listing has been removed successfully.",
        type: "success",
      });

      setShowConfirm(false);
      router.refresh();
    } catch (error) {
      console.error("Delete studio error:", error);

      showToast({
        title: "Delete failed",
        description: error.message || "Could not delete studio.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
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

      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#10151e] p-6 shadow-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <IconTrash />
            </div>

            <h2 className="text-xl font-bold text-white">
              Delete this studio?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Are you sure you want to delete this studio listing? This action
              cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}
                {loading ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
