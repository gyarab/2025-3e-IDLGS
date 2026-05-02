<script lang="ts">
	import type { ArticleType } from '$lib/types';
	import { darkenHex } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import HoverEmoji from '$src/routes/(base)/components/HoverEmoji.svelte';
	import { fly } from 'svelte/transition';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';

	let {
		article,
		darkMode,
		i,
		amount,
		selected,
		color,
		onclick,
		onup,
		ondown,
		onedit,
	}: {
		article: ArticleType;
		darkMode: boolean;
		i: number;
		amount: number;
		selected: boolean;
		color: string;
		onclick: () => void;
		onup: () => void;
		ondown: () => void;
		onedit: (v: string) => void;
	} = $props();

	let tempTitleValue: string = $derived(article.title);
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
			placeholder={m.articleTitle()}
			bind:value={tempTitleValue}
			css="grow"
		/>
		<Button
			label={m.confirm()}
			emoji="check"
			type="button"
			onclick={() => {
				onedit(tempTitleValue);
				editMode = false;
			}}
			text=""
		/>
		<Button
			label={m.cancel()}
			emoji="close"
			type="button"
			onclick={() => {
				tempTitleValue = article.title;
				editMode = false;
			}}
			text=""
		/>
	{:else}
		<button
			type="button"
			class="flex grow flex-row items-center gap-2"
			{onclick}
			title={m.selectArticle()}
			aria-label={m.selectArticle()}
		>
			<HoverEmoji
				emoji={selected ? 'checkbox-circle' : 'checkbox-blank-circle'}
			/>
			<h2 class="mb-0!">{article.title}</h2>
			<div class="grow"></div>
		</button>

		<Button
			label={m.editArticle()}
			emoji="edit-box"
			type="button"
			onclick={() => {
				editMode = true;
			}}
			text=""
		/>
		<Button
			label={m.moveArticleUp()}
			emoji="arrow-up-double"
			type="button"
			onclick={() => {
				onup();
			}}
			text=""
			disabled={i === 0}
		/>
		<Button
			label={m.moveArticleDown()}
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
