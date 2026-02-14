/**
 * Download Vimeo videos.
 *
 * Two modes:
 * 1) API mode (requires Vimeo Standard+ to get file links)
 *    - Uses VIMEO_ACCESS_TOKEN and attempts to download from API-provided links
 *
 * 2) Browser-cookies mode (works if you're logged in and Vimeo allows playback/download)
 *    - Uses yt-dlp with --cookies-from-browser
 *
 * Usage (API mode):
 *   bun scripts/download-vimeo.ts
 *   bun scripts/download-vimeo.ts --list-only
 *   bun scripts/download-vimeo.ts --max 10
 *
 * Usage (browser cookies mode):
 *   bun scripts/download-vimeo.ts --cookies-from-browser chrome
 *   bun scripts/download-vimeo.ts --cookies-from-browser chrome --max 5
 *
 * Notes:
 * - Do NOT paste cookies into chat or git; use --cookies-from-browser.
 */

import { createWriteStream, existsSync, mkdirSync, readdirSync } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { categories } from "../src/lib/data/videos";

interface VimeoDownloadFile {
	quality?: string;
	width?: number;
	height?: number;
	size?: number;
	public_name?: string;
	fps?: number;
	link?: string;
	type?: string;
}

interface VimeoVideo {
	uri?: string;
	name?: string;
	privacy?: unknown;
	download?: VimeoDownloadFile[];
}

const DOWNLOAD_DIR = "./downloads/videos";
const VIMEO_TOKEN = process.env.VIMEO_ACCESS_TOKEN;
const ytDlpBin = "./.venv/bin/yt-dlp";
const listOnly = process.argv.includes("--list-only");
const idOnly = process.argv.includes("--id-only");
const maxArgIdx = process.argv.indexOf("--max");
const maxItems =
	maxArgIdx >= 0 ? Number(process.argv[maxArgIdx + 1]) : undefined;
const cookiesFromBrowserIdx = process.argv.indexOf("--cookies-from-browser");
const cookiesFromBrowser =
	cookiesFromBrowserIdx >= 0
		? process.argv[cookiesFromBrowserIdx + 1]
		: undefined;

