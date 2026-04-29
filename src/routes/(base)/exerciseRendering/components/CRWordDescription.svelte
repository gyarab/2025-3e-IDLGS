<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { letters } from '$lib/plural';
	import Button from '../../components/Button.svelte';

	let {
		description,
		hint,
		length,
		index,
	}: {
		description: string;
		length: number;
		index: number;
		hint: string;
	} = $props();

	let hintShown = $state(false);
</script>

<div class="flex flex-col gap-0">
	<div class="flex flex-row gap-1">
		{index + 1}.
		<span class="font-bold">{description}</span>
		<span class="italic">({length} {letters(length)})</span>
		<div class="grow"></div>
		{#if !hintShown}
			<Button
				emoji="arrow-down-s"
				css=""
				text={m.showHint()}
				onclick={() => (hintShown = true)}
				type="button"
				hecss="text-lg!"
			/>
		{:else}
			<span class="italic">{m.hintShown()}</span>
		{/if}
	</div>
	{#if hintShown}
		{hint}
	{/if}
</div>
