<script lang="ts">
	let {
		cssClass = 'w-full',
		value = $bindable(''),
		label = '',
		name = '',
		placeholder = '',
	} = $props();
</script>

<div class="flex {cssClass} flex-row flex-nowrap items-center gap-2">
	{#if label}
		<span class="text-nowrap">{label}:</span>
	{/if}
	<input
		type="text"
		bind:value
		{name}
		class="input-text grow"
		{placeholder}
	/>
</div>
