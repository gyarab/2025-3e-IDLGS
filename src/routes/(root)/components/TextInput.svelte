<script lang="ts">
	import { browser } from "$app/environment";
	import { onMount, onDestroy } from "svelte";

	let {
		cssClass = 'w-full',
		value = $bindable(''),
		label = '',
		name = '',
		placeholder = '',
		onchange = undefined
	} = $props();

	let element: HTMLInputElement | undefined = $state(undefined);

	onMount(() => {
		if(!browser || !onchange) return;
		element?.addEventListener('change', onchange);
	});
	onDestroy(() => {
		if(!browser || !onchange) return;
		element?.removeEventListener('change', onchange);
	});
</script>

<div class="{cssClass} flex flex-row flex-nowrap items-center gap-2">
	{#if label}
		<span class="text-nowrap">{label}:</span>
	{/if}
	<input
		bind:this={element}
		type="text"
		bind:value
		{name}
		class="input-text grow"
		{placeholder}
	/>
</div>
