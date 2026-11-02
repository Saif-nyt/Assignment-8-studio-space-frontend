"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const API_URL = "http://localhost:5001";

const CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Creative Studio",
  "Production Space",
];

const AMENITIES = [
  "Natural Light",
  "Blackout Curtains",
  "Cyclorama Wall",
  "Professional Lighting",
  "Backdrops",
  "Soundproofing",
  "Green Screen",
  "Wi-Fi",
  "Loading Deck",
  "Freight Elevator",
  "Makeup Room",
  "Wardrobe Rack",
  "Hair & Makeup Station",
  "Parking",
  "Coffee & Tea",
  "Kitchenette",
  "Restroom",
  "Climate Control",
  "Live Room",
  "Mixing Console",
  "Grand Piano",
  "Drums & Amps",
  "Podcast Mics",
  "Recording Booth",
  "C-Stands",
  "Grip Equipment",
  "Projector",
  "Easels & Sinks",
  "Wheelchair Accessible",
];

const EMPTY_FORM = {
  title: "",
  category: "",
  maxCapacity: "",
  hourlyRate: "",
  securityDeposit: "",
  location: "",
  overview: "",
  rating: "5",
};

const COPY = {
  add: {
    eyebrow: "New listing",
    title: "Add a new studio",
    description:
      "Describe your space, set your pricing, and showcase the details creators need to find their perfect studio.",
    submit: "Publish listing",
    submitting: "Publishing...",
  },
  edit: {
    eyebrow: "Private listing",
    title: "Edit your studio",
    description:
      "Keep your studio information accurate and up to date. Changes will be reflected in your listing.",
    submit: "Save changes",
    submitting: "Saving changes...",
  },
};

function text(value) {
  return value === undefined || value === null ? "" : String(value);
}

function buildForm(studio) {
  if (!studio) return EMPTY_FORM;

  return {
    title: text(studio.title),
    category: text(studio.category),
    maxCapacity: text(studio.maxCapacity),
    hourlyRate: text(studio.hourlyRate),
    securityDeposit: text(studio.securityDeposit),
    location: text(studio.location),
    overview: text(studio.overview),
    rating: text(studio.rating ?? 5),
  };
}

function buildPhotos(studio) {
  if (!studio) return [];

  const photos = [];

  if (typeof studio.image === "string" && studio.image) {
    photos.push(studio.image);
  }

  if (Array.isArray(studio.images)) {
    for (const photo of studio.images) {
      if (typeof photo === "string" && photo && !photos.includes(photo)) {
        photos.push(photo);
      }
    }
  }

  return photos.slice(0, 12);
}

