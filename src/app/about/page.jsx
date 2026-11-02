import Image from "next/image";
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
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 lg:py-16">
        <section className="rounded-[28px] border border-white/10 bg-[#0b1118] px-6 py-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:px-8 lg:px-10 lg:py-9">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Badge className="border-[#f7b21a]/40 bg-[#f7b21a]/10 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.28rem] text-[#f7b21a]">
                ABOUT STUDIOSPACE
              </Badge>

              <h1 className="mt-6 max-w-[520px] text-4xl font-black leading-[0.94] tracking-[-0.06em] text-white md:text-5xl lg:text-[4rem]">
                We built the marketplace we kept wishing existed.
              </h1>

              <div className="mt-6 space-y-5 text-base leading-8 text-slate-300">
                <p>
                  StudioSpace started with a photographer renting a friend&apos;s living room for a shoot, and a musician with a treated room sitting empty for days. We saw a gap: talented creators had the gear and the eye, but not a simple way to find reliable spaces that fit how they actually work.
                </p>
                <p>
                  Today StudioSpace connects independent creators with the studios, stages, lounges and workshops they need — without the friction and guesswork.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  className="inline-flex items-center gap-2 rounded-full border border-[#f7b21a] bg-[#f7b21a] px-5 py-3 text-sm font-semibold text-[#121b2b] shadow-[0_0_25px_rgba(247,178,26,0.35)] hover:bg-[#ffbf38]"
                >
                  Explore studios
                  <IconArrowRight size={16} />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
                >
                  List your space
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#101820] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <Image
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
                  alt="Professional camera and studio equipment"
                  width={1200}
                  height={900}
                  className="h-[420px] w-full object-cover object-center md:h-[500px]"
                />
              </div>

              <div className="absolute -bottom-5 left-1/2 w-[68%] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#f3f7fb]/95 px-4 py-3 text-slate-900 shadow-[0_20px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dfeaf7] text-slate-900">
                    <IconStar size={18} className="fill-current" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">“The room makes the work.”</p>
                    <p className="text-[11px] text-slate-600">StudioSpace hosts, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid border-t border-white/10 bg-[#0b1118] px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-h-[120px] flex-col justify-center border-b border-white/10 px-4 py-5 sm:border-b-0 sm:border-r last:sm:border-r-0 lg:border-r lg:last:border-r-0"
            >
              <p className="text-3xl font-black tracking-[-0.05em] text-white md:text-[2.2rem]">
                {stat.value}
              </p>
              <p className="mt-2 text-[0.78rem] font-medium tracking-[0.14em] text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="max-w-[760px] text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">
            What we care about when we build this
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {principles.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="border border-white/10 bg-[#0b1118] shadow-[0_15px_35px_rgba(0,0,0,0.18)]"
              >
                <CardContent className="p-5 md:p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f7b21a]/12 text-[#f7b21a]">
                    <Icon size={18} />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
                  <p className="text-[15px] leading-7 text-slate-300">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
