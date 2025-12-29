<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import Button from '../../components/Button.svelte';
	import HorizontalLine from '../../components/HorizontalLine.svelte';
	import PasswordInput from '../../components/PasswordInput.svelte';
	import { browser } from '$app/environment';
	import { getLocale } from '$lib/paraglide/runtime';
	import Card from '../../components/Card.svelte';
	import WordBackground from '../../components/WordBackground.svelte';

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
				theme: 'dark',
				'refresh-timeout': 'auto',
				'refresh-expired': 'auto',
				language: getLocale() as string,
			});
			return {
				destroy: () => {
					window.turnstile.remove(id as unknown as HTMLElement);
				},
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
		class="relative flex w-full grow flex-col items-center justify-center gap-2 p-10"
	>
		<WordBackground />
		<Card
			css="max-xl:min-w-9/10 xl:min-w-1/3 z-11"
			perspective={false}
			forceSquare={false}
			padding="p-3"
		>
			<form
				class="flex w-full grow flex-col gap-2"
				method="post"
				action="?/login"
				use:enhance
			>
				<h2 class="w-full text-left text-white">{m.login()}</h2>

				<input
					name="email"
					type="text"
					class="input-text w-full"
					placeholder={m.enterYourEmail()}
				/>

				<PasswordInput
					formName="password"
					cssClass="w-full"
				/>

				<div
					class="flex w-full flex-row items-center gap-2 font-medium text-white"
				>
					<input
						name="remember"
						type="checkbox"
						class="input-checkbox"
					/>
					<label for="remember">{m.rememberMe()}</label>
				</div>

				{#if ready}
					{#key ready}
						<div use:turnstile></div>
					{/key}
				{/if}

				<Button
					emoji="login-box"
					btn="button-primary"
					type="submit"
				>
					{m.login()}
				</Button>

				<HorizontalLine
					text={m.orIfYouDontHaveAnAccount()}
					color="rgb(255, 255, 255)"
				/>

				<Button
					emoji="user-add"
					btn="button-violet"
				>
					{m.signUp()}
				</Button>

				<HorizontalLine color="rgb(255, 255, 255)" />

				<div
					class="flex w-full flex-row items-center justify-center gap-2 text-sm text-white"
				>
					<span class="font-medium">
						{m.forgotPassword()}
						<a
							href="/forgot/"
							class="text-violet-300"
						>
							{m.reset()}
						</a>
					</span>
				</div>
			</form>
		</Card>
	</div>
{/key}
