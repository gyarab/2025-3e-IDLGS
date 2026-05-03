<script lang="ts">
	import type { Snippet } from 'svelte';
	import Navbar from './ui/Navbar.svelte';
	import Footer from './ui/Footer.svelte';
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import { setLocale, type Locale } from '$lib/paraglide/runtime';
	import type { UserType } from '$lib/types';

	let {
		children,
		data,
	}: {
		children: Snippet;
		data: {
			color: string;
			darkMode: boolean;
			navbarOpen: boolean;
			user: UserType;
		};
	} = $props();

	let darkMode = $derived(data.darkMode);
	let navbarOpen = $derived(data.navbarOpen);

	const keyboardHandler = (e: KeyboardEvent) => {
		const tagNameActive = document.activeElement?.tagName.toLowerCase();
		if (tagNameActive == 'input' || tagNameActive == 'button') return;

		if (e.key === 'f' || e.key === 'F') {
			e.preventDefault();
			navbarOpen = !navbarOpen;
		}
	};

	onMount(() => {
		if (browser) {
			addEventListener('keydown', keyboardHandler);
		}
		if (data.user) setLocale(data.user.language as Locale);
	});
	onDestroy(() => {
		if (browser) {
			removeEventListener('keydown', keyboardHandler);
		}
	});
</script>

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
