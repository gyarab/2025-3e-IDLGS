<script lang="ts">
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
	import ProgressItem from '../../../../../components/ProgressItem.svelte';
	import SelectionButton from '$src/routes/(base)/components/SelectionButton.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { darkenHex, setDarkMode } from '$lib';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let {
		stage = $bindable(0),
		color,
		darkMode,
	}: {
		stage: number;
		color: string;
		darkMode: boolean;
	} = $props();

	let texts = $derived([
		m.exerciseType(),
		m.basicExerciseInformation(),
		m.exerciseStructure(),
		m.exerciseGrading(),
		m.referencesToMaterial(),
		m.finish(),
	]);
</script>

<div
	class="flex max-w-1/5 grow flex-col gap-2 rounded-e-2xl p-4 shadow-lg {darkMode
		? 'bg-neutral-900'
		: 'bg-neutral-300'}"
	in:fly|global={{ duration: 300, delay: 300, x: -500, y: 0, opacity: 0 }}
>
	<div class="relative flex w-full flex-col gap-2">
		<div class="flex w-full flex-row items-center gap-1 text-2xl">
			<i class="ri-function-add-line"></i>
			<h1 class="text-2xl! font-bold">{m.newExercise()}</h1>
		</div>

		{#key stage}
			{#each texts as text, i (i)}
				<ProgressItem
					{color}
					{text}
					current={stage === i}
					done={stage > i}
				/>
			{/each}
		{/key}
	</div>

	<div class="grow"></div>

	<Button
		css="buttonPrimary font-bold"
		style="background-color: {color};"
		type="button"
		text={m.goBack()}
		emoji="arrow-go-back"
		onclick={() => stage--}
		disabled={stage === 0}
	/>

	<SelectionButton
		style="background-color: {darkenHex(color, 50)};"
		texts={[m.cancel(), '', '']}
		emojis={['arrow-left-double', 'question', darkMode ? 'sun' : 'moon']}
		labels={[
			m.cancel(),
			m.helpMenu(),
			darkMode ? m.lightMode() : m.darkMode(),
		]}
		actions={[
			() =>
				goto(
					resolve('/(base)/textbook/[textbook]/exercises', {
						textbook: page.params.textbook!,
					}),
				),
			() => goto(resolve('/help/exercises/creation')),
			async () => {
				await setDarkMode(!darkMode);
				await invalidateAll();
			},
		]}
	/>
</div>
