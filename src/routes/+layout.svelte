<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import 'remixicon/fonts/remixicon.css';
	import type { Snippet } from 'svelte';

	let {
		children,
		data,
	}: {
		children: Snippet;
		data: {
			darkMode: boolean;
		};
	} = $props();
</script>

<svelte:head>
	<link
		rel="icon"
		href={favicon}
	/>
</svelte:head>

{@render children()}

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
