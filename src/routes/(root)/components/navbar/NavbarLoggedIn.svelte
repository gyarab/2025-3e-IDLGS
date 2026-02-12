<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';
	import Logo from '../Logo.svelte';
	import type { UserType } from '$lib/types';
	import { writeDegree } from '$lib';
	import NavbarLink from './components/NavbarLink.svelte';
	import { page } from '$app/state';
	import { writeDays } from '$lib/plural';

	let value: Locale = $state(getLocale());

	$effect(() => {
		setLocale(value);
	});

	let {
		user,
	}: {
		user: UserType;
	} = $props();

	let isInTextbook = $derived(page.url.pathname.includes('/textbook/'));
	let isInCourse = $derived(page.url.pathname.includes('/course/'));
	let isInTextbookOrCourse = $derived(isInTextbook || isInCourse);
</script>

<div
	id="loggedInNavbarFill"
	class="h-[4svh] w-full"
></div>
<nav
	id="loggedInNavbar"
	class="
		3xl:gap-10 *:3xl:gap-10 fixed top-0 left-0 z-50! m-0! flex h-[4svh] w-full grow flex-row items-center
		justify-center bg-blue-200 p-0! font-medium text-white! print:hidden"
>
	<div class="flex h-[4svh] min-w-1/8 grow flex-row bg-blue-900"></div>

	<div
		class="
			flex h-[4svh] w-6/8 flex-row items-center gap-0 rounded-b-xl *:flex-nowrap *:text-nowrap max-xl:hidden *:xl:gap-2
			*:2xl:gap-6
			"
	>
		<div
			class="
			flex h-[4svh] flex-row items-center gap-1 rounded-br-xl bg-blue-900 ps-4 pe-4
		"
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
				link="/admin"
				emoji="school"
			>
				{m.schoolAdministration()}
			</NavbarLink>
		</div>

		<div class="relative flex h-[4svh] grow flex-row">
			<div
				class="aspect-square h-full w-auto"
				style="background-image: radial-gradient(circle at 100% 100%, transparent 0%, transparent 5svh, var(--color-blue-900) 5svh, var(--color-blue-900) 100%);"
			></div>
			<div
				class="flex grow flex-row items-center justify-center gap-1 text-blue-900"
			>
				{#if isInTextbook}
					<i class="ri-book-ai-line text-2xl"></i>
					<span class="decoration-offset-4 underline decoration-2">
						{m.textbook()}
					</span>
				{:else if isInCourse}
					<i class="ri-file-list-3-line text-2xl"></i>
					<span class="decoration-offset-4 underline decoration-2">
						{m.course()}
					</span>
				{:else if user.gamification && !user.schoolDirector && !user.schoolTeacher}
					{#if user.extended}
						<i class="ri-fire-fill text-xl text-amber-600"></i>
					{:else}
						<i class="ri-fire-line text-xl text-blue-900"></i>
					{/if}
					{user.streak}
					{writeDays(user.streak)}
				{/if}
			</div>
			<div
				class="aspect-square h-full w-auto"
				style="background-image: radial-gradient(circle at 0% 100%, transparent 0%, transparent 5svh, var(--color-cyan-600) 5svh, var(--color-cyan-600) 100%);"
			></div>
		</div>

		<div
			class="flex h-[4svh] flex-row items-center gap-1 rounded-bl-xl bg-cyan-600 ps-4 pe-4"
		>
			<NavbarLink
				link="/settings"
				emoji="user-3"
				secondary={true}
			>
				<span>{writeDegree(user.degree)}</span>
				<span>{user.name}</span>
				<span>{user.surname}</span>
			</NavbarLink>

			<NavbarLink
				link="/logout"
				emoji="logout-box"
				reload={true}
				secondary={true}
			>
				{m.logout()}
			</NavbarLink>
		</div>
	</div>

	<div class="flex h-[4svh] min-w-1/8 grow flex-row bg-cyan-600"></div>
</nav>
