/**
 * Script to capture screenshots of key pages for visual verification.
 * Run with: bun run scripts/screenshot-pages.ts
 * Ensure dev server is running: bun run dev (port 5173)
 */

import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { chromium } from "playwright";

const BASE_URL = "http://localhost:5173";
const SCREENSHOT_DIR = join(process.cwd(), "screenshots");

const pages = [
	{ name: "homepage", path: "/", navLabel: null },
	{
		name: "commercial-video",
		path: "/commercial-video",
		navLabel: "Commercial Video",
	},
	{ name: "resume", path: "/resume", navLabel: "Resume" },
	{ name: "contact", path: "/contact", navLabel: "Contact Me" },
	{ name: "entertainment", path: "/entertainment", navLabel: "Entertainment" },
];

async function main() {
	await mkdir(SCREENSHOT_DIR, { recursive: true });

	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		viewport: { width: 1280, height: 800 },
	});
	const page = await context.newPage();

	const results: { page: string; success: boolean; notes: string }[] = [];

	try {
		// 1. Homepage
		await page.goto(BASE_URL + "/", {
			waitUntil: "networkidle",
			timeout: 15000,
		});
		await page.screenshot({
			path: join(SCREENSHOT_DIR, "01-homepage.png"),
			fullPage: true,
		});
		results.push({ page: "Homepage", success: true, notes: "Loaded" });

		// 2. Commercial Video
		await page.goto(BASE_URL + "/commercial-video", {
			waitUntil: "networkidle",
			timeout: 15000,
		});
		await page.screenshot({
			path: join(SCREENSHOT_DIR, "02-commercial-video.png"),
			fullPage: true,
		});
		const commercialThumbnails = await page
			.locator('img[src*="vumbnail"], img[src*="youtube"]')
			.count();
		results.push({
			page: "Commercial Video",
			success: true,
			notes: `Loaded, ${commercialThumbnails} video thumbnails`,
		});

		// 3. Resume
		await page.goto(BASE_URL + "/resume", {
			waitUntil: "networkidle",
			timeout: 15000,
		});
		await page.screenshot({
			path: join(SCREENSHOT_DIR, "03-resume.png"),
			fullPage: true,
		});
		results.push({ page: "Resume", success: true, notes: "Loaded" });

		// 4. Contact Me
		await page.goto(BASE_URL + "/contact", {
			waitUntil: "networkidle",
			timeout: 15000,
		});
		await page.screenshot({
			path: join(SCREENSHOT_DIR, "04-contact.png"),
			fullPage: true,
		});
		results.push({ page: "Contact Me", success: true, notes: "Loaded" });

		// 5. Entertainment
		await page.goto(BASE_URL + "/entertainment", {
			waitUntil: "networkidle",
			timeout: 15000,
		});
		await page.screenshot({
			path: join(SCREENSHOT_DIR, "05-entertainment.png"),
			fullPage: true,
		});
		const entertainmentThumbnails = await page
			.locator('img[src*="vumbnail"], img[src*="youtube"]')
			.count();
		results.push({
			page: "Entertainment",
			success: true,
			notes: `Loaded, ${entertainmentThumbnails} video thumbnails`,
		});
	} catch (err) {
		results.push({
			page: "Error",
			success: false,
			notes: err instanceof Error ? err.message : String(err),
		});
	} finally {
		await browser.close();
	}

	// Write report
	const report = {
		timestamp: new Date().toISOString(),
		baseUrl: BASE_URL,
		results,
		summary: {
			navigationWorks: results.every((r) => r.success),
			pagesLoaded: results.filter((r) => r.success).length,
			totalPages: results.length,
		},
	};

	await writeFile(
		join(SCREENSHOT_DIR, "report.json"),
		JSON.stringify(report, null, 2),
	);

	console.log("\n=== Screenshot Report ===");
	console.log(JSON.stringify(report, null, 2));
	console.log(`\nScreenshots saved to: ${SCREENSHOT_DIR}`);
}

main().catch(console.error);
