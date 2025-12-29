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
		disabled = false,
	}: {
		emoji: string;
		children: Snippet;
		type?: 'button' | 'submit' | 'reset';
		btn: string;
		onclick?: (e: MouseEvent) => void;
		flip?: boolean;
		disabled?: boolean;
	} = $props();
</script>

<button
	class="{btn} group"
	disabled={disabled}
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
