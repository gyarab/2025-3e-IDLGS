<script lang="ts">
	import type { TextbookType, ChapterType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import Button from '../../components/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ChapterCard from './ui/ChapterCard.svelte';
	import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog.svelte';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
			textbook: TextbookType;
			chapters: ChapterType[];
		};
	} = $props();

	let deleteForm: HTMLFormElement | null = null;
	let showDeleteDialog = $state(false);
</script>

<svelte:head>
	<title>{data.textbook.title} | {m.idlgs()}</title>
</svelte:head>

<div
	class="mt-20 flex min-h-[33svh] w-full flex-col gap-2 rounded-2xl p-4 shadow-xl sm:w-2/3 {data.darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-200 text-gray-800'}"
>
	<div class="flex w-full flex-row items-center gap-2">
		<h1>{data.textbook.title}</h1>
		<div class="grow"></div>
		<form
			method="POST"
			action="?/deleteTextbook"
			bind:this={deleteForm}
			class="flex gap-2"
		>
			<input
				type="hidden"
				name="uuid"
				value={data.textbook.uuid}
			/>
			<Button
				text=""
				emoji="pencil"
				type="button"
				css="buttonPrimary bg-neutral-600/30"
				onclick={() => {
					goto(
						resolve('/(base)/textbook/create') +
							`?uuid=${data.textbook.uuid}`,
					);
				}}
			/>

			<Button
				text=""
				emoji="delete-bin-7"
				type="button"
				css="buttonPrimary bg-red-600/40"
				onclick={() => {
					showDeleteDialog = true;
				}}
			/>
		</form>
	</div>
	<p class="my-2 opacity-80">
		{data.textbook.description}
	</p>

	<!-- <div>
		QUICK ACTIONS: open definitions, open textbook settings, open authors
		list, open resource list, OPEN EXERCISES
	</div> -->

	<div class="flex flex-row">
		<a
			href="/textbook/{data.textbook.uuid}/exercises"
			class="flex h-8 w-1 items-center font-bold"
		>
			{m.exercises()}
			<i class="ri-arrow-right-s-line"></i>
		</a>

		<a
			href="/textbook/{data.textbook.uuid}/resources"
			class="flex h-8 items-center font-bold"
		>
			{m.resources()}
			<i class="ri-arrow-right-s-line"></i>
		</a>
	</div>

	<div class="my-2 font-bold">
		{m.chapters()}
	</div>

	<div class="grid w-full grow grid-cols-2 gap-2">
		{#each data.chapters as chapter, i (i)}
			<ChapterCard
				{chapter}
				textbook={data.textbook}
				textbookColor={data.color}
			/>
		{/each}
	</div>
</div>

<ConfirmDeleteDialog
	bind:open={showDeleteDialog}
	title="{m.deleteTextbook()}?"
	darkMode={data.darkMode}
	color={data.color}
	confirm={async () => {
		deleteForm?.requestSubmit();
	}}
	cancel={async () => {}}
/>
