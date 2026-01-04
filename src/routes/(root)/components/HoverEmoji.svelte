<script lang="ts">
	let { emoji, disabled } = $props();
</script>

{#if !disabled}
	<span>
		<i class="group-hover:hidden ri-{emoji}-line"></i>
		<i class="not-group-hover:hidden ri-{emoji}-fill"></i>
	</span>
{:else}
	<i class="ri-{emoji}-line"></i>
{/if}
