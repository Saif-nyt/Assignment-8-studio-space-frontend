import Link from "next/link";

export const metadata = {
  title: "Terms of Service — StudioSpace",
  description: "The rules for booking and hosting creative spaces on StudioSpace.",
};

const sections = [
  {
    title: "Using StudioSpace",
    body: "StudioSpace connects creators with studio hosts. You must provide accurate account information, keep your login details private and use the platform only for lawful bookings and listings.",
  },
  {
    title: "Studio listings",
    body: "Hosts are responsible for the accuracy of their listing, including photos, amenities, capacity, hourly rate, deposit and availability. Listings may be removed if they misrepresent the space or breach these terms.",
  },
  {
    title: "Bookings",
    body: "A booking request is saved as pending until it is confirmed. Hosts and creators must honour confirmed sessions. Pending bookings can be cancelled from My Bookings without penalty.",
  },
  {
    title: "Rates, deposits and invoices",
    body: "The booking total includes the hourly rental and any refundable security deposit shown at checkout. Deposits are returned according to the condition of the space and equipment after the session.",
  },
  {
    title: "Conduct on set",
    body: "Creators must respect the studio, equipment and house rules. Hosts must provide the space and amenities described in their listing. Damage caused by misuse may be deducted from the security deposit.",
  },
  {
    title: "Account suspension",
    body: "We may suspend accounts that repeatedly cancel confirmed bookings, publish misleading listings, harass other members or attempt to bypass platform security.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020b14] px-6 py-16 text-white md:px-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f4b63a]">
          Legal
        </p>

        <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">
          Terms of Service
        </h1>

        <p className="mt-4 text-base leading-8 text-slate-400">
          These terms keep bookings clear for both the people behind the camera
          and the people opening their doors.
        </p>

        <div className="mt-12 space-y-8">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-white/10 bg-[#0b1118] p-6 md:p-8"
            >
              <h2 className="text-xl font-bold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-500">
          By booking or hosting on StudioSpace you agree to these terms.{" "}
          <Link href="/privacy" className="text-[#f4b63a] hover:text-[#f7c04f]">
            Read the privacy policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
