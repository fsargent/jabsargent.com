<script lang="ts">
	import { categories } from '$lib/data/videos';
</script>

<svelte:head>
	<title>Jennifer Bronstein Sargent — Director, Producer, Writer</title>
</svelte:head>

<div class="mx-auto max-w-4xl">
	<div class="mb-12 text-center">
		<h1 class="font-heading mb-4 text-5xl tracking-wide text-white uppercase md:text-6xl">
			Jennifer Bronstein Sargent
		</h1>
		<p class="text-lg tracking-widest text-neutral-400 uppercase">
			Director &middot; Producer &middot; Writer
		</p>
	</div>

	<div class="mb-12">
		<p class="mx-auto max-w-2xl text-center text-neutral-300 leading-relaxed">
			Executive Producer and Video Director with over 15 years of experience producing and
			directing content for television, documentaries, digital media, advertising and marketing
			campaigns.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each categories as category}
			<a
				href="/{category.slug}"
				class="group rounded-lg border border-neutral-700 p-6 transition-colors hover:border-neutral-500 hover:bg-neutral-800/50"
			>
				<h2 class="font-heading mb-2 text-lg text-white">{category.title}</h2>
				<p class="text-sm text-neutral-400">
					{category.videos.length} video{category.videos.length === 1 ? '' : 's'}
				</p>
			</a>
		{/each}
	</div>
</div>
