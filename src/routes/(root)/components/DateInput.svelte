<script lang="ts">
	let {
		cssClass = 'w-full',
		value = $bindable(new Date()),
		label = '',
		name = '',
	} = $props();
</script>

<div class="{cssClass} flex w-full grow flex-row flex-nowrap items-center gap-2">
	{#if label}
		<span class="text-nowrap">{label}:</span>
	{/if}
	<!-- TODO -->
</div>