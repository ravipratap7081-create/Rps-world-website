#!/bin/bash
# PRIVACY FIX — swap Ravi's personal WhatsApp number for the business number.
# Usage: ./PRIVACY-FIX-wa-number.sh 91XXXXXXXXXX
# Only run after Ravi names the business WhatsApp number (his decision).
# After running: redeploy pro-universe (Vercel) + ProTools PWA so the live
# pages pick up the new number. Nothing is deployed by this script.
set -u
OLD="919235039317"
NEW="${1:-}"
if ! [[ "$NEW" =~ ^[0-9]{10,13}$ ]]; then
  echo "Usage: $0 <new-number-digits-only, e.g. 91XXXXXXXXXX>"
  exit 1
fi
if [[ "$NEW" == "$OLD" ]]; then echo "New number == old number, nothing to do."; exit 1; fi

FILES=(
  "$HOME/workspace/pro-universe/app/diwali-business-kit/page.js"
  "$HOME/workspace/pro-universe/public/tools/scheme-finder.html"
  "$HOME/workspace/pdf-merge-split/app/scheme-finder.html"
)
for f in "${FILES[@]}"; do
  if [[ -f "$f" ]]; then
    if grep -q "$OLD" "$f"; then
      cp "$f" "$f.bak-20261013"
      sed -i "s/$OLD/$NEW/g" "$f"
      echo "PATCHED: $f (backup: $f.bak-20261013)"
    else
      echo "SKIP (number not found): $f"
    fi
  else
    echo "MISSING: $f"
  fi
done
echo "--- verify: remaining occurrences of old number ---"
grep -rn "$OLD" "$HOME/workspace/pro-universe/app" "$HOME/workspace/pro-universe/public" "$HOME/workspace/pdf-merge-split/app" 2>/dev/null | grep -v ".bak-" | grep -v node_modules || echo "OK: no occurrences left in source."
echo "NEXT: redeploy pro-universe (Vercel) + ProTools PWA."
