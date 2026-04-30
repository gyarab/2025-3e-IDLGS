<script lang="ts">
	import { darkenHex } from '$lib';
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
	class="flex w-full grow flex-col items-center bg-linear-to-br from-white from-0% to-white to-100% p-4"
	style="--tw-gradient-from: {data.color}; --tw-gradient-to: {darkenHex(
		data.color,
		80,
	)};"
>
	{@render children()}
</div>
