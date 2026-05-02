<script lang="ts">
	import type { ArticleType } from '$lib/types';
	import { darkenHex } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import HoverEmoji from '$src/routes/(base)/components/HoverEmoji.svelte';
	import { fly } from 'svelte/transition';

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
	} = $props();
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
	<button
		type="button"
		class="flex grow flex-row items-center gap-2"
		{onclick}
	>
		<HoverEmoji
			emoji={selected ? 'checkbox-circle' : 'checkbox-blank-circle'}
		/>
		<h2 class="mb-0!">{article.title}</h2>
		<div class="grow"></div>
	</button>
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
</div>
