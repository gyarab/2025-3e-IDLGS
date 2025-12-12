<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		emoji,
		children,
		type = "button",
		btn,
		onclick = () => {},
	}: {
		emoji: string;
		children: Snippet,
		type?: "button" | "submit" | "reset",
		btn: string,
		onclick?: (e: MouseEvent) => void,
	} = $props();
</script>

<button class="{btn} group" type={type} onclick={onclick}>
	<i class="ri-{emoji}-line not-group-hover:hidden"></i>
	<i class="ri-{emoji}-fill group-hover:hidden"></i>
	{@render children?.()}
</button>
