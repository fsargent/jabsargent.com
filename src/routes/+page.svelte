<script lang="ts">
	import LandingCarousel from '$lib/components/LandingCarousel.svelte';

	const landingSlides = [
		{
			src: '/landing/IMG_0362.jpg',
			alt: 'Jennifer Bronstein Sargent seated beside a camera setup on set',
		},
		{
			src: '/landing/IMG_0378.jpg',
			alt: 'Production crew working around a camera rig during a live shoot',
		},
		{
			src: '/landing/JOSEALVARADOJR_050_036.jpg',
			alt: 'Jennifer Bronstein Sargent monitoring camera direction during filming',
		},
		{
			src: '/landing/IMG_0945.jpeg',
			alt: 'Outdoor production still with crew and equipment in motion',
		},
		{
			src: '/landing/IMG_2481.JPG',
			alt: 'Behind-the-scenes production image from a location shoot',
		},
		{
			src: '/landing/IMG_1838.jpg',
			alt: 'Jennifer Bronstein Sargent in conversation beside a production monitor',
		},
		{
			src: '/landing/IMG_4766.jpg',
			alt: 'Studio production setup with green screen and crew equipment',
		},
		{
			src: '/landing/IMG_4639.jpg',
			alt: 'Jennifer Bronstein Sargent coordinating a crew during a field production',
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
			Executive Producer and Video Director with over 15 years of experience in London, New York
			and California producing and directing content for television, documentaries, digital media,
			advertising and marketing campaigns.
		</p>
	</div>

</div>
