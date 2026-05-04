<script lang="ts">
	import Footer from './ui/Footer.svelte';
	import About from './ui/main/About.svelte';
	import Features from './ui/main/Features.svelte';
	import Head from './ui/main/Head.svelte';
	import Team from './ui/main/Team.svelte';
	import NavbarLoggedOut from './ui/NavbarLoggedOut.svelte';
	import CallToAction from './ui/main/CallToAction.svelte';
	import { m } from '$lib/paraglide/messages';
	import Contact from './ui/main/Contact.svelte';
	import Split from './ui/main/Split.svelte';
	import { darkenHex } from '$lib';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
		};
	} = $props();
</script>

<svelte:head>
	<title>
		{m.idlgs()}
	</title>
</svelte:head>

<div class="max-w-screen overflow-x-hidden overflow-y-scroll flex h-full min-h-screen w-full flex-col gap-0 items-center justify-center">
	<NavbarLoggedOut darkMode={data.darkMode} color={data.color} />

	<Head
		darkMode={data.darkMode}
		color={data.color}
	/>

	<Split />

	<About
		darkMode={data.darkMode}
		color={data.color}
	/>

	<Split />

	<Features
		darkMode={data.darkMode}
		color={data.color}
	/>

	<Split />

	<Team
		darkMode={data.darkMode}
		color={data.color}
	/>

	<CallToAction
		darkMode={data.darkMode}
		color={data.color}
	/>

	<Contact
		darkMode={data.darkMode}
		color={data.color}
	/>

	<Split />

	<Footer />
</div>
