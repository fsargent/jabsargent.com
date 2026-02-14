/**
 * Rename already-downloaded Vimeo files from "{id}.mp4" to "Title [id].mp4".
 *
 * This does NOT re-download videos.
 *
 * Usage:
 *   bun scripts/rename-vimeo-downloads.ts
 *   bun scripts/rename-vimeo-downloads.ts --dry-run
 *   bun scripts/rename-vimeo-downloads.ts --max 20
 *   bun scripts/rename-vimeo-downloads.ts --cookies-from-browser chrome
 *
 * Title lookup:
 *   1) Vimeo oEmbed (works for public videos, no auth)
 *   2) yt-dlp --print (optional, requires cookies-from-browser for private videos)
 */
import { existsSync, readdirSync, renameSync } from "node:fs";

const DOWNLOAD_DIR = "./downloads/videos";

const dryRun = process.argv.includes("--dry-run");
const maxArgIdx = process.argv.indexOf("--max");
const maxItems =
	maxArgIdx >= 0 ? Number(process.argv[maxArgIdx + 1]) : undefined;
const cookiesFromBrowserIdx = process.argv.indexOf("--cookies-from-browser");
const cookiesFromBrowser =
	cookiesFromBrowserIdx >= 0
		? process.argv[cookiesFromBrowserIdx + 1]
		: undefined;

function safeFilename(input: string): string {
	return input
		.replaceAll(/[/\\:*?"<>|]/g, " ")
		.replaceAll(/\s+/g, " ")
		.trim()
		.slice(0, 180);
}

async function fetchTitleViaOEmbed(id: string): Promise<string | undefined> {
	const url = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${id}`)}`;
	const res = await fetch(url, { headers: { Accept: "application/json" } });
	if (!res.ok) return undefined;
	const data = (await res.json()) as { title?: string };
	return data.title?.trim() || undefined;
}

async function fetchTitleViaYtDlp(id: string): Promise<string | undefined> {
	if (!cookiesFromBrowser) return undefined;

	// Try local venv first, then PATH.
	const candidates = ["./.venv/bin/yt-dlp", "yt-dlp"];
	const ytDlp = candidates.find((p) => existsSync(p)) ?? "yt-dlp";

	const url = `https://player.vimeo.com/video/${id}`;
	const args = [
		"--cookies-from-browser",
		cookiesFromBrowser,
		"--impersonate",
		"safari-18.4",
		"--add-header",
		"Referer:https://vimeo.com",
		"--print",
		"%(title)s",
		"--no-warnings",
		url,
	];

	const proc = Bun.spawn([ytDlp, ...args], { stdout: "pipe", stderr: "pipe" });
	const out = await new Response(proc.stdout).text();
	const code = await proc.exited;
	if (code !== 0) return undefined;
	const title = out
		.split("\n")
		.map((s) => s.trim())
		.find(Boolean);
	return title || undefined;
}

function alreadyPrettyNamed(files: string[], id: string): boolean {
	const bracketRe = new RegExp(`\\[${id}\\]\\.mp4$`);
	return files.some((f) => bracketRe.test(f));
}

async function main() {
	if (!existsSync(DOWNLOAD_DIR)) {
		console.error(`Missing ${DOWNLOAD_DIR}.`);
		process.exit(1);
	}

	const files = readdirSync(DOWNLOAD_DIR);
	const idOnlyFiles = files.filter((f) => /^\d+\.mp4$/.test(f));
	const targets =
		Number.isFinite(maxItems) && maxItems && maxItems > 0
			? idOnlyFiles.slice(0, maxItems)
			: idOnlyFiles;

	console.log(
		`Found ${idOnlyFiles.length} id-only files; renaming ${targets.length}.\n`,
	);

	let renamed = 0;
	let skipped = 0;
	let failed = 0;

	for (let i = 0; i < targets.length; i++) {
		const file = targets[i];
		const id = file.replace(".mp4", "");

		// If another file already has the pretty name (e.g. a re-download), don't rename.
		if (alreadyPrettyNamed(files, id)) {
			console.log(
				`[skip ${i + 1}/${targets.length}] ${id} already has pretty filename`,
			);
			skipped++;
			continue;
		}

		// Skip if download is still in progress
		if (files.includes(`${id}.mp4.part`)) {
			console.log(
				`[skip ${i + 1}/${targets.length}] ${id} still downloading (.part present)`,
			);
			skipped++;
			continue;
		}

		try {
			const title =
				(await fetchTitleViaOEmbed(id)) ??
				(await fetchTitleViaYtDlp(id)) ??
				`Vimeo ${id}`;
			const newName = `${safeFilename(title)} [${id}].mp4`;
			const from = `${DOWNLOAD_DIR}/${file}`;
			const to = `${DOWNLOAD_DIR}/${newName}`;

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
