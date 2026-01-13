<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import InfoBox from './InfoBox.svelte';

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
	{#if message.length > 0}
		<InfoBox
			cssClass="bg-linear-to-tr from-red-900 to-amber-600 text-white"
		>
				<div class="p-2 pb-0 font-medium">
					<i class="ri-pass-expired-line"></i>
					{message}
				</div>
				<div
					class="h-1 bg-white"
					style="width: {timer / 50}%"
				></div>
		</InfoBox>
	{/if}
{/key}
