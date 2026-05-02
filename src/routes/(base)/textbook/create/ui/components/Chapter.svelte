<script lang="ts">
	import { darkenHex } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import type { ChapterTypeRaw } from '$lib/types';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import HoverEmoji from '$src/routes/(base)/components/HoverEmoji.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { fly } from 'svelte/transition';

	let {
		chapter,
		darkMode,
		selected,
		i,
		amount,
		color,
		onclick,
		ondown,
		onup,
		onedit,
	}: {
		chapter: ChapterTypeRaw;
		darkMode: boolean;
		selected?: boolean;
		i: number;
		amount: number;
		color: string;
		onclick: () => void;
		ondown: () => void;
		onup: () => void;
		onedit: (v: string) => void;
	} = $props();

	let tempTitleValue: string = $derived(chapter.title);
	let editMode: boolean = $state(false);
</script>

<div
	class="group flex w-full flex-row items-center gap-2 rounded-lg p-2 {darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-200 text-black'}"
	style={selected
		? `background-color: ${darkMode ? darkenHex(color, 80) : darkenHex(color, 0)} !important;`
		: ''}
	in:fly|global={{
		x: 100,
		y: 0,
		duration: 300,
		delay: 100 + i * 200,
		opacity: 0,
	}}
>
	{#if editMode}
		<TextInput
			{darkMode}
			{color}
			type="text"
			placeholder={m.chapterTitle()}
			bind:value={tempTitleValue}
			css="grow"
		/>
		<Button
			label={m.confirm()}
			emoji="save-2"
			type="button"
			onclick={() => {
				editMode = false;
				onedit(tempTitleValue);
			}}
			text=""
		/>
		<Button
			label={m.cancel()}
			emoji="close"
			type="button"
			onclick={() => {
				tempTitleValue = chapter.title;
				editMode = false;
			}}
			text=""
		/>
	{:else}
		<button
			type="button"
			class="mt-1 mb-1 flex grow flex-row items-center gap-2"
			{onclick}
			title={m.selectChapter()}
			aria-label={m.selectChapter()}
		>
			<HoverEmoji emoji={selected ? 'checkbox' : 'checkbox-blank'} />
			<h2 class="mb-0!">{chapter.title}</h2>
			<div class="grow"></div>
		</button>
		<Button
			label={m.editChapter()}
			emoji="edit-box"
			type="button"
			onclick={() => {
				editMode = true;
			}}
			text=""
		/>
		<Button
			label={m.moveChapterUp()}
			emoji="arrow-up-double"
			type="button"
			onclick={() => {
				onup();
			}}
			text=""
			disabled={i === 0}
		/>
		<Button
			label={m.moveChapterDown()}
			emoji="arrow-down-double"
			type="button"
			onclick={() => {
				ondown();
			}}
			text=""
			disabled={i === amount - 1}
		/>
	{/if}
</div>
