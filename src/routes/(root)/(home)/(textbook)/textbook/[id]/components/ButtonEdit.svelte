<script lang="ts">
	import Button from '$component/Button.svelte';
	import HoverEmoji from '$component/HoverEmoji.svelte';
	import { m } from '$lib/paraglide/messages';

	let {
		clicked = $bindable(false),
	}: {
		clicked: boolean;
	} = $props();
</script>

<Button
	cssClass="text-2xl aspect-square! p-4!"
	btn="button-primary"
	onclick={() => {
		clicked = true;
	}}
	label={m.edit()}
>
	<HoverEmoji emoji="pencil" />
</Button>
