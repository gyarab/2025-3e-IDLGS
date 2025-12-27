<script lang="ts">
	import type { Snippet } from 'svelte';
	import HoverEmoji from './HoverEmoji.svelte';

	let {
		emoji,
		children,
		type = 'button',
		btn,
		onclick = () => {},
	}: {
		emoji: string;
		children: Snippet;
		type?: 'button' | 'submit' | 'reset';
		btn: string;
		onclick?: (e: MouseEvent) => void;
	} = $props();
</script>

<button
	class="{btn} group"
	{type}
	{onclick}
>
	<HoverEmoji {emoji} />
	{@render children?.()}
</button>
