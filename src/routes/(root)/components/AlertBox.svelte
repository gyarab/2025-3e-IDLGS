<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let { message = $bindable('') } = $props();

	let interval: NodeJS.Timeout | undefined = $state(undefined);
	let timer: number = $derived(message.length == 0 ? 0 : 5000);

	onMount(() => {
		interval = setInterval(() => {
			timer -= 10;
			if (timer < 0) {
				timer = 0;
				message = '';
			}
		}, 10);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

{#key message}
	<div
		class="
	fixed top-[6svh] z-0 flex h-[6svh] w-full flex-row items-center justify-center
"
		transition:fly={{
			duration: 500,
			delay: 100,
			opacity: 0,
			x: 0,
			y: -100,
		}}
	>
		{#if message.length > 0}
			<div
				class="
		rounded-lgtext-lg z-50 flex w-2/6 flex-col overflow-hidden
		rounded-lg bg-linear-to-tr from-red-900 to-amber-600 text-white shadow-2xl
	"
			>
				<div class="p-2 pb-0 font-medium">{message}</div>
				<div
					class="h-1 bg-white"
					style="width: {timer / 50}%"
				></div>
			</div>
		{/if}
	</div>
{/key}
