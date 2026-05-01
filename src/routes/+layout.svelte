<script lang="ts">
	import type { Snippet } from "svelte";
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import 'remixicon/fonts/remixicon.css';

	let {
		children
	}: {
		children: Snippet
	} = $props();
</script>

<svelte:head>
	<link
		rel="icon"
		href={favicon}
	/>
</svelte:head>

{@render children()}