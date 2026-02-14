<script lang="ts">
	import type { Video } from '$lib/data/videos';
	import VideoCard from './VideoCard.svelte';

	let { videos }: { videos: Video[] } = $props();
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each videos as video (video.source + video.id)}
		<VideoCard {video} />
	{/each}
</div>
