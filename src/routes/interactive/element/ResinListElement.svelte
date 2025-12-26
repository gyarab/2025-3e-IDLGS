<!--

RESIN
List item showing a single element.
Author: Martin Bykov

-->

<script lang="ts">
	import type { RElement } from '$lib/interactive/element.svelte';
	import { getType } from '$lib/interactive/interactive.svelte';

	let {
		el = $bindable(),
		uuidVariable = $bindable(),
	}: {
		el: RElement;
		uuidVariable: string;
	} = $props();
</script>

<button
	class="
	flex flex-row gap-2 rounded-lg p-2 items-end
	{uuidVariable == el.uuid ? 'bg-violet-800' : 'bg-neutral-500'}
	hover:bg-violet-800
	"
	onclick={() => {
		if (uuidVariable == el.uuid) uuidVariable = '';
		else uuidVariable = el.uuid;
	}}
>
	{el.name}
	<span class="italic opacity-70 text-sm font-light">{getType(el)}</span>
	<div class="grow"></div>
	<div
		class=""
		onclick={() => {
			el.visible = !el.visible;
		}}
		role="button"
		tabindex="0"
		onkeydown={() => {}}
	>
		{#if el.visible}
			<i class="ri-eye-line"></i>
		{:else}
			<i class="ri-eye-off-line"></i>
		{/if}
	</div>
</button>
