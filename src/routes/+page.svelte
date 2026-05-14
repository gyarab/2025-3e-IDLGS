<script lang="ts">
	import Footer from './ui/Footer.svelte';
	import About from './ui/main/About.svelte';
	import Features from './ui/main/Features.svelte';
	import Head from './ui/main/Head.svelte';
	import Team from './ui/main/Team.svelte';
	import GuestNavbar from './ui/GuestNavbar.svelte';
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

<div
	class="flex h-full min-h-screen w-full max-w-screen flex-col items-center justify-center gap-0 overflow-x-hidden overflow-y-auto"
>
	<GuestNavbar
		darkMode={data.darkMode}
		startScale={0.8}
	/>

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
