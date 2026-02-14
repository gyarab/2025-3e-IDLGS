<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';
	import Author from './components/Author.svelte';
	import Summary from './components/Summary.svelte';
	import Button from '$component/Button.svelte';
	import Textarea from '$component/Textarea.svelte';
	import Form from '$component/Form.svelte';
	import { goto } from '$app/navigation';
	import { renderMarkdown } from '$lib/markdown';
	import TextInput from '$component/TextInput.svelte';
	import SuccessBox from '$component/SuccessBox.svelte';
	import UnsavedChangesBox from '$component/UnsavedChangesBox.svelte';
	import { rerunInputCallbacks, setInputCallbacks } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import type { TextbookType, UserType, UserTypeLimited } from '$lib/types';
	import { browser } from '$app/environment';

	let {
		data,
	}: {
		data: {
			textbook: TextbookType;
			isEditor: boolean;
			isOwner: boolean;
			showEditButtons: boolean;
			user: UserType | undefined;
			searchStart: number;
			searchEnd: number;
		};
	} = $props();

	let updateInterval: number = $state(-1);

	const scrollWhereNeeded = () => {
		if (!data.searchStart || !data.searchEnd) return;

		const y = document.getElementById('searchResult')?.offsetTop ?? 0;

		window.scrollTo({
			top: y,
			behavior: 'smooth',
		});
	};

	onMount(() => {
		if (data.searchStart && data.searchEnd) {
			displayDescription =
				displayDescription.substring(0, data.searchStart) +
				`<mark id="searchResult">${displayDescription.substring(data.searchStart, data.searchEnd)}</mark>` +
				displayDescription.substring(data.searchEnd);
		}

		if (browser) {
			//we need minimal delay to ensure that the element is rendered
			//its serverside anyway
			updateInterval = window.setTimeout(scrollWhereNeeded, 10);
		}
	});
	onDestroy(() => {
		if (!browser) return;
		window.clearTimeout(updateInterval);
	});

	let displayDescription: string = $derived(data.textbook.description);
	let editingDescription: boolean = $state(false);
	let editingName: boolean = $state(false);

	let showUnsavedChanges: boolean = $state(false);
	let formSuccessMessage: string = $state('');

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
		{data.textbook.name} - {m.textbook()} - {m.textbookNameShort()}
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
				formSuccessMessage = m.textbookNameUpdatedSuccessfully();
			} else if (editingDescription) {
				formSuccessMessage = m.textbookDescriptionUpdatedSuccessfully();
			}

			editingName = false;
			editingDescription = false;
		}}
	>
		<div class="flex w-full flex-row items-center gap-2">
			{#if !editingName}
				<h1 class="flex flex-row items-center gap-1">
					<i class="ri-book-ai-line text-4xl"></i>
					{data.textbook.name}
				</h1>
			{:else}
				<TextInput
					name="name"
					cssClass="grow"
					bind:value={data.textbook.name}
					placeholder={m.enterTextbookName()}
				/>
			{/if}
			<div class="grow"></div>
			{#if !editingDescription && !editingName}
				{#if data.isEditor || data.isOwner}
					<Button
						btn="button-blue"
						emoji="pencil"
						onclick={() => {
							editingName = true;
						}}
					>
						{m.editTextbookName()}
					</Button>
					<Button
						btn="button-cyan"
						emoji="pencil-ruler"
						onclick={() => {
							editingDescription = true;
						}}
					>
						{m.editTextbookDescription()}
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

		<Author
			authors={data.textbook.authors as UserTypeLimited[]}
			createdAt={data.textbook.createdAt}
			modifedAt={data.textbook.modifiedAt}
		/>

		<Summary
			text={data.textbook.summary}
			red={data.textbook.red}
			green={data.textbook.green}
			blue={data.textbook.blue}
		/>

		{#if !editingDescription}
			<div
				class="flex w-full grow flex-col gap-2"
				id="markdownContainer"
			>
				{@html renderMarkdown(displayDescription)}
			</div>

			<div class="grid grid-cols-3 gap-2">
				<Button
					btn="button-blue"
					emoji="book-open"
					onclick={() => {
						goto(
							`/textbook/${data.textbook.uuid}/${data.textbook.chapters![0]?.uuid}`,
						);
					}}
					disabled={data.textbook.chapters!.length === 0}
				>
					{m.startReading()}
				</Button>
				<Button
					btn="button-blue"
					emoji="file-list"
					onclick={() => {
						goto(`/textbook/${data.textbook.uuid}/definitions/`);
					}}
				>
					{m.openWordDefinitions()}
				</Button>
				<Button
					btn="button-blue"
					emoji="brain"
					onclick={() => {
						goto(`/textbook/${data.textbook.uuid}/train/`);
					}}
				>
					{m.practiceWithAI()}
				</Button>
			</div>
		{:else}
			<Textarea
				name="description"
				value={data.textbook.description}
				placeholder={m.enterTextbookDescription()}
			/>
		{/if}
	</Form>
</WideCard>

<SuccessBox bind:message={formSuccessMessage} />
<UnsavedChangesBox bind:show={showUnsavedChanges} />
