<script lang="ts">
	import type { Video } from '$lib/data/videos';

	let { video }: { video: Video } = $props();

	let playing = $state(false);
	let thumbFailed = $state(false);
	let aspectRatio = $state(16 / 9);

	function embedUrl(): string {
		if (video.source === 'vimeo') {
			return `https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0`;
		}
		return `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`;
	}

	function thumbnailUrl(): string {
		if (video.source === 'youtube') return `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
		// Serve from our domain (R2 behind a SvelteKit route) to avoid third-party thumbnail flakiness.
		return `/media/thumbnails/${video.id}.jpg`;
	}

	function handleThumbLoad(event: Event): void {
		const img = event.currentTarget as HTMLImageElement;
		if (img.naturalWidth > 0 && img.naturalHeight > 0) {
			aspectRatio = img.naturalWidth / img.naturalHeight;
		}
	}

	function handleVideoLoaded(event: Event): void {
		const el = event.currentTarget as HTMLVideoElement;
		if (el.videoWidth > 0 && el.videoHeight > 0) {
			aspectRatio = el.videoWidth / el.videoHeight;
		}
	}
</script>

<div class="group relative w-full overflow-hidden rounded bg-neutral-800" style={`aspect-ratio: ${aspectRatio};`}>
	{#if playing}
		{#if video.source === 'vimeo'}
			<video
				class="absolute inset-0 h-full w-full bg-black object-contain"
				src={`/media/videos/${video.id}.mp4`}
				controls
				autoplay
				playsinline
				preload="metadata"
				onloadedmetadata={handleVideoLoaded}
			>
				<!-- Captions can be added later; keep a11y tooling happy for now. -->
				<track kind="captions" />
			</video>
		{:else}
			<iframe
				src={embedUrl()}
				class="absolute inset-0 h-full w-full"
				frameborder="0"
				allow="autoplay; fullscreen; picture-in-picture"
				allowfullscreen
				title={video.title ?? `${video.source} video ${video.id}`}
			></iframe>
		{/if}
	{:else}
		<button
			onclick={() => (playing = true)}
			class="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center border-0 bg-neutral-800 p-0"
			aria-label="Play video"
		>
			{#if thumbFailed}
				<!-- Fallback placeholder when thumbnail can't load -->
				<div class="flex h-full w-full items-center justify-center bg-neutral-700">
					<div class="text-center">
						<svg class="mx-auto h-12 w-12 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
						<span class="mt-2 block text-xs text-neutral-500">
							{video.source === 'vimeo' ? 'Vimeo' : 'YouTube'}
						</span>
					</div>
				</div>
			{:else}
				<img
					src={thumbnailUrl()}
					alt={video.title ?? 'Video thumbnail'}
					class="h-full w-full object-contain"
					loading="lazy"
					onload={handleThumbLoad}
					onerror={() => (thumbFailed = true)}
				/>
			{/if}
			<div
				class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			>
				<svg class="h-16 w-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
					<path d="M8 5v14l11-7z" />
				</svg>
			</div>
		</button>
	{/if}
</div>
