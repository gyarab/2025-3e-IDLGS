<script lang="ts">
	import { sanitizeColor } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import HoverEmoji from '$src/routes/(base)/components/HoverEmoji.svelte';
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
		onup,
		ondown,
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
		onup: () => void;
		ondown: () => void;
	} = $props();

	const httpLink = (url?: string) => {
		if (!url) return;
		const norm = url.match(/^https?:\/\//i) ? url : `https://${url}`;
		return norm;
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
					target="_blank"
					class="text-sm font-medium text-blue-500 underline opacity-80"
					href={httpLink(resource.url)}
					rel="external"
				>
					{resource.url}
				</a>
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
		label={m.moveResourceUp()}
		emoji="arrow-up-double"
		type="button"
		onclick={() => {
			onup();
		}}
		text=""
		disabled={i === 0}
		css={darkMode ? 'text-white!' : 'text-black!'}
		hecss={darkMode ? 'text-white!' : 'text-black!'}
	/>
	<Button
		label={m.moveResourceDown()}
		emoji="arrow-down-double"
		type="button"
		onclick={() => {
			ondown();
		}}
		text=""
		disabled={i === amount - 1}
		css={darkMode ? 'text-white!' : 'text-black!'}
		hecss={darkMode ? 'text-white!' : 'text-black!'}
	/>
</div>
