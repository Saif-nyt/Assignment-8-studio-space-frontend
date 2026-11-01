import Link from "next/link";

const exploreLinks = [
  { label: "Discover studios", href: "/studios" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About StudioSpace", href: "/about" },
];

const hostLinks = [
  { label: "List your space", href: "/add-studio" },
  { label: "Manage listings", href: "/my-bookings" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.1L5.8 22H2.7l7.3-8.4L1.8 2h6.5l4.4 6.5L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M5.2 3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0ZM1 8h4v15H1V8Zm7 0h3.8v2.1h.1c.5-1 1.8-2.5 4.1-2.5 4.4 0 5.2 2.9 5.2 6.7V23h-4v-7.7c0-1.8 0-4.1-2.5-4.1s-2.8 1.9-2.8 4V23H8V8Z" />
      </svg>
    ),
  },
];

function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white mb-6">{title}</h3>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#090d14] text-slate-300 border-t border-white/[0.07]">
      {/* Background ambient glow */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-amber-500/[0.045] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 py-16 lg:py-20">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-7">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-[#111827] shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform duration-300">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M14.3 8 20 18" />
                  <path d="M9.7 8h11.5" />
                  <path d="m7.4 12 5.7-10" />
                  <path d="m9.7 16-5.7-10" />
                  <path d="M14.3 16H2.8" />
                  <path d="m16.6 12-5.7 10" />
                </svg>
              </div>

              <span className="text-2xl font-bold tracking-tight text-white">
                Studio<span className="text-amber-400">Space</span>
              </span>
            </Link>

            <p className="text-sm leading-7 text-slate-400 max-w-md">
              Discover and book inspiring creative spaces by the hour. From
              sunlit lofts to professional soundstages, find the perfect space
              for your next idea.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.025] flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 hover:bg-amber-400/[0.06] transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore Column */}
          <div className="lg:col-span-3">
            <FooterLinks title="Explore" links={exploreLinks} />
          </div>

          {/* Hosts Column */}
          <div className="lg:col-span-4">
            <FooterLinks title="For space owners" links={hostLinks} />

            {/* Host CTA */}
            <div className="mt-9 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.025]">
              <p className="text-sm font-medium text-white">
                Have a creative space?
              </p>

              <p className="text-xs text-slate-400 mt-2 leading-5">
                Turn your space into an opportunity. Start hosting today.
              </p>

              <Link
                href="/add-studio"
                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                Become a host
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/[0.07] py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>

          <p className="text-xs text-slate-500">Made for creative minds.</p>
        </div>
      </div>
    </footer>
  );
}
