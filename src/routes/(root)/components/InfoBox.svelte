<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';

	let {
		children,
		cssClass = '',
		timer = $bindable(5000),
		onEnd = () => {},
	}: {
		children?: Snippet | undefined;
		cssClass?: string;
		timer: number;
		onEnd?: () => void;
	} = $props();

	let interval: NodeJS.Timeout | undefined = $state(undefined);
	let calledEnd: boolean = $derived(timer === 0);

	onMount(() => {
		interval = setInterval(() => {
			timer -= 10;
			if (timer < 0) {
				timer = 0;
			}
			if (calledEnd) {
				onEnd();
				calledEnd = false;
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
	pointer-events-none fixed! top-[6svh] left-0 z-10 flex h-[6svh] w-screen flex-col items-center justify-center
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
					class="{cssClass} absolute top-1/2 left-1/2 z-50! flex w-2/6 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded text-lg text-white shadow-2xl **:z-50!"
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
