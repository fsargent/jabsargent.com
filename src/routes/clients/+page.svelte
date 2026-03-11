<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import VideoGrid from '$lib/components/VideoGrid.svelte';
	import { clientSections } from '$lib/data/clients';

	onMount(() => {
		if (!window.location.hash) {
			window.scrollTo(0, 0);
		}
	});
</script>

<svelte:head>
	<title>Clients — Jennifer Bronstein Sargent</title>
</svelte:head>

<div class="prose prose-invert mx-auto max-w-5xl">
	<h1 class="font-heading tracking-wide uppercase">Clients</h1>
	<p class="text-neutral-300">
		Clients with portfolio samples.
	</p>
	{#if page.url.hash}
		<p class="not-prose mb-4 text-sm text-neutral-400">
			You opened a client deep link. <a href="/clients" class="underline">View full client list (A-Z)</a>.
		</p>
	{/if}
	<div class="not-prose mb-8 flex flex-wrap gap-2">
		{#each clientSections as section}
			<a
				href={`#${section.anchor}`}
				class="rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
			>
				{section.name}
			</a>
		{/each}
	</div>

	{#each clientSections as section}
		<section id={section.anchor} class="scroll-mt-24">
			<h2>{section.name}</h2>
			<div class="not-prose mt-4 mb-10">
				<VideoGrid videos={section.videos} />
			</div>
		</section>
	{/each}
</div>
