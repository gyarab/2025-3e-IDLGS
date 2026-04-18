<script lang="ts">
	import { type Snippet } from 'svelte';

	let {
		children,
		data,
	}: {
		children: Snippet;
		data: {
			color: string;
			darkMode: boolean;
		};
	} = $props();

	let darkMode = $derived(data.darkMode);
</script>

<div
	class="relative flex min-h-screen w-screen grow flex-col items-center overflow-x-hidden overflow-y-scroll **:z-5"
>
	{@render children()}
</div>
