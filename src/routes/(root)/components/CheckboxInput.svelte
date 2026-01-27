<script lang="ts">
	let {
		cssClass = 'max-w-full',
		checked = $bindable(false),
		label = '',
		name = '',
		flip = false,
		noChangeEvents = false,
	} = $props();
</script>

<div
	class="{cssClass} flex {flip
		? 'flex-row-reverse'
		: 'flex-row'} flex-nowrap items-center gap-2"
>
	{#if label}
		<span class="text-nowrap">{label}</span>
	{/if}
	<input
		type="checkbox"
		bind:checked
		{name}
		class="input-checkbox {noChangeEvents ? 'ignoreChangeEvents' : ''}"
	/>
</div>
