<script lang="ts">
	import type { TextbookType } from '$lib/types';
	import Card from '../../../components/Card.svelte';

	let {
		textbook,
		delay = 0,
		perspective,
		onclick = () => {},
	}: {
		textbook: TextbookType;
		delay: number;
		perspective: boolean;
		onclick?: () => void;
	} = $props();
</script>

<Card
	r={textbook.red}
	g={textbook.green}
	b={textbook.blue}
	{delay}
	{perspective}
	{onclick}
	css="w-[35svh] h-[35svh]"
>
	<div class="flex w-full grow flex-col">
		<h2 class="w-full text-xl">{textbook.name}</h2>
		<p class="w-full text-sm opacity-70">{textbook.description}</p>
	</div>
</Card>

<!-- TODO -->
