<script lang="ts">
	import type { ArticleType, ChapterType, TextbookType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import ArticleListItem from './ui/ArticleListItem.svelte';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import { darkenHex } from '$lib';
	import { fly } from 'svelte/transition';

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
	class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4"
	style="background: linear-gradient(135deg, {data.color}, {darkenHex(
		data.color,
		80,
	)}); --brand: {data.color};"
>
	<i
		class="ri-book-open-line absolute right-1/15 bottom-1/6 scale-200 rotate-15 text-9xl text-white opacity-20"
	></i>
	<i
		class="ri-article-line absolute top-1/4 left-1/15 scale-200 -rotate-15 text-9xl text-white opacity-20"
	></i>

	<div
		class="z-10 flex w-full flex-col gap-4 rounded-3xl p-4 shadow-2xl backdrop-blur-sm sm:w-sm sm:gap-6 sm:rounded-4xl sm:p-8 {data.darkMode
			? 'bg-neutral-800/80 text-white'
			: 'bg-white/90 text-black'}"
		in:fly|global={{ x: 200, duration: 400 }}
	>
		<header class="flex flex-col items-center gap-1 pt-2 text-center">
			<div>
				<h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
					{data.chapter.title}
				</h1>
				<p class="mt-1 text-sm opacity-70">
					{data.textbook.title}
				</p>
			</div>
		</header>

		<hr class="opacity-20" />

		<div class="flex flex-col gap-4">
			{#if data.articles.length === 0}
				<div
					class="flex flex-col items-center gap-4 py-4 text-center font-normal"
				>
					<p class="opacity-80">{m.noArticlesInChapterYet()}</p>

					<Button
						emoji="arrow-left-s"
						text={m.goBack()}
						type="button"
						onclick={() => history.back()}
						css="buttonPrimary w-full"
						style="background-color: {data.color}; width: 100%;"
					/>
				</div>
			{:else}
				<div class="space-y-3">
					{#each data.articles as article, i (i)}
						<ArticleListItem {article} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
