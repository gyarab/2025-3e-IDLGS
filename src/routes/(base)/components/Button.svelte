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
		rmwhite,
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
		rmwhite?: boolean;
	} = $props();
</script>

<button
	{type}
	{id}
	{disabled}
	aria-label={label}
	title={label}
	class="group flex flex-row items-center justify-center gap-1 {rmwhite ? '' : 'text-white!'} {css}"
	{onclick}
	{style}
>
	<HoverEmoji
		{emoji}
		css="text-2xl {rmwhite ? '' : 'text-white!'} {hecss}"
	/>
	{text}
</button>
