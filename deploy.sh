#!/bin/bash

# Deployment script for Next.js app
# Creates logs in ./logs directory

set -e

LOG_DIR="./logs"
LOG_FILE="$LOG_DIR/deploy-$(date +%Y%m%d-%H%M%S).log"

# Create logs directory
mkdir -p "$LOG_DIR"

# Redirect output to log file
exec > >(tee -a "$LOG_FILE") 2>&1

echo "=== Deployment started at $(date) ==="

# ============================================================================
# ENVIRONMENT VALIDATION — fail fast before spending 2 minutes on a build
# that is going to ship a broken bundle. All NEXT_PUBLIC_* vars must be in
# .env BEFORE `pnpm build` runs; they are inlined into the client bundle at
# build time and cannot be fixed by restarting PM2 afterward.
# ============================================================================

if [ ! -f .env ]; then
  echo "ERROR: .env not found at repo root. Create it with the required"
  echo "       NEXT_PUBLIC_* vars before deploying."
  exit 1
fi

REQUIRED_VARS=(
  NEXT_PUBLIC_POSTHOG_API_KEY
  NEXT_PUBLIC_POSTHOG_HOST
)

for var in "${REQUIRED_VARS[@]}"; do
  value=$(grep -E "^${var}=" .env | cut -d= -f2- | sed 's/^"//;s/"$//' || true)
  if [ -z "$value" ]; then
    echo "ERROR: ${var} is missing or empty in .env."
    echo "       The PostHog client will be disabled in production and the"
    echo "       funnel-correction dashboards will receive zero events."
    echo "       Add ${var}=... to .env and rerun ./deploy.sh"
    exit 1
  fi
  # Log a fingerprint (first 12 chars) so the human can eyeball the value
  # without leaking it into deploy logs.
  echo "✓ ${var} present (${value:0:12}...)"
done

POSTHOG_KEY_FINGERPRINT=$(grep -E '^NEXT_PUBLIC_POSTHOG_API_KEY=' .env \
  | cut -d= -f2- \
  | sed 's/^"//;s/"$//' \
  | head -c 12)

# Clean lockfile if corrupted
if ! pnpm install --lockfile-only 2>&1 | grep -q "broken lockfile"; then
  echo "Lockfile OK"
else
  echo "Lockfile corrupted, regenerating..."
  rm -f pnpm-lock.yaml
fi

# Install dependencies
echo "Installing dependencies..."
pnpm install --no-frozen-lockfile

# Clean Next cache so new client imports (e.g. posthog-provider) are picked
# up — the project CLAUDE.md calls this out explicitly: only clean .next,
# never .content-collections.
echo "Cleaning .next cache..."
rm -rf .next

# Build the application
echo "Building application..."
pnpm build

# ============================================================================
# POST-BUILD VERIFICATION — confirm the PostHog key actually got baked into
# the client bundle. If the user accidentally edits env.mjs or changes the
# provider path, this grep fails fast BEFORE PM2 serves the broken build.
# ============================================================================
echo "Verifying PostHog key was inlined into the client bundle..."
if grep -rq --include='*.js' "${POSTHOG_KEY_FINGERPRINT}" .next/static 2>/dev/null; then
  echo "✓ PostHog key found in client bundle — tracking will be live after PM2 restart"
else
  echo "ERROR: PostHog key fingerprint ${POSTHOG_KEY_FINGERPRINT}... was"
  echo "       not found in any .next/static/**/*.js file."
  echo "       The build completed but PostHog init will be dead code in"
  echo "       production. Likely cause: posthog-provider.tsx was not"
  echo "       imported from app/layout.tsx, or lib/events.ts stopped"
  echo "       calling posthog.capture(), or the Zod enum rejected an event."
  exit 1
fi

# Copy static assets for standalone build
echo "Copying static assets..."
rm -rf .next/standalone/public .next/standalone/.next/static
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# Restart application with PM2
echo "Restarting application with PM2..."
cd .next/standalone
pm2 restart ruixen-server || pm2 start server.js --name ruixen-server
cd ../..

echo "=== Deployment completed at $(date) ==="
echo "Log file: $LOG_FILE"
echo ""
echo "Verify in the browser:"
echo "  1. Open https://ruixen.com in incognito"
echo "  2. DevTools Console: window.posthog?.config?.token"
echo "  3. Should print the key, not undefined"
echo "  4. Then open PostHog Live Events and click any Pro CTA"
