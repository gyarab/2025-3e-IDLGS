<script lang="ts">
	import { fly, fade } from "svelte/transition";
	import HoverEmoji from "../../../components/HoverEmoji.svelte";

	let {
		onclick,
		emoji,
		description,
		extended = $bindable(false),
		textSize = "text-5xl",
		gapSize="-ms-2 text-xl font-bold!",
		type = "button",
		formname = "",
		formvalue = "",
	}: {
		onclick: () => void,
		emoji: string,
		description: string,
		extended: boolean,
		textSize?: string
		gapSize?: string,
		type?: "button" | "submit" | "reset",
		formname?: string,
		formvalue?: string,
	} = $props();
</script>

<button 
	class="text-white! {textSize} w-full! group z-20! flex flex-row justify-center items-center gap-4 ps-1 pe-1"
	onclick={() => {
		onclick();
	}}
	type={type}
	name={formname}
	value={formvalue}
>
	<HoverEmoji {emoji} />
	{#if extended}
		<span 
			in:fly|global={{ x: -20, duration: 100, opacity: 0, delay: 200 }}
			out:fade|global={{ duration: 100, delay: 0 }}
			class="group-hover:scale-110 text-base text-nowrap {gapSize} flex flex-row w-full items-center justify-center transition-all duration-100"
		>
			{description}
		</span>
		<div class="grow"></div>
	{/if}
</button>
