/**
 * Fetch your Vimeo library (IDs + titles) via the Vimeo API.
 *
 * Requires:
 *   VIMEO_ACCESS_TOKEN in .env
 *
 * Recommended token scopes for this script:
 *   - public
 *   - private
 *
 * (You only need "video_files" if you want direct download links via the API.)
 *
 * Usage:
 *   bun scripts/fetch-vimeo-library.ts
 *   bun scripts/fetch-vimeo-library.ts --max 250
 *
 * Output:
 *   - ./scrape_output/vimeo-library.json
 *   - ./scrape_output/vimeo-library.csv
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

interface VimeoVideoItem {
	uri?: string; // "/videos/123"
	name?: string;
	link?: string;
	privacy?: { view?: string };
}

interface VimeoPage<T> {
	data?: T[];
	paging?: {
		next?: string | null;
	};
	total?: number;
}

const TOKEN = process.env.VIMEO_ACCESS_TOKEN;
if (!TOKEN) {
	console.error("Missing VIMEO_ACCESS_TOKEN in .env");
	process.exit(1);
}

const outDir = "./scrape_output";
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const maxArgIdx = process.argv.indexOf("--max");
const maxItems =
	maxArgIdx >= 0 ? Number(process.argv[maxArgIdx + 1]) : undefined;

function extractId(uri?: string): string | undefined {
	if (!uri) return undefined;
	const m = uri.match(/\/videos\/(\d+)/);
	return m?.[1];
}

async function vimeoGet<T>(url: string): Promise<T> {
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
			Accept: "application/json",
		},
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Vimeo API ${res.status}: ${text.slice(0, 300)}`);
	}

	return (await res.json()) as T;
}

async function main() {
	// Keep the fields tight so responses are small and stable.
	const fields = "uri,name,link,privacy.view";
	let url = `https://api.vimeo.com/me/videos?per_page=100&sort=date&direction=desc&fields=${encodeURIComponent(fields)}`;

	const results: Array<{
		id: string;
		name: string;
		privacyView?: string;
		link?: string;
	}> = [];

	while (url) {
		const page = await vimeoGet<VimeoPage<VimeoVideoItem>>(url);
		for (const item of page.data ?? []) {
			const id = extractId(item.uri);
			if (!id) continue;
			results.push({
				id,
				name: (item.name ?? "").trim(),
				privacyView: item.privacy?.view,
				link: item.link,
			});

			if (Number.isFinite(maxItems) && maxItems && results.length >= maxItems) {
				url = "";
				break;
			}
		}

		const next = page.paging?.next ?? null;
		url = next ? `https://api.vimeo.com${next}` : "";
	}

	const jsonPath = `${outDir}/vimeo-library.json`;
	writeFileSync(
		jsonPath,
		JSON.stringify(
			{ fetchedAt: new Date().toISOString(), videos: results },
			null,
			2,
		),
	);

	const csvHeader = "id,name,privacyView,link\n";
	const csvLines = results.map((v) => {
		// Minimal CSV escaping: wrap in double-quotes and escape internal quotes.
		const name = `"${(v.name ?? "").replaceAll('"', '""')}"`;
		const privacy = `"${(v.privacyView ?? "").replaceAll('"', '""')}"`;
		const link = `"${(v.link ?? "").replaceAll('"', '""')}"`;
		return `${v.id},${name},${privacy},${link}`;
	});
	writeFileSync(
		`${outDir}/vimeo-library.csv`,
		csvHeader + csvLines.join("\n") + "\n",
	);

	console.log(`Fetched ${results.length} videos.`);
	console.log(`Wrote ${jsonPath}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
