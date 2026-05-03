<script lang="ts">
	import HoverEmoji from './HoverEmoji.svelte';

	let {
		texts,
		labels,
		emojis,
		actions,
		css,
		cssTop,
		selectedcss,
		selectedstyle,
		value = $bindable(''),
		values,
		style,
		orientation = 'land',
		disabled,
		types,
	}: {
		texts?: string[];
		labels?: string[];
		emojis?: string[];
		actions?: (() => void)[];
		css?: string;
		cssTop?: string;
		selectedstyle?: string;
		selectedcss?: string;
		value?: string;
		values?: string[];
		style?: string;
		orientation?: 'port' | 'land' | 'mixed';
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

	let classList = $derived.by(() => {
		switch(orientation) {
			case 'port':
				return 'flex-col md:divide-y';
			case 'mixed':
				return 'max-lg:flex-col max-lg:divide-y lg:flex-row lg:divide-x';
			default:
				return 'flex-row md:divide-x';
		}
	})
</script>

{#key texts || actions || emojis}
	<div class="overflow-hidden rounded-2xl {cssTop}">
		<div
			class="flex text-white! {classList} divide-white"
		>
			{#each { length: length } as _, i (i)}
				<button
					class="{css} {isSelected?.at(i) ? selectedcss : ''}
						flex grow flex-row items-center justify-center px-2 py-0.5 font-semibold hover:translate-0! hover:brightness-75
						active:brightness-50 sm:gap-1 md:py-1"
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
