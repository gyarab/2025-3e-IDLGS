<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
	}: {
		children: Snippet;
	} = $props();
</script>

<div class="flex w-full grow flex-col items-center p-2 overflow-x-hidden overflow-y-scroll">
	<div class="flex max-2xl:w-full 2xl:w-3/4 grow flex-col">
		{@render children()}
	</div>
</div>
