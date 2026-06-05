<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import type { TextbookType } from '$lib/types';
	import { alphaColor, sanitizeColor } from '$lib';

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
	class="flex w-full grow flex-col items-center p-4 pt-20"
	style="background-color: {alphaColor(data.color, 60)};"
>
	<div
		class="flex w-full grow flex-col p-4 sm:p-6 lg:w-3/4 {data.darkMode
			? 'bg-black/60'
			: 'bg-white/80'} rounded-lg shadow-lg"
	>
		<div class="mb-4 flex w-full flex-col items-center gap-2 sm:flex-row">
			<h1 class="">{m.textbookInteractiveExercises()}</h1>
			<h1
				class="font-bold"
				style="color: {sanitizeColor(
					data.color,
					data.darkMode ? 70 : 40,
				)} !important;"
			>
				{data.textbook.title}
			</h1>
			<div
				class="my-auto flex grow flex-col items-center justify-end gap-4 sm:flex-row"
			>
				<Button
					emoji="function-add"
					type="button"
					text={m.createExercise()}
					css="buttonPrimary flex-row gap-2"
					style="background-color: {sanitizeColor(
						data.color,
						data.darkMode ? 40 : 60,
					)};"
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
		</div>
		<hr />
	</div>
</div>
