<script lang="ts">
	let {
		clients,
		clientLinks
	}: {
		clients: string[];
		clientLinks: Record<string, string>;
	} = $props();
</script>

<span>
	{#each clients as client, i}
		{#if i > 0}<span>, </span>{/if}
		{#if clientLinks[client]}
			<a href={clientLinks[client]} class="underline decoration-neutral-500 underline-offset-2">
				{client}
			</a>
		{:else}
			<span>{client}</span>
		{/if}
	{/each}
</span>
