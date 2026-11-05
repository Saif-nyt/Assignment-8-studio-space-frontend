import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — StudioSpace",
  description: "How StudioSpace collects, uses and protects your information.",
};

const sections = [
  {
    title: "Information we collect",
    body: "We collect the account details you provide when you register, including your name, email address and profile photo URL. When you list a studio, we store the listing details, photos, pricing and availability you submit.",
  },
  {
    title: "How we use your information",
    body: "Your information is used to operate your account, publish studio listings, process booking requests and help hosts and creators communicate about confirmed sessions.",
  },
  {
    title: "Booking and payment details",
    body: "Booking records include the studio, date, time, duration and calculated total shown at checkout. StudioSpace does not store full card numbers or payment credentials on this platform.",
  },
  {
    title: "Sharing",
    body: "Host details are shown on listings so creators know who they are booking with. We do not sell personal information. We only share data when needed to provide the service or when required by law.",
  },
  {
    title: "Your choices",
    body: "You can update your studio listings, cancel pending bookings and request account help by contacting the StudioSpace team. You may ask us to correct or delete your account information.",
  },
  {
    title: "Security",
    body: "Sessions are protected with secure, HTTP-only cookies and short-lived access tokens. Private routes and studio mutations require an authenticated session.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020b14] px-6 py-16 text-white md:px-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f4b63a]">
          Legal
        </p>

        <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-4 text-base leading-8 text-slate-400">
          This policy explains what StudioSpace stores, why we store it and how
          creators and hosts stay in control of their information.
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
          Questions about this policy?{" "}
          <Link href="/about" className="text-[#f4b63a] hover:text-[#f7c04f]">
            Learn more about StudioSpace
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
