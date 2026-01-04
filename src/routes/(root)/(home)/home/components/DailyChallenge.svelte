<script lang="ts">
	let {
		text,
		completed,
	}: {
		text: string;
		completed: boolean;
	} = $props();
</script>

<div class="flex flex-row gap-2">
	{text}
	<div class="grow"></div>
	{#if completed}
		<!-- TODO -->
	{:else}
		<!-- TODO -->
	{/if}
</div>
