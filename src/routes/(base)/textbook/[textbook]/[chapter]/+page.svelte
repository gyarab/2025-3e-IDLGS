<script lang="ts">
	import type { ArticleType, ChapterType, TextbookType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import ArticleListItem from './ui/ArticleListItem.svelte';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import { darkenHex } from '$lib';
	import { fly } from 'svelte/transition';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import Dialog from '$src/routes/(base)/components/Dialog.svelte';
	import ConfirmCancel from '$src/routes/(base)/components/ConfirmCancel.svelte';
	import BackButton from '$src/routes/(base)/components/BackButton.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

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

	let showArticleDialog: boolean = $state(false);
	let tempTitleValue: string = $state('');
	let addForm: HTMLFormElement | null = null;
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
		class="ri-book-open-line absolute right-1/15 bottom-1/6 scale-150 rotate-15 text-9xl text-white opacity-20"
	></i>
	<i
		class="ri-article-line absolute top-1/4 left-1/15 scale-150 -rotate-15 text-9xl text-white opacity-20"
	></i>

	<div
		class="z-10 flex w-full max-w-md flex-col gap-4 rounded-3xl p-4 shadow-xl backdrop-blur-sm sm:gap-6 sm:rounded-4xl sm:p-8 {data.darkMode
			? 'bg-neutral-800/80 text-white'
			: 'bg-white/90 text-black'}"
		in:fly|global={{ x: 200, duration: 400 }}
	>
		<div class="flex flex-row items-center gap-3">
			<header class="flex grow flex-col">
				<h1 class="text-2xl font-bold sm:text-3xl">
					[{data.chapter.order}] {m.chapter()}
					{data.chapter.title}
				</h1>
				<p class="mt-1 text-sm opacity-70">
					{data.textbook.title}
				</p>
			</header>

			<Button
				text=""
				css="rounded-full px-2 py-1 font-bold bg-green-500/50"
				onclick={() => {
					showArticleDialog = true;
				}}
				emoji="add"
				type="button"
			/>
			<BackButton
				color={data.color}
				showText={false}
				onclick={() => {
					goto(
						resolve('/(base)/textbook/[textbook]', {
							textbook: data.textbook.uuid,
						}),
					);
				}}
			/>
		</div>

		<hr class="opacity-20" />

		<div class="flex flex-col gap-4">
			{#if data.articles.length === 0}
				<div
					class="flex flex-col items-center gap-4 py-4 text-center font-normal"
				>
					<p class="opacity-80">{m.noArticlesInChapterYet()}</p>
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

<Dialog
	bind:open={showArticleDialog}
	darkMode={data.darkMode}
	css="min-h-0! min-w-1/4!"
>
	<form
		method="POST"
		action="?/addArticle"
		bind:this={addForm}
		class="flex w-full grow flex-col gap-2"
	>
		<h1>{m.addArticle()}</h1>
		<div class="flex w-full grow flex-col gap-2">
			<TextInput
				darkMode={data.darkMode}
				color={data.color}
				type="text"
				placeholder={m.articleTitle()}
				bind:value={tempTitleValue}
			/>
			<input
				type="hidden"
				name="title"
				bind:value={tempTitleValue}
			/>
		</div>
		<ConfirmCancel
			color={data.color}
			bind:open={showArticleDialog}
			confirm={async () => {
				if (!addForm) return;
				addForm.requestSubmit();
			}}
			cancel={async () => {}}
			disabled={tempTitleValue.trim() === ''}
		/>
	</form>
</Dialog>
