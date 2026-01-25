<script lang="ts">
	//TODO fix and simplify this mess of a spaghetti code

	import Modal from '$src/routes/(root)/components/Modal.svelte';
	import { m } from '$lib/paraglide/messages';
	import type {
		ArticleLimitedType,
		ChapterType,
		TextbookType,
	} from '$lib/types';
	import ItemListB from './ItemListB.svelte';
	import Button from '$src/routes/(root)/components/Button.svelte';
	import Form from '$src/routes/(root)/components/Form.svelte';
	import HiddenInput from '$src/routes/(root)/components/HiddenInput.svelte';

	let {
		showStructureModal = $bindable(false),
		textbook,
	}: {
		showStructureModal: boolean;
		textbook: TextbookType;
	} = $props();

	let selectedChapterId: number = $state(-1);
	let selectedArticleId: number = $state(-1);

	let chapters: ChapterType[] = $derived(textbook.chapters ?? []);
	let articles: ArticleLimitedType[] = $derived(
		chapters[selectedChapterId]?.articlesLimited?.map((v) => {
			return {
				uuid: v.uuid,
				name: v.name,
				text: '', //not needed here, not updated server side
			};
		}) ?? [],
	);

	let jsonArticles = $derived(
		JSON.stringify(chapters.map((v) => v.articlesLimited)),
	);
</script>

<Modal
	bind:showModal={showStructureModal}
	cssClass="standardModal"
>
	<div class="flex w-full flex-row items-end gap-2">
		<h2>{m.manageStructure()}</h2>
		<p class="opacity-70">
			{m.structureMeansChaptersAndArticles()}.
			{m.articleContentsAreEditedOnThePagesThemselves()}.
		</p>
	</div>
	{#key chapters}
		<div class="flex w-full grow flex-row justify-center gap-4">
			<ItemListB
				name={m.chapters()}
				placeholder={m.noChaptersYet()}
				bind:items={chapters}
				bind:selected={selectedChapterId}
				onAdd={(name: string) => {
					chapters.push({
						uuid: '',
						name: name,
						summary: '',
						articlesLimited: [],
					});
				}}
				onDelete={(index: number) => {
					//also delete articles associated with chapter
					chapters.splice(index, 1);
					if (selectedChapterId === index) {
						articles = [];
					}
				}}
			/>
			{#if selectedChapterId >= 0}
				<ItemListB
					name={m.articles()}
					placeholder={m.noChapterSelected()}
					bind:items={articles}
					bind:selected={selectedArticleId}
					onAdd={(name: string) => {
						chapters[selectedChapterId].articlesLimited!.push({
							uuid: '',
							name: name,
						});
						articles = chapters[selectedChapterId].articlesLimited!;
						jsonArticles = JSON.stringify(
							chapters.map((v) => v.articlesLimited),
						);
					}}
					onDelete={(index: number) => {
						chapters[selectedChapterId].articlesLimited!.splice(
							index,
							1,
						);
						articles = chapters[selectedChapterId].articlesLimited!;
						jsonArticles = JSON.stringify(
							chapters.map((v) => v.articlesLimited),
						);
					}}
				/>
			{:else}
				<div
					class=" flex w-5/11 min-w-5/11 grow flex-col items-center justify-center opacity-70"
				>
					<p>{m.noChapterSelected()}</p>
				</div>
			{/if}
		</div>
	{/key}
	<div class="flex w-full flex-row items-center gap-2">
		<div class="grow"></div>
		<Form
			action={`/textbook/${textbook.uuid}/components/desktop/sub/?/updateTextStructure`}
			cssClass="flex flex-row items-center gap-2"
		>
			<HiddenInput
				name="uuid"
				value={textbook.uuid}
			/>

			<HiddenInput
				name="chapters"
				value={JSON.stringify(chapters)}
			/>

			{#key jsonArticles}
				<HiddenInput
					name="articles"
					value={jsonArticles}
				/>
			{/key}

			<Button
				type="submit"
				btn="button-primary"
				emoji="save-3"
				onclick={() => {
					showStructureModal = false;
				}}
			>
				{m.saveChanges()}
			</Button>
		</Form>
		<Button
			btn="button-red"
			onclick={() => {
				showStructureModal = false;
			}}
			emoji="close-circle"
		>
			{m.discardChanges()}
		</Button>
	</div>
</Modal>