if (!existsSync(DOWNLOAD_DIR)) {
	mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

const vimeoIds = Array.from(
	new Set(
		categories
			.flatMap((c) => c.videos)
			.filter((v) => v.source === "vimeo")
			.map((v) => v.id),
	),
);

// In cookies-from-browser mode, start with older/smaller IDs first to maximize successes early.
const orderedIds = cookiesFromBrowser
	? [...vimeoIds].sort((a, b) => a.length - b.length || Number(a) - Number(b))
	: vimeoIds;

const targetIds =
	Number.isFinite(maxItems) && maxItems && maxItems > 0
		? orderedIds.slice(0, maxItems)
		: orderedIds;

console.log(
	`Found ${vimeoIds.length} unique Vimeo IDs (${targetIds.length} targeted this run).\n`,
);

function safeFilename(input: string): string {
	// Keep filenames human-readable but safe across macOS/Windows and cloud storage.
	return input
		.replaceAll(/[/\\:*?"<>|]/g, " ")
		.replaceAll(/\s+/g, " ")
		.trim()
		.slice(0, 180);
}

function findExistingMp4ForId(id: string): string | undefined {
	// Supports either "{id}.mp4" or "Some Title [id].mp4" naming.
	try {
		const files = readdirSync(DOWNLOAD_DIR);
		const exact = `${id}.mp4`;
		if (files.includes(exact)) return `${DOWNLOAD_DIR}/${exact}`;
		const bracketRe = new RegExp(`\\[${id}\\]\\.mp4$`);
		const match = files.find((f) => bracketRe.test(f));
		if (match) return `${DOWNLOAD_DIR}/${match}`;
		return undefined;
	} catch {
		return undefined;
	}
}

async function downloadViaYtDlp(id: string, idx: number, total: number) {
	if (!cookiesFromBrowser) {
		throw new Error("Missing --cookies-from-browser <chrome|firefox|safari>");
	}
	if (!existsSync(ytDlpBin)) {
		throw new Error(
			`Missing ${ytDlpBin}. Run: python3 -m venv .venv && .venv/bin/pip install -U "yt-dlp[curl-cffi]"`,
		);
	}

	// Use the vimeo player URL (works more often than vimeo.com/{id} for yt-dlp).
	const url = `https://player.vimeo.com/video/${id}`;

	console.log(
		`[download ${idx}/${total}] ${id} (yt-dlp cookies-from-browser: ${cookiesFromBrowser})`,
	);
	const args = [
		"--cookies-from-browser",
		cookiesFromBrowser,
		"--impersonate",
		"safari-18.4",
		"--add-header",
		"Referer:https://vimeo.com",
		"-f",
		"bv*+ba/b",
		"--merge-output-format",
		"mp4",
		"-o",
		idOnly
			? `${DOWNLOAD_DIR}/%(id)s.%(ext)s`
			: `${DOWNLOAD_DIR}/%(title).180B [%(id)s].%(ext)s`,
		url,
	];

	const proc = Bun.spawn([ytDlpBin, ...args], {
		stdout: "inherit",
		stderr: "inherit",
	});
	const exitCode = await proc.exited;
	if (exitCode !== 0) throw new Error(`yt-dlp exited with code ${exitCode}`);
	console.log(
		`  -> saved ${findExistingMp4ForId(id) ?? `${DOWNLOAD_DIR}/...`}`,
	);
}

function pickBestFile(
	files: VimeoDownloadFile[],
): VimeoDownloadFile | undefined {
	const candidates = files.filter((f) => Boolean(f.link));
	if (candidates.length === 0) return undefined;

	candidates.sort((a, b) => {
		const aScore =
			(a.height ?? 0) * 1000000 + (a.width ?? 0) * 1000 + (a.size ?? 0);
		const bScore =
			(b.height ?? 0) * 1000000 + (b.width ?? 0) * 1000 + (b.size ?? 0);
		return bScore - aScore;
	});

	return candidates[0];
}

async function fetchVideoMetadata(id: string): Promise<VimeoVideo> {
	if (!VIMEO_TOKEN) {
		throw new Error(
			"Missing VIMEO_ACCESS_TOKEN in .env (required for API mode)",
		);
	}
	const url = `https://api.vimeo.com/videos/${id}?fields=uri,name,privacy,download`;
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${VIMEO_TOKEN}`,
			Accept: "application/json",
		},
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Vimeo API ${res.status}: ${text.slice(0, 200)}`);
	}

	return (await res.json()) as VimeoVideo;
}

async function downloadFile(url: string, outPath: string) {
	const res = await fetch(url);
	if (!res.ok || !res.body) {
		throw new Error(`Download failed (${res.status})`);
	}
	await pipeline(
		Readable.fromWeb(res.body as never),
		createWriteStream(outPath),
	);
}

let downloaded = 0;
let skipped = 0;
let failed = 0;
const failedIds: string[] = [];

for (let i = 0; i < targetIds.length; i++) {
	const id = targetIds[i];
	const idx = i + 1;

	const existing = findExistingMp4ForId(id);
	if (existing) {
		console.log(
			`[skip ${idx}/${targetIds.length}] ${id} already exists (${existing})`,
		);
		skipped++;
		continue;
	}

	try {
		// If caller asked for browser cookies mode, use yt-dlp and skip API.
		if (cookiesFromBrowser) {
			if (listOnly) {
				console.log(`[list ${idx}/${targetIds.length}] ${id} (yt-dlp mode)`);
				skipped++;
				continue;
			}
			await downloadViaYtDlp(id, idx, targetIds.length);
			downloaded++;
			continue;
		}

		const video = await fetchVideoMetadata(id);
		const best = pickBestFile(video.download ?? []);
		if (!best?.link) {
			throw new Error(
				"No downloadable file returned by Vimeo API (permissions/privacy).",
			);
		}

		const label = `${best.public_name ?? best.quality ?? "unknown"} ${best.width ?? "?"}x${best.height ?? "?"}`;
		if (listOnly) {
			console.log(`[list ${idx}/${targetIds.length}] ${id} -> ${label}`);
			skipped++;
			continue;
		}

		console.log(`[download ${idx}/${targetIds.length}] ${id} -> ${label}`);
		const outPath = idOnly
			? `${DOWNLOAD_DIR}/${id}.mp4`
			: `${DOWNLOAD_DIR}/${safeFilename(video.name ?? id)} [${id}].mp4`;
		await downloadFile(best.link, outPath);
		downloaded++;
		console.log(`  -> saved ${outPath}`);
	} catch (e) {
		failed++;
		failedIds.push(id);
		console.error(
			`  -> FAILED ${id}: ${e instanceof Error ? e.message : String(e)}`,
		);
	}
}

console.log(
	`\nDone. Downloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed}`,
);
if (failedIds.length > 0) {
	console.log(`Failed IDs: ${failedIds.join(",")}`);
}
