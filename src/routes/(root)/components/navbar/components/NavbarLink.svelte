<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import HoverEmoji from '$component/HoverEmoji.svelte';
	import type { Snippet } from 'svelte';

	let {
		link,
		emoji,
		children,
		classCss,
		reload = false,
	}: {
		link: string;
		emoji: string;
		children: Snippet;
		classCss?: string;
		reload?: boolean;
	} = $props();
</script>

<a
	href={link}
	class="{page.url.pathname == link
		? 'underline decoration-emerald-600 decoration-2 underline-offset-6'
		: ''} {classCss}"
	data-sveltekit-reload={reload}
>
	<HoverEmoji {emoji} />
	{@render children()}
</a>
