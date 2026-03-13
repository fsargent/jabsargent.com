<script lang="ts">
	import './layout.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Jennifer Bronstein Sargent — Producer, Project Manager" />
</svelte:head>

<div class="site-shell flex min-h-screen flex-col xl:flex-row">
	<div class="site-navigation">
		<Navigation />
	</div>
	<main class="site-main flex-1 px-4 py-6 sm:p-6 xl:p-8 2xl:p-10">
		{@render children()}
	</main>
</div>
