#!/usr/bin/env bash
# Resize a photo for the site and print a photos.js block.
# usage: ./tools/add-photo.sh "/path/to/photo.jpg" [caption] [tape]
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo 'usage: tools/add-photo.sh "/path/to/photo.jpg" [caption] [butter|rose|sage|sky]'
  exit 1
fi

SRC="$1"
CAPTION="${2:-}"
TAPE="${3:-butter}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NAME="$(basename "$SRC")"
STEM="${NAME%.*}"
SLUG="$(printf '%s' "$STEM" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')"
OUT="$ROOT/images/$SLUG.webp"

if [ ! -f "$SRC" ]; then
  echo "photo not found: $SRC"
  exit 1
fi

if command -v magick >/dev/null 2>&1; then
  magick "$SRC" -auto-orient -resize '1400x1400>' -strip -quality 82 "$OUT"
elif command -v convert >/dev/null 2>&1; then
  convert "$SRC" -auto-orient -resize '1400x1400>' -strip -quality 82 "$OUT"
else
  echo "ImageMagick is not installed. Install it first, or resize the photo yourself."
  exit 1
fi

DIMS="$(identify -format '%w %h' "$OUT")"
W="${DIMS%% *}"
H="${DIMS##* }"

echo
echo "Saved: images/$SLUG.webp ($W x $H)"
echo "Paste this inside PHOTOS in js/photos.js:"
echo
if [ -n "$CAPTION" ]; then
  cat <<EOF
  {
    src: "images/$SLUG.webp",
    w: $W, h: $H,
    caption: "$CAPTION",
    alt: "$CAPTION",
    tape: "$TAPE"
  },
EOF
else
  cat <<EOF
  {
    src: "images/$SLUG.webp",
    w: $W, h: $H,
    alt: "A memory from our second year",
    tape: "$TAPE"
  },
EOF
fi
