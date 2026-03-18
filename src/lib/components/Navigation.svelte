<script lang="ts">
	import { tick } from 'svelte';
	import { page } from '$app/state';
	import { primaryNav, secondaryNav } from '$lib/data/navigation';

	let menuOpen = $state(false);
	let isDesktop = $state(false);
	let externalOverlayOpen = $state(false);
	let drawerRef = $state<HTMLDivElement | null>(null);
	let lastFocusedElement = $state<HTMLElement | null>(null);

	function getFocusableElements(): HTMLElement[] {
		if (!drawerRef) return [];
		return [...drawerRef.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
	}

	async function openMenu() {
		lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		menuOpen = true;
		await tick();
		getFocusableElements()[0]?.focus();
	}

	function restoreFocus() {
		lastFocusedElement?.focus();
		lastFocusedElement = null;
	}

	function closeMenu() {
		if (!menuOpen) return;
		menuOpen = false;
		restoreFocus();
	}

	function toggleMenu() {
		if (menuOpen) {
			closeMenu();
			return;
		}

		void openMenu();
	}

	function syncDesktopState() {
		isDesktop = window.matchMedia('(min-width: 1280px)').matches;
		if (isDesktop) {
			menuOpen = false;
			lastFocusedElement = null;
		}
	}

	function handleDrawerKeydown(event: KeyboardEvent) {
		if (isDesktop || !menuOpen) return;

		if (event.key === 'Escape') {
			event.preventDefault();
			closeMenu();
			return;
		}

		if (event.key !== 'Tab') return;

		const focusable = getFocusableElements();
		if (focusable.length === 0) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		const active = document.activeElement;

		if (event.shiftKey && active === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && active === last) {
			event.preventDefault();
			first.focus();
		}
	}

	$effect(() => {
		if (typeof window === 'undefined') return;

		const mediaQuery = window.matchMedia('(min-width: 1280px)');
		const update = () => syncDesktopState();
		update();
		mediaQuery.addEventListener('change', update);

		return () => mediaQuery.removeEventListener('change', update);
	});

	$effect(() => {
		if (typeof document === 'undefined' || isDesktop) return;

		const previousOverflow = document.body.style.overflow;
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = previousOverflow;
		}

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	});

	$effect(() => {
		if (typeof window === 'undefined') return;

		const handleOverlayChange = (event: Event) => {
			const customEvent = event as CustomEvent<{ open?: boolean }>;
			externalOverlayOpen = !!customEvent.detail?.open;
		};

		window.addEventListener('app-overlay-change', handleOverlayChange as EventListener);

		return () => {
			window.removeEventListener('app-overlay-change', handleOverlayChange as EventListener);
		};
	});
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
		type="button"
		onclick={toggleMenu}
		class="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded text-white hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
		aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
		aria-expanded={menuOpen}
		aria-controls="site-navigation-drawer"
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
<div
	id="site-navigation-drawer"
	bind:this={drawerRef}
	class="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-80 overflow-y-auto border-r border-neutral-700 bg-neutral-900 transition-transform duration-300 xl:sticky xl:top-0 xl:h-screen xl:w-60 xl:max-w-none xl:translate-x-0 2xl:w-64
	{menuOpen ? 'translate-x-0' : '-translate-x-full'}"
	style="scrollbar-width: none;"
	role={!isDesktop ? 'dialog' : undefined}
	aria-modal={!isDesktop && menuOpen ? 'true' : undefined}
	aria-hidden={externalOverlayOpen || (!isDesktop && !menuOpen) ? 'true' : undefined}
	aria-labelledby={!isDesktop ? 'site-navigation-heading' : undefined}
	inert={externalOverlayOpen || (!isDesktop && !menuOpen)}
	onkeydown={handleDrawerKeydown}
>
	<nav aria-label="Site navigation">
	<div class="flex h-full flex-col p-5 sm:p-6">
		<a
			href="/"
			id="site-navigation-heading"
			class="mb-1 max-w-full px-3 py-1 font-heading text-[28px] leading-7 tracking-normal text-white uppercase antialiased [text-rendering:optimizeLegibility]"
			onclick={closeMenu}
		>
			Jennifer Bronstein Sargent
		</a>
		<div class="mb-8 px-3">
			<p class="text-xs tracking-widest text-neutral-400 uppercase">
				Producer &middot; Project Manager
			</p>
		</div>

		<div class="flex flex-1 flex-col gap-1">
			{#each primaryNav as item}
				<a
					href={item.href}
					class="block min-h-11 rounded px-3 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
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
					class="block min-h-11 rounded px-3 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
					{page.url.pathname === item.href
						? 'bg-neutral-700 text-white'
						: 'text-neutral-300 hover:bg-neutral-800 hover:text-white'}"
					onclick={closeMenu}
				>
					{item.label}
				</a>
			{/each}
		</div>

		<div class="mt-4 px-3 text-xs text-neutral-500">
			<p>jabsargent@gmail.com</p>
			<p>London, UK</p>
			<a
				href="https://www.linkedin.com/in/jennifer-bronstein/"
				target="_blank"
				rel="noreferrer"
				class="mt-3 inline-flex min-h-11 items-center gap-2 rounded py-2 text-neutral-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
</div>

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
