<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
	}: {
		children: Snippet;
	} = $props();
</script>

<div
	class="mt-4 flex w-1/2 flex-col rounded-lg bg-neutral-100! p-7 text-black! shadow-xl"
>
	{@render children()}
</div>
