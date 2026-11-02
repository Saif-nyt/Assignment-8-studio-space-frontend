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
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f5a623]";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#050506] text-white">
      <section className="mx-auto w-full max-w-[1160px] px-6 pb-16 pt-16">
        <p className={eyebrowClass}>How it works</p>
        <h1 className="mt-5 max-w-[620px] text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[44px]">
          Booking a studio should feel like booking a table
        </h1>
        <p className="mt-6 max-w-[600px] text-[14px] leading-7 text-slate-400">
          StudioSpace is peer-to-peer: creators book directly from the people who
          own and run the spaces. No agencies, no minimum contracts, no mystery
          fees — just the room, the hours you need, and a host who knows the
          gear.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button
            render={<Link href="/studios" />}
            className="h-10 rounded-full border border-[#f5a623] bg-[#f5a623] px-5 text-[13px] font-semibold text-[#141414] shadow-[0_0_24px_rgba(245,166,35,0.25)] transition hover:bg-[#ffb733]"
          >
            Explore studios
            <IconArrowRight size={15} stroke={2} />
          </Button>
          <Button
            render={<Link href="/add-studio" />}
            variant="outline"
            className="h-10 rounded-full border-white/15 bg-transparent px-5 text-[13px] font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.04]"
          >
            Host your space
          </Button>
        </div>
      </section>

      <Separator className="bg-white/[0.06]" />

      <section className="mx-auto w-full max-w-[1160px] px-6 py-16">
        <p className={eyebrowClass}>How booking works</p>
        <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.02em] text-white md:text-[32px]">
          Four steps from idea to call time
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <Card
              key={step.number}
              className="gap-0 rounded-xl bg-[#0a0a0b] py-0 text-slate-300 ring-1 ring-white/[0.08] [--card-spacing:--spacing(5)]"
            >
              <CardContent className="px-5 py-5">
                <div className="flex items-start justify-between">
                  <step.icon size={20} stroke={1.6} className="text-[#f5a623]" />
                  <span className="text-[22px] font-light leading-none tracking-tight text-white/15">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-10 text-[14px] font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-[1.7] text-slate-400">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="bg-white/[0.06]" />

      <section className="mx-auto w-full max-w-[1160px] px-6 py-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <p className={eyebrowClass}>For hosts</p>
            <h2 className="mt-4 max-w-[360px] text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-[32px]">
              You stay in control of your room
            </h2>
            <p className="mt-5 max-w-[360px] text-[13px] leading-6 text-slate-400">
              Every listing is yours to run. Approve who comes in, block your own
              calendar and step away from the booking admin.
            </p>
          </div>

          <div className="space-y-3">
            {HOST_CONTROLS.map((item) => (
              <Card
                key={item.title}
                className="flex-row items-center gap-4 rounded-xl bg-[#0a0a0b] px-4 py-4 text-slate-300 ring-1 ring-white/[0.08]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f5a623]/30 bg-[#f5a623]/[0.08] text-[#f5a623]">
                  <item.icon size={17} stroke={1.7} />
                </span>
                <div>
                  <h3 className="text-[13px] font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[12.5px] leading-6 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="host-guarantee"
        className="mx-auto w-full max-w-[1160px] px-6 pb-20"
      >
        <div className="rounded-2xl border border-white/[0.07] bg-[#0b0b0c] p-6 md:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-12">
            <div>
              <p className={eyebrowClass}>Host guarantee</p>
              <h2 className="mt-4 max-w-[300px] text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-[30px]">
                Protection for the room and the people in it
              </h2>
              <p className="mt-5 max-w-[300px] text-[13px] leading-6 text-slate-400">
                Creators get real support when a shoot goes sideways. Hosts get
                peace of mind that a booking won&apos;t cost them their gear.
              </p>
              <Button
                render={<Link href="#host-guarantee" />}
                className="mt-7 h-9 rounded-full border border-[#f5a623] bg-[#f5a623] px-4 text-[12.5px] font-semibold text-[#141414] transition hover:bg-[#ffb733]"
              >
                Read the guarantee
                <IconArrowRight size={14} stroke={2} />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {GUARANTEES.map((item) => (
                <Card
                  key={item.title}
                  className="gap-0 rounded-lg bg-[#0a0a0b] py-0 text-slate-300 ring-1 ring-white/[0.08] [--card-spacing:--spacing(4)]"
                >
                  <CardHeader className="px-4 pt-4">
                    <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-md border border-[#f5a623]/25 bg-[#f5a623]/[0.08] text-[#f5a623]">
                      <item.icon size={15} stroke={1.7} />
                    </span>
                    <CardTitle className="text-[12.5px] font-semibold text-white">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-[11.5px] leading-[1.65] text-slate-400">
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
