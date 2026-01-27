<script lang="ts">
	import type { ChapterType } from '$lib/types';
	import Button from '$component/Button.svelte';
	import { addAnArticle, m } from '$lib/paraglide/messages';
	import Article from './Article.svelte';
	import Modal from '$component/Modal.svelte';
	import Form from '$component/Form.svelte';
	import TextInput from '$component/TextInput.svelte';

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

	let addArticleModal = $state(false);
</script>

<div class="flex w-full flex-col gap-0 pr-0 pl-0">
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
			<div
				class="flex flex-row w-full gap-1 items-center opacity-70 pl-4 pr-4"
			>
				{m.noArticlesInChapter()}
			</div>
		{/each}

		{#if canEdit && showEditButtons}
			<Button
				btn="button-none w-full *:font-medium ml-4"
				emoji="add-circle"
				onclick={() => (addArticleModal = true)}
			>
				<div class="flex w-full flex-row gap-1">
					{m.addAnArticle()}
				</div>
			</Button>
		{/if}
	{/if}
</div>

<Modal
	bind:showModal={addArticleModal}
	cssClass="standardModal"
	maxHeight={false}
	maxWidth={false}
>
	<h2>{m.addAnArticle()}</h2>
	<div class="flex w-full grow flex-col items-center justify-center">
		<TextInput
			name="name"
			label={m.articleName()}
			placeholder={m.enterArticleName()}
		/>
	</div>
	<Form
		cssClass="grid grid-cols-2 gap-2 w-full"
		action="//textbook/{textbookUuid}/?/addArticle"
	>
		<Button
			type="submit"
			btn="button-primary"
			emoji="add-circle"
		>
			{m.addAnArticle()}
		</Button>
		<Button
			btn="button-red"
			emoji="close-circle"
			type="button"
		>
			{m.cancel()}
		</Button>
	</Form>
</Modal>
