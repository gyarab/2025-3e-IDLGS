<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	let {
		children,
		cssClass = '',
	}: {
		children?: Snippet | undefined;
		cssClass?: string;
	} = $props();
</script>

{#key children}
	<div
		class="
	fixed top-[6svh] z-0 flex h-[6svh] w-full flex-row items-center justify-center
"
		transition:fly|global={{
			duration: 500,
			delay: 100,
			opacity: 0,
			x: 0,
			y: -100,
		}}
	>
		{#if children}
			<div
				class="{cssClass} z-50 flex w-2/6 flex-col overflow-hidden rounded-lg text-lg text-white shadow-2xl"
			>
				{@render children?.()}
			</div>
		{/if}
	</div>
{/key}
