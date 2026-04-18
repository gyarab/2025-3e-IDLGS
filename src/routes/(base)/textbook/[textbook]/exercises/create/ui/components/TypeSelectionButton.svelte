<script lang="ts">
	import HoverEmoji from '$src/routes/(base)/components/HoverEmoji.svelte';
	import { fade } from 'svelte/transition';

	let {
		text,
		emoji,
		i,
		darkMode,
		color,
		onclick,
	}: {
		text: string;
		emoji: string;
		i: number;
		darkMode: boolean;
		color: string;
		onclick: () => void;
	} = $props();
</script>

<button
	class="group buttonLarge flex w-full flex-col items-center justify-center gap-2 rounded-lg shadow-lg {darkMode
		? ' bg-neutral-800'
		: ' bg-neutral-200'}"
	in:fade|global={{ duration: 300, delay: 400 + 200 * i }}
	{onclick}
	aria-label={text}
	title={text}
>
	<HoverEmoji
		{emoji}
		css="text-7xl"
		style="color: {color}"
	/>
	<h2 class="font-wix text-2xl font-bold">{text}</h2>
</button>
