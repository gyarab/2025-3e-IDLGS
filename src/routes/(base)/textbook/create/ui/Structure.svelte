<script lang="ts">
	import { darkenHex } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import type { ArticleTypeRaw, ChapterTypeRaw } from '$lib/types';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import ConfirmCancel from '$src/routes/(base)/components/ConfirmCancel.svelte';
	import ConfirmDeleteDialog from '$src/routes/(base)/components/ConfirmDeleteDialog.svelte';
	import Dialog from '$src/routes/(base)/components/Dialog.svelte';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import VerticalLine from '$src/routes/(base)/components/VerticalLine.svelte';
	import { fly } from 'svelte/transition';
	import Article from './components/Article.svelte';
	import Chapter from './components/Chapter.svelte';

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
		class="mb-2 flex w-full flex-col sm:flex-row items-center gap-2"
		in:fly|global={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.textbookStructure()}</h2>
		<p>{m.textbookStructureDesciption()}</p>
	</div>

	<div class="flex w-full grow flex-row gap-2">
		<div class="flex max-w-1/2 grow flex-col gap-2">
			<h2
				in:fly|global={{
					x: 1000,
					y: 0,
					duration: 300,
					delay: 300,
					opacity: 0,
				}}
			>
				{m.chapters()}
			</h2>
			<div
				class="flex grow flex-col gap-2 overflow-x-hidden overflow-y-scroll"
			>
				{#each sortedChapters as chapter, i (i)}
					<Chapter
						{darkMode}
						{chapter}
						{i}
						amount={chapters.length}
						selected={selectedChapterId === i}
						{color}
						onclick={() => {
							selectedChapterId = i;
							selectedArticleId = undefined;
						}}
						onup={() => {
							//swap order values with previous chapter
							const prevOrder = chapters[i - 1].order;
							chapters[i - 1].order = chapters[i].order;
							chapters[i].order = prevOrder;
						}}
						ondown={() => {
							//swap order values with next chapter
							const nextOrder = chapters[i + 1].order;
							chapters[i + 1].order = chapters[i].order;
							chapters[i].order = nextOrder;
						}}
						onedit={(v: string) => (chapters[i].title = v)}
					/>
				{:else}
					<div
						class="flex flex-col justify-center items-center grow w-full italic opacity-70"
					>
						{m.noChaptersYet()}
					</div>
				{/each}
			</div>
			<div class="flex w-full flex-row gap-1">
				<span
					class="flex grow flex-col gap-1"
					in:fly|global={{
						x: 1000,
						y: 0,
						duration: 300,
						delay: 700,
						opacity: 0,
					}}
				>
					<Button
						text={m.addChapter()}
						style="background-color: {color};"
						css="buttonPrimary w-full"
						onclick={() => {
							showChapterDialog = true;
						}}
						emoji="add-box"
						type="button"
					/>
				</span>
				{#if chapters.length > 0}
					<span
						class="flex grow flex-col gap-1"
						in:fly|global={{
							x: 1000,
							y: 0,
							duration: 300,
							delay: 900,
							opacity: 0,
						}}
					>
						<Button
							text={m.removeChapter()}
							style="background-color: {darkenHex(color, 80)};"
							css="buttonPrimary w-full"
							onclick={() => {
								deleteChapter = true;
							}}
							emoji="delete-bin-2"
							type="button"
							disabled={selectedChapterId == undefined}
						/>
					</span>
				{/if}
			</div>
		</div>
		<VerticalLine {darkMode} />
		<div class="flex max-w-1/2 grow flex-col gap-2 ps-2">
			<h2
				in:fly|global={{
					x: 1000,
					y: 0,
					duration: 300,
					delay: 500,
					opacity: 0,
				}}
			>
				{m.articles()}
			</h2>
			{#if selectedChapterId != undefined}
				<div
					class="flex grow flex-col gap-2 overflow-x-hidden overflow-y-scroll"
				>
					{#each sortedArticles as article, i (i)}
						<Article
							{darkMode}
							{article}
							{color}
							{i}
							selected={selectedArticleId === i}
							amount={articles[selectedChapterId].length}
							onclick={() => {
								selectedArticleId = i;
							}}
							onup={() => {
								//same as chapter
								const prevOrder =
									articles[selectedChapterId!][i - 1].order;
								articles[selectedChapterId!][i - 1].order =
									articles[selectedChapterId!][i].order;
								articles[selectedChapterId!][i].order =
									prevOrder;
							}}
							ondown={() => {
								const nextOrder =
									articles[selectedChapterId!][i + 1].order;
								articles[selectedChapterId!][i + 1].order =
									articles[selectedChapterId!][i].order;
								articles[selectedChapterId!][i].order =
									nextOrder;
							}}
							onedit={(v: string) =>
								(articles[selectedChapterId!][i].title = v)}
						/>
					{:else}
						<div
							class="flex flex-col justify-center items-center italic opacity-70 grow w-full"
						>
							{m.noArticlesInChapterYet()}
						</div>
					{/each}
				</div>
				<div class="flex w-full flex-row gap-1">
					<span
						class="flex grow flex-col gap-1"
						in:fly|global={{
							x: 1000,
							y: 0,
							duration: 300,
							delay: 100,
							opacity: 0,
						}}
					>
						<Button
							text={m.addArticle()}
							style="background-color: {color};"
							css="buttonPrimary w-full"
							onclick={() => {
								showArticleDialog = true;
							}}
							emoji="add-circle"
							type="button"
							disabled={selectedChapterId == undefined}
						/>
					</span>
					<span
						class="flex grow flex-col gap-1"
						in:fly|global={{
							x: 1000,
							y: 0,
							duration: 300,
							delay: 300,
							opacity: 0,
						}}
					>
						<Button
							text={m.removeArticle()}
							style="background-color: {darkenHex(color, 80)};"
							css="buttonPrimary w-full"
							onclick={() => {
								deleteArticle = true;
							}}
							emoji="close-circle"
							type="button"
							disabled={selectedArticleId == undefined ||
								selectedChapterId == undefined}
						/>
					</span>
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
			{darkMode}
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
			{darkMode}
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
	open={deleteArticle || deleteChapter}
	{darkMode}
	{color}
	confirm={async () => {
		if (deleteArticle) {
			articles[selectedChapterId!].splice(selectedArticleId!, 1);
		} else if (deleteChapter) {
			chapters.splice(selectedChapterId!, 1);
			articles.splice(selectedChapterId!, 1);
		}

		deleteArticle = false;
		deleteChapter = false;
	}}
	cancel={async () => {
		deleteArticle = false;
		deleteChapter = false;
	}}
/>
