<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import ColoredVerticalLine from '$src/routes/(base)/components/ColoredVerticalLine.svelte';
	import FontEdit from './components/FontEdit.svelte';
	import Multimedia from './components/Multimedia.svelte';
	import Headers from './components/Headers.svelte';
	import ToolbarButton from './components/ToolbarButton.svelte';
	import Didatic from './components/Didatic.svelte';

	let {
		darkMode,
		color,
		advancedMode = $bindable(false),
		selectionStart = $bindable(0),
		selectionEnd = $bindable(0),
		articleText = $bindable(''),
	}: {
		darkMode: boolean;
		color: string;
		advancedMode: boolean;
		selectionStart: number;
		selectionEnd: number;
		articleText: string;
	} = $props();
</script>

<div
	class="flex h-[5vh] w-full flex-row gap-1 rounded-lg p-2 text-2xl {darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-200 text-black'}"
>
	<FontEdit
		{darkMode}
		{color}
		bind:selectionStart
		bind:selectionEnd
		bind:articleText
		bind:advanced={advancedMode}
	/>
	<ColoredVerticalLine {color} />
	<Multimedia
		{darkMode}
		{color}
		bind:articleText
		bind:selectionStart
		bind:selectionEnd
		bind:advanced={advancedMode}
	/>
	<ColoredVerticalLine {color} />
	<Headers
		{darkMode}
		{color}
		bind:selectionStart
		bind:selectionEnd
		bind:articleText
		bind:advanced={advancedMode}
	/>
	<ColoredVerticalLine {color} />
	<Didatic
		{darkMode}
		{color}
		bind:selectionStart
		bind:selectionEnd
		bind:articleText
		bind:advanced={advancedMode}
	/>
	<ColoredVerticalLine {color} />

	<div class="grow"></div>

	<ToolbarButton
		label={m.advancedMode()}
		emoji="puzzle-fill"
		onclick={() => (advancedMode = !advancedMode)}
		{darkMode}
		{color}
	/>
</div>
