<script lang="ts">
	import { darkenHex } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import type { ArticleType, ChapterType } from '$lib/types';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import ConfirmCancel from '$src/routes/(base)/components/ConfirmCancel.svelte';
	import ConfirmDeleteDialog from '$src/routes/(base)/components/ConfirmDeleteDialog.svelte';
	import Dialog from '$src/routes/(base)/components/Dialog.svelte';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import VerticalLine from '$src/routes/(base)/components/VerticalLine.svelte';
	import { fly } from 'svelte/transition';

	let {
		darkMode,
		color,
		chapters = $bindable([]),
		articles = $bindable([]),
	}: {
		darkMode: boolean;
		color: string;
		chapters: ChapterType[];
		articles: ArticleType[];
	} = $props();

	let showChapterDialog: boolean = $state(false);
	let showArticleDialog: boolean = $state(false);

	let deleteChapter: boolean = $state(false);
	let deleteArticle: boolean = $state(false);
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-row items-center gap-2"
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.textbookStructure()}</h2>
		<p>{m.textbookStructureDesciption()}</p>
	</div>

	<div class="flex w-full grow flex-row">
		<div class="flex grow flex-col gap-2">
			<h2>{m.chapters()}</h2>
			<div class="flex grow flex-col"></div>
			<div class="flex w-full flex-row gap-1">
				<Button
					text={m.addChapter()}
					style="background-color: {color};"
					css="buttonPrimary w-full"
					onclick={() => { showChapterDialog = true; }}
					emoji="add-box"
					type="button"
				/>
				<Button
					text={m.editChapter()}
					style="background-color: {darkenHex(color, 50)};"
					css="buttonPrimary w-full"
					onclick={() => {}}
					emoji="edit-box"
					type="button"
				/>
				<Button
					text={m.removeChapter()}
					style="background-color: {darkenHex(color, 80)};"
					css="buttonPrimary w-full"
					onclick={() => {}}
					emoji="delete-bin-2"
					type="button"
				/>
			</div>
		</div>
		<VerticalLine {darkMode} />
		<div class="flex grow flex-col gap-2 ps-2">
			<h2>{m.articles()}</h2>
			<div class="flex grow flex-col"></div>
			<div class="flex w-full flex-row gap-1">
				<Button
					text={m.addArticle()}
					style="background-color: {color};"
					css="buttonPrimary w-full"
					onclick={() => { showArticleDialog = true; }}
					emoji="add-circle"
					type="button"
				/>
				<Button
					text={m.editArticle()}
					style="background-color: {darkenHex(color, 50)};"
					css="buttonPrimary w-full"
					onclick={() => {}}
					emoji="edit-circle"
					type="button"
				/>
				<Button
					text={m.removeArticle()}
					style="background-color: {darkenHex(color, 80)};"
					css="buttonPrimary w-full"
					onclick={() => {}}
					emoji="close-circle"
					type="button"
				/>
			</div>
		</div>
	</div>
</div>

<Dialog
	bind:open={showChapterDialog}
	{darkMode}
>
	<div class="flex w-full grow flex-col">
		<h2>{m.addChapter()}</h2>
		<div class="flex flex-col gap-2 w-full grow">
			<TextInput 
				{darkMode}
				{color}
				type="text"
			/>
		</div>
		<ConfirmCancel 
			{darkMode}
			{color}
			bind:open={showArticleDialog}
			confirm={async () => {
				chapters.push({
					
				});
				showArticleDialog = false;
			}}
			cancel={async () => {
				showArticleDialog = false;
			}}
		/>
	</div>
</Dialog>

<Dialog
	bind:open={showArticleDialog}
	{darkMode}
>
	<div class="flex w-full grow flex-col">
		<h2>{m.addArticle()}</h2>
		<div class="flex flex-col gap-2 w-full grow">
			<TextInput 
				{darkMode}
				{color}
				type="text"
			/>
		</div>
		<ConfirmCancel 
			{darkMode}
			{color}
			bind:open={showArticleDialog}
			confirm={async () => {
				articles.push({
					
				});
				showArticleDialog = false;
			}}
			cancel={async () => {
				showArticleDialog = false;
			}}
		/>
	</div>
</Dialog>

<ConfirmDeleteDialog 
	open={deleteArticle || deleteChapter}
	{darkMode}
	{color}
	confirm={async () => {
		if(deleteArticle) {
			
		} else if(deleteChapter) {
			
		}
	}}
/>
