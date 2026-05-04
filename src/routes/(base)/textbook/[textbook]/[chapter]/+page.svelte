<script lang="ts">
	import type { ArticleType, ChapterType, TextbookType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import ArticleListItem from './ui/ArticleListItem.svelte';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
			textbook: TextbookType;
			chapter: ChapterType;
			articles: ArticleType[];
		};
	} = $props();
</script>

<svelte:head>
	<title>
		{data.chapter.title} | {data.textbook.title} | {m.idlgs()}
	</title>
</svelte:head>

<div class="flex min-h-[33svh] w-1/2 flex-col gap-4 rounded-2xl p-4 shadow-xl">
	{#each data.articles as article, i (i)}
		<ArticleListItem {article} />
	{/each}

</div>
