<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import Button from "./Button.svelte";

	let {
		type = 'text',
		darkMode,
		color,
		css,
		placeholder,
		value = $bindable(''),
		required = true,
		name,
	}: {
		type?: string;
		darkMode: boolean;
		color: string;
		css?: string;
		placeholder: string;
		value?: string;
		required?: boolean;
		name?: string;
	} = $props();

	let passwordShown = $state(false);
</script>

<div class="flex flex-row grow overflow-hidden! rounded-lg! {css}">
	<input
		{name}
		bind:value
		type={(type == "password") ? (passwordShown ? "text" : "password") : type}
		{placeholder}
		{required}
		class="grow border-0 border-b-2 p-1 ps-3 pe-3 {darkMode
			? 'bg-neutral-700 text-white! placeholder:text-white!'
			: 'bg-neutral-200 text-black! placeholder:text-black!'}"
		style="border-color: {color};"
	/>
	{#if type == "password"}
		<Button 
			css="pe-1 ps-1 hover:translate-0!"
			style="background-color: {color};"
			text=""
			type="button"
			onclick={() => passwordShown = !passwordShown}
			emoji={passwordShown? "eye-off" : "eye"}
			label={passwordShown ? m.hidePassword() : m.showPassword()}
		/>
	{/if}
</div>
