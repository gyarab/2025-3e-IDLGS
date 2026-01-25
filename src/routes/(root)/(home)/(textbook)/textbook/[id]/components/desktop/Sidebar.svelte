<script lang="ts">
	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages';
	import type { TextbookType } from '$lib/types';
	import Button from '$src/routes/(root)/components/Button.svelte';
	import WideCard from '$src/routes/(root)/components/WideCard.svelte';
	import Chapter from './sidebar/Chapter.svelte';
	import StructureModal from './sub/StructureModal.svelte';

	let {
		id,
		textbook,
		canEdit,
	}: {
		id: string;
		textbook: TextbookType;
		canEdit: boolean;
	} = $props();

	let showStructureModal: boolean = $state(false);
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

		<div class="flex w-full grow flex-col gap-1">
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

			{#each textbook.chapters as chapter, i (chapter.uuid)}
				<Chapter
					{chapter}
					textbookUuid={id}
				/>
			{:else}
				<div
					class="flex flex-col grow w-full items-center justify-center gap-0"
				>
					<p class="text-center font-medium">
						{m.thisTextbookIsEmptySoFar()}.
					</p>
					<p class="opacity-70 text-sm text-center">
						{m.useTheManageStructureButtonToAddChaptersAndArticles()}
					</p>
				</div>
			{/each}

			<div class="grow"></div>

			{#if canEdit}
				<Button
					btn="button-green w-full"
					emoji="add-circle"
					onclick={() => {
						showStructureModal = true;
					}}
				>
					{m.manageStructure()}
				</Button>
			{/if}
		</div>

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

<StructureModal
	bind:showStructureModal
	{textbook}
/>
