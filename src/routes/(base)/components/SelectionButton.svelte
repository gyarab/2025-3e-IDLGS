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
		orientation,
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
		orientation: 'port' | 'land';
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
	<div class="overflow-auto rounded-2xl">
		<div
			class="flex text-white! {orientation === 'port'
				? 'flex-col md:divide-y'
				: 'flex-row md:divide-x'} divide-white"
		>
			{#each { length: length } as _, i (i)}
				<button
					class="{css} {isSelected?.at(i)
						? selectedcss
						: ''} flex grow flex-row items-center justify-center gap-1 px-2 py-1 font-bold hover:translate-0! hover:brightness-75 active:brightness-50"
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
	</div>
{/key}
