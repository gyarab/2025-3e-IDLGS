<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	let {
		color = $bindable(''),
	}: {
		color: string;
	} = $props();

	let inputElement: HTMLInputElement;
</script>

<div class="relative flex w-full flex-row items-center">
	<input
		type="color"
		name="color"
		class="w-full cursor-pointer rounded-lg border-2 border-white shadow"
		style="height: 40px;"
		bind:value={color}
		bind:this={inputElement}
	/>

	<!-- Changed: removed -translate and left-1/2, added w-full and text-center -->
	<div
		class="pointer-events-none absolute inset-0 flex items-center justify-center px-2 text-center text-white italic"
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
		<span class="w-full truncate">
			{m.clickToChangeColor()}...
		</span>
	</div>
</div>
