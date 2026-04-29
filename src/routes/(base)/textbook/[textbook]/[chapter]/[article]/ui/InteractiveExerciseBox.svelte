<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';
	import { darkenHex } from '$lib';

	let {
		color,
		darkMode,
	}: {
		color: string;
		darkMode: boolean;
	} = $props();
</script>

<div
	class="flex min-h-[30svh] w-6/10 flex-row justify-center rounded-lg p-2 text-white shadow-lg"
	style="background-color: {darkenHex(color, darkMode ? 50 : 0)};"
></div>
