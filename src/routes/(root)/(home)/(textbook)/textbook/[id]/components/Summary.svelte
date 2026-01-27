<script lang="ts">
	import { m, textbook } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';

	let {
		text,
		red,
		green,
		blue,
	}: {
		text: string;
		red: number;
		green: number;
		blue: number;
	} = $props();
</script>

{#if text.length > 0}
	<WideCard
		r={red}
		g={green}
		b={blue}
	>
		<h2>
			<i class="ri-ai"></i>
			{m.textbookAISummary()}
		</h2>
		<p>
			{text}
		</p>
	</WideCard>
{/if}
