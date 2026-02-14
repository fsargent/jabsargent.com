<script lang="ts">
	import type { Category } from '$lib/data/videos';
	import VideoGrid from './VideoGrid.svelte';

	let { category }: { category: Category } = $props();
</script>

<svelte:head>
	<title>{category.title} — Jennifer Bronstein Sargent</title>
</svelte:head>

<div class="mx-auto max-w-6xl">
	<h1 class="font-heading mb-6 text-3xl tracking-wide text-white md:text-4xl">
		{category.title}
	</h1>

	{#each category.description.split('\n\n') as paragraph}
		<p class="mb-6 max-w-3xl text-neutral-300 leading-relaxed">
			{paragraph}
		</p>
	{/each}

	<div class="mt-8">
		<VideoGrid videos={category.videos} />
	</div>
</div>
