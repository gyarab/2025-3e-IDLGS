<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';

	let {
		children,
		cssClass = '',
		timer = $bindable(5000),
	}: {
		children?: Snippet | undefined;
		cssClass?: string;
		timer: number;
	} = $props();

	let interval: NodeJS.Timeout | undefined = $state(undefined);

	onMount(() => {
		interval = setInterval(() => {
			timer -= 10;
			if (timer < 0) {
				timer = 0;
			}
		}, 10);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

{#key children}
	{#if timer > 0}
		<div
			class="
	fixed top-[6svh] z-50 flex h-[6svh] w-full flex-row items-center justify-center
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
					<div
						class="h-1 bg-white"
						style="width: {timer / 50}%"
					></div>
				</div>
			{/if}
		</div>
	{/if}
{/key}
