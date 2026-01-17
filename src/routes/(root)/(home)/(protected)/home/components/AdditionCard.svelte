<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Card from '$component/Card.svelte';
	import HoverEmoji from '$component/HoverEmoji.svelte';

	let {
		onclick,
	}: {
		onclick: () => void;
	} = $props();
</script>

<Card
	perspective={false}
	{onclick}
	hover={true}
	css="w-[35svh] h-[35svh]"
>
	<div
		class="group flex w-full grow flex-col items-center justify-center gap-2"
	>
		<span class="text-5xl">
			<HoverEmoji emoji={'add-circle'} />
		</span>
		<span class="text-3xl">
			{m.addNew()}
		</span>
	</div>
</Card>
