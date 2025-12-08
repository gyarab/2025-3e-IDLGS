<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import 'remixicon/fonts/remixicon.css'
	import Navbar from './Navbar.svelte';
	import ChatBot from './components/ChatBot.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="flex min-h-screen w-screen max-w-screen min-w-screen grow flex-col overflow-x-hidden overflow-y-scroll"
>
	<Navbar />
	<div class="h-[10lvh] w-full"></div>
	{@render children?.()}
	<ChatBot />
</div>
