<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { m } from '$lib/paraglide/messages';
	import { setDarkMode } from '$lib';
	import NavButton from '../(base)/components/NavButton.svelte';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();
</script>

<div class="fixed top-0 mt-4 z-40 w-full">
	<div
		class="mx-auto flex h-[7svh] w-full max-w-6xl items-center justify-center px-4"
	>
		<div
			class="relative flex w-full items-center rounded-full border text-sm shadow-lg backdrop-blur-xs {darkMode
				? 'border-white/20 bg-black/20 text-white'
				: 'border-white/40 bg-white/40 text-black'}"
		>
			<img
				src="/logo.svg"
				alt="Logo"
				class="hidden h-10 sm:inline px-4"
			/>

			<div class="grow"></div>

			<NavButton
				onclick={async () => {
					await setDarkMode(!darkMode);
					location.reload();
				}}
				emoji={darkMode ? 'sun' : 'moon'}
				css="buttonPrimary px-4"
				label={darkMode ? m.lightMode() : m.darkMode()}
				darkMode={darkMode}
			/>

			<NavButton
				onclick={() => {
					goto(resolve('/(protected)/login'));
				}}
				text={m.login()}
				emoji="login-box"
				css="buttonPrimary"
				hecss="text-xl"
				darkMode={darkMode}
			/>
		</div>
	</div>
</div>
