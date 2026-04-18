<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		onclick,
		darkMode,
	}: {
		children: Snippet;
		onclick: () => void;
		darkMode: boolean;
	} = $props();
</script>

<button
	{onclick}
	type="button"
	class="flex h-full w-full grow flex-col rounded-2xl p-5 shadow-lg {darkMode
		? 'bg-neutral-800/70 text-white'
		: 'bg-neutral-100/70 text-black'} transition-all duration-200 hover:-translate-0.5"
>
	{@render children()}
</button>
