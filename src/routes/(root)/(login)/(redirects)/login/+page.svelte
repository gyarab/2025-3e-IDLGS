<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import Button from '$component/Button.svelte';
	import HorizontalLine from '$component/HorizontalLine.svelte';
	import PasswordInput from '$component/PasswordInput.svelte';
	import Form from '$component/Form.svelte';
	import AlertBox from '$component/AlertBox.svelte';
	import { cloudflareTurnstileBox } from '$lib';
	import Card from '$component/Card.svelte';
	import TextInput from '$component/TextInput.svelte';

	let ready = $state(false);
	let formMessage = $state('');

	onMount(() => {
		ready = true;
	});
</script>

<svelte:head>
	<title>
		{m.login()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<AlertBox bind:message={formMessage} />

{#if ready}
	<div
		class="flex w-full grow flex-col items-center justify-center gap-2 p-10"
	>
		<Card
			css="max-xl:min-w-9/10 xl:min-w-1/3 z-11"
			perspective={false}
			forceSquare={false}
			padding="p-3"
		>
			<Form
				action="?/login"
				failure={async () => {
					formMessage = m.incorrectCredentials();
				}}
			>
				<h2 class="w-full max-xl:text-center xl:text-left text-white">{m.login()}</h2>

				<TextInput
					name="email"
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

				{#key ready && window.turnstile}
					<div use:cloudflareTurnstileBox></div>
				{/key}

				<Button
					emoji="login-box"
					btn="button-primary"
					type="submit"
				>
					{m.login()}
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
			</Form>
		</Card>
	</div>
{/if}
