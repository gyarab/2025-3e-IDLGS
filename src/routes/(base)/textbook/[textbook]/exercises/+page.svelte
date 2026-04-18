<script lang="ts">
	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';

	let {
		data,
	}: {
		data: {
			color: string;
			darkMode: boolean;
		};
	} = $props();
</script>

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
				aaa
			</h1>
			<div class="grow"></div>
			<Button
				emoji="function-add"
				type="button"
				text={m.createExercise()}
				css="buttonPrimary"
				style="background-color: {data.color};"
				onclick={() => {
					goto('exercises/create');
				}}
			/>
		</div>
		<hr />
	</div>
</div>
