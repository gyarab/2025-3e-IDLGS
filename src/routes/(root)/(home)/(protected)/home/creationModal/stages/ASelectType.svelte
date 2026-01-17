<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Card from '$component/../components/Card.svelte';
	import HoverEmoji from '$component/../components/HoverEmoji.svelte';
	import type { UserType } from '$lib/types';

	let { value = $bindable(''), stage = $bindable(0), user }: {
		value: string;
		stage: number;
		user: UserType;
	} = $props();
</script>

<div class="z-10 flex w-full grow flex-col gap-2">
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
			disable={!user.canCreateCourses}
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
			disable={!user.canCreateTextbooks}
		>
			<HoverEmoji emoji={'book-ai'} />
			<br />
			{m.textbook()}
		</Card>
	</div>
</div>
