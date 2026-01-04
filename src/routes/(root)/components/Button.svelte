<script lang="ts">
	import type { Snippet } from 'svelte';
	import HoverEmoji from './HoverEmoji.svelte';

	let {
		emoji = '',
		children,
		type = 'button',
		btn,
		onclick = () => {},
		flip = false,
		disabled = false,
		cssClass = '',
	}: {
		emoji?: string;
		children: Snippet;
		type?: 'button' | 'submit' | 'reset';
		btn: string;
		onclick?: (e: MouseEvent) => void;
		flip?: boolean;
		disabled?: boolean;
		cssClass?: string;
	} = $props();
</script>

<button
	class="{btn} group {cssClass}"
	{disabled}
	{type}
	{onclick}
>
	{#if !flip && emoji.length > 0}
		<HoverEmoji
			{emoji}
			{disabled}
		/>
	{/if}
	{@render children?.()}
</button>
