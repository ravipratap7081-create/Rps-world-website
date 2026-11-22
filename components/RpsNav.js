// RPS World — persistent top nav (audit Fix 1, 7 Nov 2026).
// AURORA GLASS v2 (22 Nov 2026): glass styling only — links, order, wordmark
// target (/services) and the 390px fit fix are UNCHANGED.
// Rendered in the root layout, so it appears on EVERY page — including the
// ProTools mode pages (/sarkari, /genz, /parivaar) that returning tool users
// are redirected to by the HomeClient pro-mode redirect (audit H8). The nav
// is the path from the tools product to the website service; it does not
// change the redirect behaviour itself.
export default function RpsNav() {
  // Mobile (390px): the first build clipped the Contact pill — the row was
  // 403px wide in a 390px viewport (wordmark 97px + links 286px + gaps).
  // Tightened 15 Nov 2026: smaller wordmark, tighter link/nav padding and
  // gaps on mobile only (sm+ unchanged) — row now ~370px, fits with margin.
  // The 14px overflow also stretched the layout viewport (innerWidth 404),
  // which made the fixed consent banner 404px wide too; fixing the nav
  // fixes the banner as well (verified by 390px headless re-check 15 Nov 2026:
  // scrollWidth 390, 0 offenders on all 4 pages).
  const link =
    "rounded-lg px-1.5 py-2 text-[13px] font-semibold text-white/75 hover:bg-white/5 hover:text-white sm:px-3 sm:text-[14px]";
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070712]/75 backdrop-blur-[16px]">
      <nav
        className="mx-auto flex h-[52px] max-w-5xl items-center gap-1 px-2 sm:px-4"
        aria-label="RPS World"
      >
        <a
          href="/services"
          className="mix-h mr-1 shrink-0 text-[14px] tracking-wide text-[#E3B34B] sm:text-[16px]"
        >
          RPS WORLD
        </a>
        <span className="mr-2 hidden text-[11px] text-white/40 sm:block">
          Websites
        </span>
        <div className="ml-auto flex items-center gap-0.5 whitespace-nowrap sm:gap-1">
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
            href="https://protools.rpsworld.in"
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
