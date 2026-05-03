<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import ColoredVerticalLine from '$src/routes/(base)/components/ColoredVerticalLine.svelte';
	import VerticalLine from '$src/routes/(base)/components/VerticalLine.svelte';
	import FontEdit from './components/FontEdit.svelte';
	import Multimedia from './components/Multimedia.svelte';
	import RawMode from './components/RawMode.svelte';
	import ToolbarButton from './components/ToolbarButton.svelte';

	let {
		darkMode,
		color,
		advancedMode = $bindable(false),
	}: {
		darkMode: boolean;
		color: string;
		advancedMode: boolean;
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
	/>
	<ColoredVerticalLine {color} />
	<Multimedia
		{darkMode}
		{color}
	/>
	<ColoredVerticalLine {color} />
	<RawMode
		{darkMode}
		{color}
	/>

	<div class="grow"></div>

	<ToolbarButton
		label={m.advancedMode()}
		emoji="puzzle-fill"
		onclick={() => (advancedMode = !advancedMode)}
		style="background-color: {color};"
		{darkMode}
		{color}
	/>
</div>
