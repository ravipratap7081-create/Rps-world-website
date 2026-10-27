"use client";

// Shared premium primitives: cards, headers, skeletons, empty states.

export function PageHeader({ title, subtitle, right }) {
  return (
    <div className="mb-5 animate-fadeUp">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2
            className="text-[21px] font-bold text-mist-100 tracking-tight"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-mist-300 text-[14px] mt-1 leading-snug">{subtitle}</p>
          )}
        </div>
        {right}
      </div>
    </div>
  );
}

export function SectionLabel({ children }) {
  return <p className="pu-section-label">{children}</p>;
}

export function PremiumCard({ children, accent, className = "", style, onClick, i }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      style={{ "--i": i ?? 0, ...style }}
      className={`pu-card ${accent ? "pu-card-accent" : ""} ${
        onClick ? "pu-press pu-press-card text-left w-full" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

export function ToolTile({ icon, title, desc, badge, onClick, href, i, tint, tool }) {
  // tool_name slug: explicit `tool` prop wins; else the href's last segment
  // (dashes -> underscores); else a slugified title. Same tile always maps
  // to the same tool_name, so GA4 and Supabase stay consistent.
  const slugify = (s) =>
    (s || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  const toolName =
    tool ||
    (href ? slugify(href.split("/").filter(Boolean).pop()) : slugify(title));
  const inner = (
    <>
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3"
        style={{
          background: tint || "rgba(245,179,1,0.12)",
          color: "#F5B301",
        }}
      >
        {icon}
      </div>
      <div className="font-semibold text-mist-100 text-[15px] leading-tight">
        {title}
      </div>
      <div className="text-mist-500 text-[12.5px] mt-1 leading-snug">{desc}</div>
      {badge && (
        <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300">
          {badge}
        </span>
      )}
    </>
  );
  const cls = `pu-card pu-press pu-press-card block p-4 text-left w-full`;
  const props = { style: { "--i": i ?? 0 }, className: cls };
  // Funnel event: a tile tap is a `tool_click` (intent only — NOT an open).
  // The real `tool_open` fires on successful route arrival in Tracker.js.
  // Guarded so tiles keep working even if Tracker has not mounted yet.
  const fire = () => {
    try {
      if (typeof window !== "undefined" && typeof window.puEvent === "function") {
        window.puEvent("tool_click", { tool_name: toolName });
      }
    } catch (e) {}
  };
  if (onClick)
    return (
      <button
        onClick={(e) => {
          fire();
          onClick(e);
        }}
        {...props}
      >
        {inner}
      </button>
    );
  return (
    <a href={href} onClick={fire} {...props}>
      {inner}
    </a>
  );
}

export function SkeletonCard() {
  return (
    <div className="pu-card p-4">
      <div className="pu-skeleton w-11 h-11 rounded-2xl mb-3" />
      <div className="pu-skeleton h-4 w-3/4 mb-2" />
      <div className="pu-skeleton h-3 w-1/2" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="pu-card p-4 flex items-center gap-3">
      <div className="pu-skeleton w-10 h-10 rounded-xl shrink-0" />
      <div className="flex-1">
        <div className="pu-skeleton h-4 w-2/3 mb-2" />
        <div className="pu-skeleton h-3 w-1/3" />
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, desc, actionLabel, onAction }) {
  return (
    <div className="pu-card p-8 text-center animate-fadeUp">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="text-mist-100 font-semibold text-[15px]">{title}</p>
      <p className="text-mist-500 text-[13px] mt-1 leading-relaxed">{desc}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="pu-btn-primary pu-press mt-5 px-6 py-3 text-[14px] inline-flex items-center"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function SuccessCheck({ size = 64 }) {
  return (
    <div
      className="animate-popIn rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none"
        stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" className="pu-check-draw" />
      </svg>
    </div>
  );
}

export function TrustBadge({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
      {icon}
      {text}
    </span>
  );
}
