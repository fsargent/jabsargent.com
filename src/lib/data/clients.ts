import type { Video } from './videos';
import { categories } from './videos';

export interface ClientSection {
	name: string;
	anchor: string;
	videos: Video[];
}

function slugifyClientName(name: string): string {
	return name
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

const byClient = new Map<string, Video[]>();

for (const category of categories) {
	for (const video of category.videos) {
		if (!video.client) continue;

		const existing = byClient.get(video.client);
		if (existing) {
			const alreadyExists = existing.some(
				(existingVideo) =>
					existingVideo.source === video.source && existingVideo.id === video.id
			);
			if (!alreadyExists) {
				existing.push(video);
			}
		} else {
			byClient.set(video.client, [video]);
		}
	}
}

export const clientSections: ClientSection[] = [...byClient.entries()]
	.map(([name, videos]) => ({
		name,
		anchor: slugifyClientName(name),
		videos
	}))
	.sort((a, b) => a.name.localeCompare(b.name));

export const clientSectionLinksByName: Record<string, string> = Object.fromEntries(
	clientSections.map((section) => [section.name, `/clients#${section.anchor}`])
);
