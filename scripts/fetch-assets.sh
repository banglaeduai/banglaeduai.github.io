#!/usr/bin/env bash
#
# Fetch the third-party logos and faculty photos the site references, into
# `public/`. Sources are recorded in notes/004.md.
#
# Run it from anywhere:  bash scripts/fetch-assets.sh
#
# Everything here is self-hosted deliberately: BUET, UGC and Wikimedia can move
# or rename these files without notice, and hotlinking them would break the
# site silently. Re-run this script when an upstream asset is updated.
#
# NOT fetched, on purpose: the Asian Development Bank logo. ADB controls its
# branding tightly and ADB-funded projects have visibility rules to follow. Ask
# the ICSETEP Project Management Unit (pd-icsetep@ugc.gov.bd) which logo set and
# acknowledgement wording they approve before adding it.

set -uo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ua='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'
failed=0

get() { # get <url> <path-relative-to-public>
  local url="$1" dest="$root/public/$2" tmp
  mkdir -p "$(dirname "$dest")"
  tmp="$(mktemp)"
  if curl -fsSL --max-time 60 -A "$ua" -o "$tmp" "$url" && [ -s "$tmp" ]; then
    cat "$tmp" > "$dest"
    printf '  ok    %-36s %8s bytes  %s\n' "$2" "$(wc -c < "$dest")" "$(file -b --mime-type "$dest")"
  else
    printf '  FAIL  %-36s %s\n' "$2" "$url"
    failed=$((failed + 1))
  fi
}

echo "Logos"
# The vector now used on the BUET website and most official material, from the
# EEE department's branding page (https://eee.buet.ac.bd/outreach/branding),
# which also carries white and black versions.
get https://eee.buet.ac.bd/outreach/branding/BUET_logo_color.svg        logos/buet.svg
get https://eee.buet.ac.bd/outreach/branding/BUET_logo_1200px_color.png logos/buet.png
get https://cse.buet.ac.bd/public/img/logo.png                          logos/buet-cse.png
# The Ministry of Education and SHED both use the Government Seal.
get 'https://commons.wikimedia.org/wiki/Special:FilePath/Government_Seal_of_Bangladesh.svg' logos/bangladesh-govt-seal.svg
# ICSETEP publishes no standalone logo — only this wide site header banner.
get https://icsetep.ugc.gov.bd/wp-content/uploads/2024/01/Top-Header_v2.png logos/icsetep-header.png

# UGC's logo has no stable direct URL, so resolve it through Wikidata (Q7894701,
# property P154 "logo image") to the file on Wikimedia Commons.
echo "Logos (resolved via Wikidata)"
ugc_file="$(
  curl -fsSL --max-time 60 -A "$ua" \
    'https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=Q7894701&property=P154&format=json' \
  | python3 -c 'import json,sys,urllib.parse
try:
    c = json.load(sys.stdin)["claims"]["P154"][0]["mainsnak"]["datavalue"]["value"]
    print(urllib.parse.quote(c.replace(" ", "_")))
except Exception:
    pass'
)"
if [ -n "$ugc_file" ]; then
  ext="${ugc_file##*.}"
  get "https://commons.wikimedia.org/wiki/Special:FilePath/$ugc_file" "logos/ugc.${ext,,}"
  # site.ts points at /logos/ugc.svg; normalise if Commons served another format.
  if [ "${ext,,}" != "svg" ] && [ -s "$root/public/logos/ugc.${ext,,}" ]; then
    echo "  note  UGC logo is .${ext,,}, not .svg — update site.ts to /logos/ugc.${ext,,}"
  fi
else
  echo "  FAIL  logos/ugc.svg                     could not resolve via Wikidata"
  failed=$((failed + 1))
fi

echo "People"
get https://cse.buet.ac.bd/web/assets/img/faculty/rifatpic.jpg             people/rifat-shahriyar.jpg
get https://cse.buet.ac.bd/web/assets/img/faculty/anindyaiqbalanindya.jpg  people/anindya-iqbal.jpg

# The BUET faculty photos are full-resolution camera originals — one is nearly
# 3 MB and carries EXIF naming the camera and the date it was taken. They are
# rendered at 96px. `images: { unoptimized: true }` is required for GitHub
# Pages, so nothing downsizes them at build time and whatever is in `public/`
# is what every visitor downloads. Shrink them here instead, and drop the EXIF.
#
# This rewrites the files in place. That is safe: they are re-fetched from the
# URLs above every time this script runs, so the originals are never more than
# one re-run away.
echo "Resizing photos for the web"
python3 - "$root/public/people" <<'PY' || echo "  skipped — Pillow not installed (pip install Pillow)"
import pathlib, sys

from PIL import Image

MAX = 800  # longest side; the cards render at 96px, so this is ample for 2x.

for path in sorted(pathlib.Path(sys.argv[1]).glob("*.jpg")):
    before = path.stat().st_size
    with Image.open(path) as im:
        w, h = im.size
        im = im.convert("RGB")
        if max(w, h) > MAX:
            im.thumbnail((MAX, MAX), Image.LANCZOS)
        # No exif= argument, so the camera metadata is dropped.
        im.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    after = path.stat().st_size
    print(f"  ok    {path.name:<34} {w}x{h} -> {im.size[0]}x{im.size[1]}, "
          f"{before // 1024} KB -> {after // 1024} KB")
PY

echo
if [ "$failed" -eq 0 ]; then
  echo "All assets fetched into $root/public."
else
  echo "$failed asset(s) failed. The pages fall back to text or initials for anything missing."
fi
exit 0
