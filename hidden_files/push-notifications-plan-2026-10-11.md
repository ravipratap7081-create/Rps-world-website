# Push Notifications — Pro Universe PWA (plan, 2026-10-11)

## Why now
- Morning deep-verification (2026-10-11) flagged push as **the next big earning/engagement weapon** — it is the only gap left besides AdSense.
- The coins loop is dead without a re-engagement trigger: a user installs the PWA, never opens it again, and gets zero reminders about the daily +10 check-in. Revenue is ₹0; push is the cheapest growth lever available.
- **Cost: ₹0. No accounts needed.** Web Push needs no Firebase/FCM project — the browser handles delivery. VAPID keys are generated locally, free.

## Verified current state (2026-10-11 ~13:35 IST)
- `public/sw.js` = app-shell caching only. No `push` / `notificationclick` handlers.
- Zero PushManager/VAPID/web-push code anywhere in the codebase (searched app/, public/, lib/).
- SW registration already exists in `app/layout.js` (`navigator.serviceWorker.register('/sw.js')`) — no change needed there.

## Build plan (4 pieces, ~1 session)

### 1. Database — draft SQL ready, NOT applied
`supabase/migrations/20261012_push_subscriptions_DRAFT.sql` — `push_subscriptions` table (user_id PK, endpoint UNIQUE, p256dh, auth) + owner-only RLS. **Applies only after Ravi's approval** (DB boundary).

### 2. Service worker — handlers (draft)
Append to `public/sw.js`:
```js
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) {}
  e.waitUntil(
    self.registration.showNotification(d.title || "Pro Universe", {
      body: d.body || "Naya update hai — kholo aur dekho",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: d.tag || "pro-universe",
      renotify: true,
      data: { url: d.url || "/coins" },
    })
  );
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "/coins";
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((cs) => {
      for (const c of cs) { if (new URL(c.url).pathname === url) return c.focus(); }
      return self.clients.openWindow(url);
    })
  );
});
```

### 3. Client — opt-in subscribe flow (draft)
- Soft prompt AFTER login/onboarding (premium bottom-sheet, not the raw browser dialog): "🔔 Daily check-in yaad dilayein? +10 coins roz" → [Haan] → `Notification.requestPermission()` → `pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: <VAPID public> })` → `POST /api/push/subscribe` with `{ endpoint, keys }`.
- `/api/push/subscribe`: `getAuthSession()` verifies user server-side, upserts row with `user_id = user.id` (never from client). DELETE route for unsubscribe + a settings toggle.

### 4. Sender — API route + Vercel Cron (draft design)
- `POST /api/push/send` — requires `Authorization: Bearer $CRON_SECRET` (Vercel Cron sends this automatically when the env var exists). Body: `{ title, body, url, tag }`. Uses `web-push` npm package with `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` / `VAPID_SUBJECT=mailto:` from Vercel env. Reads subscriptions via service_role; deletes rows that return 404/410 (stale).
- `vercel.json`: one cron — daily 09:30 IST → `/api/push/send` with the check-in reminder payload ("⏰ Aaj ke +10 coins ready hain! 30 second me check-in karo 💰" → opens `/coins`). One-off campaigns (new tool, Diwali promo) = manual POST by Muse.
- VAPID key generation (verified working 2026-10-11; generate FRESH keys at build time — the research test pair must NOT be used):
  `pip install cryptography && python3 gen_vapid.py` → public → `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, private → Vercel env `VAPID_PRIVATE_KEY`.

## Privacy & safety
- Opt-in only; user can unsubscribe anytime (settings toggle + browser site settings).
- RLS: no user can read another user's subscription. Push payloads contain no personal data.
- Uninstall/permission-revoke → browser auto-expires the subscription; sender cleans 404/410s.

## What Ravi decides (one question)
**"Push notifications lagau?"** — ₹0 cost, ~1 build session, no purchase/signup needed from him. If yes: approve the draft migration → build + deploy → he opens the PWA once and taps "Allow" on his own phone to verify end-to-end. If no: coins loop stays pull-only; nothing changes.

## Useful until
No hard expiry — but value compounds with user count, so earlier is better. Revisit when the PWA has real users if declined now.
