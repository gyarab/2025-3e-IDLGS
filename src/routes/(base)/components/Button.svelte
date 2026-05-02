<script lang="ts">
	import { fly } from 'svelte/transition';
	import HoverEmoji from './HoverEmoji.svelte';

	let {
		emoji,
		text,
		disabled = false,
		type = 'button',
		label = text,
		id = '',
		css,
		hecss,
		style,
		onclick,
	}: {
		emoji: string;
		text: string;
		disabled?: boolean;
		label?: string;
		type: 'button' | 'submit' | 'reset';
		id?: string;
		css?: string;
		style?: string;
		hecss?: string;
		onclick: (event: Event) => void;
	} = $props();
</script>

<button
	{type}
	{id}
	{disabled}
	aria-label={label}
	title={label}
	class="{css} group flex flex-row items-center justify-center gap-1 text-white!"
	{onclick}
	{style}
>
	<HoverEmoji
		{emoji}
		css="text-2xl text-white! {hecss}"
	/>
	{text}
</button>
