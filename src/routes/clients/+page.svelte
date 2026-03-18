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
	{#if clientSections.length === 0}
		<p class="not-prose rounded border border-neutral-800 bg-neutral-900/60 px-4 py-4 text-sm text-neutral-300">
			Client samples are not available right now. Please check back later.
		</p>
	{:else}
		<div class="not-prose mb-8 flex flex-wrap gap-3">
			{#each clientSections as section}
				<a
					href={`#${section.anchor}`}
					class="flex min-h-11 items-center rounded border border-neutral-700 px-3 py-2 text-sm text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
				>
					<span class="break-words">{section.name}</span>
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
	{/if}
</div>
