<script lang="ts">
	import type { Snippet } from 'svelte';
	import LoadingAnimation from './LoadingAnimation.svelte';

	let {
		color,
		children,
	}: {
		color: string;
		children?: Snippet;
	} = $props();
</script>

<div class="flex w-full grow flex-col items-center justify-center gap-2">
	<LoadingAnimation {color} />
	{@render children?.()}
</div>
