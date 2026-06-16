<script lang="ts">
	import ToolbarButton from './ToolbarButton.svelte';
	import { m } from '$lib/paraglide/messages';

	let {
		darkMode,
		color,
		selectionStart = $bindable(0),
		selectionEnd = $bindable(0),
		articleText = $bindable(''),
		advanced = $bindable(false),
		perform = (cmd: string, value?: string) => {},
		isActive = (name: string) => false,
	}: {
		darkMode: boolean;
		color: string;
		selectionStart: number;
		selectionEnd: number;
		articleText: string;
		advanced: boolean;
		perform: (cmd: string, value?: string) => void;
		isActive?: (name: string) => boolean;
	} = $props();
</script>

<div class="flex flex-row items-center gap-1">
	<ToolbarButton
		emoji="bold"
		label={m.bold()}
		onclick={() => perform('bold')}
		{darkMode}
		{color}
		style={isActive('bold')
			? `background-color: ${color}; opacity: 0.6;`
			: ''}
	/>
	<ToolbarButton
		emoji="italic"
		label={m.italic()}
		onclick={() => perform('italic')}
		{darkMode}
		{color}
		style={isActive('italic')
			? `background-color: ${color}; opacity: 0.6;`
			: ''}
	/>
	<ToolbarButton
		emoji="strikethrough"
		label={m.strikethrough()}
		onclick={() => perform('strike')}
		{darkMode}
		{color}
		style={isActive('strike')
			? `background-color: ${color}; opacity: 0.6;`
			: ''}
	/>
	<ToolbarButton
		emoji="link"
		label="URL"
		onclick={() => {
			const url = prompt('Enter URL');
			if (url) perform('link', url);
		}}
		{darkMode}
		{color}
	/>
</div>
