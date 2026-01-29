<script lang="ts">
	import Button from '$component/Button.svelte';

	let { text, emoji, disabled = false } = $props();
</script>

<div class="flex w-full flex-row gap-2">
	<div class="grow"></div>
	<Button
		{emoji}
		btn="button-primary"
		type="submit"
		{disabled}
	>
		{text}
	</Button>
</div>