export default function StudioForm({
  mode = "add",
  studio = null,
  host = null,
  onSubmit,
}) {
  const router = useRouter();

  const isEditing = mode === "edit";
  const copy = COPY[mode] ?? COPY.add;

  const [form, setForm] = useState(() => buildForm(studio));

  const [amenities, setAmenities] = useState(() =>
    Array.isArray(studio?.amenities)
      ? studio.amenities.filter((item) => typeof item === "string")
      : [],
  );

  const [photos, setPhotos] = useState(() => buildPhotos(studio));
  const [photoUrl, setPhotoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const categoryOptions = CATEGORIES.includes(form.category)
    ? CATEGORIES
    : [form.category, ...CATEGORIES].filter(Boolean);

  const amenityOptions = [
    ...AMENITIES,
    ...amenities.filter((item) => !AMENITIES.includes(item)),
  ];

  const update = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const toggleAmenity = (amenity) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  };

  const addPhotoLink = () => {
    const url = photoUrl.trim();

    if (!url) return;

    try {
      const parsed = new URL(url);

      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error();
      }
    } catch {
      setError("Enter a valid image URL starting with http:// or https://.");
      return;
    }

    if (photos.length >= 12) {
      setError("You can add up to 12 photos.");
      return;
    }

    if (photos.includes(url)) {
      setError("This photo has already been added.");
      return;
    }

    setPhotos((current) => [...current, url]);
    setPhotoUrl("");
    setError("");
  };

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files ?? []);

    event.target.value = "";

    if (!files.length) return;

    const images = files.filter((file) => file.type.startsWith("image/"));

    if (!images.length) {
      setError("Choose an image file to upload.");
      return;
    }

    if (photos.length + images.length > 12) {
      setError("You can add up to 12 photos.");
      return;
    }

    const oversized = images.find((file) => file.size > 12 * 1024 * 1024);

    if (oversized) {
      setError("Each photo must be smaller than 12 MB.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const urls = [];

      for (const file of images) {
        urls.push(await compressImage(file));
      }

      setPhotos((current) => [...current, ...urls].slice(0, 12));
    } catch (err) {
      console.error("Image processing error:", err);
      setError("Could not process that image. Please try another.");
    } finally {
      setUploading(false);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.category) {
      setError("Choose a category for your studio.");
      return;
    }

    if (!photos.length) {
      setError("Add at least one photo before saving.");
      return;
    }

    if (isEditing && !studio?._id) {
      setError("Studio ID is missing. Please refresh the page.");
      return;
    }

    if (
      !form.title.trim() ||
      !form.location.trim() ||
      !form.overview.trim() ||
      !form.hourlyRate ||
      !form.securityDeposit ||
      !form.maxCapacity
    ) {
      setError("Please complete all required fields.");
      return;
    }

    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      category: form.category,
      location: form.location.trim(),
      hourlyRate: Number(form.hourlyRate),
      securityDeposit: Number(form.securityDeposit),
      maxCapacity: Number(form.maxCapacity),
      image: photos[0],
      images: photos,
      amenities,
      overview: form.overview.trim(),
      rating: Number(form.rating ?? 5),

      // Keep the existing owner's information when editing.
      ownerName: host?.name ?? studio?.ownerName ?? "",
      ownerEmail: host?.email ?? studio?.ownerEmail ?? "",
      ownerImage: host?.image ?? studio?.ownerImage ?? "",
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
        return;
      }

      const url = isEditing
        ? `${API_URL}/studios/${studio._id}`
        : `${API_URL}/add-studio`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not save your studio.");
      }

      router.push("/my-studios");
      router.refresh();
    } catch (err) {
      console.error("Studio submission error:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      {/* FORM HEADER */}
      <div className="mb-9 border-b border-white/[0.07] pb-7">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-500">
          {copy.eyebrow}
        </p>

        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {copy.title}
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
          {copy.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* BASIC INFORMATION */}
        <Section
          number="01"
          title="The basics"
          description="Tell creators what your space is and what makes it special."
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <Field label="Listing title">
                <input
                  name="title"
                  value={form.title}
                  onChange={update}
                  required
                  placeholder="e.g. Daylight loft with cyclorama wall"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Category">
              <div className="relative">
                <select
                  name="category"
                  value={form.category}
                  onChange={update}
                  required
                  className={cn(inputClass, "appearance-none pr-12")}
                >
                  <option value="" disabled>
                    Choose a category
                  </option>

                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <ChevronDown />
              </div>
            </Field>

            <Field label="Maximum capacity">
              <input
                name="maxCapacity"
                type="number"
                min="1"
                value={form.maxCapacity}
                onChange={update}
                required
                placeholder="e.g. 8 people"
                className={inputClass}
              />
            </Field>

            <Field label="Hourly rate ($)">
              <input
                name="hourlyRate"
                type="number"
                min="1"
                value={form.hourlyRate}
                onChange={update}
                required
                placeholder="e.g. 65"
                className={inputClass}
              />
            </Field>

            <Field label="Security deposit ($)">
              <input
                name="securityDeposit"
                type="number"
                min="0"
                value={form.securityDeposit}
                onChange={update}
                required
                placeholder="e.g. 150"
                className={inputClass}
              />
            </Field>
          </div>
        </Section>

        {/* LOCATION */}
        <Section
          number="02"
          title="Location"
          description="Help creators understand where your studio is located."
        >
          <Field label="Full location / Address">
            <input
              name="location"
              value={form.location}
              onChange={update}
              required
              placeholder="e.g. Gulshan 2, Dhaka, Bangladesh"
              className={inputClass}
            />
          </Field>
        </Section>

        {/* PHOTOS */}
        <Section
          number="03"
          title="Studio photos"
          description="Show your space from its best angles. Your first photo will be the cover image."
        >
          <Field label="Paste an image URL">
            <input
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addPhotoLink();
                }
              }}
              placeholder="https://images.unsplash.com/..."
              className={inputClass}
            />
          </Field>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={addPhotoLink}
              className={secondaryButtonClass}
            >
              <PlusIcon />
              Add image URL
            </button>

            <label
              className={cn(
                secondaryButtonClass,
                uploading ? "cursor-wait opacity-60" : "cursor-pointer",
              )}
            >
              <UploadIcon />

              {uploading ? "Preparing photos..." : "Upload from device"}

              <input
                type="file"
                accept="image/*"
                multiple
                disabled={uploading}
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* PHOTO PREVIEW */}
          {photos.length > 0 ? (
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">
                  Uploaded photos
                </p>

                <span className="text-xs text-slate-500">
                  {photos.length}/12 photos
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {photos.map((photo, index) => (
                  <div
                    key={`${photo.slice(0, 24)}-${index}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#090e18]"
                  >
                    <Image
                      src={photo}
                      alt={`Studio photo ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    {index === 0 && (
                      <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                        Cover
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setPhotos((current) =>
                          current.filter((_, i) => i !== index),
                        )
                      }
                      aria-label={`Remove photo ${index + 1}`}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 text-white opacity-100 transition hover:bg-red-500 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-5 flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#0b0f16] px-6 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
                <PhotoIcon />
              </div>

              <p className="mt-4 text-base font-semibold text-white">
                No photos added yet
              </p>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Upload images or paste image URLs to showcase your studio.
              </p>
            </div>
          )}
        </Section>

        {/* AMENITIES */}
        <Section
          number="04"
          title="Amenities & facilities"
          description="Select all the equipment, facilities and amenities available in your studio."
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Choose as many as you need.
            </p>

            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
              {amenities.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {amenityOptions.map((amenity) => {
              const selected = amenities.includes(amenity);

              return (
                <button
                  key={amenity}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleAmenity(amenity)}
                  className={cn(
                    "flex min-h-[48px] items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                    selected
                      ? "border-amber-500/50 bg-amber-500/[0.07] text-white"
                      : "border-white/[0.08] bg-[#0b0f16] text-slate-400 hover:border-white/20 hover:text-white",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition",
                      selected
                        ? "border-amber-500 bg-amber-500 text-black"
                        : "border-slate-600",
                    )}
                  >
                    {selected && <CheckIcon />}
                  </span>

                  <span>{amenity}</span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* OVERVIEW */}
        <Section
          number="05"
          title="Studio overview"
          description="Give potential customers a clear picture of the experience your space offers."
        >
          <Field label="Detailed description">
            <textarea
              name="overview"
              rows={7}
              value={form.overview}
              onChange={update}
              required
              placeholder="Describe your studio, its atmosphere, equipment, natural lighting, available facilities and what makes it unique..."
              className={cn(inputClass, "min-h-[180px] resize-y leading-7")}
            />
          </Field>
        </Section>

        {/* HOST INFORMATION */}
        <Section
          number="06"
          title="Owner information"
          description="Your account information will be attached to this listing."
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Field label="Owner name">
              <input
                value={host?.name ?? studio?.ownerName ?? "—"}
                readOnly
                className={readOnlyInputClass}
              />
            </Field>

            <Field label="Owner email">
              <input
                value={host?.email ?? studio?.ownerEmail ?? "—"}
                readOnly
                className={readOnlyInputClass}
              />
            </Field>

            <Field label="Owner image URL">
              <input
                value={host?.image ?? studio?.ownerImage ?? ""}
                readOnly
                className={readOnlyInputClass}
              />
            </Field>

            <Field label="Rating">
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    rating: event.target.value,
                  }))
                }
                className={inputClass}
              />
            </Field>
          </div>

          <p className="mt-4 text-xs leading-6 text-slate-500">
            Your contact information comes from your account and is displayed
            here for reference.
          </p>
        </Section>

        {/* ERROR */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-5 py-4 text-sm leading-6 text-red-300"
          >
            <AlertIcon />
            <p>{error}</p>
          </div>
        )}

        {/* SUBMIT */}
        <div className="flex flex-col gap-5 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              {isEditing ? "Ready to save your changes?" : "Ready to publish?"}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Review your information before making your listing available.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting || uploading}
            className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl bg-amber-500 px-8 py-4 text-sm font-bold text-black shadow-lg shadow-amber-500/10 transition hover:bg-amber-400 hover:shadow-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Spinner />
                {copy.submitting}
              </>
            ) : (
              <>
                {copy.submit}
                <ArrowIcon />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

/* STYLES */

const inputClass =
  "w-full min-h-[54px] rounded-xl border border-white/[0.09] bg-[#0b0f16] px-5 py-3.5 text-base text-white outline-none transition placeholder:text-slate-600 hover:border-white/15 focus:border-amber-500/70 focus:ring-4 focus:ring-amber-500/[0.07]";

const readOnlyInputClass =
  "w-full min-h-[54px] cursor-not-allowed rounded-xl border border-white/[0.06] bg-[#0b0f16] px-5 py-3.5 text-base text-slate-500 outline-none";

const secondaryButtonClass =
  "inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-500/40 hover:bg-amber-500/[0.06]";

/* REUSABLE COMPONENTS */

function Section({ number, title, description, children }) {
  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#111722] p-5 sm:p-7 lg:p-8">
      <div className="mb-7 flex items-start gap-4 border-b border-white/[0.07] pb-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/[0.07] text-xs font-bold text-amber-400">
          {number}
        </span>

        <div>
          <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
            {title}
          </h3>

          {description && (
            <p className="mt-1.5 text-sm leading-6 text-slate-400">
              {description}
            </p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block min-w-0">
      <span className="mb-2.5 block text-sm font-semibold text-slate-200">
        {label}
      </span>

      {children}
    </label>
  );
}

/* IMAGE PROCESSING */

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function compressImage(file) {
  const source = await readFileAsDataUrl(file);
  const image = await loadImage(source);

  const maxDimension = 1600;

  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));

  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) return source;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);

  context.drawImage(image, 0, 0, width, height);

  let quality = 0.82;
  let result = canvas.toDataURL("image/jpeg", quality);

  while (result.length > 1_500_000 && quality > 0.4) {
    quality -= 0.08;
    result = canvas.toDataURL("image/jpeg", quality);
  }

  return result;
}

/* ICONS */

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M12 16V4m0 0L8 8m4-4 4 4" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-7 w-7 text-slate-400"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="1.5" />
      <path d="m21 15-4.5-4.5L8 19" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      className="h-3 w-3"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mt-0.5 h-5 w-5 shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4m0 4h.01" />
    </svg>
  );
}

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
  );
}
