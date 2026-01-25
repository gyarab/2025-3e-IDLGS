<script lang="ts">
	import type { TextbookType } from '$lib/types';
	import type { UserTypeLimited } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';
	import Author from './components/Author.svelte';
	import Summary from './components/Summary.svelte';
	import Button from '$component/Button.svelte';
	import Textarea from '$src/routes/(root)/components/Textarea.svelte';
	import Form from '$src/routes/(root)/components/Form.svelte';
	import HiddenInput from '$src/routes/(root)/components/HiddenInput.svelte';
	import { goto } from '$app/navigation';
	import { renderMarkdown } from '$lib/markdown';
	import TextInput from '$src/routes/(root)/components/TextInput.svelte';
	import SuccessBox from '$src/routes/(root)/components/SuccessBox.svelte';
	import UnsavedChangesBox from '$src/routes/(root)/components/UnsavedChangesBox.svelte';
	import { rerunInputCallbacks, setInputCallbacks } from '$lib';

	let {
		data,
	}: {
		data: {
			textbook: TextbookType;
			isEditor: boolean;
			isOwner: boolean;
		};
	} = $props();

	let editingDescription: boolean = $state(false);
	let descriptionValue: string = $derived(data.textbook.description);
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

<WideCard
	cssAddition="grow"
	r={data.textbook.red}
	g={data.textbook.green}
	b={data.textbook.blue}
>
	<div class="flex w-full flex-row items-center gap-2">
		{#if !editingName}
			<h1>{data.textbook.name}</h1>
		{:else}
			<Form
				action="?/updateName"
				cssClass="flex grow flex-row gap-2 w-full"
				success={async () => {
					editingName = false;
					formSuccessMessage = m.textbookNameUpdatedSuccessfully();
				}}
			>
				<HiddenInput
					name="uuid"
					value={data.textbook.uuid}
				/>
				<TextInput
					name="name"
					cssClass="grow"
					bind:value={data.textbook.name}
					placeholder={m.enterTextbookName()}
				/>
				<Button
					type="submit"
					btn="button-primary text-nowrap"
					emoji="save-3"
				>
					{m.saveChanges()}
				</Button>
			</Form>
		{/if}
		{#if !editingDescription && !editingName}
			<div class="grow"></div>
			{#if data.isEditor || data.isOwner}
				<Button
					btn="button-primary"
					emoji="pencil"
					onclick={() => {
						editingName = true;
					}}
				>
					{m.editTextbookName()}
				</Button>
				<Button
					btn="button-primary"
					emoji="pencil-ruler"
					onclick={() => {
						editingDescription = true;
					}}
				>
					{m.editTextbookDescription()}
				</Button>
			{/if}
		{:else if editingDescription}
			<Form
				action="?/updateDescription"
				success={async () => {
					editingDescription = false;
					formSuccessMessage =
						m.textbookDescriptionUpdatedSuccessfully();
				}}
			>
				<HiddenInput
					name="uuid"
					value={data.textbook.uuid}
				/>
				<HiddenInput
					name="description"
					value={descriptionValue}
				/>

				<div class="flex w-full flex-row gap-2">
					<div class="grow"></div>
					<Button
						type="submit"
						btn="button-primary"
						emoji="save-3"
					>
						{m.saveChanges()}
					</Button>
					<Button
						onclick={() => {
							editingDescription = false;
						}}
						emoji="delete-bin"
						btn="button-red"
					>
						{m.discardChanges()}
					</Button>
				</div>
			</Form>
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
		<div class="flex w-full grow flex-col gap-2">
			{@html renderMarkdown(data.textbook.description)}
		</div>

		<div
			class="grid {data.isEditor || data.isOwner
				? 'grid-cols-3'
				: 'grid-cols-2'} gap-2"
		>
			<Button
				btn="button-primary"
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
				btn="button-primary"
				emoji="file-list"
				onclick={() => {
					goto(`/textbook/${data.textbook.uuid}/definitions/`);
				}}
			>
				{m.openWordDefinitions()}
			</Button>
			<Button
				btn="button-primary"
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
			bind:value={descriptionValue}
			placeholder={m.enterTextbookDescription()}
		/>
	{/if}
</WideCard>

<SuccessBox bind:message={formSuccessMessage} />
<UnsavedChangesBox bind:show={showUnsavedChanges} />
