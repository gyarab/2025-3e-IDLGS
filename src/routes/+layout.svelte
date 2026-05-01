<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import 'remixicon/fonts/remixicon.css';
	import type { Snippet } from 'svelte';
	import Navbar from './(base)/ui/Navbar.svelte';
	import Footer from './(base)/ui/Footer.svelte';
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	let {
		children,
		data,
	}: {
		children: Snippet;
		data: {
			color: string;
			darkMode: boolean;
			navbarOpen: boolean;
		};
	} = $props();

	let darkMode = $derived(data.darkMode);
	let navbarOpen = $derived(data.navbarOpen);

	const keyboardHandler = (e: KeyboardEvent) => {
		const tagNameActive = document.activeElement?.tagName.toLowerCase();
		if (tagNameActive == 'input' || tagNameActive == 'button') return;

		console.log(tagNameActive);

		if (e.key === 'f' || e.key === 'F') {
			e.preventDefault();
			navbarOpen = !navbarOpen;
		}
	};

	onMount(() => {
		if (browser) {
			addEventListener('keydown', keyboardHandler);
		}
	});
	onDestroy(() => {
		if (browser) {
			removeEventListener('keydown', keyboardHandler);
		}
	});
</script>

<svelte:head>
	<link
		rel="icon"
		href={favicon}
	/>
</svelte:head>

<Navbar
	{darkMode}
	bind:open={navbarOpen}
	accentColor={data.color}
/>

<div
	class="{data.darkMode
		? '**:text-white'
		: '**:text-black'} relative flex min-h-screen w-screen max-w-screen grow flex-col items-center overflow-x-hidden overflow-y-scroll **:z-5"
>
	{@render children()}
</div>

<Footer />
