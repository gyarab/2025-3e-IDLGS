<script lang="ts">
	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages';
	import type { TextbookType, UserType } from '$lib/types';
	import Button from '$component/Button.svelte';
	import CheckboxInput from '$component/CheckboxInput.svelte';
	import Form from '$component/Form.svelte';
	import Modal from '$component/Modal.svelte';
	import WideCard from '$component/WideCard.svelte';
	import { onDestroy, onMount } from 'svelte';
	import Chapter from './sidebar/Chapter.svelte';
	import { browser } from '$app/environment';
	import TextInput from '$component/TextInput.svelte';

	let {
		id,
		textbook,
		canEdit,
		showEditButtons,
		user,
	}: {
		id: string;
		textbook: TextbookType;
		canEdit: boolean;
		showEditButtons: boolean;
		user: UserType | undefined;
	} = $props();

	let showEditButtonsLocal: boolean = $derived(showEditButtons);
	let addChapterModal: boolean = $state(false);

	//effect doesnt support async functions so....
	let oldShowEditButtons: boolean = $derived(showEditButtons);
	let showEditButtonsInterval: NodeJS.Timeout | undefined = $state(undefined);

	onMount(async () => {
		if(!browser) return;

		showEditButtonsInterval = setInterval(async () => {
			if (oldShowEditButtons !== showEditButtonsLocal) {
				oldShowEditButtons = showEditButtonsLocal;
				await cookieStore.set('editButtons', String(showEditButtonsLocal));
			}
		}, 500);
	});
	onDestroy(async () => {
		if(!browser) return;

		clearInterval(showEditButtonsInterval);
	});
</script>

<div class="sticky top-[6vh] left-0 h-[94svh] min-w-1/5 overflow-clip p-2">
	<WideCard
		cssAddition="grow"
		r={textbook.red}
		g={textbook.green}
		b={textbook.blue}
	>
		<h2>
			{m.textbookContents()}
		</h2>

		<div class="flex w-full grow flex-col gap-0">
			<!-- home page -->
			<Button
				btn="button-none w-full"
				emoji="home"
				onclick={() => {
					goto(`/textbook/${id}/`);
				}}
			>
				<div class="flex w-full flex-row gap-1">
					{m.textbookHome()}
				</div>
			</Button>

			<!-- definitions -->
			<Button
				btn="button-none w-full"
				emoji="todo"
				onclick={() => {
					goto(`/textbook/${id}/definitions/`);
				}}
			>
				<div class="flex w-full flex-row gap-1">
					{m.definitionsOfTerms()}
				</div>
			</Button>

			{#if canEdit}
				<!-- image library -->
				<Button
					btn="button-none w-full"
					emoji="folder-image"
					onclick={() => {
						goto(`/textbook/${id}/images/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.imageLibrary()}
					</div>
				</Button>

				<!-- analytics -->
				<Button
					btn="button-none w-full"
					emoji="pie-chart"
					onclick={() => {
						goto(`/textbook/${id}/statistics/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.textbookStatistics()}
					</div>
				</Button>
			{/if}

			{#each textbook.chapters as chapter, i (chapter.uuid)}
				<Chapter
					{chapter}
					textbookUuid={id}
					{canEdit}
					showEditButtons={showEditButtonsLocal}
				/>
			{:else}
				<div
					class="flex flex-col grow w-full items-center justify-center gap-0"
				>
					<p class="text-center font-medium opacity-70">
						{m.thisTextbookIsEmptySoFar()}.
					</p>
				</div>
			{/each}

			{#if canEdit && showEditButtonsLocal}
				<Button
					btn="button-none w-full *:font-medium"
					emoji="add-circle"
					onclick={() => (addChapterModal = true)}
				>
					<div class="flex w-full flex-row gap-1">
						{m.addAChapter()}
					</div>
				</Button>
			{/if}

			{#if textbook.chapters?.length !== 0}
				<div class="grow"></div>
			{/if}
		</div>

		{#if canEdit || user}
			<div class="flex w-full flex-row items-center gap-2">
				<CheckboxInput
					bind:checked={showEditButtonsLocal}
					label={m.showEditOptions()}
					flip={true}
					noChangeEvents={true}
				/>
			</div>
		{/if}

		<Button
			btn="button-primary"
			emoji="brain"
			onclick={() => {
				goto(`/textbook/${id}/train/`);
			}}
		>
			{m.practiceWithAI()}
		</Button>

		{#if canEdit}
			<Button
				btn="button-violet"
				emoji="settings"
				onclick={() => {
					window.location.href = `/textbook/${id}/settings/`;
				}}
			>
				{m.settings()}
			</Button>
		{/if}
	</WideCard>
</div>

<Modal
	bind:showModal={addChapterModal}
	cssClass="standardModal"
	maxHeight={false}
	maxWidth={false}
>
	<h2>{m.addAChapter()}</h2>
	<div class="grow flex flex-col justify-center items-center w-full">
		<TextInput
			name="name"
			label={m.chapterName()}
			placeholder={m.enterChapterName()}
		/>
	</div>
	<Form
		cssClass="grid grid-cols-2 gap-2 w-full"
		action="//textbook/{id}/?/addChapter"
	>
		<Button
			type="submit"
			btn="button-primary"
			emoji="add-circle"
		>
			{m.addAChapter()}
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
