
import Link from "next/link";
import {
  IconArrowRight,
  IconCalendarEvent,
  IconCalendarOff,
  IconCamera,
  IconCircleCheck,
  IconMessage2,
  IconSearch,
  IconShieldCheck,
  IconTool,
  IconWallet,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "How It Works — StudioSpace",
  description:
    "How booking a studio on StudioSpace works, from finding the space to shoot day, plus host controls and guarantees.",
};

const STEPS = [
  {
    number: "01",
    title: "Find the space",
    description:
      "Filter by craft, price and capacity. Every listing shows real photos, gear and house rules before you commit.",
    icon: IconSearch,
  },
  {
    number: "02",
    title: "Pick your hours",
    description:
      "Choose a date and a time slot. Availability is checked live, so you never collide with another shoot.",
    icon: IconCalendarEvent,
  },
  {
    number: "03",
    title: "Confirm with the host",
    description:
      "Send your session details. Hosts approve within 24 hours and your slot is locked in the calendar.",
    icon: IconMessage2,
  },
  {
    number: "04",
    title: "Shoot and wrap",
    description:
      "Arrive, check in with your host and make the work. Your receipt is ready to download from My Bookings.",
    icon: IconCamera,
  },
];

const HOST_CONTROLS = [
  {
    title: "You approve every booking",
    description:
      "Requests arrive as pending. Nothing lands on your calendar until you confirm it.",
    icon: IconCircleCheck,
  },
  {
    title: "No double bookings",
    description:
      "Confirmed sessions block those hours automatically, so two shoots can never collide.",
    icon: IconCalendarOff,
  },
  {
    title: "Set your own rate",
    description:
      "Choose your hourly rate and refundable deposit. Hosts keep 90% of every session.",
    icon: IconWallet,
  },
];

const GUARANTEES = [
  {
    title: "Liability protection",
    description:
      "Every confirmed booking includes up to $1M in third-party liability cover for accidental damage during your session.",
    icon: IconShieldCheck,
  },
  {
    title: "Verified hosts",
    description:
      "Hosts verify their identity, address and ownership before a listing goes live. No phantom spaces, no surprise fees.",
    icon: IconCircleCheck,
  },
  {
    title: "Equipment safety",
    description:
      "Listed gear is documented and inspected. If a light, rig or console fails mid-session, we help you rebook at no cost.",
    icon: IconTool,
  },
];

const eyebrowClass =
  "text-xs font-semibold uppercase tracking-[0.22em] text-[#f5a623]";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#050506] text-white">
      {/* Hero */}
      <section className="mx-auto w-full max-w-[1440px] px-6 pb-20 pt-20 md:px-10 lg:pb-24 lg:pt-24">
        <p className={eyebrowClass}>How it works</p>

        <h1 className="mt-6 max-w-[850px] text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl lg:text-[64px]">
          Booking a studio should feel like booking a table
        </h1>

        <p className="mt-7 max-w-[760px] text-base leading-8 text-slate-400 md:text-lg">
          StudioSpace is peer-to-peer: creators book directly from the people
          who own and run the spaces. No agencies, no minimum contracts, no
          mystery fees — just the room, the hours you need, and a host who
          knows the gear.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            render={<Link href="/studios" />}
            className="h-12 rounded-full border border-[#f5a623] bg-[#f5a623] px-7 text-sm font-semibold text-[#141414] shadow-[0_0_24px_rgba(245,166,35,0.25)] transition hover:bg-[#ffb733] md:text-base"
          >
            Explore studios
            <IconArrowRight size={18} stroke={2} />
          </Button>

          <Button
            render={<Link href="/add-studio" />}
            variant="outline"
            className="h-12 rounded-full border-white/15 bg-transparent px-7 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.04] md:text-base"
          >
            Host your space
          </Button>
        </div>
      </section>

      <Separator className="bg-white/[0.06]" />

      {/* Booking steps */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-10 lg:py-24">
        <p className={eyebrowClass}>How booking works</p>

        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.025em] text-white md:text-4xl">
          Four steps from idea to call time
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <Card
              key={step.number}
              className="gap-0 rounded-2xl bg-[#0a0a0b] py-0 text-slate-300 ring-1 ring-white/[0.08] transition duration-300 hover:-translate-y-1 hover:ring-[#f5a623]/30"
            >
              <CardContent className="px-6 py-7 md:px-7 md:py-8">
                <div className="flex items-start justify-between">
                  <step.icon
                    size={25}
                    stroke={1.6}
                    className="text-[#f5a623]"
                  />

                  <span className="text-3xl font-light leading-none tracking-tight text-white/15">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-12 text-lg font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="bg-white/[0.06]" />

      {/* Host controls */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-10 lg:py-28">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
          <div>
            <p className={eyebrowClass}>For hosts</p>

            <h2 className="mt-5 max-w-[500px] text-3xl font-semibold leading-[1.15] tracking-[-0.025em] text-white md:text-4xl">
              You stay in control of your room
            </h2>

            <p className="mt-6 max-w-[480px] text-base leading-8 text-slate-400">
              Every listing is yours to run. Approve who comes in, block your
              own calendar and step away from the booking admin.
            </p>
          </div>

          <div className="space-y-4">
            {HOST_CONTROLS.map((item) => (
              <Card
                key={item.title}
                className="flex-row items-center gap-5 rounded-2xl bg-[#0a0a0b] px-5 py-6 text-slate-300 ring-1 ring-white/[0.08] transition hover:ring-white/[0.15] md:px-7"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f5a623]/30 bg-[#f5a623]/[0.08] text-[#f5a623]">
                  <item.icon size={21} stroke={1.7} />
                </span>

                <div>
                  <h3 className="text-base font-semibold text-white md:text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Host guarantee */}
      <section
        id="host-guarantee"
        className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-10 lg:pb-28"
      >
        <div className="rounded-3xl border border-white/[0.07] bg-[#0b0b0c] p-7 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-16">
            <div>
              <p className={eyebrowClass}>Host guarantee</p>

              <h2 className="mt-5 max-w-[420px] text-3xl font-semibold leading-[1.15] tracking-[-0.025em] text-white md:text-4xl">
                Protection for the room and the people in it
              </h2>

              <p className="mt-6 max-w-[420px] text-base leading-8 text-slate-400">
                Creators get real support when a shoot goes sideways. Hosts get
                peace of mind that a booking won&apos;t cost them their gear.
              </p>

              <Button
                render={<Link href="#host-guarantee" />}
                className="mt-8 h-11 rounded-full border border-[#f5a623] bg-[#f5a623] px-6 text-sm font-semibold text-[#141414] transition hover:bg-[#ffb733]"
              >
                Read the guarantee
                <IconArrowRight size={17} stroke={2} />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {GUARANTEES.map((item) => (
                <Card
                  key={item.title}
                  className="gap-0 rounded-xl bg-[#0a0a0b] py-0 text-slate-300 ring-1 ring-white/[0.08] transition hover:ring-[#f5a623]/25"
                >
                  <CardHeader className="px-5 pt-6 pb-6">
                    <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#f5a623]/25 bg-[#f5a623]/[0.08] text-[#f5a623]">
                      <item.icon size={19} stroke={1.7} />
                    </span>

                    <CardTitle className="text-base font-semibold leading-snug text-white">
                      {item.title}
                    </CardTitle>

                    <CardDescription className="mt-2 text-sm leading-7 text-slate-400">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

