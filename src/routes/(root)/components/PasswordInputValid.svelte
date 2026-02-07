<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import PasswordInputValidItem from './sub/PasswordInputValidItem.svelte';
	import { checkPassword } from '$lib';

	let {
		password,
		rpassword,
		valid = $bindable(false),
	}: {
		password: string;
		rpassword: string;
		valid: boolean;
	} = $props();

	let object = $derived(checkPassword(password));

	$effect(() => {
		valid = object.all;
	});

	let equal = $derived(password == rpassword);
</script>

<div
	class="
	flex w-full grow flex-col gap-0 rounded-2xl p-2 shadow
	{object.all ? '' : 'border-red-800! bg-red-800/70!'} border-2
	{equal
		? 'border-emerald-700! bg-emerald-700/70!'
		: 'border-amber-700! bg-amber-700/70!'}
"
>
	<PasswordInputValidItem
		success={object.length}
		text={m.passwordMustBeAtLeast10CharactersLong()}
	/>
	<PasswordInputValidItem
		success={object.capital}
		text={m.passwordMustContainAnUppercaseLetter()}
	/>
	<PasswordInputValidItem
		success={object.lowercase}
		text={m.passwordMustContainALowercaseLetter()}
	/>
	<PasswordInputValidItem
		success={object.number}
		text={m.passwordMustContainANumber()}
	/>
	<PasswordInputValidItem
		success={object.special}
		text={m.passwordMustContainASpecialCharacter()}
	/>
	<PasswordInputValidItem
		success={equal}
		text={m.passwordsMustBeEqual()}
	/>
</div>
