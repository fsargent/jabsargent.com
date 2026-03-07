<script lang="ts">
	import VideoGrid from "$lib/components/VideoGrid.svelte";
	import { getCategoryBySlug } from "$lib/data/videos";

	type ShowcaseImage = {
		src: string;
		alt: string;
	};

	const category = getCategoryBySlug("interactive-experiences")!;

	const showcaseImages: ShowcaseImage[] = [
		{
			src: "/interactive-experiences/taco-bell-qr-code.png",
			alt: "Taco Bell QR code campaign creative",
		},
		{
			src: "/interactive-experiences/screen-shot-2020-03-20.jpg",
			alt: "Interactive campaign screenshot from March 2020",
		},
		{
			src: "/interactive-experiences/screen-shot-2021-01-07.png",
			alt: "Interactive experience screenshot from January 2021",
		},
	];

	const xofluzaImages: ShowcaseImage[] = [
		{
			src: "/interactive-experiences/xofluza-1579029464808-5JH7MVCV9NPN759OJ0AW.jpg",
			alt: "Julie Bowen for Xofluza campaign image 1",
		},
		{
			src: "/interactive-experiences/xofluza-1579030088226-097HYCODH4CXPS4QDLUZ.jpg",
			alt: "Julie Bowen for Xofluza campaign image 2",
		},
		{
			src: "/interactive-experiences/xofluza-1579029386789-IINGMA60GOS77WBHHHPR.jpg",
			alt: "Julie Bowen for Xofluza campaign image 3",
		},
		{
			src: "/interactive-experiences/xofluza-1579029248896-1TTMDC6BUGLRTQN6FMYY.jpg",
			alt: "Julie Bowen for Xofluza campaign image 4",
		},
		{
			src: "/interactive-experiences/xofluza-1579029289365-WJSV1RCZURX74IGHIFTX.jpg",
			alt: "Julie Bowen for Xofluza campaign image 5",
		},
		{
			src: "/interactive-experiences/xofluza-1579030201161-KCBBG7JEHGYN4KZMUCMU.jpg",
			alt: "Julie Bowen for Xofluza campaign image 6",
		},
	];

	let expandedImage = $state<ShowcaseImage | null>(null);
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

	<div class="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each showcaseImages as image}
			<div class="rounded bg-neutral-900 p-2">
				<button
					type="button"
					class="block w-full cursor-zoom-in"
					onclick={() => (expandedImage = image)}
					aria-label={`Expand image: ${image.alt}`}
				>
					<img
						src={image.src}
						alt={image.alt}
						class="block h-auto w-full object-contain"
						loading="lazy"
						decoding="async"
					/>
				</button>
			</div>
		{/each}
	</div>

	<h2 class="font-heading mb-4 text-2xl tracking-wide text-white">Xofluza</h2>
	<div class="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each xofluzaImages as image}
			<div class="rounded bg-neutral-900 p-2">
				<button
					type="button"
					class="block w-full cursor-zoom-in"
					onclick={() => (expandedImage = image)}
					aria-label={`Expand image: ${image.alt}`}
				>
					<img
						src={image.src}
						alt={image.alt}
						class="block h-auto w-full object-contain"
						loading="lazy"
						decoding="async"
					/>
				</button>
			</div>
		{/each}
	</div>

	<div class="mt-8">
		<VideoGrid videos={category.videos} />
	</div>
</div>

{#if expandedImage}
	<div class="fixed inset-0 z-50 bg-black/90 p-4 md:p-8" role="dialog" aria-modal="true">
		<button
			type="button"
			class="absolute inset-0 h-full w-full cursor-zoom-out"
			onclick={() => (expandedImage = null)}
			aria-label="Close expanded image"
		></button>
		<div class="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center">
			<button
				type="button"
				class="cursor-zoom-out"
				onclick={() => (expandedImage = null)}
				aria-label="Close expanded image"
			>
				<img
					src={expandedImage.src}
					alt={expandedImage.alt}
					class="max-h-full max-w-full object-contain"
				/>
			</button>
			<button
				type="button"
				class="absolute right-2 top-2 rounded bg-black/70 px-3 py-2 text-sm text-white hover:bg-black/85"
				onclick={() => (expandedImage = null)}
				aria-label="Close expanded image"
			>
				Close
			</button>
		</div>
	</div>
{/if}
