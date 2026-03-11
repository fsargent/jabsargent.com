<script lang="ts">
	let {
		clients,
		clientVideoLinks
	}: {
		clients: string[];
		clientVideoLinks: Record<string, string>;
	} = $props();
</script>

<span>
	{#each clients as client, i}
		{#if i > 0}<span>, </span>{/if}
		{#if clientVideoLinks[client]}
			<a href={clientVideoLinks[client]} class="underline decoration-neutral-500 underline-offset-2">
				{client}
			</a>
		{:else}
			<span>{client}</span>
		{/if}
	{/each}
</span>
