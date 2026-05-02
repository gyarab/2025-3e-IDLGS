<script lang="ts">
	import type { ArticleType, TextbookType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import ArticleListItem from './ui/ArticleListItem.svelte';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
			textbook: TextbookType;
			articles: ArticleType[];
		};
	} = $props();
</script>

<div class="flex min-h-[33svh] w-1/2 flex-col gap-4 rounded-2xl p-4 shadow-xl">
	{#each data.articles as article, i (i)}
		<ArticleListItem {article} />
	{/each}
</div>
