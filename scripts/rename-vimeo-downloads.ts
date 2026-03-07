/**
 * Rename already-downloaded Vimeo files to "Title [id].mp4".
 *
 * Handles:
 * - "{id}.mp4" id-only downloads
 * - "Vimeo {id} [{id}].mp4" placeholder-titled downloads (common yt-dlp fallback)
 *
 * This does NOT re-download videos.
 *
 * Usage:
 *   bun scripts/rename-vimeo-downloads.ts
 *   bun scripts/rename-vimeo-downloads.ts --dry-run
 *   bun scripts/rename-vimeo-downloads.ts --max 20
 *   bun scripts/rename-vimeo-downloads.ts --cookies-from-browser chrome
 *   bun scripts/rename-vimeo-downloads.ts --vimeo-html ./vimeo.html
 *   bun scripts/rename-vimeo-downloads.ts --cookies-from-browser chrome --no-impersonate
 *   bun scripts/rename-vimeo-downloads.ts --vimeo-library ./scrape_output/vimeo-library.json
 *
 * Title lookup:
 *   1) Saved Vimeo "Manage videos" HTML (default: ./vimeo.html) for private/unlisted titles
 *   2) Vimeo library JSON from API (see fetch-vimeo-library.ts)
 *   3) Vimeo oEmbed (works for public videos, no auth)
 *   4) yt-dlp --print (optional; cookies-from-browser recommended)
 */
import { existsSync, readdirSync, readFileSync, renameSync } from "node:fs";

const DOWNLOAD_DIR = "./downloads/videos";
const DEFAULT_VIMEO_HTML = "./vimeo.html";

const dryRun = process.argv.includes("--dry-run");
const maxArgIdx = process.argv.indexOf("--max");
const maxItems =
	maxArgIdx >= 0 ? Number(process.argv[maxArgIdx + 1]) : undefined;
const cookiesFromBrowserIdx = process.argv.indexOf("--cookies-from-browser");
const cookiesFromBrowser =
	cookiesFromBrowserIdx >= 0
		? process.argv[cookiesFromBrowserIdx + 1]
		: undefined;
const noImpersonate = process.argv.includes("--no-impersonate");
const vimeoHtmlIdx = process.argv.indexOf("--vimeo-html");
const vimeoHtmlPath =
	vimeoHtmlIdx >= 0 ? process.argv[vimeoHtmlIdx + 1] : DEFAULT_VIMEO_HTML;
const vimeoLibraryIdx = process.argv.indexOf("--vimeo-library");
const vimeoLibraryPath =
	vimeoLibraryIdx >= 0 ? process.argv[vimeoLibraryIdx + 1] : undefined;

