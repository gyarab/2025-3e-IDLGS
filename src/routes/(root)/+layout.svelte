<script lang="ts">
	import Navbar from './components/navbar/Navbar.svelte';
	import Footer from './components/navbar/Footer.svelte';
	import NavbarMobile from './components/navbar/NavbarMobile.svelte';
	import NavbarLoggedIn from './components/navbar/NavbarLoggedIn.svelte';
	import NavbarLoggedInMobile from './components/navbar/NavbarLoggedInMobile.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
		defer
	></script>
</svelte:head>

<div
	class="flex min-h-screen! min-w-screen! w-screen! max-w-screen! grow flex-col overflow-x-hidden overflow-y-scroll"
>
	{#if data.user}
		<NavbarLoggedIn user={data.user} />
		<NavbarLoggedInMobile user={data.user} />
	{:else}
		<Navbar />
		<NavbarMobile />
	{/if}
	<div class="relative flex w-full grow flex-col">
		{@render children?.()}
	</div>
	<Footer />
</div>
