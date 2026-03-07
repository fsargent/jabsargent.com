import { mkdir, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const SLIDES = [
	"https://images.squarespace-cdn.com/content/v1/5b91bc57fcf7fd646cd2e611/1536278114886-20U3H9XJ81X763IJ5H1K/IMG_0362.jpg",
	"https://images.squarespace-cdn.com/content/v1/5b91bc57fcf7fd646cd2e611/1536279733980-O0GCP9PWD0NCNJ1TKRLF/IMG_0378.jpg",
	"https://images.squarespace-cdn.com/content/v1/5b91bc57fcf7fd646cd2e611/1536638577621-Z7VSXUG7W154BWJF954C/JOSEALVARADOJR_050_036.jpg",
	"https://images.squarespace-cdn.com/content/v1/5b91bc57fcf7fd646cd2e611/1579048273238-HYATN2FBK6LBSYPY27DQ/IMG_0945.jpeg",
	"https://images.squarespace-cdn.com/content/v1/5b91bc57fcf7fd646cd2e611/1536638471010-K3PAWF7MWOOI9HZMALLL/IMG_2481.JPG",
	"https://images.squarespace-cdn.com/content/v1/5b91bc57fcf7fd646cd2e611/1536638456764-P6AM4B23DEWPPM7HLK4G/IMG_1838.jpg",
	"https://images.squarespace-cdn.com/content/v1/5b91bc57fcf7fd646cd2e611/1536638526602-RF2P6AEJXY00CL6SOIPY/IMG_4766.jpg",
	"https://images.squarespace-cdn.com/content/v1/5b91bc57fcf7fd646cd2e611/1536638501586-GJZLYYSB0NH4V64KQM1A/IMG_4639.jpg",
] as const;

const OUT_DIR = "static/landing";

function toLocalFilename(url: string) {
	// Keep original filename, normalize to lower-case extension for consistency.
	const name = basename(new URL(url).pathname);
	return name.replace(/\\.JPG$/, ".jpg");
}

async function download(url: string) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
	const buf = Buffer.from(await res.arrayBuffer());
	return buf;
}

async function main() {
	await mkdir(OUT_DIR, { recursive: true });

	for (const url of SLIDES) {
		const filename = toLocalFilename(url);
		const outPath = `${OUT_DIR}/${filename}`;
		console.log(`downloading ${url}`);
		const buf = await download(url);
		await writeFile(outPath, buf);
		console.log(`wrote ${outPath} (${buf.length} bytes)`);
	}

	console.log("done");
}

main().catch((err) => {
	console.error(err);
	process.exitCode = 1;
});
