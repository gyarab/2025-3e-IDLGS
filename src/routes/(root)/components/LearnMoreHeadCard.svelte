<script lang="ts">
	import Card from './Card.svelte';
	import Button from './Button.svelte';
	import { m } from '$lib/paraglide/messages';

	let { delay, title, text, emoji } = $props();
</script>

<Card
	{delay}
	perspective={true}
	padding="p-5"
>
	<div class="flex w-full grow flex-col gap-2">
		<h2 class="w-full text-left text-2xl">
			<i class="ri-{emoji}-fill"></i>
			{title}.
		</h2>
		<p class="text-left text-lg font-light">
			{text}
		</p>
		<div class="grow"></div>
		<Button
			emoji="arrow-right"
			btn="button-primary"
		>
			{m.learnMore()}
		</Button>
	</div>
</Card>
