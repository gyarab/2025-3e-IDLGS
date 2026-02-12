<script lang="ts">
	import Navbar from './components/navbar/Navbar.svelte';
	import Footer from './components/navbar/Footer.svelte';
	import NavbarMobile from './components/navbar/NavbarMobile.svelte';
	import NavbarLoggedIn from './components/navbar/NavbarLoggedIn.svelte';
	import NavbarLoggedInMobile from './components/navbar/NavbarLoggedInMobile.svelte';
	import FooterMobile from './components/navbar/FooterMobile.svelte';
	import type { Snippet } from 'svelte';
	import type { UserType } from '$lib/types';

	let {
		children,
		data,
	}: {
		children: Snippet;
		data: {
			user: UserType;
		};
	} = $props();
</script>

<svelte:head>
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
		defer
	></script>
</svelte:head>

{#key data.user}
	<div
		class="flex min-h-screen! w-screen! max-w-screen! min-w-screen! grow flex-col"
	>
		{#if data.user}
			<NavbarLoggedIn user={data.user} />
		{:else}
			<Navbar />
		{/if}
		<div class="relative flex w-full grow flex-col max-w-screen">
			{@render children()}
		</div>
		<Footer user={data.user} />
		<FooterMobile user={data.user} />
	</div>
{/key}
