<script lang="ts">
	import TypeSelectionButton from './components/TypeSelectionButton.svelte';
	import { m } from '$lib/paraglide/messages';

	let {
		stage = $bindable(0),
		darkMode,
		color,
		type = $bindable(""),
	}: {
		stage: number;
		darkMode: boolean;
		color: string;
		type: string;
	} = $props();
</script>

<div class="grid grow-3 grid-cols-3 grid-rows-2 gap-4">
	<TypeSelectionButton
		onclick={() => {
			stage++;
			type = "CRS";
		}}
		{color}
		{darkMode}
		emoji="grid"
		i={1}
		text={m.crosswordWithGuess()}
	/>
	<TypeSelectionButton
		onclick={() => {
			stage++;
			type = "CRW";
		}}
		{color}
		{darkMode}
		emoji="table"
		i={2}
		text={m.crosswordWithoutGuess()}
	/>
	<TypeSelectionButton
		onclick={() => {
			stage++;
			type = "DEF";
		}}
		{color}
		{darkMode}
		emoji="connector"
		i={3}
		text={m.connectingDefinitions()}
	/>
	<TypeSelectionButton
		onclick={() => {
			stage++;
			type = "GRP";
		}}
		{color}
		{darkMode}
		emoji="calculator"
		i={4}
		text={m.graphingCalculator()}
	/>
	<TypeSelectionButton
		onclick={() => {
			stage++;
			type = "GEO";
		}}
		{color}
		{darkMode}
		emoji="shapes"
		i={5}
		text={m.geometricalCanvas()}
	/>
	<TypeSelectionButton
		onclick={() => {
			stage++;
			type = "EXT";
		}}
		{color}
		{darkMode}
		emoji="external-link"
		i={6}
		text={m.externalEmbed()}
	/>
</div>
