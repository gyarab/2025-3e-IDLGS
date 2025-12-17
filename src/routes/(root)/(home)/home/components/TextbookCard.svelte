<script lang="ts">
	import type { TextbookType } from '$lib/types';
	import Card from '../../../components/Card.svelte';

	let {
		textbook,
		delay = 0,
		perspective,
		onclick = () => {}
	}: {
		textbook: TextbookType;
		r: number;
		g: number;
		b: number;
		delay: number;
		perspective: boolean;
		onclick: () => void;
	} = $props();
</script>

<Card r={textbook.red} g={textbook.green} b={textbook.blue} {delay} {perspective} {onclick}>
	<div class="flex w-full grow flex-col">
		<h2></h2>
		<p></p>
	</div>
</Card>

<!-- TODO -->
