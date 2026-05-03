<script lang="ts">
	import { sanitizeColor } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import { colord } from 'colord';

	let {
		color = $bindable(''),
	}: {
		color: string;
	} = $props();

	let inputElement: HTMLInputElement;

	$effect(() => {
		const clean = sanitizeColor(color);
		if (clean !== color.toLowerCase()) {
			color = clean;
		}
	});

	const textColor = $derived(colord(color).isLight() ? 'black' : 'white');
</script>

<div class="relative flex w-full flex-row items-center">
	<input
		type="color"
		name="color"
		class="w-full cursor-pointer rounded-lg border-2 border-white shadow transition-transform active:scale-95"
		style="height: 40px;"
		bind:value={color}
		bind:this={inputElement}
	/>

	<div
		class="pointer-events-none absolute inset-0 flex items-center justify-center px-2 text-center italic"
		onclick={() => inputElement.click()}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				inputElement.click();
			}
		}}
		tabindex="-1"
		role="button"
	>
		<span
			class="w-full truncate font-medium"
			style="color: {textColor};"
		>
			{m.clickToChangeColor()}...
		</span>
	</div>
</div>
