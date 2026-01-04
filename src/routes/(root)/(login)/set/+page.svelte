<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { UserType } from '$lib/types';
	import Button from '../../components/Button.svelte';
	import Card from '../../components/Card.svelte';
	import Form from '../../components/Form.svelte';
	import PasswordInput from '../../components/PasswordInput.svelte';
	import PasswordInputValid from '../../components/PasswordInputValid.svelte';

	let passwordValue = $state('');
	let passwordRepeat = $state('');
	let passwordValid = $state(false);
</script>

<svelte:head>
	<title>
		{m.setPassword()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<Form
	cssClass="relative flex w-full grow flex-col items-center justify-center gap-2 p-10"
	action="?/setPassword"
>
	<Card
		css="max-xl:min-w-9/10 xl:min-w-1/3 z-11"
		perspective={false}
		forceSquare={false}
		padding="p-3"
	>
		<h2 class="w-full text-left">{m.setAPassword()}</h2>

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
			bind:valid={passwordValid}
		/>

		<Button
			btn="button-primary"
			emoji="lock-2"
			cssClass="w-full"
			disabled={!passwordValid || passwordValue != passwordRepeat}
		>
			{m.continue()}
		</Button>
	</Card>
</Form>
