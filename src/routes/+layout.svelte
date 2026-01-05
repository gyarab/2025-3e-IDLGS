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
	<noscript class="absolute top-0 left-0 z-50! w-screen h-screen text-2xl flex flex-col justify-center items-center bg-violet-700 text-white font-medium">
		JavaScript is required in order to use this page.
	</noscript>
	{@render children?.()}
</div>
