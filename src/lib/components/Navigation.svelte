<script lang="ts">
	import { page } from '$app/state';
	import { primaryNav, secondaryNav } from '$lib/data/navigation';

	let menuOpen = $state(false);

	function closeMenu() {
		menuOpen = false;
	}
</script>

<!-- Mobile header -->
<div class="flex items-center justify-between gap-4 border-b border-neutral-700 px-4 py-3 xl:hidden">
	<a
		href="/"
		class="font-heading min-w-0 flex-1 text-base leading-tight tracking-normal text-white uppercase antialiased sm:text-lg [text-rendering:optimizeLegibility]"
	>
		Jennifer Bronstein Sargent
	</a>
	<button
		onclick={() => (menuOpen = !menuOpen)}
		class="shrink-0 text-white"
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
	class="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-80 overflow-y-auto border-r border-neutral-700 bg-neutral-900 transition-transform duration-300 xl:sticky xl:top-0 xl:h-screen xl:w-60 xl:max-w-none xl:translate-x-0 2xl:w-64
	{menuOpen ? 'translate-x-0' : '-translate-x-full'}"
	style="scrollbar-width: none;"
>
	<div class="flex h-full flex-col p-5 sm:p-6">
		<a
			href="/"
			class="mb-1 max-w-full px-[12.5px] py-px font-heading text-[28px] leading-7 tracking-normal text-white uppercase antialiased [text-rendering:optimizeLegibility]"
			onclick={closeMenu}
		>
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
			<a
				href="https://www.linkedin.com/in/jennifer-bronstein/"
				target="_blank"
				rel="noreferrer"
				class="mt-3 inline-flex items-center gap-2 rounded px-2 py-1 text-neutral-400 transition-colors hover:text-white"
				aria-label="Jennifer Bronstein on LinkedIn"
			>
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path
						d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM5.63 9.75h2.62V18H5.63V9.75Zm4.27 0h2.5v1.13h.04c.35-.66 1.2-1.36 2.48-1.36 2.65 0 3.14 1.75 3.14 4.02V18h-2.6v-3.95c0-.94-.02-2.15-1.31-2.15-1.31 0-1.51 1.03-1.51 2.08V18H9.9V9.75ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z"
					/>
				</svg>
				<span>LinkedIn</span>
			</a>
		</div>
	</div>
</nav>

<style>
	nav::-webkit-scrollbar {
		display: none;
	}
</style>

<!-- Mobile overlay backdrop -->
{#if menuOpen}
	<button
		class="fixed inset-0 z-40 bg-black/60 xl:hidden"
		onclick={closeMenu}
		aria-label="Close menu"
	></button>
{/if}
