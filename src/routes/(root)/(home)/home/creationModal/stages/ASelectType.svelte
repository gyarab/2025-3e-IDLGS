<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Card from '../../../../components/Card.svelte';
	import HoverEmoji from '../../../../components/HoverEmoji.svelte';

	let { value = $bindable(''), stage = $bindable(0) } = $props();
</script>

<div class="flex w-full grow flex-col gap-2 z-10">
	<h1 class="text-2xl font-medium">{m.selectItemWhichYouWantToCreate()}</h1>
	<div
		class="
		grid w-full grow grid-cols-2 gap-5
		*:flex *:grow *:flex-col *:items-center *:justify-center *:text-5xl
		"
	>
		<Card
			perspective={false}
			forceSquare={false}
			hover={true}
			onclick={() => {
				value = 'course';
				stage = 1;
			}}
		>
			<HoverEmoji emoji={'file-list-3'} />
			<br />
			{m.course()}
		</Card>
		<Card
			perspective={false}
			forceSquare={false}
			hover={true}
			onclick={() => {
				value = 'textbook';
				stage = 2;
			}}
		>
			<HoverEmoji emoji={'book-ai'} />
			<br />
			{m.textbook()}
		</Card>
	</div>
</div>
