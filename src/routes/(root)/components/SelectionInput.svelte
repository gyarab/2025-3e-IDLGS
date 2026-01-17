<script lang="ts">
	let {
		names,
		values,
		value = $bindable(''),
		onchange = () => {},
	}: {
		names: string[];
		values: unknown[];
		value: unknown;
		onchange?: (v: unknown) => void;
	} = $props();
</script>

<div
	class="flex flex-row gap-0 *:rounded-none *:first:rounded-s-2xl! *:last:rounded-e-2xl!"
>
	{#each values as v, i (v)}
		<button
			onclick={() => {
				value = v;
				onchange(v);
			}}
			class={value == v ? 'button-green' : 'button-violet'}
			type="button"
		>
			{names[i]}
		</button>
	{/each}
</div>
