<script lang="ts">
	import type { Snippet } from 'svelte';
	import HoverEmoji from './HoverEmoji.svelte';

	let {
		emoji,
		children,
		type = 'button',
		btn,
		onclick = () => {},
		flip = false,
	}: {
		emoji: string;
		children: Snippet;
		type?: 'button' | 'submit' | 'reset';
		btn: string;
		onclick?: (e: MouseEvent) => void;
		flip: boolean;
	} = $props();
</script>

<button
	class="{btn} group"
	{type}
	{onclick}
>
	{#if !flip}
		<HoverEmoji {emoji} />
	{/if}
	{@render children?.()}
	{#if flip}
		<HoverEmoji {emoji} />
	{/if}
</button>
