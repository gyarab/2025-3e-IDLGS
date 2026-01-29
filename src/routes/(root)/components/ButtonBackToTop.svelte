<script lang="ts">
	import Button from '$component/Button.svelte';
	import HoverEmoji from '$component/HoverEmoji.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<Button
	cssClass="text-2xl aspect-square! p-4!"
	btn="button-primary"
	onclick={() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}}
	label={m.backToTop()}
>
	<HoverEmoji emoji="arrow-up" />
</Button>
