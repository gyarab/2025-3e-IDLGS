<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import type { TextbookType } from '$lib/types';

	let {
		data,
	}: {
		data: {
			color: string;
			darkMode: boolean;
			textbook: TextbookType;
		};
	} = $props();
</script>

<svelte:head>
	<title
		>{m.textbookInteractiveExercises()} | {data.textbook.title} | {m.idlgs()}</title
	>
</svelte:head>

<div
	class="flex w-full grow flex-col items-center p-4"
	style="background-color: {data.color};"
>
	<div
		class="flex w-1/2 grow flex-col p-7 {data.darkMode
			? 'bg-neutral-700'
			: 'bg-neutral-100'} rounded-lg shadow-lg"
	>
		<div class="mb-4 flex w-full flex-row items-center gap-1">
			<h1 class="">{m.textbookInteractiveExercises()}</h1>
			<h1
				class="font-bold"
				style="color: {data.color} !important;"
			>
				{data.textbook.title}
			</h1>
			<div class="grow"></div>
			<Button
				emoji="function-add"
				type="button"
				text={m.createExercise()}
				css="buttonPrimary"
				style="background-color: {data.color};"
				onclick={() => {
					goto(
						resolve(
							'/(base)/textbook/[textbook]/exercises/create',
							{ textbook: page.params.textbook! },
						),
					);
				}}
			/>
		</div>
		<hr />
	</div>
</div>
