import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconCamera,
  IconCircleDashed,
  IconShieldCheck,
  IconSparkles,
  IconStar,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "1,240", label: "SPACES HOSTED" },
  { value: "18", label: "CITIES" },
  { value: "37k", label: "SESSIONS BOOKED" },
  { value: "4.8", label: "AVERAGE RATING" },
];

const principles = [
  {
    icon: IconSparkles,
    title: "Peer-to-peer by design",
    description:
      "Creators book from creators. The money stays with the people who built the room, not a middle layer.",
  },
  {
    icon: IconShieldCheck,
    title: "Trust, documented",
    description:
      "Verified hosts, published amenities and session reviews — so what you see is what you walk into.",
  },
  {
    icon: IconCamera,
    title: "Space for the work",
    description:
      "Every listing is judged on one question: can someone make something good in here?",
  },
  {
    icon: IconCircleDashed,
    title: "Local first",
    description:
      "Eighteen cities and counting, because the best studios are usually right around the corner.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 lg:py-20">
        {/* Hero Section */}
        <section className="rounded-[28px] border border-white/10 bg-[#0b1118] px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:px-10 lg:px-14 lg:py-14">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Badge className="border-[#f7b21a]/40 bg-[#f7b21a]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-[#f7b21a]">
                ABOUT STUDIOSPACE
              </Badge>

              <h1 className="mt-7 max-w-[680px] text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl lg:text-[64px]">
                We built the marketplace we kept wishing existed.
              </h1>

              <div className="mt-8 max-w-[650px] space-y-5 text-base leading-8 text-slate-300 md:text-lg md:leading-9">
                <p>
                  StudioSpace started with a photographer renting a
                  friend&apos;s living room for a shoot, and a musician with a
                  treated room sitting empty for days. We saw a gap: talented
                  creators had the gear and the eye, but not a simple way to
                  find reliable spaces that fit how they actually work.
                </p>

                <p>
                  Today StudioSpace connects independent creators with the
                  studios, stages, lounges and workshops they need — without the
                  friction and guesswork.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  render={<Link href="/studios" />}
                  className="h-12 rounded-full border border-[#f7b21a] bg-[#f7b21a] px-7 text-sm font-semibold text-[#121b2b] shadow-[0_0_25px_rgba(247,178,26,0.25)] transition hover:bg-[#ffbf38] md:text-base"
                >
                  Explore studios
                  <IconArrowRight size={18} />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  render={<Link href="/add-studio" />}
                  className="h-12 rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10 md:text-base"
                >
                  List your space
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#101820] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <Image
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
                  alt="Professional camera and studio equipment"
                  width={1200}
                  height={900}
                  priority
                  className="h-[380px] w-full object-cover object-center sm:h-[460px] lg:h-[560px]"
                />
              </div>

              {/* Floating Review */}
              <div className="absolute -bottom-6 left-1/2 w-[85%] max-w-[380px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#f3f7fb]/95 px-5 py-4 text-slate-900 shadow-[0_20px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:w-[75%]">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dfeaf7] text-slate-900">
                    <IconStar size={21} className="fill-current" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-slate-900">
                      “The room makes the work.”
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      StudioSpace hosts, 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-12 grid overflow-hidden rounded-2xl border border-white/10 bg-[#0b1118] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex min-h-[150px] flex-col justify-center border-b border-white/10 px-7 py-7 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 lg:px-10 ${
                index === 1 ? "sm:border-r-0 lg:border-r" : ""
              }`}
            >
              <p className="text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
                {stat.value}
              </p>

              <p className="mt-3 text-xs font-semibold tracking-[0.16em] text-slate-400 md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {/* Principles */}
        <section className="mt-24 lg:mt-28">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f7b21a]">
              Our principles
            </p>

            <h2 className="mt-5 max-w-[850px] text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl md:text-5xl">
              What we care about when we build this
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {principles.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="rounded-2xl border border-white/10 bg-[#0b1118] shadow-[0_15px_35px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[#f7b21a]/30"
              >
                <CardContent className="p-7 md:p-9">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7b21a]/10 text-[#f7b21a]">
                    <Icon size={22} stroke={1.7} />
                  </div>

                  <h3 className="mb-4 text-xl font-semibold text-white md:text-2xl">
                    {title}
                  </h3>

                  <p className="max-w-[600px] text-base leading-8 text-slate-300">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
