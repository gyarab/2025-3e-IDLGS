<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '$component/Button.svelte';
	import Form from '$component/Form.svelte';
	import HiddenInput from '$component/HiddenInput.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import TextInput from '$component/TextInput.svelte';

	let {
		article,
		textbookUuid,
		chapterUuid,
		canEdit,
		showEditButtons,
		formMessage = $bindable(''),
		formAlert = $bindable(''),
		i,
		chapterI,
		amount,
		chapterAmount,
	}: {
		article: { uuid: string; name: string };
		textbookUuid: string;
		chapterUuid: string;
		canEdit: boolean;
		showEditButtons: boolean;
		formMessage: string;
		formAlert: string;
		i: number;
		chapterI: number;
		amount: number;
		chapterAmount: number;
	} = $props();

	let articleDeletionRequested = $state(false);
	let articleRenameRequested = $state(false);
	let articleMoveRequested = $state(false);

	let articleLocalName = $derived(article.name);
	let articleRename = $state(false);
</script>

<!-- TODO make draggable -->

<Form
	cssClass="pl-4 pr-4 flex w-full flex-row gap-1"
	action=""
	smallLoadAnimation={true}
	start={async () => {
		articleRename = false;
	}}
	success={async () => {
		if (articleDeletionRequested) {
			formMessage = m.articleDeletedSuccessfully();
		}
		if (articleRenameRequested) {
			formMessage = m.articleRenamedSuccessfully();
		}
	}}
	failure={async () => {
		if (articleDeletionRequested) {
			formAlert = m.couldNotDeleteArticle();
		}
		if (articleRenameRequested) {
			formAlert = m.couldNotRenameArticle();
		}
		if (articleMoveRequested) {
			formAlert = m.couldNotMoveArticle();
		}
	}}
	final={async () => {
		if (page.params.articleId === article.uuid) {
			goto(`/textbook/${textbookUuid}/${chapterUuid}/`);
		}

		articleDeletionRequested = false;
		articleRenameRequested = false;
		articleMoveRequested = false;
	}}
>
	<HiddenInput
		name="uuid"
		value={article.uuid}
		ignoreChangeEvents={true}
	/>

	{#if articleRename}
		<TextInput
			name="name"
			bind:value={articleLocalName}
			cssClass="grow"
		/>
		<Button
			btn="button-none"
			type="submit"
			emoji="check"
			action={`/textbook/${textbookUuid}/${chapterUuid}/?/editArticleName`}
			label={m.save()}
			onclick={() => {
				articleRenameRequested = true;
			}}
		/>
		<Button
			btn="button-none"
			emoji="close"
			type="button"
			label={m.cancel()}
			onclick={() => {
				articleRename = false;
			}}
		/>
	{:else}
		<a
			class=""
			href="/textbook/{textbookUuid}/{chapterUuid}/{article.uuid}"
		>
			{article.name}
		</a>
		{#if canEdit && showEditButtons}
			<div class="grow"></div>
			<!-- edit name -->
			<Button
				btn="button-none *:font-medium"
				emoji="pencil"
				label={m.editArticleName()}
				onclick={() => {
					articleRename = true;
				}}
			/>

			<!-- move up and down -->
			<Button
				btn="button-none *:font-medium"
				emoji="arrow-up-s"
				type="submit"
				action={`/textbook/${textbookUuid}/${chapterUuid}/?/moveArticleUp`}
				label={m.moveArticleUp()}
				disabled={i === 0 && chapterI === 0}
			/>
			<Button
				btn="button-none *:font-medium"
				emoji="arrow-down-s"
				type="submit"
				action={`/textbook/${textbookUuid}/${chapterUuid}/?/moveArticleDown`}
				label={m.moveArticleDown()}
				disabled={i === amount - 1 && chapterI === chapterAmount - 1}
			/>

			<!-- delete -->
			<Button
				btn="button-none *:font-medium"
				emoji="delete-bin"
				type="submit"
				action={`/textbook/${textbookUuid}/${chapterUuid}/?/removeArticle`}
				label={m.removeArticle()}
				onclick={() => {
					articleDeletionRequested = true;
				}}
			/>
		{/if}
	{/if}
</Form>
