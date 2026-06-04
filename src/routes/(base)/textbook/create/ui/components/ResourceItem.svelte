<script lang="ts">
	import { sanitizeColor } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import HoverEmoji from '$src/routes/(base)/components/HoverEmoji.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { fly } from 'svelte/transition';

	let {
		resource,
		darkMode,
		selected,
		i,
		amount,
		color,
		onclick,
		onedit,
		onremove,
	}: {
		resource: {
			title: string;
			url?: string;
			description?: string;
			id?: string;
			order?: number;
			imageData?: string;
		};
		darkMode: boolean;
		selected?: boolean;
		i: number;
		amount: number;
		color: string;
		onclick: () => void;
		onedit?: () => void;
		onremove?: () => void;
	} = $props();

	const openExternal = (url?: string) => {
		if (!url) return;
		const norm = url.match(/^https?:\/\//i) ? url : `https://${url}`;
		window.open(norm, '_blank', 'noopener');
	};
</script>

<div
	class="group flex w-full flex-row items-center gap-2 rounded-lg p-2 {darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-200 text-black'}"
	style={selected
		? `background-color: ${sanitizeColor(color, darkMode ? 40 : 80)} !important;`
		: ''}
	in:fly|global={{
		x: 100,
		y: 0,
		duration: 200,
		delay: 50 + i * 50,
		opacity: 0,
	}}
>
	<button
		type="button"
		class="mt-1 mb-1 flex grow flex-row items-center gap-2"
		{onclick}
		title={m.resourceTitle()}
		aria-label={m.resourceTitle()}
	>
		<HoverEmoji emoji={selected ? 'checkbox' : 'checkbox-blank'} />
		{#if resource.imageData}
			<img
				src={resource.imageData}
				alt="thumb"
				class="h-10 w-10 rounded object-cover"
			/>
		{/if}
		<div class="flex flex-col items-start">
			<h2 class="mb-0!">{resource.title}</h2>
			{#if resource.url}
				<a
					href="_blank"
					class="text-sm text-blue-500 underline opacity-80"
					onclick={() => openExternal(resource.url)}>{resource.url}</a
				>
			{/if}
		</div>
		<div class="grow"></div>
	</button>

	<Button
		label={m.editResource()}
		emoji="pencil"
		type="button"
		onclick={() => (typeof onedit === 'function' ? onedit() : onclick())}
		text=""
	/>
	<Button
		label={m.deleteResource ? m.deleteResource() : 'Delete'}
		emoji="close"
		type="button"
		onclick={() => (typeof onremove === 'function' ? onremove() : null)}
		text=""
	/>
</div>
