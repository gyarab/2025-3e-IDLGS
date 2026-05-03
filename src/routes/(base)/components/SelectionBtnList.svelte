<script lang="ts">
	import HoverEmoji from './HoverEmoji.svelte';

	let {
		texts,
		labels,
		emojis,
		actions,
		css,
		selectedcss,
		selectedstyle,
		value = $bindable(''),
		values,
		style,
		cssTop,
		disabled,
		types,
	}: {
		texts?: string[];
		labels?: string[];
		emojis?: string[];
		actions?: (() => void)[];
		css?: string;
		selectedstyle?: string;
		selectedcss?: string;
		value?: string;
		values?: string[];
		style?: string;
		cssTop?: string;
		disabled?: boolean[];
		types?: ('button' | 'submit' | 'reset')[];
	} = $props();

	let length: number = $derived(
		Math.max(
			texts?.length ?? 0,
			labels?.length ?? 0,
			emojis?.length ?? 0,
			actions?.length ?? 0,
		),
	);

	let isSelected: boolean[] | undefined = $derived(
		values?.map((v) => Boolean(value) && v == value) ?? undefined,
	);
</script>

{#key texts || actions || emojis}
	<div
		class="{cssTop} grid grid-cols-1 gap-2 text-white! md:grid-cols-2 lg:grid-cols-3"
	>
		{#each { length: length } as _, i (i)}
			<button
				class="{css} {isSelected?.at(i)
					? selectedcss
					: ''} flex grow flex-row items-center justify-center gap-1 p-2 font-bold hover:translate-0! hover:brightness-75 active:brightness-50"
				style="{style} {isSelected?.at(i) ? selectedstyle : ''}"
				onclick={() => {
					value = values?.at(i) ?? '';

					const f = actions?.at(i);
					if (f) f();
				}}
				title={labels?.at(i) ?? ''}
				aria-label={labels?.at(i) ?? ''}
				disabled={disabled?.at(i) ?? false}
				type={types?.at(i) ?? 'button'}
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
