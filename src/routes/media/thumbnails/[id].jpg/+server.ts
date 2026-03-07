import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, platform }) => {
	const id = params.id;
	if (!id) return new Response("Missing id", { status: 400 });

	const bucket = platform?.env?.MEDIA;
	if (!bucket) {
		return new Response("R2 binding MEDIA not configured", { status: 500 });
	}

	const key = `thumbnails/${id}.jpg`;
	const object = await bucket.get(key);
	if (!object) return new Response("Not found", { status: 404 });

	const headers = new Headers();
	headers.set("Content-Type", "image/jpeg");
	headers.set("Cache-Control", "public, max-age=31536000, immutable");
	if (object.etag) headers.set("ETag", object.etag);

	return new Response(object.body, { status: 200, headers });
};
