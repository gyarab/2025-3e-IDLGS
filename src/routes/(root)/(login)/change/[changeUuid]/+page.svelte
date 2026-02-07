<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';
	import Button from '$component/Button.svelte';
	import Card from '$component/Card.svelte';
	import Form from '$component/Form.svelte';
	import PasswordInput from '$component/PasswordInput.svelte';
	import PasswordInputValid from '$component/PasswordInputValid.svelte';
	import HiddenInput from '$component/HiddenInput.svelte';
	import { page } from '$app/state';

	let passwordValue = $state('');
	let passwordRepeat = $state('');
	let passwordValid = $state(false);

	let set = $state(false);
</script>

<svelte:head>
	<title>
		{m.setNewPassword()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div class="flex w-full grow flex-col items-center justify-center gap-2 p-10">
	<Card
		css="max-xl:min-w-9/10 xl:min-w-1/3 z-11"
		perspective={false}
		forceSquare={false}
		padding="p-3"
	>
		<Form
			action="?/setPassword"
			success={async () => {
				set = true;
			}}
			invalidateAll={false}
		>
			{#if !set}
				<h2 class="w-full max-xl:text-center xl:text-left">
					{m.setAPassword()}
				</h2>

				<HiddenInput
					name="uuid"
					value={page.params.changeUuid}
				/>

				<PasswordInput
					cssClass="w-full"
					formName="password"
					label={m.newPassword()}
					bind:value={passwordValue}
				/>
				<PasswordInput
					cssClass="w-full"
					formName="rpassword"
					label={m.confirmPassword()}
					bind:value={passwordRepeat}
				/>

				<PasswordInputValid
					password={passwordValue}
					rpassword={passwordRepeat}
					bind:valid={passwordValid}
				/>

				<Button
					btn="button-primary"
					emoji="lock-2"
					cssClass="w-full"
					type="submit"
					disabled={!passwordValid || passwordValue != passwordRepeat}
				>
					{m.setNewPassword()}
				</Button>
			{:else}
				<h2 class="w-full max-xl:text-center xl:text-left">
					{m.passwordResetSuccessfully()}
				</h2>
				<p class="font-light opacity-80">
					{m.youCanNowLogInWithYourNewPassword()}.
				</p>
				<Button
					emoji="arrow-left-s"
					btn="button-primary w-full"
					onclick={() => {
						goto('/login');
					}}
				>
					{m.goToLoginPage()}
				</Button>
			{/if}
		</Form>
	</Card>
</div>
