<script lang="ts">
	import DateInput from '$component/DateInput.svelte';
	import HiddenInput from '$component/HiddenInput.svelte';

	let { label, nameDay, nameMonth, nameYear, value, cssClass } = $props();

	let dateTotal = $derived(value.split('-').map((v: string) => parseInt(v)));
	let day = $derived(dateTotal[2]);
	let month = $derived(dateTotal[1]);
	let year = $derived(dateTotal[0]);
</script>

<div class="flex w-full flex-row flex-nowrap items-center gap-2">
	<HiddenInput
		name={nameDay}
		value={day}
	/>
	<HiddenInput
		name={nameMonth}
		value={month}
	/>
	<HiddenInput
		name={nameYear}
		value={year}
	/>

	<span class="{cssClass} text-nowrap">
		{label}:
	</span>

	<DateInput
		bind:day
		bind:month
		bind:year
	/>
</div>
