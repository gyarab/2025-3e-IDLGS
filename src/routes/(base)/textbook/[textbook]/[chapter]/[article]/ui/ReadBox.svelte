<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		darkMode,
	}: {
		children: Snippet;
		darkMode: boolean;
	} = $props();
</script>

<div
	class="flex w-1/2 flex-col rounded-lg  p-7  {darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-black'} shadow-xl"
>
	{@render children()}
</div>
