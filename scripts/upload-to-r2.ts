/**
 * Upload downloaded videos and thumbnails to Cloudflare R2.
 *
 * Reads credentials from environment variables (Bun auto-loads .env):
 *   R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT, R2_BUCKET_NAME
 *
 * Usage:
 *   bun scripts/upload-to-r2.ts
 *   bun scripts/upload-to-r2.ts --thumbnails-only
 *   bun scripts/upload-to-r2.ts --videos-only
 */

import { readdirSync, readFileSync } from "node:fs";
import {
	HeadObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";

const {
	R2_ACCESS_KEY_ID,
	R2_SECRET_ACCESS_KEY,
	R2_ENDPOINT,
	R2_BUCKET_NAME = "jabsargent-media",
} = process.env;

if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_ENDPOINT) {
	console.error("Missing R2 credentials in environment. Check your .env file.");
	process.exit(1);
}

const s3 = new S3Client({
	region: "auto",
	endpoint: R2_ENDPOINT,
	credentials: {
		accessKeyId: R2_ACCESS_KEY_ID,
		secretAccessKey: R2_SECRET_ACCESS_KEY,
	},
});

const thumbsOnly = process.argv.includes("--thumbnails-only");
const videosOnly = process.argv.includes("--videos-only");
const rawFilenames = process.argv.includes("--raw-filenames");

function extractIdFromVideoFilename(file: string): string | undefined {
	// Supports either "{id}.mp4" or "Some Title [id].mp4"
	const bracket = file.match(/\[(\d+)\]\.mp4$/);
	if (bracket) return bracket[1];
	const bare = file.match(/^(\d+)\.mp4$/);
	if (bare) return bare[1];
	const lastDigits = file.match(/(\d+)(?=\.mp4$)/);
	return lastDigits?.[1];
}

function extractIdFromThumbFilename(file: string): string | undefined {
	const bare = file.match(/^(\d+)\.jpg$/);
	if (bare) return bare[1];
	const bracket = file.match(/\[(\d+)\]\.jpg$/);
	return bracket?.[1];
}

async function objectExists(key: string): Promise<boolean> {
	try {
		await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
		return true;
	} catch {
		return false;
	}
}

async function uploadFile(localPath: string, key: string, contentType: string) {
	if (await objectExists(key)) {
		console.log(`[skip] ${key} - already exists`);
		return;
	}

	const body = readFileSync(localPath);
	await s3.send(
		new PutObjectCommand({
			Bucket: R2_BUCKET_NAME,
			Key: key,
			Body: body,
			ContentType: contentType,
		}),
	);
	console.log(`[upload] ${key} (${(body.length / 1024 / 1024).toFixed(1)} MB)`);
}

async function uploadDir(
	dir: string,
	toKey: (file: string) => string | undefined,
	contentType: string,
) {
	let files: string[];
	try {
		files = readdirSync(dir);
	} catch {
		console.log(`Directory ${dir} not found, skipping.`);
		return;
	}

	let uploaded = 0;
	let skipped = 0;
	const seen = new Set<string>();

	for (const file of files) {
		try {
			const key = toKey(file);
			if (!key) {
				skipped++;
				continue;
			}

			// If we have multiple local files mapping to the same object key, only upload once.
			if (seen.has(key)) {
				skipped++;
				continue;
			}
			seen.add(key);

			if (await objectExists(key)) {
				skipped++;
				console.log(`[skip] ${key} - already exists`);
				continue;
			}
			await uploadFile(`${dir}/${file}`, key, contentType);
			uploaded++;
		} catch (e) {
			console.error(`[fail] ${file}: ${e instanceof Error ? e.message : e}`);
		}
	}

	console.log(`${dir}: uploaded ${uploaded}, skipped ${skipped}`);
}

async function main() {
	if (!thumbsOnly) {
		console.log("Uploading videos...");
		await uploadDir(
			"./downloads/videos",
			(file) => {
				if (!file.endsWith(".mp4")) return undefined;
				if (rawFilenames) return `videos/${file}`;
				const id = extractIdFromVideoFilename(file);
				return id ? `videos/${id}.mp4` : undefined;
			},
			"video/mp4",
		);
	}

	if (!videosOnly) {
		console.log("\nUploading thumbnails...");
		await uploadDir(
			"./downloads/thumbnails",
			(file) => {
				if (!file.endsWith(".jpg")) return undefined;
				if (rawFilenames) return `thumbnails/${file}`;
				const id = extractIdFromThumbFilename(file);
				return id ? `thumbnails/${id}.jpg` : undefined;
			},
			"image/jpeg",
		);
	}

	console.log("\nDone.");
}

main().catch(console.error);
