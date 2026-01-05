<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import 'remixicon/fonts/remixicon.css';

	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="icon"
		href={favicon}
	/>
</svelte:head>

<div
	class="relative flex min-h-screen w-screen max-w-screen min-w-screen grow flex-col overflow-x-hidden overflow-y-scroll"
>
	<noscript
		class="absolute top-0 left-0 z-50! flex h-screen w-screen flex-col items-center justify-center bg-violet-700 text-2xl font-medium text-white"
	>
		JavaScript is required in order to use this page.
	</noscript>
	{@render children?.()}
</div>
