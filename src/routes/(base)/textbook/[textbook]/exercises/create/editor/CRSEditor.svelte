<script lang="ts">
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
	import CRS from '$src/routes/(base)/exerciseRendering/CRS.svelte';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import Dialog from '$src/routes/(base)/components/Dialog.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import SelectionButton from '$src/routes/(base)/components/SelectionButton.svelte';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';

	let {
		crWords = $bindable([]),
		crClues = $bindable([]),
		crDescriptions = $bindable([]),
		crSolution = $bindable(''),
		backgroundColorR = $bindable(0),
		backgroundColorG = $bindable(0),
		backgroundColorB = $bindable(0),
		foregroundColorR = $bindable(0),
		foregroundColorG = $bindable(0),
		foregroundColorB = $bindable(0),
		crsOffsets = $bindable([]),
		crsColumnId = $bindable(0),
		color,
		darkMode,
	}: {
		backgroundColorR: number;
		backgroundColorG: number;
		backgroundColorB: number;
		foregroundColorR: number;
		foregroundColorG: number;
		foregroundColorB: number;
		crsOffsets: number[];
		crsColumnId: number;
		crWords: string[];
		crClues: string[];
		crDescriptions: string[];
		crSolution: string;
		color: string;
		darkMode: boolean;
	} = $props();

	let addWordDialog = $state(false);
	let dialogWordValue = $state('');
	let dialogHintValue = $state('');
	let dialogDescValue = $state('');
</script>

<div class="relative flex w-full grow flex-col gap-2 overflow-x-hidden overflow-y-scroll">
	<div
		class="mb-2 flex w-full flex-row"
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.crosswordWithGuess()}</h2>
	</div>

	<div class=" absolute right-1/4 bottom-4 pe-4">
		<Button
			emoji="add-box"
			type="button"
			text={m.addWord()}
			onclick={() => {
				addWordDialog = true;
			}}
			css="buttonPrimary z-50"
			style="background-color: {color};"
		/>
	</div>

	<CRS
		bind:offsets={crsOffsets}
		bind:columnId={crsColumnId}
		bind:words={crWords}
		bind:clues={crClues}
		bind:descriptions={crDescriptions}
		bind:solution={crSolution}
		{backgroundColorR}
		{backgroundColorG}
		{backgroundColorB}
		{foregroundColorR}
		{foregroundColorG}
		{foregroundColorB}
		editMode={true}
		{color}
		{darkMode}
	/>
</div>

<Dialog
	bind:open={addWordDialog}
	{darkMode}
>
	<div class="flex w-full grow flex-col gap-2">
		<h2 class="text-2xl font-bold">{m.addWord()}</h2>

		<TextInput
			{darkMode}
			{color}
			placeholder={m.word()}
			bind:value={dialogWordValue}
		/>
		<TextArea
			{darkMode}
			{color}
			placeholder={m.descriptionForWord()}
			bind:value={dialogDescValue}
			css="grow"
		/>
		<TextArea
			{darkMode}
			{color}
			placeholder={m.hintForWord()}
			bind:value={dialogHintValue}
			css="grow"
		/>

		<div class="grow"></div>

		<div class="flex w-full flex-row justify-end">
			<SelectionButton
				emojis={['close', 'check']}
				texts={[m.cancel(), m.confirm()]}
				actions={[
					() => {
						addWordDialog = false;
					},
					() => {
						crWords.push(dialogWordValue);
						crDescriptions.push(dialogDescValue);
						crClues.push(dialogHintValue);
						crsOffsets.push(0);

						dialogDescValue = '';
						dialogHintValue = '';
						dialogWordValue = '';

						addWordDialog = false;
					},
				]}
				disabled={[
					false,
					dialogWordValue.length == 0 ||
						dialogDescValue.length == 0 ||
						dialogHintValue.length == 0,
				]}
				css="buttonPrimary"
				style="background-color: {color};"
			/>
		</div>
	</div>
</Dialog>
