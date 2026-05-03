<script lang="ts">
	import { browser } from '$app/environment';
	import { darkenHex } from '$lib';
	import { onMount, type Snippet } from 'svelte';

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

	onMount(() => {
		if(browser) {
			document.documentElement.style.scrollbarColor = `${darkenHex(data.color, 120)} rgba(0, 0, 0, 0) !important`;
		}
	})
</script>

<div
	class="flex w-full grow flex-col items-center bg-linear-to-br from-white from-0% to-white to-100% p-4"
	style="--tw-gradient-from: {data.color}; --tw-gradient-to: {darkenHex(
		data.color,
		80,
	)};"
>
	{@render children()}
</div>
