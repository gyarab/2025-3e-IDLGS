<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import Button from '$component/Button.svelte';
	import HorizontalLine from '$component/HorizontalLine.svelte';
	import PasswordInput from '$component/PasswordInput.svelte';
	import Form from '$component/Form.svelte';
	import AlertBox from '$component/AlertBox.svelte';
	import Card from '$component/Card.svelte';
	import TextInput from '$component/TextInput.svelte';

	let { data } = $props();

	let ready = $state(false);
	let formMessage = $state('');

	onMount(() => {
		ready = true;
	});

	let solved = $derived(data.dev);
</script>

<svelte:head>
	<title>
		{m.login()} - {m.textbookNameShort()}
	</title>
	<script
		src="https://cdn.jsdelivr.net/npm/@cap.js/widget"
		async
		defer
	></script>
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
				final={async () => {
					solved = data.dev;
				}}
			>
				<h2 class="w-full text-white max-xl:text-center xl:text-left">
					{m.login()}
				</h2>

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

				{#if ready && !data.dev}
					<cap-widget
						id="cap"
						data-cap-api-endpoint="https://ucebnice.martinbykov.eu/645d6876bc"
						onsolve={() => {
							solved = true;
						}}
					></cap-widget>
				{/if}

				<Button
					emoji="login-box"
					btn="button-blue"
					type="submit"
					disabled={!solved}
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
							class="text-blue-300"
						>
							{m.reset()}
						</a>
					</span>
				</div>
			</Form>
		</Card>
	</div>
{/if}
