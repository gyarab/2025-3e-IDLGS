<script lang="ts">
	//TODO kira wanted this, finish!

	import Button from "$src/routes/(root)/components/Button.svelte";

	let {
		description,
		word,
	}: {
		description: string,
		word: string,
	} = $props();

	let isPopupActive = $state(false);
</script>

{#if isPopupActive}
<div class="
	flex flex-row gap-2 absolute left-0 top-0 -translate-1/2
">

</div>
{/if}
<Button
	btn="button-none"
	emoji=""
	cssClass="underline decoration-dotted"
>
	{word}
</Button>