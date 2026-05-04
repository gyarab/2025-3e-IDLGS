<script lang="ts">
	import type { TextbookType, ChapterType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import Button from '../../components/Button.svelte';
	import ChapterCard from './ui/ChapterCard.svelte';

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
</script>

<svelte:head>
	<title>{data.textbook.title} | {m.idlgs()}</title>
</svelte:head>

<div
	class="flex min-h-[33svh] w-1/2 flex-col gap-4 rounded-2xl p-4 mt-20 shadow-xl {data.darkMode
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
		list, open resource list, OPEN EXERCISES
	</div>

	<a href="/textbook/{data.textbook.uuid}/exercises">Exercises</a>

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
