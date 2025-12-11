<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';
	import HorizontalLine from '../../components/HorizontalLine.svelte';
	import PasswordInput from '../../components/PasswordInput.svelte';
</script>

<svelte:head>
	<title>
		{m.login()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div
	class="flex w-full grow flex-col items-center justify-center gap-2 bg-linear-to-tr from-emerald-500 to-violet-700 p-10"
>
	<form
		class="flex grow flex-col gap-2 rounded-2xl border border-emerald-500 bg-white p-5 shadow-lg max-lg:min-w-9/10 lg:min-w-1/3"
		method="post"
		use:enhance
	>
		<h2 class="text-violet-700">{m.login()}</h2>

		<input name="email" type="text" class="input-text" placeholder={m.enterYourEmail()} />
		<PasswordInput formName="password" />

		<div class="flex flex-row gap-2 w-full text-sm text-emerald-500 items-center">
			{m.forgotPassword()}	

			<button class="button-violet" type="button">
				{m.reset()}
			</button>
		</div>

		<div class="grow"></div>

		<HorizontalLine text={m.orIfYouDontHaveAnAccount()} color={'rgb(0, 128, 0)'} />

		<button class="button-primary group" type="button">
			<i class="ri-slideshow-line"></i>
			<i class="ri-slideshow-line"></i>
			{m.signUp()}
		</button>
		<button class="button-violet group" type="button">
			{m.viewDemo()}
		</button>
	</form>
</div>
