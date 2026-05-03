<script lang="ts">
	import ToolbarButton from './ToolbarButton.svelte';
	import { m } from '$lib/paraglide/messages';

	let {
		darkMode,
		color,
		articleText = $bindable(''),
		selectionStart = $bindable(0),
		selectionEnd = $bindable(0),
		advanced = $bindable(false),
	}: {
		darkMode: boolean;
		color: string;
		articleText: string;
		selectionStart: number;
		selectionEnd: number;
		advanced: boolean;
	} = $props();
</script>

<div class="flex flex-row items-center gap-1">
	<ToolbarButton
		emoji="h-1"
		label={m.heading1()}
		onclick={() => {

		}}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="h-2"
		label={m.heading2()}
		onclick={() => {

		}}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="h-3"
		label={m.heading3()}
		onclick={() => {

		}}
		{darkMode}
		{color}
	/>
</div>
