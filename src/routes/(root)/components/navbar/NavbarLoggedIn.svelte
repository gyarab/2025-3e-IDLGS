<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';
	import Logo from '../Logo.svelte';
	import HoverEmoji from '../HoverEmoji.svelte';
	import type { UserType } from '$lib/types';
	import { writeDegree } from '$lib';

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
	class="flex h-[6svh] w-full print:hidden"
	id="loggedInNavbarFill"
></div>
<nav
	id="loggedInNavbar"
	class="fixed top-0 left-0 z-50! flex h-[6svh] w-full flex-col items-center justify-center bg-violet-900 max-xl:hidden print:hidden"
>
	<div
		class="3xl:gap-10 fixed z-40! flex w-8/10 flex-row items-center font-medium text-white! *:flex-nowrap *:text-nowrap xl:gap-2 2xl:gap-6"
	>
		<Logo whiteBackground={false} />

		<a href="/home/">
			<HoverEmoji emoji="home-5" />
			{m.home()}
		</a>

		<a href="/due/">
			<HoverEmoji emoji="todo" />
			{m.assignments()}
		</a>

		<a href="/grades/">
			<HoverEmoji emoji="line-chart" />
			{m.grades()}
		</a>

		<a href="/help/">
			<HoverEmoji emoji="questionnaire" />
			{m.help()}
		</a>

		<div class="grow"></div>

		<!-- if admin: show admin page -->
		{#if user.admin}
			<a href="/admin/">
				<HoverEmoji emoji="government" />
				{m.administration()}
			</a>

			<div class="grow"></div>
		{/if}

		<!-- clicking both user and settings icon redirects to settings -->

		<a href="/settings/">
			<HoverEmoji emoji="user-3" />
			<span>{writeDegree(user.degree)}</span>
			<span>{user.name}</span>
			<span>{user.surname}</span>
		</a>

		<a
			href="/settings/"
			class="max-2xl:hidden"
		>
			<HoverEmoji emoji="settings" />
			{m.settings()}
		</a>

		<a
			href="/logout/"
			data-sveltekit-reload
			data-sveltekit-noscroll
		>
			<HoverEmoji emoji="logout-box" />
			{m.logout()}
		</a>
	</div>
</nav>
