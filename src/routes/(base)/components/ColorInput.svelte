<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	let {
		color = $bindable(''),
	}: {
		color: string;
	} = $props();
</script>

<div class="relative flex w-full flex-row">
	<input
		type="color"
		name="color"
		class="w-full rounded-lg border-2 border-white shadow"
		bind:value={color}
	/>
	<div class="absolute top-1/2 left-1/2 -translate-1/2 text-white italic">
		{m.clickToChangeColor()}...
	</div>
</div>
