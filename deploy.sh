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

# Build the application
echo "Building application..."
pnpm build

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
