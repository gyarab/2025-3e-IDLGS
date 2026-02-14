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
	import TextInput from '$src/routes/(root)/components/TextInput.svelte';
	import { rerunInputCallbacks, setInputCallbacks } from '$lib';
	import SuccessBox from '$component/SuccessBox.svelte';
	import UnsavedChangesBox from '$component/UnsavedChangesBox.svelte';

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

	let displayText: string = $derived(data.article.textRaw!);
	let editingName: boolean = $state(false);
	let editingDescription: boolean = $state(false);

	let showUnsavedChanges: boolean = $state(false);
	let formSuccessMessage: string = $state('');

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

	const inputElementChangeCallback = () => (showUnsavedChanges = true);
	const formSubmitChangeCallback = () => (showUnsavedChanges = false);

	setInputCallbacks(inputElementChangeCallback, formSubmitChangeCallback);

	$effect(() => {
		if (editingDescription || editingName) {
			rerunInputCallbacks(
				inputElementChangeCallback,
				formSubmitChangeCallback,
			);
		}
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
	<Form
		action="?/update"
		cssClass="flex grow flex-col gap-2 w-full"
		success={async () => {
			if (editingName) {
				formSuccessMessage = m.articleNameUpdatedSuccessfully();
			} else if (editingDescription) {
				formSuccessMessage = m.articleContentUpdatedSuccessfully();
			}

			editingName = false;
			editingDescription = false;
		}}
	>
		<div class="flex w-full flex-row items-center gap-2">
			{#if !editingName}
				<h2>{data.article.name}</h2>
			{:else}
				<TextInput
					name="name"
					cssClass="grow"
					bind:value={data.article.name}
					placeholder={m.enterArticleName()}
				/>
			{/if}
			<div class="grow"></div>
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
						btn="button-cyan"
						emoji="pencil-ruler"
						onclick={() => {
							editingDescription = true;
						}}
					>
						{m.editArticleContent()}
					</Button>
				{/if}
			{:else}
				<div class="flex flex-row gap-2">
					<Button
						type="submit"
						btn="button-blue"
						emoji="save-3"
					>
						{m.saveChanges()}
					</Button>
					<Button
						onclick={() => {
							editingName = false;
							editingDescription = false;
						}}
						emoji="delete-bin"
						btn="button-red"
					>
						{m.discardChanges()}
					</Button>
				</div>
			{/if}
		</div>

		{#if !editingDescription}
			<div class="flex w-full grow flex-col">
				{@html data.article.text}
			</div>
		{:else}
			<Textarea
				placeholder={m.enterArticleContent()}
				value={displayText}
				name="content"
			/>
		{/if}
	</Form>
</WideCard>

<SuccessBox bind:message={formSuccessMessage} />
<UnsavedChangesBox bind:show={showUnsavedChanges} />
