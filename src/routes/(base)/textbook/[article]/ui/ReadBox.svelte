<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		children
	}: {
		children: Snippet
	} = $props();
</script>

<div class="flex flex-col w-1/2 shadow-xl rounded-lg bg-neutral-100! p-7">
	{@render children()}
</div>