<script lang="ts">
	import type { ArticleType, ChapterType, TextbookType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import ArticleListItem from './ui/ArticleListItem.svelte';
	import Button from '$src/routes/(base)/components/Button.svelte';

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

<div
	class="mt-20 flex min-h-[33svh] w-1/2 flex-col gap-4 rounded-2xl p-4 shadow-xl {data.darkMode
		? 'bg-black/60'
		: 'bg-white/80'}"
>
	{#if data.articles.length == 0}
		<div class="flex flex-row items-center font-normal">
			{m.noArticlesInChapterYet()}
			<div class="grow"></div>
			<Button
				emoji="arrow-left-s"
				text={m.goBack()}
				type="button"
				onclick={() => history.back()}
				css="buttonPrimary"
				style="background-color: {data.color};"
			></Button>
		</div>
	{/if}
	{#each data.articles as article, i (i)}
		<ArticleListItem {article} />
	{/each}
</div>
