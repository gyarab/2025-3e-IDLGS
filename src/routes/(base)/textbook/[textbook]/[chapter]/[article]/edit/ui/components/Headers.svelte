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
		perform = (cmd: string, value?: string) => {},
		isActive = (name: string) => false,
	}: {
		darkMode: boolean;
		color: string;
		articleText: string;
		selectionStart: number;
		selectionEnd: number;
		advanced: boolean;
		perform: (cmd: string, value?: string) => void;
		isActive?: (name: string) => boolean;
	} = $props();
</script>

<div class="flex flex-row items-center gap-1">
	<ToolbarButton
		emoji="h-1"
		label={m.heading1()}
		onclick={() => perform('h1')}
		{darkMode}
		{color}
		style={isActive('h1') ? `background-color: ${color}; opacity: 0.6;` : ''}
	/>
	<ToolbarButton
		emoji="h-2"
		label={m.heading2()}
		onclick={() => perform('h2')}
		{darkMode}
		{color}
		style={isActive('h2') ? `background-color: ${color}; opacity: 0.6;` : ''}
	/>
	<ToolbarButton
		emoji="h-3"
		label={m.heading3()}
		onclick={() => perform('h3')}
		{darkMode}
		{color}
		style={isActive('h3') ? `background-color: ${color}; opacity: 0.6;` : ''}
	/>
</div>
