<script lang="ts">
	import './layout.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Jennifer Bronstein Sargent — Director, Producer, Writer" />
</svelte:head>

<div class="flex min-h-screen flex-col lg:flex-row">
	<Navigation />
	<main class="flex-1 p-6 lg:p-10">
		{@render children()}
	</main>
</div>
