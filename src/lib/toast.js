"use client";

import { toast } from "sonner";

export function showToast({ title, description, type = "info" }) {
  const options = { description };

  if (type === "success") return toast.success(title, options);
  if (type === "error") return toast.error(title, options);
  if (type === "warning") return toast.warning(title, options);
  if (type === "loading") return toast.loading(title, options);

  return toast(title, options);
}
