#!/bin/bash

# Purge Cloudflare cache
# Usage: ./purge-cloudflare.sh YOUR_ZONE_ID YOUR_API_TOKEN

ZONE_ID="${1:-YOUR_ZONE_ID_HERE}"
API_TOKEN="${2:-YOUR_API_TOKEN_HERE}"

if [ "$ZONE_ID" = "YOUR_ZONE_ID_HERE" ] || [ "$API_TOKEN" = "YOUR_API_TOKEN_HERE" ]; then
  echo "Usage: ./purge-cloudflare.sh ZONE_ID API_TOKEN"
  echo ""
  echo "Get these from your Cloudflare dashboard:"
  echo "1. Zone ID: Domain Overview page"
  echo "2. API Token: My Profile > API Tokens > Create Token"
  exit 1
fi

echo "Purging Cloudflare cache for zone: $ZONE_ID"

curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'

echo ""
echo "Cache purge requested. Check Cloudflare dashboard to confirm."
