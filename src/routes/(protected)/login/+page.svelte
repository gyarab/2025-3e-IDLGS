<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import Form from '$src/routes/(base)/components/Form.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { redirect } from '@sveltejs/kit';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
		};
	} = $props();

	let solved = $state(false); //captcha
</script>

<svelte:head>
	<script
		src="https://cdn.jsdelivr.net/npm/@cap.js/widget"
		async
		defer
	></script>
	<title>
		{m.login()} | { m.idlgs()}
	</title>
</svelte:head>

<Form
	target="?/login"
	darkMode={data.darkMode}
	css="w-1/4!"
	success={async () => {
		redirect(303, "/profile/");
	}}
	failure={async () => {

	}}
>
	<h1>{m.login()}</h1>

	<TextInput
		type="email"
		name="email"
		darkMode={data.darkMode}
		color={data.color}
		placeholder={m.enterYourEmail()}
	/>

	<TextInput
		type="password"
		name="password"
		darkMode={data.darkMode}
		color={data.color}
		placeholder={m.enterYourPassword()}
	/>

	<cap-widget
		id="cap"
		class={data.darkMode ? "darkCap" : "lightCap"}
		data-cap-api-endpoint="https://captcha.martinbykov.eu/645d6876bc"
		onsolve={() => {
			solved = true;
		}}
	></cap-widget>

	<Button
		css="buttonPrimary"
		emoji="login-box"
		text={m.login()}
		type="submit"
		style="background-color: {data.color};"
		disabled={!solved}
		onclick={() => {}}
	/>
</Form>
