<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Card from '../../../components/Card.svelte';
	import HoverEmoji from '../../../components/HoverEmoji.svelte';

	let {
		value = $bindable(""),
		stage = $bindable(0)
	} = $props();
</script>

<div class="flex flex-col grow w-full gap-2">
	<h1 class="text-2xl font-medium">{m.selectItemWhichYouWantToCreate()}</h1>
	<div class="
		grid grid-cols-2 w-full grow gap-5
		*:flex *:flex-col *:justify-center *:items-center *:text-5xl *:grow
		">
		<Card
			perspective={false}
			forceSquare={false}
			onclick={() => {
				value = "course";
				stage = 1;
			}}
		>
			<HoverEmoji emoji={"file-list-3"} />
			<br>
			{m.course()}
		</Card>
		<Card
			perspective={false}
			forceSquare={false}
			onclick={() => {
				value = "textbook";
				stage = 2;
			}}
		>
			<HoverEmoji emoji={"book-ai"} />
			<br>
			{m.textbook()}
		</Card>
	</div>
</div>