<script lang="ts">
	import { getCategoryBySlug } from '$lib/data/videos';
	import CategoryPage from '$lib/components/CategoryPage.svelte';

	const category = getCategoryBySlug('branded-partnerships')!;
</script>

<CategoryPage {category} />