function safeFilename(input: string): string {
	return input
		.replaceAll(/[/\\:*?"<>|]/g, " ")
		.replaceAll(/\s+/g, " ")
		.trim()
		.slice(0, 180);
}

async function fetchTitleViaOEmbedUrl(
	pageUrl: string,
): Promise<string | undefined> {
	const url = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(pageUrl)}`;
	const res = await fetch(url, { headers: { Accept: "application/json" } });
	if (!res.ok) return undefined;
	const data = (await res.json()) as { title?: string };
	return data.title?.trim() || undefined;
}

async function fetchTitleViaYtDlp(urls: string[]): Promise<string | undefined> {
	// Try local venv first, then PATH.
	const candidates = ["./.venv/bin/yt-dlp", "yt-dlp"];
	const ytDlp = candidates.find((p) => existsSync(p)) ?? "yt-dlp";

	for (const url of urls) {
		const args: string[] = [
			...(cookiesFromBrowser
				? ["--cookies-from-browser", cookiesFromBrowser]
				: []),
			...(noImpersonate ? [] : ["--impersonate", "safari-18.4"]),
			"--add-header",
			"Referer:https://vimeo.com",
			"--print",
			"%(title)s",
			"--no-warnings",
			url,
		];

		const proc = Bun.spawn([ytDlp, ...args], {
			stdout: "pipe",
			stderr: "pipe",
		});
		const out = await new Response(proc.stdout).text();
		const code = await proc.exited;
		if (code !== 0) continue;

		const title = out
			.split("\n")
			.map((s) => s.trim())
			.find(Boolean);
		if (title) return title;
	}

	return undefined;
}

function parseVimeoManageHtml(htmlPath: string): {
	titleById: Map<string, string>;
	hashById: Map<string, string>;
} {
	const titleById = new Map<string, string>();
	const hashById = new Map<string, string>();

	if (!existsSync(htmlPath)) return { titleById, hashById };

	// This file is typically a saved Vimeo "Manage videos" page HTML.
	// It contains repeated rows like:
	//   href="/manage/videos/1152864867/eca0c518eb" ... data-testid="row-title" ... Lozenge
	const html = readFileSync(htmlPath, "utf8");
	const rowRe =
		/href="\/manage\/videos\/(\d+)\/([a-f0-9]+)"[\s\S]{0,10000}?data-testid="row-title"[\s\S]{0,2000}?>\s*([^<\n\r]+?)\s*</g;

	for (const match of html.matchAll(rowRe)) {
		const id = match[1];
		const hash = match[2];
		const title = match[3]?.trim();
		if (id && title) titleById.set(id, title);
		if (id && hash) hashById.set(id, hash);
	}

	return { titleById, hashById };
}

function parseVimeoLibraryJson(jsonPath: string): Map<string, string> {
	const titleById = new Map<string, string>();
	if (!existsSync(jsonPath)) return titleById;
	try {
		const raw = readFileSync(jsonPath, "utf8");
		const data = JSON.parse(raw) as {
			videos?: Array<{ id?: string; name?: string }>;
		};
		for (const v of data.videos ?? []) {
			const id = `${v.id ?? ""}`.trim();
			const name = `${v.name ?? ""}`.trim();
			if (id && name) titleById.set(id, name);
		}
	} catch {
		// ignore parse errors; fall back to other strategies
	}
	return titleById;
}

function normalizeSpaces(s: string): string {
	return s.replaceAll(/\s+/g, " ").trim();
}

function parseBracketNamedMp4(
	file: string,
): { title: string; id: string } | undefined {
	// "Some Title [123].mp4" (title may contain brackets/spaces; we only care about final [id])
	const m = /^(.*)\[(\d+)\]\.mp4$/i.exec(file);
	if (!m) return undefined;
	return { title: normalizeSpaces(m[1] ?? ""), id: m[2] ?? "" };
}

function isPlaceholderTitle(title: string, id: string): boolean {
	// yt-dlp sometimes falls back to "Vimeo {id}" as a title.
	const t = normalizeSpaces(title);
	return t === `Vimeo ${id}` || t === `Vimeo ${Number(id)}` || t === "Vimeo";
}

function hasNonPlaceholderNamed(files: string[], id: string): boolean {
	return files.some((f) => {
		const parsed = parseBracketNamedMp4(f);
		if (!parsed) return false;
		if (parsed.id !== id) return false;
		return !isPlaceholderTitle(parsed.title, id);
	});
}

type RenameTarget =
	| { file: string; id: string; kind: "id-only" }
	| { file: string; id: string; kind: "placeholder-title" };

function toRenameTarget(file: string): RenameTarget | undefined {
	if (/^\d+\.mp4$/i.test(file)) {
		return { file, id: file.replace(/\.mp4$/i, ""), kind: "id-only" };
	}

	const parsed = parseBracketNamedMp4(file);
	if (!parsed) return undefined;

	// Only auto-rename bracket-named files when the title is clearly a placeholder.
	if (isPlaceholderTitle(parsed.title, parsed.id)) {
		return { file, id: parsed.id, kind: "placeholder-title" };
	}

	return undefined;
}

async function main() {
	if (!existsSync(DOWNLOAD_DIR)) {
		console.error(`Missing ${DOWNLOAD_DIR}.`);
		process.exit(1);
	}

	const files = readdirSync(DOWNLOAD_DIR);
	const allTargets = files
		.map(toRenameTarget)
		.filter(Boolean) as RenameTarget[];
	const targets =
		Number.isFinite(maxItems) && maxItems && maxItems > 0
			? allTargets.slice(0, maxItems)
			: allTargets;

	const idOnlyCount = allTargets.filter((t) => t.kind === "id-only").length;
	const placeholderCount = allTargets.filter(
		(t) => t.kind === "placeholder-title",
	).length;

	console.log(
		`Found ${allTargets.length} rename candidates (id-only: ${idOnlyCount}, placeholder-title: ${placeholderCount}); processing ${targets.length}.\n`,
	);

	const { titleById: htmlTitleById, hashById } =
		parseVimeoManageHtml(vimeoHtmlPath);
	if (htmlTitleById.size > 0) {
		console.log(`Loaded ${htmlTitleById.size} titles from ${vimeoHtmlPath}.\n`);
	}

	const apiTitleById = vimeoLibraryPath
		? parseVimeoLibraryJson(vimeoLibraryPath)
		: new Map<string, string>();
	if (apiTitleById.size > 0) {
		console.log(
			`Loaded ${apiTitleById.size} titles from ${vimeoLibraryPath}.\n`,
		);
	}

	let renamed = 0;
	let skipped = 0;
	let failed = 0;

	for (let i = 0; i < targets.length; i++) {
		const target = targets[i];
		const file = target.file;
		const id = target.id;

		// If we already have a non-placeholder title for this ID, don't rename into it.
		// This avoids clobbering or producing duplicates when you re-download some videos.
		if (
			hasNonPlaceholderNamed(files, id) &&
			target.kind !== "placeholder-title"
		) {
			console.log(
				`[skip ${i + 1}/${targets.length}] ${id} already has a titled filename`,
			);
			skipped++;
			continue;
		}

		// Skip if download is still in progress
		if (files.includes(`${id}.mp4.part`) || files.includes(`${file}.part`)) {
			console.log(
				`[skip ${i + 1}/${targets.length}] ${id} still downloading (.part present)`,
			);
			skipped++;
			continue;
		}

		try {
			const hash = hashById.get(id);
			const pageUrl = hash
				? `https://vimeo.com/${id}/${hash}`
				: `https://vimeo.com/${id}`;
			const urlsToTry = [
				...(hash ? [pageUrl] : []),
				`https://player.vimeo.com/video/${id}`,
				`https://vimeo.com/${id}`,
			];
			const title =
				htmlTitleById.get(id) ??
				apiTitleById.get(id) ??
				(await fetchTitleViaOEmbedUrl(pageUrl)) ??
				(await fetchTitleViaYtDlp(urlsToTry)) ??
				`Vimeo ${id}`;
			const newName = `${safeFilename(title)} [${id}].mp4`;
			const from = `${DOWNLOAD_DIR}/${file}`;
			const to = `${DOWNLOAD_DIR}/${newName}`;

			// If the best title we can find is still a placeholder and we're already on a
			// placeholder-named file, avoid doing a no-op rename.
			if (
				target.kind === "placeholder-title" &&
				isPlaceholderTitle(title, id)
			) {
				console.log(
					`[skip ${i + 1}/${targets.length}] ${id} title lookup still placeholder`,
				);
				skipped++;
				continue;
			}

			// If we'd rename to the same filename, treat it as a skip.
			if (normalizeSpaces(file) === normalizeSpaces(newName)) {
				console.log(
					`[skip ${i + 1}/${targets.length}] ${id} already named ${newName}`,
				);
				skipped++;
				continue;
			}

			if (existsSync(to)) {
				console.log(
					`[skip ${i + 1}/${targets.length}] ${id} -> ${newName} (already exists)`,
				);
				skipped++;
				continue;
			}

			if (dryRun) {
				console.log(
					`[dry-run ${i + 1}/${targets.length}] ${file} -> ${newName}`,
				);
			} else {
				renameSync(from, to);
				console.log(
					`[rename ${i + 1}/${targets.length}] ${file} -> ${newName}`,
				);
			}
			renamed++;
		} catch (e) {
			failed++;
			console.error(
				`[fail ${i + 1}/${targets.length}] ${id}: ${e instanceof Error ? e.message : String(e)}`,
			);
		}
	}

	console.log(
		`\nDone. Renamed: ${renamed}, Skipped: ${skipped}, Failed: ${failed}`,
	);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
