<script lang="ts">
	import SelectionInput from '$component/SelectionInput.svelte';
	import HiddenInput from '$src/routes/(root)/components/HiddenInput.svelte';

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
	<HiddenInput {name} value={value} />
	<div class="text-lg">
		{label}:
	</div>
	<SelectionInput
		{names}
		{values}
		bind:value
	/>
</div>
