<script lang="ts">
	import type { ChapterType } from '$lib/types';
	import Button from '$component/Button.svelte';
	import { m } from '$lib/paraglide/messages';
	import Article from './Article.svelte';
	import Modal from '$component/Modal.svelte';
	import Form from '$component/Form.svelte';
	import TextInput from '$component/TextInput.svelte';
	import HiddenInput from '$component/HiddenInput.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let {
		chapter,
		textbookUuid,
		canEdit,
		showEditButtons,
		formMessage = $bindable(''),
		formAlert = $bindable(''),
		i,
		amount,
	}: {
		chapter: ChapterType;
		textbookUuid: string;
		canEdit: boolean;
		showEditButtons: boolean;
		formMessage: string;
		formAlert: string;
		i: number;
		amount: number;
	} = $props();

	let isOpen = $state(false);

	let addArticleModal = $state(false);
	let chapterDeletionRequested = $state(false);
	let chapterRenameRequested = $state(false);
	let chapterMoveRequested = $state(false);

	let chapterLocalName = $derived(chapter.name);
	let chapterRename = $state(false);
</script>

<Form
	cssClass="flex w-full flex-col gap-0 pr-0 pl-0"
	action=""
	smallLoadAnimation={true}
	start={async () => {
		chapterRename = false;
	}}
	success={async () => {
		if (chapterDeletionRequested) {
			formMessage = m.chapterDeletedSuccessfully();
		}
		if (chapterRenameRequested) {
			formMessage = m.chapterRenamedSuccessfully();
		}
	}}
	failure={async () => {
		if (chapterDeletionRequested) {
			formAlert = m.couldNotDeleteChapter();
		}
		if (chapterRenameRequested) {
			formAlert = m.couldNotRenameChapter();
		}
		if (chapterMoveRequested) {
			//move shows message only on fail
			formAlert = m.couldNotMoveChapter();
		}
	}}
	final={async () => {
		if (page.params.chapterId === chapter.uuid) {
			goto(`/textbook/${textbookUuid}/`);
		}

		chapterDeletionRequested = false;
		chapterRenameRequested = false;
		chapterMoveRequested = false;
	}}
>
	<HiddenInput
		name="uuid"
		value={chapter.uuid}
		ignoreChangeEvents={true}
	/>
	<div class="flex w-full flex-row items-center justify-start gap-1">
		{#if chapterRename}
			<TextInput
				name="name"
				bind:value={chapterLocalName}
				cssClass="grow"
			/>
			<Button
				btn="button-none"
				emoji="check"
				type="submit"
				action={`/textbook/${textbookUuid}/?/editChapterName`}
				onclick={() => {
					chapterRenameRequested = true;
				}}
				label={m.save()}
			/>
			<Button
				btn="button-none"
				emoji="close"
				type="button"
				onclick={() => {
					chapterRename = false;
				}}
				label={m.cancel()}
			/>
		{:else}
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
					type="button"
					label={m.editChapterName()}
					onclick={() => {
						chapterRename = true;
					}}
				/>

				<!-- move up and down -->
				<Button
					btn="button-none *:font-medium"
					emoji="arrow-up-s"
					type="submit"
					action={`/textbook/${textbookUuid}/?/moveChapterUp`}
					label={m.moveChapterUp()}
					disabled={i === 0}
				/>
				<Button
					btn="button-none *:font-medium"
					emoji="arrow-down-s"
					type="submit"
					action={`/textbook/${textbookUuid}/?/moveChapterDown`}
					label={m.moveChapterDown()}
					disabled={i === amount - 1}
				/>

				<!-- delete -->
				<Button
					btn="button-none *:font-medium"
					emoji="delete-bin"
					type="submit"
					action={`/textbook/${textbookUuid}/?/removeChapter`}
					label={m.removeChapter()}
					onclick={() => {
						chapterDeletionRequested = true;
					}}
				/>
			{/if}
		{/if}
	</div>

	{#if isOpen}
		{#each chapter.articlesLimited as article, articleI (article.uuid)}
			<Article
				{article}
				{textbookUuid}
				chapterUuid={chapter.uuid}
				{canEdit}
				{showEditButtons}
				i={articleI}
				chapterI={i}
				amount={chapter.articlesLimited!.length}
				chapterAmount={amount}
				bind:formMessage
				bind:formAlert
			/>
		{:else}
			<div
				class="flex flex-row w-full gap-1 items-center opacity-80 pl-4 pr-4"
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
</Form>

<Modal
	bind:showModal={addArticleModal}
	cssClass="standardModal"
	maxHeight={false}
	maxWidth={false}
>
	<Form
		action={`/textbook/${textbookUuid}/${chapter.uuid}/?/addArticle`}
		cssClass="flex w-full flex-col gap-2"
		success={async () => {
			addArticleModal = false;
			formMessage = m.articleAddedSuccessfully();
		}}
		failure={async () => {
			addArticleModal = false;
			formAlert = m.articleCouldNotBeAdded();
		}}
	>
		<h2>{m.addAnArticle()}</h2>
		<div class="flex w-full grow flex-col items-center justify-center">
			<TextInput
				name="name"
				label={m.articleName()}
				placeholder={m.enterArticleName()}
			/>
		</div>
		<div class="grid w-full grid-cols-2 gap-2">
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
		</div>
	</Form>
</Modal>
