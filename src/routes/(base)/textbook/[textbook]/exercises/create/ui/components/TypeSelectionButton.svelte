<script lang="ts">
	import HoverEmoji from "$src/routes/(base)/components/HoverEmoji.svelte";
	import { fade } from "svelte/transition";

	let {
		text,
		emoji,
		i,
		darkMode,
		color,
		onclick,
	}: {
		text: string,
		emoji: string,
		i: number,
		darkMode: boolean,
		color: string,
		onclick: () => void,
	} = $props();
</script>

<button
	class="group rounded-lg shadow-lg buttonLarge flex flex-col w-full justify-center items-center gap-2 {darkMode ? " bg-neutral-800" : " bg-neutral-200"}"
	in:fade|global={{duration: 300, delay: 400+200*i }}
	onclick={onclick}
	aria-label={text}
	title={text}
>
	<HoverEmoji {emoji} css="text-7xl" style="color: {color}" />
	<h2 class="font-bold font-wix text-2xl">{text}</h2>
</button>