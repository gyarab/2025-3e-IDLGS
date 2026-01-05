<script lang="ts">
	let {
		names,
		values,
		value = $bindable(''),
	}: {
		names: string[];
		values: string[];
		value: string;
	} = $props();
</script>

<div
	class="flex flex-row gap-0 *:rounded-none *:first:rounded-s-2xl! *:last:rounded-e-2xl!"
>
	{#each values as v, i (v)}
		<button
			onclick={() => {
				value = v;
			}}
			class="{value == v ? 'button-green' : 'button-violet'}"
		>
			{names[i]}
		</button>
	{/each}
</div>
