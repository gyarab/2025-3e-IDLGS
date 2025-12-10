<script lang="ts">
	import Navbar from './Navbar.svelte';
	import ChatBot from './components/ChatBot.svelte';
	import Footer from './Footer.svelte';

	let { children } = $props();
</script>

<div
	class="flex min-h-screen w-screen max-w-screen min-w-screen grow flex-col overflow-x-hidden overflow-y-scroll"
>
	<Navbar />
	<div class="h-[10lvh] w-full"></div>
	<div class="relative flex w-full grow flex-col">
		{@render children?.()}
		<ChatBot />
	</div>
	<Footer />
</div>
