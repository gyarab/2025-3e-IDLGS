<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';
	import type { TextbookType } from '$lib/types';
	import type { ArticleType } from '$lib/types';
	import Form from '$component/Form.svelte';
	import Button from '$component/Button.svelte';
	import Textarea from '$component/Textarea.svelte';
	import { mount, onMount } from 'svelte';
	import WordTooltip from '../../components/WordTooltip.svelte';

	let {
		data,
	}: {
		data: {
			article: ArticleType;
			textbook: TextbookType;
			isEditor: boolean;
			isOwner: boolean;
		};
	} = $props();

	let editingName: boolean = $state(false);
	let editingDescription: boolean = $state(false);

	onMount(() => {
		const components = [];

		document
			.querySelectorAll('.definitionMountPlace')
			.forEach((dmp: Element) => {
				components.push(
					mount(WordTooltip, {
						target: dmp,
						props: {
							word: dmp.getAttribute('data-word')!,
							description: dmp.getAttribute('data-description')!,
							uuid: dmp.getAttribute('data-uuid')!,
						},
					}),
				);
			});
	});
</script>

<svelte:head>
	<title>
		{m.article()}
		{data.article.name} - {data.textbook.name} - {m.textbookNameShort()}
	</title>
</svelte:head>

<WideCard
	cssAddition="grow"
	r={data.textbook.red / 5 + 80}
	g={data.textbook.green / 5 + 80}
	b={data.textbook.blue / 5 + 80}
>
	<div class="flex w-full flex-row items-center gap-2">
		{#if !editingName}
			<h2>{data.article.name}</h2>
		{:else}
			<Form
				action="?/updateName"
				cssClass="flex grow flex-row gap-2 w-full"
			>
				<Button
					btn="button-blue"
					type="submit"
					emoji="pencil"
				>
					{m.editArticleName()}
				</Button>
			</Form>
		{/if}
		{#if !editingDescription && !editingName}
			<div class="grow"></div>
			{#if data.isEditor || data.isOwner}
				<Button
					btn="button-blue"
					emoji="pencil"
					onclick={() => {
						editingName = true;
					}}
				>
					{m.editArticleName()}
				</Button>
				<Button
					btn="button-blue"
					emoji="pencil-ruler"
					onclick={() => {
						editingDescription = true;
					}}
				>
					{m.editArticleContent()}
				</Button>
			{/if}
		{:else if !editingDescription}{/if}
	</div>

	{#if !editingDescription}
		<div class="flex w-full grow flex-col">
			{@html data.article.text}
		</div>
	{:else}
		<Textarea placeholder={m.enterArticleContent()} />
	{/if}
</WideCard>
