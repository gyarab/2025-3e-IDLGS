<script lang="ts">
	import CheckboxInput from '$component/CheckboxInput.svelte';

	let {
		name,
		initialValue,
		label,
	}: {
		name: string;
		label: string;
		initialValue: boolean;
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
	<CheckboxInput
		bind:checked={value}
		cssClass=""
	/>
</div>
