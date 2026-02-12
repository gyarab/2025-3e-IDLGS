<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
	}: {
		children: Snippet;
	} = $props();
</script>

<div
	class="flex w-full grow flex-col items-center overflow-x-hidden overflow-y-scroll pt-2"
>
	<div class="flex grow flex-col pb-5 max-2xl:w-full 2xl:w-3/4">
		{@render children()}
	</div>
</div>
