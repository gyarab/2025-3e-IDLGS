<script lang="ts">
	import { fly } from 'svelte/transition';
	import HoverEmoji from './HoverEmoji.svelte';

	let {
		emoji,
		text,
		disabled = false,
		label = text,
		id = '',
		css,
		style,
		hecss,
		txtcss,
		onclick,
		darkMode: darkMode,
	}: {
		emoji: string;
		text?: string;
		disabled?: boolean;
		label?: string;
		id?: string;
		css?: string;
		style?: string;
		hecss?: string;
		txtcss?: string;
		onclick: (event: Event) => void;
		darkMode: boolean;
	} = $props();
</script>

<button
	type="button"
	{id}
	{disabled}
	aria-label={label}
	title={label}
	class="group flex flex-row items-center justify-center gap-1 {darkMode
		? 'text-white'
		: 'text-black'} {css}"
	{onclick}
	{style}
>
	<HoverEmoji
		{emoji}
		css="text-2xl {hecss}"
	/>
	<span class={text?.length == 0 ? 'hidden' : txtcss}>
		{text}
	</span>
</button>
