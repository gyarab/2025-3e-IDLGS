<script lang="ts">
	import Navbar from './navbar/Navbar.svelte';
	import Footer from './navbar/Footer.svelte';
	import NavbarMobile from './navbar/NavbarMobile.svelte';
	import NavbarLoggedIn from './navbar/NavbarLoggedIn.svelte';
	import NavbarLoggedInMobile from './navbar/NavbarLoggedInMobile.svelte';

	let { children, data } = $props();
</script>

<div
	class="flex min-h-screen w-screen max-w-screen min-w-screen grow flex-col overflow-x-hidden overflow-y-scroll"
>
	{#if data.user}
		<NavbarLoggedIn />
		<NavbarLoggedInMobile />
	{:else}
		<Navbar />
		<NavbarMobile />
	{/if}
	<div class="relative flex w-full grow flex-col">
		{@render children?.()}
	</div>
	<Footer />
</div>
