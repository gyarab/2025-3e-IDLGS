<script lang="ts">
	import CheckboxInput from '$component/CheckboxInput.svelte';
	import HiddenInput from '$component/HiddenInput.svelte';

	let {
		name,
		initialValue,
		label,
	}: {
		name: string;
		label: string;
		initialValue: boolean;
	} = $props();

	let value = $derived(Boolean(initialValue));
</script>

<div class="flex w-full flex-row items-center gap-2">
	<!-- theoretically this is useless but it's more comfortable to use in the form actions this way -->
	<!-- (no comparing to 'on' but 'true'/'false') -->
	<HiddenInput
		{name}
		{value}
	/>
	<div class="text-lg">
		{label}:
	</div>
	<CheckboxInput
		bind:checked={value}
		cssClass=""
	/>
</div>
