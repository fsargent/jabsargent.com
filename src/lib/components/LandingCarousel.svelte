<script lang="ts">
	import { onMount } from 'svelte';

	type Slide = {
		src: string;
		alt: string;
		href?: string;
	};

	let {
		slides,
		autoplayMs = 5000,
		showThumbnails = true,
	}: {
		slides: readonly Slide[];
		autoplayMs?: number;
		showThumbnails?: boolean;
	} = $props();

	let index = $state(0);
	let paused = $state(false);
	let prefersReducedMotion = $state(false);

	function clampIndex(i: number) {
		const n = slides.length;
		return n === 0 ? 0 : ((i % n) + n) % n;
	}

	function goTo(i: number) {
		index = clampIndex(i);
	}

	function next() {
		goTo(index + 1);
	}

	function prev() {
		goTo(index - 1);
	}

	function togglePaused() {
		paused = !paused;
	}

	function withFormat(url: string, format: string) {
		// Squarespace images support `?format=...` sizing. If the URL already has a query, append.
		if (url.includes('?')) return `${url}&format=${encodeURIComponent(format)}`;
		return `${url}?format=${encodeURIComponent(format)}`;
	}

	onMount(() => {
		const mq = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
		if (!mq) return;
		const update = () => (prefersReducedMotion = mq.matches);
		update();
		mq.addEventListener?.('change', update);
		return () => mq.removeEventListener?.('change', update);
	});

	$effect(() => {
		if (slides.length < 2) return;
		if (paused || prefersReducedMotion) return;
		const id = setInterval(next, Math.max(1000, autoplayMs));
		return () => clearInterval(id);
	});
</script>

<section class="rounded-lg border border-neutral-700 bg-neutral-900/30 p-3"
	aria-roledescription="carousel"
	aria-label="Featured work"
>
	<div class="relative aspect-[3/2] w-full overflow-hidden rounded-md bg-neutral-800">
		{#each slides as slide, i}
			{#if slide.href}
				<a
					href={slide.href}
					class="absolute inset-0 block"
					aria-hidden={i !== index}
					tabindex={i === index ? 0 : -1}
				>
					<img
						src={withFormat(slide.src, '1500w')}
						alt={slide.alt}
						class="h-full w-full object-cover {prefersReducedMotion ? '' : 'transition-opacity duration-500'} {i === index ? 'opacity-100' : 'opacity-0'}"
						loading={i === 0 ? 'eager' : 'lazy'}
						decoding="async"
						fetchpriority={i === 0 ? 'high' : 'auto'}
					/>
				</a>
			{:else}
				<img
					src={withFormat(slide.src, '1500w')}
					alt={slide.alt}
					class="absolute inset-0 h-full w-full object-cover {prefersReducedMotion ? '' : 'transition-opacity duration-500'} {i === index ? 'opacity-100' : 'opacity-0'}"
					loading={i === 0 ? 'eager' : 'lazy'}
					decoding="async"
					fetchpriority={i === 0 ? 'high' : 'auto'}
				/>
			{/if}
		{/each}

		<div class="pointer-events-none absolute inset-0 bg-black/10"></div>

		<!-- Controls -->
		<div class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-2">
			<button
				type="button"
				class="pointer-events-auto inline-flex items-center justify-center rounded bg-black/50 px-3 py-2 text-sm text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30"
				onclick={prev}
				aria-label="Previous slide"
			>
				<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M12.78 15.53a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L8.31 10l4.47 4.47a.75.75 0 0 1 0 1.06Z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>

			<div class="rounded bg-black/50 px-2 py-1 text-xs text-white/90">
				{index + 1} / {slides.length}
			</div>

			<button
				type="button"
				class="pointer-events-auto inline-flex items-center justify-center rounded bg-black/50 px-3 py-2 text-sm text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30"
				onclick={togglePaused}
				aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
			>
				{#if paused}
					<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M6.75 4.5a.75.75 0 0 1 .77.03l8 5a.75.75 0 0 1 0 1.28l-8 5A.75.75 0 0 1 6 15.17V4.83a.75.75 0 0 1 .75-.33Z"
							clip-rule="evenodd"
						/>
					</svg>
				{:else}
					<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h.5A1.5 1.5 0 0 1 9.5 4.5v11A1.5 1.5 0 0 1 8 17h-.5A1.5 1.5 0 0 1 6 15.5v-11Z" />
						<path d="M10.5 4.5A1.5 1.5 0 0 1 12 3h.5A1.5 1.5 0 0 1 14 4.5v11a1.5 1.5 0 0 1-1.5 1.5H12a1.5 1.5 0 0 1-1.5-1.5v-11Z" />
					</svg>
				{/if}
			</button>

			<button
				type="button"
				class="pointer-events-auto inline-flex items-center justify-center rounded bg-black/50 px-3 py-2 text-sm text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30"
				onclick={next}
				aria-label="Next slide"
			>
				<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M7.22 4.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06L11.69 10 7.22 5.53a.75.75 0 0 1 0-1.06Z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	</div>

	{#if showThumbnails && slides.length > 1}
		<div class="mt-3 hidden gap-2 overflow-x-auto pb-1 sm:flex">
			{#each slides as slide, i}
				<button
					type="button"
					class="relative h-16 w-24 flex-none overflow-hidden rounded border transition-colors
					{i === index ? 'border-neutral-200' : 'border-neutral-700 hover:border-neutral-500'}"
					onclick={() => goTo(i)}
					aria-label={`Go to slide ${i + 1}`}
					aria-current={i === index ? 'true' : 'false'}
				>
					<img
						src={withFormat(slide.src, '300w')}
						alt=""
						class="h-full w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
					{#if i === index}
						<div class="absolute inset-0 ring-2 ring-white/30"></div>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</section>
