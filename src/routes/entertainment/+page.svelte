<script lang="ts">
	import { getCategoryBySlug } from '$lib/data/videos';
	import CategoryPage from '$lib/components/CategoryPage.svelte';

	const category = getCategoryBySlug('entertainment')!;
</script>

<CategoryPage {category} />
