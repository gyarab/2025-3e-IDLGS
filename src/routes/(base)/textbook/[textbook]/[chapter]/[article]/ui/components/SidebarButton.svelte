<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import HoverEmoji from '$src/routes/(base)/components/HoverEmoji.svelte';

	let {
		onclick,
		emoji,
		description,
		extended = $bindable(false),
		textSize = 'text-4xl',
		gapSize = '-ms-2 text-xl font-bold!',
		type = 'button',
		formname = '',
		formvalue = '',
	}: {
		onclick: () => void;
		emoji: string;
		description: string;
		extended: boolean;
		textSize?: string;
		gapSize?: string;
		type?: 'button' | 'submit' | 'reset';
		formname?: string;
		formvalue?: string;
	} = $props();
</script>

<button
	class="text-white! {textSize} group z-20! flex w-full! flex-row items-center justify-center gap-4 px-4"
	onclick={() => {
		onclick();
	}}
	{type}
	name={formname}
	value={formvalue}
>
	<HoverEmoji {emoji} />
	{#if extended}
		<span
			in:fly|global={{ x: -20, duration: 100, opacity: 0, delay: 200 }}
			out:fade|global={{ duration: 100, delay: 0 }}
			class="text-base text-nowrap group-hover:scale-110 {gapSize} flex w-full flex-row items-center justify-start transition-all duration-100"
		>
			{description}
		</span>
		<div class="grow"></div>
	{/if}
</button>
