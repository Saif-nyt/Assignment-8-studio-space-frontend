export default function ProtectionSection() {
  const features = [
    {
      title: "Liability protection",
      description:
        "Every confirmed booking is backed by up to $1M in liability coverage for hosts and creators.",
      // Shield Icon
      icon: (
        <svg
          className="w-6 h-6 text-[#22d3ee] stroke-current fill-none stroke-[2]"
          viewBox="0 0 24 24"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: "Verified hosts",
      description:
        "Hosts confirm their identity and space details before listings go live.",
      // Badge Check Icon
      icon: (
        <svg
          className="w-6 h-6 text-[#22d3ee] stroke-current fill-none stroke-[2]"
          viewBox="0 0 24 24"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Equipment safety",
      description:
        "Listed gear is inspected by hosts and security deposits protect both sides.",
      // Wrench Icon
      icon: (
        <svg
          className="w-6 h-6 text-[#22d3ee] stroke-current fill-none stroke-[2]"
          viewBox="0 0 24 24"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      title: "Creator support",
      description:
        "Real people on hand seven days a week if something on set doesn't go to plan.",
      // Headphones Icon
      icon: (
        <svg
          className="w-6 h-6 text-[#22d3ee] stroke-current fill-none stroke-[2]"
          viewBox="0 0 24 24"
        >
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative bg-[#090d14] py-24 px-6 md:px-12 text-white overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Headline & Description */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[#22d3ee] text-xs font-semibold tracking-wider uppercase block">
            HOST GUARANTEE & CREATOR SUPPORT
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">
            Protected on both sides of the lens
          </h2>
          <p className="text-slate-400 text-base leading-relaxed font-normal max-w-md">
            Whether you’re opening your studio or booking one, StudioSpace keeps
            every session covered so you can focus on the work.
          </p>
        </div>

        {/* Right 2x2 Feature Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#0e131f]/80 backdrop-blur-sm border border-[#1e293b]/60 rounded-2xl p-7 space-y-4 hover:border-slate-700 transition-colors"
            >
              <div>{feature.icon}</div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
