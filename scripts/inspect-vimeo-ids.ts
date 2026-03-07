/**
 * Inspect Vimeo metadata for a set of video IDs.
 *
 * Requires:
 *   VIMEO_ACCESS_TOKEN in .env
 *
 * Usage:
 *   bun scripts/inspect-vimeo-ids.ts --ids 123,456
 *   bun scripts/inspect-vimeo-ids.ts --ids-file /tmp/ids.txt
 *
 * Output:
 *   scrape_output/vimeo-inspect.json
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TOKEN = process.env.VIMEO_ACCESS_TOKEN;
if (!TOKEN) {
	console.error("Missing VIMEO_ACCESS_TOKEN in .env");
	process.exit(1);
}

const idsIdx = process.argv.indexOf("--ids");
const idsFileIdx = process.argv.indexOf("--ids-file");
const rawIds =
	idsIdx >= 0
		? process.argv[idsIdx + 1]
		: idsFileIdx >= 0
			? readFileSync(process.argv[idsFileIdx + 1], "utf8")
			: "";

const ids = Array.from(
	new Set(
		rawIds
			.split(/[\s,]+/g)
			.map((s) => s.trim())
			.filter(Boolean),
	),
);

if (ids.length === 0) {
	console.error("No IDs provided. Use --ids or --ids-file.");
	process.exit(1);
}

const outDir = "./scrape_output";
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

type InspectResult =
	| {
			id: string;
			ok: true;
			status: number;
			data: unknown;
	  }
	| {
			id: string;
			ok: false;
			status: number;
			error: string;
			bodySnippet?: string;
	  };

async function vimeoGetRaw(url: string) {
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
			Accept: "application/json",
		},
	});
	const text = await res.text();
	let json: unknown;
	try {
		json = text ? JSON.parse(text) : undefined;
	} catch {
		// ignore
	}
	return { res, text, json };
}

async function inspectOne(id: string): Promise<InspectResult> {
	// Keep fields tight but include the usual causes of “can’t download/play”.
	// Not all fields are available for all accounts/scopes; we handle errors.
	const fields = [
		"uri",
		"name",
		"link",
		"created_time",
		"modified_time",
		"status",
		"privacy.view",
		"privacy.embed",
		"privacy.download",
		"embed.html",
		"download",
	].join(",");

	const url = `https://api.vimeo.com/videos/${id}?fields=${encodeURIComponent(fields)}`;
	const { res, text, json } = await vimeoGetRaw(url);

	if (!res.ok) {
		return {
			id,
			ok: false,
			status: res.status,
			error: `Vimeo API ${res.status}`,
			bodySnippet: text.slice(0, 400),
		};
	}

	return { id, ok: true, status: res.status, data: json };
}

async function main() {
	console.log(`Inspecting ${ids.length} Vimeo IDs...`);

	const results: InspectResult[] = [];
	for (let i = 0; i < ids.length; i++) {
		const id = ids[i];
		console.log(`[${i + 1}/${ids.length}] ${id}`);
		results.push(await inspectOne(id));
	}

	const outPath = `${outDir}/vimeo-inspect.json`;
	writeFileSync(
		outPath,
		JSON.stringify({ inspectedAt: new Date().toISOString(), results }, null, 2),
	);
	console.log(`\nWrote ${outPath}`);

	// Print a compact summary to stdout
	const ok = results.filter((r) => r.ok).length;
	const fail = results.length - ok;
	console.log(`OK=${ok} FAIL=${fail}`);
	if (fail) {
		for (const r of results) {
			if (!r.ok)
				console.log(`- ${r.id}: ${r.status} ${r.bodySnippet ?? r.error}`);
		}
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
