<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';
	import { onDestroy, onMount } from 'svelte';
	import Button from '../../components/Button.svelte';
	import HorizontalLine from '../../components/HorizontalLine.svelte';
	import PasswordInput from '../../components/PasswordInput.svelte';
	import { browser } from '$app/environment';
	import { getLocale } from '$lib/paraglide/runtime';

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});

	const turnstile = (node: HTMLElement) => {
		if (!browser) return;
		try {
			const id = window.turnstile.render(node, {
				sitekey: '0x4AAAAAABlMZWB6LlSqCWXH',
				size: 'flexible',
				theme: 'light',
				'refresh-timeout': 'auto',
				'refresh-expired': 'auto',
				language: getLocale() as string
			});
			return {
				destroy: () => {
					window.turnstile.remove(id as unknown as HTMLElement);
				}
			};
		} catch (error) {
			console.error(error);
		}
	};
</script>

<svelte:head>
	<title>
		{m.login()} - {m.textbookNameShort()}
	</title>
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
		async
		defer
	></script>
</svelte:head>

{#key ready}
	<div
		data-sveltekit-reload
		class="flex w-full grow flex-col items-center justify-center gap-2 bg-linear-to-tr from-emerald-500 to-violet-700 p-10"
	>
		<form
			class="flex flex-col gap-2 rounded-2xl border border-emerald-500 bg-white p-5 shadow-lg max-lg:min-w-9/10 lg:min-w-1/3"
			method="post"
			action="?/login"
			use:enhance
		>
			<h2 class="text-violet-700">{m.login()}</h2>

			<input name="email" type="text" class="input-text" placeholder={m.enterYourEmail()} />

			<PasswordInput formName="password" />

			<div class="flex w-full flex-row items-center gap-2 text-black">
				<input name="remember" type="checkbox" class="input-checkbox" />
				<label for="remember">{m.rememberMe()}</label>
			</div>

			{#if ready}
				<div use:turnstile></div>
			{/if}

			<div class="flex w-full flex-row items-center gap-2 text-sm text-emerald-500">
				{m.forgotPassword()}

				<button class="button-violet" type="button">
					{m.reset()}
				</button>
			</div>

			<Button emoji={'login-box'} btn={'button-primary'} type={'submit'}>
				{m.login()}
			</Button>

			<HorizontalLine text={m.orIfYouDontHaveAnAccount()} color={'rgb(0, 128, 0)'} />

			<Button emoji={'user-add'} btn={'button-green'}>
				{m.signUp()}
			</Button>
			<Button emoji={'slideshow'} btn={'button-violet'}>
				{m.viewDemo()}
			</Button>
		</form>
	</div>
{/key}
