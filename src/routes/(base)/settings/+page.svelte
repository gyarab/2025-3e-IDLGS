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
	import ColorInput from '$src/routes/(base)/components/ColorInput.svelte';
	import { darkenHex } from '$lib';

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

<div
	class="relative flex min-h-screen w-full flex-col items-center gap-8 overflow-x-hidden p-6 py-12"
	style="background: linear-gradient(135deg, {data.color}, {darkenHex(
		data.color,
		80,
	)}); --brand: {data.color};"
>
	<i
		class="ri-settings-4-line absolute top-1/10 right-1/10 scale-250 rotate-12 text-9xl text-white opacity-10"
	></i>
	<i
		class="ri-user-settings-line absolute bottom-1/4 left-1/15 scale-250 -rotate-12 text-9xl text-white opacity-10"
	></i>

	<header class="flex flex-col items-center gap-1 text-center text-white">
		<img
			src="/logo.svg"
			alt="Logo"
			class="h-12 sm:h-16"
		/>
		<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
			{m.settings()}
		</h1>
	</header>

	<div class="z-10 flex w-full max-w-2xl flex-col gap-6">
		<!-- Personal Information Section -->
		<section
			class="rounded-3xl p-6 shadow-2xl sm:p-8 {data.darkMode
				? 'bg-neutral-800/80 text-white'
				: 'bg-white/90 text-black'}"
		>
			<div class="mb-6 flex items-center gap-3">
				<i
					class="ri-user-line text-2xl"
					style="color: {data.color}"
				></i>
				<h2 class="text-xl font-bold">{m.personalInformation()}</h2>
			</div>
			<Form
				color={data.color}
				darkMode={data.darkMode}
				css="flex flex-col gap-4"
				success={async () => {}}
				failure={async () => {}}
				target="?/updatePersonalInfo"
			>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
						required={false}
					/>
					<TextInput
						type="text"
						name="surname"
						placeholder={m.surname()}
						darkMode={data.darkMode}
						color={data.color}
						value={data.user.surname}
					/>
				</div>
				<Button
					text={m.saveChanges()}
					emoji="save-3"
					type="submit"
					css="buttonPrimary"
					style="background-color: {data.color};"
					onclick={() => {}}
				/>
			</Form>
		</section>

		<!-- Institution Section -->
		<section
			class="rounded-3xl p-6 shadow-2xl sm:p-8 {data.darkMode
				? 'bg-neutral-800/80 text-white'
				: 'bg-white/90 text-black'}"
		>
			<div class="mb-6 flex items-center gap-3">
				<i
					class="ri-bank-line text-2xl"
					style="color: {data.color}"
				></i>
				<h2 class="text-xl font-bold">{m.institution()}</h2>
			</div>
			<Form
				darkMode={data.darkMode}
				css="flex flex-col gap-4"
				success={async () => {}}
				failure={async () => {}}
				target="?/updateInstitutionInfo"
				color={data.color}
			>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
				</div>
				<Button
					text={m.saveChanges()}
					emoji="save-3"
					type="submit"
					css="buttonPrimary"
					style="background-color: {data.color};"
					onclick={() => {}}
				/>
			</Form>
		</section>

		<!-- Language & Appearance (Side by Side on desktop) -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<!-- Language -->
			<section
				class="rounded-3xl p-6 shadow-2xl {data.darkMode
					? 'bg-neutral-800/80 text-white'
					: 'bg-white/90 text-black'}"
			>
				<h2 class="mb-4 text-lg font-bold">{m.language()}</h2>
				<Form
					darkMode={data.darkMode}
					target="?/updateLanguage"
					bind:element={languageForm}
					final={async () => {
						setLocale(language as Locale);
					}}
					color={data.color}
					css="flex flex-col gap-4"
				>
					<input
						type="hidden"
						value={language}
						name="language"
					/>
					<SelectionButton
						texts={locales.map((v) =>
							m.languageName({}, { locale: v }),
						)}
						emojis={[]}
						bind:value={language}
						values={[...locales]}
						selectedcss="text-neutral-200!"
						selectedstyle="background-color: {data.color};"
					/>
					<Button
						text={m.saveChanges()}
						emoji="save-3"
						type="submit"
						css="buttonPrimary"
						style="background-color: {data.color};"
						onclick={() => {}}
					/>
				</Form>
			</section>

			<!-- Theme -->
			<section
				class="rounded-3xl p-6 shadow-2xl {data.darkMode
					? 'bg-neutral-800/80 text-white'
					: 'bg-white/90 text-black'}"
			>
				<h2 class="mb-4 text-lg font-bold">{m.theme()}</h2>
				<Form
					darkMode={data.darkMode}
					target="?/updateColor"
					color={data.color}
					css="flex flex-col gap-4"
				>
					<ColorInput color={data.color} />
					<Button
						text={m.saveChanges()}
						emoji="save-3"
						type="submit"
						css="buttonPrimary"
						style="background-color: {data.color};"
						onclick={() => {}}
					/>
				</Form>
			</section>
		</div>

		<!-- Description Section -->
		<section
			class="rounded-3xl p-6 shadow-2xl sm:p-8 {data.darkMode
				? 'bg-neutral-800/80 text-white'
				: 'bg-white/90 text-black'}"
		>
			<h2 class="mb-4 text-xl font-bold">{m.description()}</h2>
			<Form
				darkMode={data.darkMode}
				target="?/updateDescription"
				color={data.color}
				css="flex flex-col gap-4"
			>
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
					type="submit"
					css="buttonPrimary"
					style="background-color: {data.color};"
					onclick={() => {}}
				/>
			</Form>
		</section>

		<!-- Security Section -->
		<section
			class="rounded-3xl p-6 shadow-2xl sm:p-8 {data.darkMode
				? 'bg-neutral-800/80 text-white'
				: 'bg-white/90 text-black'}"
		>
			<div class="mb-6 flex items-center gap-3">
				<i
					class="ri-shield-keyhole-line text-2xl"
					style="color: {data.color}"
				></i>
				<h2 class="text-xl font-bold">
					{m.updatePassword()} / {m.changeEmail()}
				</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<!-- Password Form -->
				<Form
					darkMode={data.darkMode}
					target="?/updatePassword"
					color={data.color}
					css="flex flex-col gap-3"
				>
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
						text={m.updatePassword()}
						emoji="lock-password-line"
						type="submit"
						css="buttonPrimary"
						style="background-color: {data.color};"
						onclick={() => {}}
					/>
				</Form>

				<!-- Email Form -->
				<Form
					darkMode={data.darkMode}
					target="?/updateEmail"
					color={data.color}
					css="flex flex-col gap-3"
				>
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
						text={m.changeEmail()}
						emoji="mail-line"
						type="submit"
						css="buttonPrimary"
						style="background-color: {data.color};"
						onclick={() => {}}
					/>
				</Form>
			</div>
		</section>
	</div>

	{#if !data.darkMode}
		<p class="text-center text-xs text-white opacity-60">
			All changes are saved securely to your profile.
		</p>
	{/if}
</div>
