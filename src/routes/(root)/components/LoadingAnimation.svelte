<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { onDestroy, onMount } from 'svelte';

	let timeoutMessageChange: NodeJS.Timeout | undefined = $state(undefined);
	let intervalDot: NodeJS.Timeout | undefined = $state(undefined);
	let dots: number = $state(1);
	let newMessage = $state(false);

	onMount(() => {
		timeoutMessageChange = setTimeout(() => {
			newMessage = true;
		}, 6000);
		intervalDot = setInterval(() => {
			dots++;
			if (dots == 4) dots = 1;
		}, 330);
	});
	onDestroy(() => {
		clearTimeout(timeoutMessageChange);
		clearInterval(intervalDot);
	});
</script>

<div class="flex flex-col items-center gap-0">
	<div class="flex flex-row gap-1 text-emerald-500">
		<i class="ri-circle-fill animate-bounce [animation-delay:-0.66s]"></i>
		<i class="ri-circle-fill animate-bounce [animation-delay:-0.33s]"></i>
		<i class="ri-circle-fill animate-bounce"></i>
	</div>
	<div class="flex flex-row gap-0">
		<span>
			{#if newMessage}
				{m.itsTakingLongerThanExpected()}
			{:else}
				{m.loading()}
			{/if}
		</span>
		<span>
			{#key dots}
				{#each new Array(dots).fill('.') as dot, i (i)}
					{dot}
				{/each}
			{/key}
		</span>
	</div>
</div>
