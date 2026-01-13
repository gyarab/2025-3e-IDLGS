<script lang="ts">
	import DateInput from "$src/routes/(root)/components/DateInput.svelte";
	import HiddenInput from "$src/routes/(root)/components/HiddenInput.svelte";

	let { 
		label,
		nameDay,
		nameMonth,
		nameYear,
		value,
		cssClass
	} = $props();

	let dateTotal = $derived(value.split('-').map((v: string) => parseInt(v)));
	let day = $derived(dateTotal[2]);
	let month = $derived(dateTotal[1]);
	let year = $derived(dateTotal[0]);
</script>

<div class="flex w-full flex-row gap-2 items-center flex-nowrap">
	<HiddenInput name={nameDay} value={day} />
	<HiddenInput name={nameMonth} value={month} />
	<HiddenInput name={nameYear} value={year} />

	<span class='{cssClass} text-nowrap'>
		{label}:
	</span>

	<DateInput
		bind:day={day}
		bind:month={month}
		bind:year={year}
	/>
</div>
