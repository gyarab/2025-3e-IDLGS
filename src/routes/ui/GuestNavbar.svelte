<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { m } from '$lib/paraglide/messages';
	import { setDarkMode } from '$lib';
	import NavButton from '../(base)/components/NavButton.svelte';
	import { scale } from 'svelte/transition';

	let {
		darkMode,
		css,
		startScale = 1,
	}: {
		darkMode: boolean;
		css?: string;
		startScale: number;
	} = $props();
</script>

<div
	class="fixed top-4 z-40 w-full"
	in:scale={{ duration: 600, start: startScale }}
>
	<div
		class="mx-auto flex h-12 w-full max-w-5xl items-center justify-center px-4 {css}"
	>
		<div
			class="relative flex w-full items-center
				rounded-full border text-sm shadow-[0_8px_40px_rgba(80,80,80,0.4)]
				backdrop-blur-sm transition-all sm:px-4 sm:shadow-[0_-8px_32px_rgba(80,80,80,0.3)]
			{darkMode
				? 'border-white/30 bg-black/30 text-white'
				: 'border-black/20 bg-white/60 text-black'}"
		>
			<a href="/">
				<img
					src="/logo.svg"
					alt="Logo"
					class="h-10 px-2 transition-transform hover:scale-90"
				/>
			</a>

			<div class="grow"></div>

			<NavButton
				onclick={async () => {
					await setDarkMode(!darkMode);
					await invalidateAll();
				}}
				emoji={darkMode ? 'sun' : 'moon'}
				css="buttonPrimary px-4"
				label={darkMode ? m.lightMode() : m.darkMode()}
				{darkMode}
			/>

			<NavButton
				onclick={() => {
					goto(resolve('/(protected)/login'));
				}}
				text={m.login()}
				emoji="login-box"
				css="buttonPrimary"
				hecss="text-xl"
				{darkMode}
			/>
		</div>
	</div>
</div>
