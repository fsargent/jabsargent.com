# jabsargent.com

Portfolio site for Jennifer Bronstein Sargent — Director, Producer, Writer.

Built with SvelteKit, Tailwind CSS, and deployed to Cloudflare Pages with video assets on Cloudflare R2.

## Development

```bash
bun install
bun run dev
```

## Build & Preview

```bash
bun run build
bun run preview
```

## Video Migration

The site currently embeds videos from Vimeo and YouTube. To migrate Vimeo videos to self-hosted R2:

### 1. Download videos from Vimeo

Downloads are saved as `Title [vimeoId].mp4` by default (use `--id-only` to keep `vimeoId.mp4`).

Two download modes:

- API mode: uses `VIMEO_ACCESS_TOKEN` (requires permissions that expose direct file links)
- Cookies mode: uses `yt-dlp` with `--cookies-from-browser` (works for many private/embedded cases)

```bash
# API mode
bun scripts/download-vimeo.ts --list-only
bun scripts/download-vimeo.ts
bun scripts/download-vimeo.ts --max 10

# Cookies-from-browser mode (recommended if API mode doesn't work)
# Prereq: python3 -m venv .venv && .venv/bin/pip install -U "yt-dlp[curl-cffi]"
bun scripts/download-vimeo.ts --cookies-from-browser chrome
bun scripts/download-vimeo.ts --cookies-from-browser chrome --max 10

# Fetch your full Vimeo library (IDs + titles) via API
# Recommended token scopes: public, private
bun scripts/fetch-vimeo-library.ts

# If you already downloaded id-only files, rename them without re-downloading
bun scripts/rename-vimeo-downloads.ts
bun scripts/rename-vimeo-downloads.ts --dry-run
bun scripts/rename-vimeo-downloads.ts --cookies-from-browser chrome
bun scripts/rename-vimeo-downloads.ts --vimeo-library ./scrape_output/vimeo-library.json
```

### 2. Generate thumbnails

Requires [ffmpeg](https://ffmpeg.org/): `brew install ffmpeg`

```bash
bun scripts/generate-thumbnails.ts
```

### 3. Upload to Cloudflare R2

Copy `.env.example` to `.env` and fill in your R2 + Vimeo credentials, then:

```bash
bun scripts/upload-to-r2.ts
bun scripts/upload-to-r2.ts --thumbnails-only
bun scripts/upload-to-r2.ts --videos-only
```

## Deployment

The site deploys to Cloudflare Pages via Wrangler:

```bash
bun run build
bunx wrangler pages deploy .svelte-kit/cloudflare
```

Or connect the repository to Cloudflare Pages for automatic deployments on push.

## Project Structure

```shell
src/
  lib/
    data/videos.ts        - Video metadata by category
    data/navigation.ts    - Navigation structure
    components/           - Svelte components (VideoCard, VideoGrid, etc.)
  routes/                 - SvelteKit pages
scripts/                  - Video download/upload scripts
```
