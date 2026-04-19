<script lang="ts">
	import HoverEmoji from './HoverEmoji.svelte';

	let {
		texts,
		labels,
		emojis,
		actions,
		answers,
		css,
		style,
		cssTop,
		disabled,
	}: {
		texts?: string[];
		labels?: string[];
		emojis?: string[];
		actions?: (() => void)[];
		answers?: string[];
		css?: string;
		style?: string;
		cssTop?: string;
		disabled?: boolean[];
	} = $props();

	let length = $derived(
		Math.max(
			texts?.length ?? 0,
			labels?.length ?? 0,
			emojis?.length ?? 0,
			actions?.length ?? 0,
			answers?.length ?? 0,
		),
	);
</script>

{#key texts || actions || answers || emojis}
	<div
		class="{cssTop} flex flex-row text-white! *:border-collapse *:rounded-none *:border *:border-t-0 *:border-b-0 *:border-white *:first:rounded-s-full *:first:border-s-0 *:last:rounded-e-full *:last:border-e-0"
	>
		{#each { length: length } as _, i (i)}
			<button
				class="{css} flex grow flex-row items-center justify-center gap-1 p-2 ps-3 pe-3 font-bold hover:translate-0! hover:brightness-75 active:brightness-50"
				{style}
				onclick={actions?.at(i) ?? (() => {})}
				title={labels?.at(i) ?? ''}
				aria-label={labels?.at(i) ?? ''}
				disabled={disabled?.at(i) ?? false}
			>
				{#if emojis}
					<HoverEmoji
						emoji={emojis[i]}
						css="text-2xl"
					/>
				{/if}
				{#if texts}
					{texts[i]}
				{/if}
			</button>
		{/each}
	</div>
{/key}
