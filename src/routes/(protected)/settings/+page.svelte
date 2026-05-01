<script lang="ts">
	import Form from '$src/routes/(base)/components/Form.svelte';
	import { m } from '$lib/paraglide/messages';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import SelectionButton from '$src/routes/(base)/components/SelectionButton.svelte';
	import {
		getLocale,
		locales,
		setLocale,
		type Locale,
	} from '$lib/paraglide/runtime';
	import type { UserType } from '$lib/types';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';
	import { makeHex } from '$lib';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
			user: UserType;
		};
	} = $props();

	let languageForm: HTMLFormElement | undefined = $state(undefined);
	let language: string = $state(getLocale());
</script>

<svelte:head>
	<title>
		{m.settings()} | {m.idlgs()}
	</title>
</svelte:head>

<div class="flex w-full grow flex-col items-center gap-4">
	<Form
		darkMode={data.darkMode}
		css="w-1/4!"
		success={async () => {}}
		failure={async () => {}}
		target="?/updatePersonalInfo"
	>
		<h1>{m.personalInformation()}</h1>

		<TextInput
			type="text"
			name="name"
			placeholder={m.name()}
			darkMode={data.darkMode}
			color={data.color}
			value={data.user.name}
		/>

		<TextInput
			type="text"
			name="middle"
			placeholder={m.middlename()}
			darkMode={data.darkMode}
			color={data.color}
			value={data.user.middlename}
		/>

		<TextInput
			type="text"
			name="surname"
			placeholder={m.surname()}
			darkMode={data.darkMode}
			color={data.color}
			value={data.user.surname}
		/>

		<Button
			text={m.saveChanges()}
			emoji="save-3"
			onclick={() => {}}
			type="submit"
			css="buttonPrimary"
			style="background-color: {data.color};"
		/>
	</Form>

	<Form
		darkMode={data.darkMode}
		css="w-1/4!"
		success={async () => {}}
		failure={async () => {}}
		target="?/updateInstitutionInfo"
	>
		<h1>{m.institution()}</h1>

		<TextInput
			type="text"
			name="institution"
			placeholder={m.institution()}
			darkMode={data.darkMode}
			color={data.color}
			value={data.user.institution ?? undefined}
		/>

		<TextInput
			type="text"
			name="degree"
			placeholder={m.degree()}
			darkMode={data.darkMode}
			color={data.color}
			value={data.user.degree ?? undefined}
		/>

		<Button
			text={m.saveChanges()}
			emoji="save-3"
			onclick={() => {}}
			type="submit"
			css="buttonPrimary"
			style="background-color: {data.color};"
		/>
	</Form>

	<Form
		darkMode={data.darkMode}
		css="w-1/4!"
		success={async () => {}}
		failure={async () => {}}
		target="?/updateLanguage"
		bind:element={languageForm}
		final={async () => {
			setLocale(language as Locale);
		}}
	>
		<h1>{m.language()}</h1>

		<input
			type="hidden"
			value={language}
			name="language"
		/>
		<SelectionButton
			texts={locales.map((v) => m.languageName({}, { locale: v }))}
			emojis={[]}
			bind:value={language}
			values={[...locales]}
			selectedvalue={language}
			selectedcss="text-neutral-200!"
			selectedstyle="background-color: {data.color};"
		/>

		<Button
			text={m.saveChanges()}
			emoji="save-3"
			onclick={() => {}}
			type="submit"
			css="buttonPrimary"
			style="background-color: {data.color};"
		/>
	</Form>

	<Form
		darkMode={data.darkMode}
		css="w-1/4!"
		success={async () => {}}
		failure={async () => {}}
		target="?/updateDescription"
	>
		<h1>{m.description()}</h1>

		<TextArea
			placeholder={m.description()}
			darkMode={data.darkMode}
			color={data.color}
			name="description"
			value={data.user.description}
		/>

		<Button
			text={m.saveChanges()}
			emoji="save-3"
			onclick={() => {}}
			type="submit"
			css="buttonPrimary"
			style="background-color: {data.color};"
		/>
	</Form>

	<Form
		darkMode={data.darkMode}
		css="w-1/4!"
		success={async () => {}}
		failure={async () => {}}
		target="?/updateProfilePicture"
	>
		<h1>{m.profilePicture()}</h1>

		<Button
			text={m.saveChanges()}
			emoji="save-3"
			onclick={() => {}}
			type="submit"
			css="buttonPrimary"
			style="background-color: {data.color};"
		/>
	</Form>

	<Form
		darkMode={data.darkMode}
		css="w-1/4!"
		success={async () => {}}
		failure={async () => {}}
		target="?/updateColor"
	>
		<h1>{m.theme()}</h1>

		<!-- TODO some premade themes -->

		<input
			type="color"
			name="color"
			class="w-full rounded-lg border-2 border-white shadow"
			value={data.color}
		/>

		<Button
			text={m.saveChanges()}
			emoji="save-3"
			onclick={() => {}}
			type="submit"
			css="buttonPrimary"
			style="background-color: {data.color};"
		/>
	</Form>

	<Form
		darkMode={data.darkMode}
		css="w-1/4!"
		success={async () => {}}
		failure={async () => {}}
		target="?/updatePassword"
	>
		<h1>{m.updatePassword()}</h1>

		<TextInput
			type="password"
			name="password"
			placeholder={m.currentPassword()}
			darkMode={data.darkMode}
			color={data.color}
		/>

		<TextInput
			type="password"
			name="newpass"
			placeholder={m.newPassword()}
			darkMode={data.darkMode}
			color={data.color}
		/>

		<Button
			text={m.saveChanges()}
			emoji="save-3"
			onclick={() => {}}
			type="submit"
			css="buttonPrimary"
			style="background-color: {data.color};"
		/>
	</Form>

	<Form
		darkMode={data.darkMode}
		css="w-1/4!"
		success={async () => {}}
		failure={async () => {}}
		target="?/updateEmail"
	>
		<h1>{m.changeEmail()}</h1>

		<TextInput
			type="password"
			name="password"
			placeholder={m.password()}
			darkMode={data.darkMode}
			color={data.color}
		/>

		<TextInput
			type="email"
			name="email"
			placeholder={m.newEmail()}
			darkMode={data.darkMode}
			color={data.color}
		/>

		<Button
			text={m.saveChanges()}
			emoji="save-3"
			onclick={() => {}}
			type="submit"
			css="buttonPrimary"
			style="background-color: {data.color};"
		/>
	</Form>
</div>
