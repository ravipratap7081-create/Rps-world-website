// RPS World — persistent top nav (audit Fix 1, 7 Nov 2026).
// Rendered in the root layout, so it appears on EVERY page — including the
// ProTools mode pages (/sarkari, /genz, /parivaar) that returning tool users
// are redirected to by the HomeClient pro-mode redirect (audit H8). The nav
// is the path from the tools product to the website service; it does not
// change the redirect behaviour itself.
export default function RpsNav() {
  // Mobile (390px): tighter padding + 13px links so all four links fit —
  // the first build clipped the Contact pill inside an overflow-x-auto div.
  // Mix design (Option D, 7 Nov 2026): Fraunces serif wordmark in Mix gold,
  // Contact is a gold block button (18px/6px asymmetric corners).
  const link =
    "rounded-lg px-2 py-2 text-[13px] font-semibold text-white/75 hover:bg-white/5 hover:text-white sm:px-3 sm:text-[14px]";
  return (
    <header className="sticky top-0 z-50 border-b border-[#E3B34B]/20 bg-[#0A0616]/95 backdrop-blur">
      <nav
        className="mx-auto flex h-[52px] max-w-5xl items-center gap-1 px-3 sm:px-4"
        aria-label="RPS World"
      >
        <a
          href="/services"
          className="mix-h mr-1 shrink-0 text-[15px] tracking-wide text-[#E3B34B] sm:text-[16px]"
        >
          RPS WORLD
        </a>
        <span className="mr-2 hidden text-[11px] text-white/40 sm:block">
          Websites
        </span>
        <div className="ml-auto flex items-center gap-1 whitespace-nowrap">
          <a href="/services" className={link}>
            Services
          </a>
          <a href="/services/pricing" className={link}>
            Pricing
          </a>
          <a href="/services/work" className={link}>
            Work
          </a>
          <a
            href="https://pdf-merge-split-free.vercel.app"
            className={link + " hidden sm:block"}
            title="ProTools — Free PDF Tools: Merge, Split, Compress"
          >
            PDF Tools
          </a>
          <a
            href="/services/contact"
            className="mix-btn mix-btn--sm"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
