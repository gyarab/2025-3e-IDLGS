<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';
	import Logo from '../Logo.svelte';
	import HoverEmoji from '../HoverEmoji.svelte';
	import type { UserType } from '$lib/types';
	import { writeDegree } from '$lib';
	import NavbarLink from './components/NavbarLink.svelte';
	import Navbar from './Navbar.svelte';

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

<div
	class="flex h-[6svh] w-full print:hidden max-xl:hidden"
	id="loggedInNavbarFill"
></div>
<nav
	id="loggedInNavbar"
	class="fixed top-0 left-0 z-50! flex h-[6svh] w-full flex-col items-center justify-center bg-violet-900 max-xl:hidden print:hidden"
>
	<div
		class="3xl:gap-10 fixed z-40! flex flex-row items-center font-medium text-white! *:flex-nowrap *:text-nowrap xl:gap-2 2xl:gap-6"
	>
		<Logo whiteBackground={false} />

		<NavbarLink
			link="/home"
			emoji="home-5"
		>
			{m.home()}
		</NavbarLink>

		<NavbarLink
			link="/due"
			emoji="todo"
		>
			{m.assignments()}
		</NavbarLink>

		<NavbarLink
			link="/grades"
			emoji="line-chart"
		>
			{m.grades()}
		</NavbarLink>

		<NavbarLink
			link="/study"
			emoji="book-open"
		>
			{m.selfStudying()}
		</NavbarLink>

		<div class="grow"></div>

		<!-- if admin: show admin page -->
		{#if user.admin}
			<NavbarLink
				link="/admin"
				emoji="government"
			>
				{m.administration()}
			</NavbarLink>

			<div class="grow"></div>
		{/if}

		<!-- clicking both user and settings icon redirects to settings -->

		<NavbarLink
			link="/settings"
			emoji="user-3"
		>
			<span>{writeDegree(user.degree)}</span>
			<span>{user.name}</span>
			<span>{user.surname}</span>
		</NavbarLink>

		<NavbarLink
			link="/settings"
			emoji="settings"
			classCss="max-2xl:hidden"
		>
			{m.settings()}
		</NavbarLink>

		<NavbarLink
			link="/logout"
			emoji="logout-box"
		>
			{m.logout()}
		</NavbarLink>
	</div>
</nav>
