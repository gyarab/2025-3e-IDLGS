<script lang="ts">
	let {
		cssClass = 'w-full',
		checked = $bindable(false),
		label = '',
		name = '',
	} = $props();
</script>

<div class="{cssClass} flex flex-row flex-nowrap items-center gap-2">
	{#if label}
		<span class="text-nowrap">{label}:</span>
	{/if}
	<input
		type="checkbox"
		bind:checked
		{name}
		class="input-checkbox grow"
	/>
</div>
