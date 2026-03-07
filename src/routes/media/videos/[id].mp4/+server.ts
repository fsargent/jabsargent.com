import type { RequestHandler } from "./$types";

function parseRange(
	rangeHeader: string | null,
	size: number,
): { offset: number; length: number } | null {
	// Supports: "bytes=start-end" (single range only)
	if (!rangeHeader) return null;
	const m = rangeHeader.match(/^bytes=(\d+)-(\d*)$/);
	if (!m) return null;

	const start = Number(m[1]);
	const endRaw = m[2] ? Number(m[2]) : undefined;
	if (!Number.isFinite(start) || start < 0) return null;

	let end = endRaw;
	if (end === undefined || !Number.isFinite(end) || end >= size) end = size - 1;
	if (end < start) return null;

	return { offset: start, length: end - start + 1 };
}

export const GET: RequestHandler = async ({ params, request, platform }) => {
	const id = params.id;
	if (!id) return new Response("Missing id", { status: 400 });

	const bucket = platform?.env?.MEDIA;
	if (!bucket) {
		return new Response("R2 binding MEDIA not configured", { status: 500 });
	}

	const key = `videos/${id}.mp4`;

	// HEAD first so we know size for range responses.
	const head = await bucket.head(key);
	if (!head) return new Response("Not found", { status: 404 });

	const size = head.size as number | undefined;
	const range = size ? parseRange(request.headers.get("range"), size) : null;

	const object = await bucket.get(key, range ? { range } : undefined);
	if (!object) return new Response("Not found", { status: 404 });

	const headers = new Headers();
	headers.set("Content-Type", "video/mp4");
	headers.set("Accept-Ranges", "bytes");
	headers.set("Cache-Control", "public, max-age=31536000, immutable");

	// Use a stable ETag if available to help caching.
	if (object.etag) headers.set("ETag", object.etag);

	if (range && size) {
		headers.set(
			"Content-Range",
			`bytes ${range.offset}-${range.offset + range.length - 1}/${size}`,
		);
		headers.set("Content-Length", String(range.length));
		return new Response(object.body, { status: 206, headers });
	}

	if (size) headers.set("Content-Length", String(size));
	return new Response(object.body, { status: 200, headers });
};
