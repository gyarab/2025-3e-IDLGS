<script lang="ts">
	import TypeSelectionButton from './components/TypeSelectionButton.svelte';
	import { m } from '$lib/paraglide/messages';

	let {
		stage = $bindable(0),
		darkMode,
		color,
	}: {
		stage: number;
		darkMode: boolean;
		color: string;
	} = $props();
</script>

<div class="grid grow-3 grid-cols-3 grid-rows-2 gap-4 p-4">
	<TypeSelectionButton
		onclick={() => {
			stage++;
		}}
		{color}
		{darkMode}
		emoji={'grid'}
		i={1}
		text={m.crosswordWithGuess()}
	/>
	<TypeSelectionButton
		onclick={() => {
			stage++;
		}}
		{color}
		{darkMode}
		emoji={'table'}
		i={2}
		text={m.crosswordWithoutGuess()}
	/>
	<TypeSelectionButton
		onclick={() => {
			stage++;
		}}
		{color}
		{darkMode}
		emoji={'connector'}
		i={3}
		text={m.connectingDefinitions()}
	/>
	<TypeSelectionButton
		onclick={() => {
			stage++;
		}}
		{color}
		{darkMode}
		emoji={'calculator'}
		i={4}
		text={m.graphingCalculator()}
	/>
	<TypeSelectionButton
		onclick={() => {
			stage++;
		}}
		{color}
		{darkMode}
		emoji={'shapes'}
		i={5}
		text={m.geometricalCanvas()}
	/>
	<TypeSelectionButton
		onclick={() => {
			stage++;
		}}
		{color}
		{darkMode}
		emoji={'external-link'}
		i={6}
		text={m.externalEmbed()}
	/>
</div>
