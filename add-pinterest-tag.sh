#!/bin/bash
# Pinterest domain verification tag injector
# Usage: ./add-pinterest-tag.sh "VERIFICATION_CODE"
# Ravi sends the content="..." value from Pinterest, this script adds it and it's ready to deploy

CODE="$1"
if [ -z "$CODE" ]; then
  echo "Usage: ./add-pinterest-tag.sh 'YOUR_PINTEREST_CODE'"
  exit 1
fi

LAYOUT="app/layout.js"

# Check if already has pinterest verification
if grep -q "p:domain_verify" "$LAYOUT"; then
  echo "Updating existing Pinterest verification tag..."
  sed -i "s/\"p:domain_verify\": \"[^\"]*\"/\"p:domain_verify\": \"$CODE\"/" "$LAYOUT"
else
  echo "Adding Pinterest verification tag..."
  # Add to metadata.other block (create if needed)
  if grep -q "other:" "$LAYOUT"; then
    sed -i "s/other: {/other: {\n    \"p:domain_verify\": \"$CODE\",/" "$LAYOUT"
  else
    # Add other block after manifest line
    sed -i "s|manifest: \"/manifest.json\",|manifest: \"/manifest.json\",\n  other: {\n    \"p:domain_verify\": \"$CODE\",\n  },|" "$LAYOUT"
  fi
fi

echo "Done! Tag added. Run npm run build to verify, then deploy."
grep -A2 "p:domain_verify" "$LAYOUT"
