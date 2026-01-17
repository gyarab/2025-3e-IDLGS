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
	m-2 flex w-full grow flex-col gap-1 rounded-2xl p-2 shadow
	{object.all ? 'bg-emerald-700' : 'bg-red-800'}
	{equal ? '' : 'bg-amber-700!'}
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
