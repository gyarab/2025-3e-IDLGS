<script lang="ts">
	import type { ChapterType } from '$lib/types';
	import Button from '$src/routes/(root)/components/Button.svelte';
	import { m } from '$lib/paraglide/messages';
	import Article from './Article.svelte';

	let {
		chapter,
		textbookUuid,
		canEdit,
		showEditButtons,
	}: {
		chapter: ChapterType;
		textbookUuid: string;
		canEdit: boolean;
		showEditButtons: boolean;
	} = $props();

	let isOpen = $state(false);
</script>

<div class="flex w-full flex-col gap-0 pl-0 pr-0">
	<div class="flex w-full flex-row items-center justify-start gap-1">
		<a href="/textbook/{textbookUuid}/{chapter.uuid}">
			{chapter.name}
		</a>
		<Button
			emoji={isOpen ? 'arrow-up-s' : 'arrow-down-s'}
			btn="button-none"
			onclick={() => {
				isOpen = !isOpen;
			}}
		/>
		{#if canEdit && showEditButtons}
			<div class="grow"></div>
			<!-- edit name -->
			<Button
				btn="button-none *:font-medium"
				emoji="pencil"
				label={m.editChapterName()}	
			/>

			<!-- move up and down -->
			<Button
				btn="button-none *:font-medium"
				emoji="arrow-up-s"
				label={m.moveChapterUp()}	
			/>
			<Button
				btn="button-none *:font-medium"
				emoji="arrow-down-s"
				label={m.moveChapterDown()}	
			/>
		{/if}
	</div>

	{#if isOpen}
		{#each chapter.articlesLimited as article (article.uuid)}
			<Article
				{article}
				{textbookUuid}
				chapterUuid={chapter.uuid}
				{canEdit}
				{showEditButtons}
			/>
		{:else}
			<div class="flex flex-row w-full gap-1 items-center opacity-70 pl-4 pr-4">
				{m.noArticlesInChapter()}
			</div>
		{/each}

		{#if canEdit && showEditButtons}
			<Button
				btn="button-none w-full *:font-medium ml-4"
				emoji="add-circle"
			>
				<div class="flex w-full flex-row gap-1">
					{m.addAnArticle()}
				</div>
			</Button>
		{/if}
	{/if}
</div>
