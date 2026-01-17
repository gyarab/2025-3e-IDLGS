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
		id = '',
		draggable = false,
		onmousedown = () => {},
	}: {
		emoji?: string;
		children?: Snippet;
		type?: 'button' | 'submit' | 'reset';
		btn: string;
		onclick?: (e: MouseEvent) => void;
		flip?: boolean;
		disabled?: boolean;
		cssClass?: string;
		id?: string;
		draggable?: boolean;
		onmousedown?: (e: MouseEvent) => void;
	} = $props();
</script>

<button
	class="{btn} group {cssClass}"
	{disabled}
	{type}
	{onclick}
	{onmousedown}
	{id}
	{draggable}
>
	{#if !flip && emoji.length > 0}
		<HoverEmoji
			{emoji}
			{disabled}
		/>
	{/if}
	{@render children?.()}
	{#if flip && emoji.length > 0}
		<HoverEmoji
			{emoji}
			{disabled}
		/>
	{/if}
</button>
