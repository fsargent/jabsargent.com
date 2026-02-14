<script lang="ts">
	import { page } from '$app/state';
	import { primaryNav, secondaryNav } from '$lib/data/navigation';

	let menuOpen = $state(false);

	function closeMenu() {
		menuOpen = false;
	}
</script>

<!-- Mobile header -->
<div class="flex items-center justify-between border-b border-neutral-700 p-4 lg:hidden">
	<a href="/" class="font-heading text-lg tracking-wide text-white uppercase">
		Jennifer Bronstein Sargent
	</a>
	<button
		onclick={() => (menuOpen = !menuOpen)}
		class="text-white"
		aria-label="Toggle navigation"
	>
		{#if menuOpen}
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		{:else}
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		{/if}
	</button>
</div>

<!-- Sidebar / Mobile overlay -->
<nav
	class="fixed inset-y-0 left-0 z-50 w-64 transform border-r border-neutral-700 bg-neutral-900 transition-transform duration-300 lg:relative lg:translate-x-0
	{menuOpen ? 'translate-x-0' : '-translate-x-full'}"
>
	<div class="flex h-full flex-col p-6">
		<a href="/" class="mb-1 font-heading text-xl tracking-wide text-white uppercase" onclick={closeMenu}>
			Jennifer Bronstein Sargent
		</a>
		<p class="mb-8 text-xs tracking-widest text-neutral-400 uppercase">
			Director &middot; Producer &middot; Writer
		</p>

		<div class="flex flex-1 flex-col gap-1">
			{#each primaryNav as item}
				<a
					href={item.href}
					class="rounded px-3 py-2 text-sm transition-colors
					{page.url.pathname === item.href
						? 'bg-neutral-700 text-white'
						: 'text-neutral-300 hover:bg-neutral-800 hover:text-white'}"
					onclick={closeMenu}
				>
					{item.label}
				</a>
			{/each}
		</div>

		<div class="mt-6 border-t border-neutral-700 pt-4">
			{#each secondaryNav as item}
				<a
					href={item.href}
					class="rounded px-3 py-2 text-sm transition-colors
					{page.url.pathname === item.href
						? 'bg-neutral-700 text-white'
						: 'text-neutral-300 hover:bg-neutral-800 hover:text-white'}"
					onclick={closeMenu}
				>
					{item.label}
				</a>
			{/each}
		</div>

		<div class="mt-4 text-xs text-neutral-500">
			<p>jabsargent@gmail.com</p>
			<p>London, UK</p>
		</div>
	</div>
</nav>

<!-- Mobile overlay backdrop -->
{#if menuOpen}
	<button
		class="fixed inset-0 z-40 bg-black/60 lg:hidden"
		onclick={closeMenu}
		aria-label="Close menu"
	></button>
{/if}
