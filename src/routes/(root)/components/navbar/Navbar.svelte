<script lang="ts">
	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages';
	import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';
	import Button from '../Button.svelte';
	import HoverEmoji from '../HoverEmoji.svelte';
	import LangDropdown from '../LangDropdown.svelte';
	import Logo from '../Logo.svelte';

	let value: Locale = $state(getLocale());

	$effect(() => {
		setLocale(value);
	});
</script>

<div class="flex h-[4svh] w-full max-xl:hidden print:hidden"></div>
<nav
	id="loggedOutNavbar"
	class="fixed top-0 left-0 z-50! flex h-[4svh] w-full flex-col items-center justify-center bg-white max-xl:hidden print:hidden"
>
	<div
		class="fixed z-40! flex w-8/10 flex-row items-center gap-10 font-medium text-blue-900"
	>
		<Logo />

		<LangDropdown
			css="button-transparent text-cyan-600"
			cssLocal={''}
			cssSelector={'text-blue-900 hover:text-cyan-600 bg-white hover:bg-cyan-600 hover:text-white'}
			bind:langValue={value}
		/>

		<a
			href="/"
			class="group"
		>
			<HoverEmoji emoji="home-5" />
			{m.home()}
		</a>

		<a
			href="/library"
			class="group"
		>
			<HoverEmoji emoji="book-shelf" />
			{m.library()}
		</a>

		<a href="/#about">
			<i class="ri-info-i"></i>
			{m.aboutUs()}
		</a>

		<a
			href="/#contact"
			class="group"
		>
			<HoverEmoji emoji="contacts-book-2" />
			{m.contact()}
		</a>

		<div class="grow"></div>

		<Button
			emoji="login-box"
			btn="button-blue p-1! ps-2! pe-2!"
			onclick={() => {
				goto('/login', {
					invalidateAll: true,
				});
			}}
		>
			{m.login()}
		</Button>
	</div>
</nav>
