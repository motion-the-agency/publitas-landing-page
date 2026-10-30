#!/usr/bin/env bash
# Encodes the Magnific launch render into the hero's scroll-scrubbed assets.
# Usage: scripts/encode-hero-video.sh path/to/render.mp4 [ffmpeg-binary-with-libvpx]
#
# A keyframe every 2 frames keeps seeking instant while the page scrubs the video with scroll.
set -euo pipefail

SRC="$1"
FF="${2:-ffmpeg}"
OUT="$(dirname "$0")/../public/video"
mkdir -p "$OUT"

encode() {
  local width="$1" suffix="$2" crf_vp9="$3" crf_264="$4"
  local vf="crop=iw-mod(iw\,16):ih-mod(ih\,8),scale=${width}:-2:flags=lanczos,setsar=1"
  "$FF" -v error -y -i "$SRC" -vf "$vf" -an -c:v libvpx-vp9 -b:v 0 -crf "$crf_vp9" -g 2 -keyint_min 2 \
    -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p "$OUT/rocket-launch${suffix}.webm"
  "$FF" -v error -y -i "$SRC" -vf "$vf" -an -c:v libx264 -crf "$crf_264" -preset slow -g 2 -keyint_min 2 \
    -pix_fmt yuv420p -movflags +faststart "$OUT/rocket-launch${suffix}.mp4"
}

encode 1920 "" 34 23
encode 1280 "-720" 34 24

"$FF" -v error -y -i "$SRC" -vf "scale=1920:-2" -frames:v 1 -q:v 3 "$OUT/rocket-launch-poster.jpg"
"$FF" -v error -y -sseof -0.1 -i "$SRC" -vf "scale=1920:-2" -frames:v 1 -q:v 3 "$OUT/rocket-launch-end.jpg"

ls -la "$OUT"
