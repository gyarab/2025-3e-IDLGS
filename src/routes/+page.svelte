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

<GuestNavbar
	darkMode={data.darkMode}
	startScale={0.8}
/>

<div
	class="flex h-full min-h-svh w-full max-w-screen flex-col items-center justify-center gap-2
		overflow-x-hidden overflow-y-auto {data.darkMode
		? 'bg-neutral-600 text-white'
		: 'bg-neutral-200 text-black'}"
>
	<Head
		darkMode={data.darkMode}
		color={data.color}
	/>

	<About
		darkMode={data.darkMode}
		color={data.color}
	/>

	<Features
		darkMode={data.darkMode}
		color={data.color}
	/>

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

	<Footer />
</div>
