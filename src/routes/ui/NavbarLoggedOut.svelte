<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { m } from "$lib/paraglide/messages";
	import Button from "../(base)/components/Button.svelte";
	import { darkenHex } from "$lib";

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();
</script>

<div class="flex h-[7svh] w-full flex-row items-center {darkMode ? '**:text-white' : '**:text-black!'} items-center gap-4 px-4">
	<img
		src="/logo.svg"
		alt="Logo"
		class="hidden h-10 sm:inline"
	/>

	<div class="grow"></div>

	<Button 
		type="button"
		onclick={() => {
			goto(resolve('/(protected)/login'));
		}}
		text={m.login()}
		emoji="login-box"
		style="background-color: {darkenHex(color, 50)}"
		css="buttonPrimary **:text-white!"
	/>
</div>
