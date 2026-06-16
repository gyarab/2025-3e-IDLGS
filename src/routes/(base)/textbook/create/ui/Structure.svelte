<script lang="ts">
	import { sanitizeColor } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import type { ArticleTypeRaw, ChapterTypeRaw } from '$lib/types';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import ConfirmCancel from '$src/routes/(base)/components/ConfirmCancel.svelte';
	import ConfirmDeleteDialog from '$src/routes/(base)/components/ConfirmDeleteDialog.svelte';
	import Dialog from '$src/routes/(base)/components/Dialog.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { fly } from 'svelte/transition';
	import Article from './components/Article.svelte';
	import Chapter from './components/Chapter.svelte';
	import Divider from '$src/routes/(base)/components/Divider.svelte';

	let {
		darkMode,
		color,
		chapters = $bindable([]),
		articles = $bindable([]),
	}: {
		darkMode: boolean;
		color: string;
		chapters: ChapterTypeRaw[];
		articles: ArticleTypeRaw[][];
	} = $props();

	const uiColor = $derived(sanitizeColor(color, darkMode ? 40 : 60));

	let showChapterDialog: boolean = $state(false);
	let showArticleDialog: boolean = $state(false);

	let deleteChapter: boolean = $state(false);
	let deleteArticle: boolean = $state(false);

	let selectedChapterId: number | undefined = $state(undefined);
	let selectedArticleId: number | undefined = $state(undefined);

	let tempTitleValue: string = $state('');

	let sortedChapters = $derived.by(() => {
		return chapters.slice().sort((a, b) => a.order - b.order);
	});
	let sortedArticles = $derived.by(() => {
		if (selectedChapterId == undefined) return [];
		return articles[selectedChapterId]
			.slice()
			.sort((a, b) => a.order - b.order);
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-col items-center gap-2 sm:flex-row"
		in:fly|global={{ x: 100, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.textbookStructure()}</h2>
		<div class="hidden grow sm:block"></div>
		<p>{m.textbookStructureDesciption()}</p>
	</div>

	<div class="flex w-full grow flex-col gap-2 sm:flex-row">
		<div class="flex grow flex-col gap-2 sm:w-1/2">
			<div class="flex min-h-10 flex-row gap-1">
				<h2
					in:fly|global={{
						x: 50,
						y: 0,
						duration: 300,
						delay: 200,
					}}
					class="flex items-center"
				>
					{m.chapters()}
				</h2>

				<div class="flex grow"></div>

				<Button
					text=""
					css="rounded-full px-2 font-bold bg-green-500/50"
					onclick={() => {
						showChapterDialog = true;
					}}
					emoji="add"
					type="button"
				/>
				<Button
					text=""
					css="rounded-full px-2 font-bold bg-red-500/50"
					onclick={() => {
						deleteChapter = true;
					}}
					emoji="close"
					type="button"
					disabled={selectedChapterId == undefined}
				/>
			</div>
			<div
				class="flex grow flex-col gap-2 overflow-x-hidden overflow-y-auto"
			>
				{#each sortedChapters as chapter, i (i)}
					<Chapter
						{darkMode}
						{chapter}
						{i}
						amount={sortedChapters.length}
						selected={selectedChapterId === chapters.findIndex((c) => c === chapter)}
						{color}
						onclick={() => {
							selectedChapterId = chapters.findIndex((c) => c === chapter);
							selectedArticleId = undefined;
						}}
						onup={() => {
							if (i <= 0) return;
							const prev = sortedChapters[i - 1];
							const prevOrder = prev.order;
							prev.order = chapter.order;
							chapter.order = prevOrder;
						}}
						ondown={() => {
							if (i >= sortedChapters.length - 1) return;
							const next = sortedChapters[i + 1];
							const nextOrder = next.order;
							next.order = chapter.order;
							chapter.order = nextOrder;
						}}
						onedit={(v: string) => (chapter.title = v)}
					/>
				{:else}
					<div
						class="flex flex-col justify-center items-center grow w-full italic opacity-70"
					>
						{m.noChaptersYet()}
					</div>
				{/each}
			</div>
		</div>

		<Divider
			{darkMode}
			orientation="h sm:v"
		/>

		<div class="flex grow flex-col gap-2 ps-2 sm:w-1/2">
			<div class="flex min-h-10 flex-row gap-1">
				<h2
					in:fly|global={{
						x: 50,
						y: 0,
						duration: 300,
						delay: 300,
						opacity: 0,
					}}
					class="flex items-center"
				>
					{m.articles()}
				</h2>

				<div class="flex grow"></div>

				<Button
					text=""
					css="rounded-full px-2 font-bold bg-green-500/50"
					onclick={() => {
						showArticleDialog = true;
					}}
					emoji="add"
					type="button"
					disabled={selectedChapterId == undefined}
				/>
				<Button
					text=""
					css="rounded-full px-2 font-bold bg-red-500/50"
					onclick={() => {
						deleteArticle = true;
					}}
					emoji="close"
					type="button"
					disabled={selectedArticleId == undefined ||
						selectedChapterId == undefined}
				/>
			</div>
			{#if selectedChapterId != undefined}
				<div
					class="flex grow flex-col gap-2 overflow-x-hidden overflow-y-auto"
				>
					{#each sortedArticles as article, i (i)}
						<Article
							{darkMode}
							{article}
							{color}
							{i}
							selected={
								selectedChapterId != undefined &&
								selectedArticleId ===
									articles[selectedChapterId!].findIndex((a) => a === article)
							}
							amount={sortedArticles.length}
							onclick={() => {
							// store selectedArticleId as index in underlying articles array
							selectedArticleId = articles[selectedChapterId!].findIndex(
								(a) => a === article
							);
						}}
							onup={() => {
							if (i <= 0) return;
							const prev = sortedArticles[i - 1];
							const prevOrder = prev.order;
							prev.order = article.order;
							article.order = prevOrder;
						}}
							ondown={() => {
							if (i >= sortedArticles.length - 1) return;
							const next = sortedArticles[i + 1];
							const nextOrder = next.order;
							next.order = article.order;
							article.order = nextOrder;
						}}
							onedit={(v: string) => (article.title = v)}
						/>
					{:else}
						<div
							class="flex flex-col justify-center items-center italic opacity-70 grow w-full"
						>
							{m.noArticlesInChapterYet()}
						</div>
					{/each}
				</div>
			{:else}
				<div
					class="flex w-full grow items-center justify-center italic opacity-70"
				>
					{m.selectAChapterToViewArticles()}
				</div>
			{/if}
		</div>
	</div>
</div>

<Dialog
	bind:open={showChapterDialog}
	{darkMode}
	css="min-h-0! min-w-1/4!"
>
	<div class="flex w-full grow flex-col gap-2">
		<h1>{m.addChapter()}</h1>
		<div class="flex w-full grow flex-col gap-2">
			<TextInput
				{darkMode}
				{color}
				type="text"
				placeholder={m.chapterTitle()}
				bind:value={tempTitleValue}
			/>
		</div>
		<ConfirmCancel
			{color}
			bind:open={showChapterDialog}
			confirm={async () => {
				chapters.push({
					title: tempTitleValue,
					order: (chapters.at(-1)?.order ?? -1) + 1,
				});
				articles.push([]);
				tempTitleValue = '';
			}}
			cancel={async () => {}}
			disabled={tempTitleValue.trim() === ''}
		/>
	</div>
</Dialog>

<Dialog
	bind:open={showArticleDialog}
	{darkMode}
	css="min-h-0! min-w-1/4!"
>
	<div class="flex w-full grow flex-col gap-2">
		<h1>{m.addArticle()}</h1>
		<div class="flex w-full grow flex-col gap-2">
			<TextInput
				{darkMode}
				{color}
				type="text"
				placeholder={m.articleTitle()}
				bind:value={tempTitleValue}
			/>
		</div>
		<ConfirmCancel
			{color}
			bind:open={showArticleDialog}
			confirm={async () => {
				articles[selectedChapterId!].push({
					title: tempTitleValue,
					order:
						(articles[selectedChapterId!].at(-1)?.order ?? -1) + 1,
				});
				tempTitleValue = '';
			}}
			cancel={async () => {}}
			disabled={tempTitleValue.trim() === ''}
		/>
	</div>
</Dialog>

<ConfirmDeleteDialog
	bind:open={deleteChapter}
	title="{m.deleteChapter()}?"
	{darkMode}
	{color}
	confirm={async () => {
		try {
			chapters.splice(selectedChapterId!, 1);
			articles.splice(selectedChapterId!, 1);
			selectedChapterId = undefined;
			selectedArticleId = undefined;
		} catch (e) {
			console.error('Error deleting chapter', e);
			throw e;
		} finally {
			deleteChapter = false;
		}
	}}
	cancel={async () => {
		deleteChapter = false;
	}}
/>

<ConfirmDeleteDialog
	bind:open={deleteArticle}
	title="{m.deleteArticle()}?"
	{darkMode}
	{color}
	confirm={async () => {
		try {
			articles[selectedChapterId!].splice(selectedArticleId!, 1);
			selectedArticleId = undefined;
		} catch (e) {
			console.error('Error deleting article', e);
			throw e;
		} finally {
			deleteArticle = false;
		}
	}}
	cancel={async () => {
		deleteArticle = false;
	}}
/>
