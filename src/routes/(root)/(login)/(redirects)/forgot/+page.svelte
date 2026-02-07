<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Form from '$component/Form.svelte';
	import Button from '$component/Button.svelte';
	import TextInput from '$component/TextInput.svelte';
	import { cloudflareTurnstileBox } from '$lib';
	import { renderMarkdown } from '$lib/markdown';
	import { goto } from '$app/navigation';
	import Card from '$component/Card.svelte';

	let sent = $state(false);
	let error = $state(false);
</script>

<svelte:head>
	<title>
		{m.passwordRecovery()} - {m.textbookNameShort()}
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
			action="?/sendMail"
			success={async () => {
				sent = true;
			}}
			failure={async () => {
				error = true;
			}}
		>
			{#if !sent && !error}
				<h2 class="w-full text-white max-xl:text-center xl:text-left">
					{m.passwordRecovery()}
				</h2>

				<p class="w-full font-light opacity-80 max-xl:text-sm">
					{m.enterYourAccountsEmailAddressIfItExistsYouWillRecieveAResetLink()}
					<br />
					{@html renderMarkdown(
						m.theLinkWillExpireInFifteenMinutes(),
					)}
				</p>

				<TextInput
					name="email"
					placeholder={m.enterEmailAddress()}
					cssClass="w-full"
				/>

				{#key window.turnstile}
					<div use:cloudflareTurnstileBox></div>
				{/key}

				<Button
					emoji="mail-send"
					btn="button-primary"
					type="submit"
				>
					{m.sendEmail()}
				</Button>
				<Button
					emoji="arrow-left-s"
					btn="button-violet"
					onclick={() => {
						goto('/login');
					}}
				>
					{m.back()}
				</Button>
			{:else if sent}
				<h2 class="w-full text-white max-xl:text-center xl:text-left">
					{m.emailSent()}
				</h2>
				<p class="font-light opacity-80">
					{m.checkYourInboxIncludingTheSpamFolder()}
					{@html renderMarkdown(
						m.theLinkWillExpireInFifteenMinutes(),
					)}
				</p>
				<Button
					emoji="arrow-left-s"
					btn="button-primary"
					onclick={() => {
						goto('/');
					}}
				>
					{m.goToHomePage()}
				</Button>
			{:else if error}
				<h2 class="w-full text-white max-xl:text-center xl:text-left">
					{m.anErrorOccurred()}
				</h2>
				<p class="font-light opacity-80">
					{m.theEmailCouldNotBeSentPleaseTryAgain()}
				</p>
				<Button
					emoji="arrow-left-s"
					btn="button-primary"
					onclick={() => {
						goto('/');
					}}
				>
					{m.goToHomePage()}
				</Button>
			{/if}
		</Form>
	</Card>
</div>
