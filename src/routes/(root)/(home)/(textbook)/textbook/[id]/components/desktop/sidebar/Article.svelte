<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '$component/Button.svelte';
	import Form from '$component/Form.svelte';

	let {
		article,
		textbookUuid,
		chapterUuid,
		canEdit,
		showEditButtons,
	}: {
		article: { uuid: string; name: string };
		textbookUuid: string;
		chapterUuid: string;
		canEdit: boolean;
		showEditButtons: boolean;
	} = $props();
</script>

<!-- TODO make draggable -->

<Form
	cssClass="pl-4 pr-4 flex w-full flex-row gap-1"
	action=""
>
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
		/>

		<!-- move up and down -->
		<Button
			btn="button-none *:font-medium"
			emoji="arrow-up-s"
			label={m.moveArticleUp()}
		/>
		<Button
			btn="button-none *:font-medium"
			emoji="arrow-down-s"
			label={m.moveArticleDown()}
		/>
	{/if}
</Form>
