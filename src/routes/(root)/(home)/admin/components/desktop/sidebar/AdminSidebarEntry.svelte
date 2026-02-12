<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { Snippet } from 'svelte';
	import Button from '$component/Button.svelte';
	import HoverEmoji from '$component/HoverEmoji.svelte';

	let {
		children,
		name,
		emoji,
	}: {
		children: Snippet;
		name: string;
		emoji: string;
	} = $props();

	let isOpen = $state(false);
</script>

<div class="flex w-full flex-col gap-0">
	<div
		class="flex w-full flex-row items-center justify-start gap-1 overflow-hidden"
	>
		<HoverEmoji {emoji} />
		<span>{name}</span>
		<Button
			emoji={isOpen ? 'arrow-up-s' : 'arrow-down-s'}
			btn="button-none"
			onclick={() => {
				isOpen = !isOpen;
			}}
			label={isOpen ? m.collapse() : m.expand()}
		/>
	</div>
	{#if isOpen}
		<div
			class="flex flex-col gap-0 ps-4 opacity-80 *:border-t *:border-b *:border-white/10 *:first:border-t-0! *:last:border-b-0!"
		>
			{@render children()}
		</div>
	{/if}
</div>
