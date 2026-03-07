/**
 * Generate thumbnail images from downloaded video files using ffmpeg.
 *
 * Prerequisites:
 *   brew install ffmpeg
 *
 * Usage:
 *   bun scripts/generate-thumbnails.ts
 *   bun scripts/generate-thumbnails.ts --overwrite
 *
 * Reads from ./downloads/videos/ and outputs to ./downloads/thumbnails/
 * Creates a JPEG thumbnail from the 2-second mark while preserving aspect ratio.
 */

import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { $ } from "bun";

const VIDEO_DIR = "./downloads/videos";
const THUMB_DIR = "./downloads/thumbnails";
const overwrite = process.argv.includes("--overwrite");

if (!existsSync(VIDEO_DIR)) {
	console.error(`Video directory not found: ${VIDEO_DIR}`);
	console.error("Run download-vimeo.ts first.");
	process.exit(1);
}

if (!existsSync(THUMB_DIR)) {
	mkdirSync(THUMB_DIR, { recursive: true });
}

const videoFiles = readdirSync(VIDEO_DIR).filter((f) => f.endsWith(".mp4"));
console.log(`Found ${videoFiles.length} video files.\n`);

function extractId(file: string): string | undefined {
	// Supports either "{id}.mp4" or "Some Title [id].mp4"
	const bracket = file.match(/\[(\d+)\]\.mp4$/);
	if (bracket) return bracket[1];
	const bare = file.match(/^(\d+)\.mp4$/);
	if (bare) return bare[1];
	const lastDigits = file.match(/(\d+)(?=\.mp4$)/);
	return lastDigits?.[1];
}

let generated = 0;
let skipped = 0;
let failed = 0;
const seen = new Set<string>();

for (const file of videoFiles) {
	const id = extractId(file);
	if (!id) {
		console.warn(`[skip] could not extract id from filename: ${file}`);
		skipped++;
		continue;
	}
	if (seen.has(id)) {
		// Prefer generating one thumbnail per video id
		skipped++;
		continue;
	}
	seen.add(id);
	const thumbPath = `${THUMB_DIR}/${id}.jpg`;

	if (!overwrite && existsSync(thumbPath)) {
		skipped++;
		continue;
	}

	try {
		// Preserve aspect ratio; set width to 720 and derive height automatically.
		await $`ffmpeg -i ${VIDEO_DIR}/${file} -ss 00:00:02 -vframes 1 -vf scale=720:-2 -q:v 3 ${thumbPath} -y`.quiet();
		generated++;
		console.log(`[thumb] ${id}.jpg`);
	} catch (e) {
		failed++;
		console.error(`[fail] ${id}: ${e instanceof Error ? e.message : e}`);
	}
}

console.log(
	`\nDone. Generated: ${generated}, Skipped: ${skipped}, Failed: ${failed}`,
);
