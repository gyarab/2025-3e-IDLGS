<script lang="ts">
	import SelectionInput from '$component/SelectionInput.svelte';

	let {
		name,
		initialValue,
		label,
		names,
		values,
	}: {
		name: string;
		initialValue: unknown;
		label: string;
		names: string[];
		values: unknown[];
	} = $props();

	let value = $derived(initialValue);
</script>

<div class="flex w-full flex-row items-center gap-2">
	<input
		type="hidden"
		{name}
		bind:value
	/>
	<div class="text-lg">
		{label}:
	</div>
	<SelectionInput
		{names}
		{values}
		bind:value
	/>
</div>
