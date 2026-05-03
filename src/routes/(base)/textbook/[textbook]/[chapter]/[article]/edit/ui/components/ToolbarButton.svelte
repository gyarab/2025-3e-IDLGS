<script lang="ts">
	import HoverEmoji from '$src/routes/(base)/components/HoverEmoji.svelte';

	let {
		darkMode,
		color,
		emoji,
		label,
		onclick,
		style,
	}: {
		darkMode: boolean;
		color: string;
		emoji: string;
		label: string;
		style?: string;
		onclick: () => void;
	} = $props();

	let button: HTMLButtonElement | undefined = $state(undefined);
</script>

<button
	aria-label={label}
	title={label}
	class="relative group pb-1 pt-1"
	{onclick}	
	bind:this={button}
	{style}
>
	<span
		class="rounded-lg pointer-events-none top-0 left-0 w-full h-full group-hover:opacity-50 opacity-0 z-50 absolute"
		style="background-color: {color};"
		onclick={() => button!.click()}
		tabindex="-1"
		aria-label={label}
		title={label}
		role="button"
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				button!.click();
			}
		}}
	>

	</span>
	<i class="ri-{emoji}"></i>
</button>
