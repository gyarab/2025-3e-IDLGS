<script lang="ts">
	import { getLocale } from "$lib/paraglide/runtime";

	let locale = $derived(getLocale());
</script>

<div>
	{#if locale == 'cs'}

	{:else if locale == 'en'}

	{:else if locale == 'pl'}

	{:else}
		{@const}
	{/if}
</div>