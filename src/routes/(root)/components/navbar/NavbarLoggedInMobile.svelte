<script lang="ts">
	import type { UserType } from '$lib/types';
	import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';
	import LangDropdown from '../LangDropdown.svelte';
	import { m } from '$lib/paraglide/messages';
	import HoverEmoji from '../HoverEmoji.svelte';
	import NavbarLink from './components/NavbarLink.svelte';

	let value: Locale = $state(getLocale());

	$effect(() => {
		setLocale(value);
	});

	let {
		user,
	}: {
		user: UserType;
	} = $props();
</script>

<nav
	id="loggedInNavbarMobile"
	class="fixed bottom-0 left-0 z-50! flex h-[8svh]
	w-full flex-col items-center justify-center bg-violet-900 xl:hidden print:hidden"
>
	<NavbarLink
		link="/home"
		emoji="home-5"
	>
		{m.home()}
	</NavbarLink>
</nav>
