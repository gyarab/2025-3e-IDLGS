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
		class="overflow-hidden rounded-xl {cssTop}"
		style="background-color: white;"
	>
		<div class="grid grid-cols-2 gap-px text-white!">
			{#each { length: length } as _, i (i)}
				<button
					class="{css} {isSelected?.at(i) ? selectedcss : ''}
                        flex flex-row items-center justify-center px-2 py-1.5 font-semibold
                        hover:translate-0 hover:brightness-110 active:rounded-xl active:brightness-90 sm:gap-1
                        {i === 0 ? 'col-span-2' : 'col-span-1'}"
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
					{#if emojis?.at(i)}
						<HoverEmoji
							emoji={emojis[i]}
							css="text-2xl"
						/>
					{/if}
					{#if texts?.at(i)}
						<span class="ml-1">{texts[i]}</span>
					{/if}
				</button>
			{/each}
		</div>
	</div>
{/key}
