<script lang="ts">
	import { page } from '$app/state';
	import Button from '$component/Button.svelte';
	import Tooltip from '$component/Tooltip.svelte';
	import { m } from '$lib/paraglide/messages';
	import HoverEmoji from '$component/HoverEmoji.svelte';

	let {
		description,
		word,
		uuid,
	}: {
		description: string;
		word: string;
		uuid: string;
	} = $props();

	let isPopupActive = $state(false);
</script>

{#if isPopupActive}
	<div
		class="
	absolute top-0 left-0 flex -translate-1/2 flex-row gap-2
"
	></div>
{/if}
<div class="relative max-w-fit text-nowrap underline decoration-dotted">
	<Button
		btn="relative font-light p-0!"
		emoji=""
		onclick={() => (isPopupActive = !isPopupActive)}
	>
		{word}
	</Button>

	<Tooltip
		showTooltip={isPopupActive}
		cssButtonOverride="p-1! flex-row! gap-1!"
		cssClass="bg-blue-900"
		cssClass2="text-blue-900"
	>
		<a
			href="/textbook/{page.params.id}/definitions?uuid={uuid}"
			aria-label={m.viewInDefinitionList()}
		>
			{description}
		</a>
		<Button
			btn="button-none-p! p-0!"
			emoji="close-circle"
			onclick={() => (isPopupActive = !isPopupActive)}
		/>
	</Tooltip>
</div>
