<script lang="ts">
	import type { TextbookType, ChapterTypeRaw } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import Button from '../../components/Button.svelte';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
			textbook: TextbookType;
			chapters: ChapterTypeRaw[];
		};
	} = $props();
</script>

<svelte:head>
	<title>{data.textbook.title} | {m.idlgs()}</title>
</svelte:head>

<div
	class="flex min-h-[33svh] w-1/2 flex-col gap-4 rounded-2xl p-4 shadow-xl {data.darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-200 text-gray-800'}"
>
	<div class="flex w-full flex-row items-center gap-2">
		<h1>{data.textbook.title}</h1>
		<div class="grow"></div>
		<Button
			text={m.textbookSettings()}
			emoji="pencil"
			type="button"
			css="buttonPrimary"
			style="background-color: {data.color};"
			onclick={() => {}}
		/>
	</div>
	<p>
		{data.textbook.description}
	</p>

	<div>
		QUICK ACTIONS: open definitions, open textbook settings, open authors
		list, open resource list
	</div>

	{#each data.chapters as chapter}
		<div>{JSON.stringify(chapter)}</div>
	{/each}
</div>
