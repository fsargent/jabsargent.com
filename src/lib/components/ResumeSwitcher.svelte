<script lang="ts">
	type ResumeVariant = 'resume' | 'project-management';

	let { current }: { current: ResumeVariant } = $props();

	const links = [
		{ id: 'resume', href: '/resume', label: 'Production Resume' },
		{
			id: 'project-management',
			href: '/project-management-resume',
			label: 'Project Management Resume'
		}
	] as const;

	function savePdf() {
		if (typeof window !== 'undefined') {
			window.print();
		}
	}
</script>

<div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
	<nav aria-label="Resume versions" class="flex flex-wrap gap-2 text-sm">
		{#each links as link}
			{#if link.id === current}
				<span class="rounded border border-neutral-600 bg-neutral-800 px-3 py-1.5 text-white">
					{link.label}
				</span>
			{:else}
				<a
					href={link.href}
					class="rounded border border-neutral-700 px-3 py-1.5 text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
				>
					{link.label}
				</a>
			{/if}
		{/each}
	</nav>

	<button
		type="button"
		class="inline-flex w-full items-center justify-center gap-2 rounded border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white sm:w-auto"
		onclick={savePdf}
	>
		<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				d="M5 2.75A1.75 1.75 0 0 1 6.75 1h4.19c.464 0 .91.184 1.238.512l1.31 1.31c.328.328.512.774.512 1.238V6h.5A2.75 2.75 0 0 1 17 8.75v4.5A2.75 2.75 0 0 1 14.25 16H13v1.25A1.75 1.75 0 0 1 11.25 19h-4.5A1.75 1.75 0 0 1 5 17.25V16H4.75A2.75 2.75 0 0 1 2 13.25v-4.5A2.75 2.75 0 0 1 4.75 6H5V2.75ZM6.5 6h5.5V4.25a.25.25 0 0 0-.073-.177l-1.31-1.31a.25.25 0 0 0-.177-.073H6.75a.25.25 0 0 0-.25.25V6Zm5 10.5v-3h-5v3.75c0 .138.112.25.25.25h4.5a.25.25 0 0 0 .25-.25V16.5Zm-5-4.5h7v2.5h.75a1.25 1.25 0 0 0 1.25-1.25v-4.5A1.25 1.25 0 0 0 14.25 7.5H4.75A1.25 1.25 0 0 0 3.5 8.75v4.5A1.25 1.25 0 0 0 4.75 14.5h.75V12Z"
			/>
		</svg>
		<span>Save PDF</span>
	</button>
</div>
