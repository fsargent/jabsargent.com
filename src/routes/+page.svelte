<script lang="ts">
	import LandingCarousel from '$lib/components/LandingCarousel.svelte';

	const landingSlides = [
		{
			src: '/landing/IMG_0362.jpg',
			alt: 'Carousel image 1',
		},
		{
			src: '/landing/IMG_0378.jpg',
			alt: 'Carousel image 2',
		},
		{
			src: '/landing/JOSEALVARADOJR_050_036.jpg',
			alt: 'Carousel image 3',
		},
		{
			src: '/landing/IMG_0945.jpeg',
			alt: 'Carousel image 4',
		},
		{
			src: '/landing/IMG_2481.JPG',
			alt: 'Carousel image 5',
		},
		{
			src: '/landing/IMG_1838.jpg',
			alt: 'Carousel image 6',
		},
		{
			src: '/landing/IMG_4766.jpg',
			alt: 'Carousel image 7',
		},
		{
			src: '/landing/IMG_4639.jpg',
			alt: 'Carousel image 8',
		},
	] as const;
</script>

<svelte:head>
	<title>Jennifer Bronstein Sargent — Producer, Project Manager</title>
</svelte:head>

<div class="mx-auto max-w-4xl">
	<div class="mb-10">
		<LandingCarousel slides={landingSlides} autoplayMs={5000} showThumbnails={true} />
	</div>

	<div class="mb-12 text-center">
		<h1 class="font-heading mb-4 text-3xl tracking-wide text-white uppercase sm:text-5xl md:text-6xl">
			Jennifer Bronstein Sargent
		</h1>
		<p class="text-base tracking-[0.2em] text-neutral-400 uppercase sm:text-lg">
			Producer &middot; Project Manager
		</p>
	</div>

	<div class="mb-12">
		<p class="mx-auto max-w-2xl text-center text-neutral-300 leading-relaxed">
			Executive Producer and Video Director with over 15 years of experience producing and
			directing content for television, documentaries, digital media, advertising and marketing
			campaigns.
		</p>
	</div>

</div>
