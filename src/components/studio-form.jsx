"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

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
      "Describe the room honestly, price the hour fairly, and add the photos you'd want to see before booking someone else's space.",
    submit: "Publish listing",
    submitting: "Publishing...",
  },
  edit: {
    eyebrow: "Private listing",
    title: "Edit your studio",
    description:
      "Keep the details creators see accurate. Changes go live as soon as you save them.",
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
  const copy = COPY[mode] ?? COPY.add;
  const [form, setForm] = useState(() => buildForm(studio));
  const [amenities, setAmenities] = useState(() =>
    Array.isArray(studio?.amenities)
      ? studio.amenities.filter((item) => typeof item === "string")
      : []
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
    setForm((current) => ({ ...current, [name]: value }));
  };

  const toggleAmenity = (amenity) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
  };

  const addPhotoLink = () => {
    const url = photoUrl.trim();

    if (!url) return;

    try {
      const parsed = new URL(url);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
    } catch {
      setError("Enter a valid image URL starting with http:// or https://.");
      return;
    }

    if (photos.length >= 12) {
      setError("You can add up to 12 photos.");
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
    } catch {
      setError("Could not read that image. Please try another.");
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
      setError("Add at least one photo before publishing your listing.");
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
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      setError(
        err?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#08090b] px-5 py-12 text-white sm:px-8 md:py-16">
      <div className="mx-auto max-w-[780px]">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-[2.5rem] font-semibold tracking-tight text-white sm:text-[3.25rem]">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            {copy.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Section
            title="The basics"
            description="How your space appears in search and on its detail page."
          >
            <div className="space-y-5">
              <Field label="Listing title">
                <input
                  name="title"
                  value={form.title}
                  onChange={update}
                  required
                  placeholder="Daylight loft with cyclorama wall"
                  className={inputClass}
                />
              </Field>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Category">
                  <div className="relative">
                    <select
                      name="category"
                      value={form.category}
                      onChange={update}
                      required
                      className={cn(inputClass, "appearance-none pr-9")}
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

                <Field label="Max capacity">
                  <input
                    name="maxCapacity"
                    type="number"
                    min="1"
                    value={form.maxCapacity}
                    onChange={update}
                    required
                    placeholder="8"
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
                    placeholder="65"
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
                    placeholder="150"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>
          </Section>

          <Section title="Location / Address">
            <Field label="Location">
              <input
                name="location"
                value={form.location}
                onChange={update}
                required
                placeholder="Gulshan 2, Dhaka, Bangladesh"
                className={inputClass}
              />
            </Field>
          </Section>

          <Section
            title="Photos"
            description="Upload from your device or paste an image URL. The first photo becomes your cover."
          >
            <Field label="Image URL">
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
                className={cn(inputClass, "flex-1")}
              />
            </Field>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addPhotoLink}
                  className={secondaryButtonClass}
                >
                  <PlusIcon />
                  Add link
                </button>

                <label
                  className={cn(
                    secondaryButtonClass,
                    uploading ? "cursor-wait opacity-60" : "cursor-pointer"
                  )}
                  aria-disabled={uploading}
                >
                  <UploadIcon />
                  {uploading ? "Preparing..." : "Upload"}
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
            </div>

            {photos.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((photo, index) => (
                  <div
                    key={`${photo.slice(0, 24)}-${index}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#0b0c0e]"
                  >
                    <img
                      src={photo}
                      alt={`Studio photo ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {index === 0 && (
                      <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-black">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setPhotos((current) =>
                          current.filter((_, i) => i !== index)
                        )
                      }
                      aria-label={`Remove photo ${index + 1}`}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition hover:bg-black group-hover:opacity-100"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 flex min-h-[155px] flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-[#0b0c0e] px-6 py-9 text-center">
                <PhotoIcon />
                <p className="mt-3 text-base font-semibold text-white">
                  No photos yet
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Listings with four or more photos get booked twice as often.
                </p>
              </div>
            )}
          </Section>

          <Section
            title="Amenities"
            description="Select everything a creator can use during their session."
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {amenityOptions.map((amenity) => {
                const selected = amenities.includes(amenity);

                return (
                  <button
                    key={amenity}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleAmenity(amenity)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border px-3.5 py-3 text-left text-sm transition",
                      selected
                        ? "border-amber-500/60 bg-amber-500/[0.07] text-white"
                        : "border-white/[0.09] bg-[#0b0c0e] text-slate-300 hover:border-white/20 hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition",
                        selected
                          ? "border-amber-400"
                          : "border-slate-500 group-hover:border-slate-400"
                      )}
                    >
                      {selected && (
                        <span className="h-2 w-2 rounded-full bg-amber-400" />
                      )}
                    </span>
                    <span className="truncate">{amenity}</span>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Detailed Overview">
            <Field label="What should a creator know before booking?">
              <textarea
                name="overview"
                rows={5}
                value={form.overview}
                onChange={update}
                required
                placeholder="Sunlight from 9am, 12ft ceilings, a 20ft cyc wall, and a private changing room. Loading access through the freight elevator on the north side."
                className={cn(inputClass, "resize-y leading-6")}
              />
            </Field>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="User Name">
                <input
                  value={host?.name ?? "—"}
                  readOnly
                  aria-readonly="true"
                  className={cn(
                    inputClass,
                    "cursor-not-allowed text-slate-400"
                  )}
                />
              </Field>

              <Field label="User Email">
                <input
                  value={host?.email ?? "—"}
                  readOnly
                  aria-readonly="true"
                  className={cn(
                    inputClass,
                    "cursor-not-allowed text-slate-400"
                  )}
                />
              </Field>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Owner Image URL">
                <input
                  value={host?.image ?? ""}
                  readOnly
                  aria-readonly="true"
                  className={cn(
                    inputClass,
                    "cursor-not-allowed text-slate-400"
                  )}
                />
              </Field>

              <Field label="Rating">
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating ?? 5}
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

            <p className="mt-3 text-sm text-slate-500">
              Contact details come from your account and can&apos;t be edited on
              a listing.
            </p>
          </Section>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-base text-red-300"
            >
              {error}
            </p>
          )}

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={submitting || uploading}
              className="rounded-full bg-amber-500 px-7 py-3 text-base font-bold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? copy.submitting : copy.submit}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/[0.09] bg-[#0b0c0e] px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/10";

const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.07]";

function Section({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#111214] p-5 sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-1.5 text-sm leading-6 text-slate-500">{description}</p>
      )}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </span>
      {children}
    </label>
  );
}

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
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function compressImage(file) {
  const source = await readFileAsDataUrl(file);
  const image = await loadImage(source);
  const maxDimension = 1600;
  const scale = Math.min(
    1,
    maxDimension / Math.max(image.width, image.height)
  );
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

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
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
      className="h-3.5 w-3.5"
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
      className="h-3.5 w-3.5"
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
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-slate-500"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="1.5" />
      <path d="m21 15-4.5-4.5L8 19" />
      <path d="M18 4v4m-2-2h4" />
    </svg>
  );
}
