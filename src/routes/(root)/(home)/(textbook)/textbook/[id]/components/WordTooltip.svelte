<script lang="ts">
	import { page } from '$app/state';
	import Button from '$component/Button.svelte';
	import Tooltip from '$component/Tooltip.svelte';
	import { m } from '$lib/paraglide/messages';
	import HoverEmoji from '$src/routes/(root)/components/HoverEmoji.svelte';

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
<Button
	btn="button-none relative"
	emoji=""
	cssClass="underline decoration-dotted text-nowrap"
	onclick={() => (isPopupActive = !isPopupActive)}
>
	{word}

	<Tooltip
		showTooltip={isPopupActive}
		cssButtonOverride="p-1! flex-row! gap-1!"
	>
		{description}

		<a
			href="/textbook/{page.params.id}/definitions?uuid={uuid}"
			aria-label={m.viewInDefinitionList()}
		>
			<HoverEmoji emoji="expand-vertical" />
		</a>
	</Tooltip>
</Button>
