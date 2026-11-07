// RPS World — persistent top nav (audit Fix 1, 7 Nov 2026).
// Rendered in the root layout, so it appears on EVERY page — including the
// ProTools mode pages (/sarkari, /genz, /parivaar) that returning tool users
// are redirected to by the HomeClient pro-mode redirect (audit H8). The nav
// is the path from the tools product to the website service; it does not
// change the redirect behaviour itself.
export default function RpsNav() {
  // Mobile (390px): tighter padding + 13px links so all four links fit —
  // the first build clipped the Contact pill inside an overflow-x-auto div.
  const link =
    "rounded-lg px-2 py-2 text-[13px] font-semibold text-white/75 hover:bg-white/5 hover:text-white sm:px-3 sm:text-[14px]";
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0E17]/95 backdrop-blur">
      <nav
        className="mx-auto flex h-[52px] max-w-5xl items-center gap-1 px-3 sm:px-4"
        aria-label="RPS World"
      >
        <a
          href="/services"
          className="mr-1 shrink-0 text-[14px] font-extrabold tracking-wide text-amber-400 sm:text-[15px]"
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
            href="/services/contact"
            className="rounded-lg bg-amber-400 px-2.5 py-2 text-[13px] font-bold text-black hover:bg-amber-300 sm:px-3 sm:text-[14px]"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
