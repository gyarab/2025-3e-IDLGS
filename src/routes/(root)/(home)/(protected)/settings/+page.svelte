<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { UserType } from '$lib/types';
	import UnsavedChangesBox from '$component/UnsavedChangesBox.svelte';
	import { setInputCallbacks } from '$lib';
	import { onMount } from 'svelte';
	import LoadingAnimationHandler from '$component/LoadingAnimationHandler.svelte';
	import WideCard from '$component/WideCard.svelte';
	import TextInput from '$component/TextInput.svelte';
	import ButtonRow from './components/ButtonRow.svelte';
	import SelectionRow from './components/SelectionRow.svelte';
	import { locales } from '$lib/paraglide/runtime';
	import CheckboxRow from './components/CheckboxRow.svelte';
	import Form from '$component/Form.svelte';
	import DeleteRow from './components/DeleteRow.svelte';
	import DisallowedMessage from './components/DisallowedMessage.svelte';
	import StreakResetRow from './components/StreakResetRow.svelte';
	import DateRow from './components/DateRow.svelte';
	import CardSeparator from '$component/CardSeparator.svelte';
	import SuccessBox from '$component/SuccessBox.svelte';
	import PasswordInput from '$component/PasswordInput.svelte';
	import PasswordInputValid from '$component/PasswordInputValid.svelte';

	let {
		data,
	}: {
		data: {
			user: UserType;
		};
	} = $props();

	let formMessage: string = $state('');

	let password: string = $state('');
	let newPassword: string = $state('');
	let newPasswordRepeat: string = $state('');
	let passwordValid: boolean = $state(false);

	let showUnsavedChanges = $state(false);

	const inputElementChangeCallback = () => (showUnsavedChanges = true);
	const formSubmitChangeCallback = () => (showUnsavedChanges = false);

	let ready = $state(false);

	onMount(() => {
		ready = true;

		setInputCallbacks(inputElementChangeCallback, formSubmitChangeCallback);
	});
</script>

<svelte:head>
	<title>
		{m.settings()} - {m.textbookNameShort()}
	</title>
</svelte:head>

{#key ready}
	<div class="flex w-full grow flex-col items-center gap-2 max-xl:hidden">
		{#await data.user}
			<LoadingAnimationHandler />
		{:then}
			<div class="flex w-3/4 grow flex-col gap-2">
				<CardSeparator />

				<h2 class="w-full max-xl:text-center xl:text-left">
					<i class="ri-settings-line"></i>
					{m.settings()}
				</h2>

				<WideCard delay={100}>
					{#if data.user.canChangeSettings}
						<Form
							action="?/updatePersonalInfo"
							success={async () => {
								formMessage = m.settingsUpdated();
							}}
							failure={async () => {
								formMessage = m.couldNotUpdateSettings();
							}}
						>
							<div class="flex flex-col gap-2">
								<h3 class="w-full max-xl:text-center xl:text-left">
									<i class="ri-user-3-line"></i>
									{m.personalInfo()}
								</h3>

								<SelectionRow
									name="degree"
									label={m.degree()}
									names={[
										m.noDegree(),
										m.bachelorsDegree(),
										m.mastersDegree(),
										m.engineersDegree(),
										m.doctorOfNaturalSciences(),
										m.phdDegree(),
									]}
									values={[
										'none',
										'bc',
										'mgr',
										'ing',
										'rndr',
										'dr',
									]}
									initialValue={data.user.degree}
								/>

								<TextInput
									label={m.firstName()}
									name="name"
									placeholder={m.enterName()}
									value={data.user.name}
									cssClass="text-lg"
								/>
								<TextInput
									label={m.lastName()}
									name="surname"
									placeholder={m.enterName()}
									value={data.user.surname}
									cssClass="text-lg"
								/>
								<DateRow
									label={m.birthDate()}
									nameDay="day"
									nameMonth="month"
									nameYear="year"
									value={data.user.birthday}
									cssClass="text-lg"
								/>
							</div>

							<ButtonRow
								text={m.update()}
								emoji={'save-3'}
							/>
						</Form>
					{:else}
						<DisallowedMessage />
					{/if}
				</WideCard>

				<CardSeparator />

				<WideCard delay={600}>
					<Form
						action="?/editPersonalization"
						success={async () => {
							window.location.href = window.location.href;
						}}
						failure={async () => {
							formMessage =
								m.couldNotUpdatePersonalizationSettings();
						}}
					>
						<h3 class="w-full max-xl:text-center xl:text-left">
							<i class="ri-eye-2-line"></i>
							{m.personalization()}
						</h3>

						<SelectionRow
							names={[
								m.backgroundNameinspiration(),
								m.backgroundNameaFreshMorning(),
								m.backgroundNameProgressUnstoppable(),
							]}
							values={[0, 1, 2]}
							label={m.background()}
							initialValue={data.user.background}
							name="background"
						/>

						<SelectionRow
							names={[
								m.systemLanguage(),
								...locales.map((v) =>
									m.languageName({}, { locale: v }),
								),
							]}
							values={['any', ...locales]}
							label={m.language()}
							initialValue={data.user.lang}
							name="lang"
						/>

						{#if data.user.canEditGamification}
							<CheckboxRow
								initialValue={data.user.gamification}
								name="daily"
								label={m.gamification()}
							/>
						{/if}

						<ButtonRow
							text={m.update()}
							emoji={'save-3'}
						/>
					</Form>
				</WideCard>

				<CardSeparator />

				<WideCard delay={1100}>
					<Form
						action="?/updatePassword"
						success={async () => {
							formMessage = m.passwordUpdated();
						}}
						failure={async () => {
							formMessage = m.couldNotUpdatePassword();
						}}
						reset={true}
						final={async () => {
							password = '';
							newPassword = '';
							newPasswordRepeat = '';
							passwordValid = false;
						}}
					>
						<h3 class="w-full max-xl:text-center xl:text-left">
							<i class="ri-rotate-lock-line"></i>
							{m.changePassword()}
						</h3>

						<PasswordInput
							label={m.currentPassword()}
							placeholder={m.enterCurrentPassword()}
							cssClass="text-lg grow w-full"
							formName="password"
							bind:value={password}
							cssLabelClass="font-light! text-lg!"
						/>

						<PasswordInput
							label={m.newPassword()}
							placeholder={m.enterNewPassword()}
							cssClass="text-lg grow w-full"
							formName="new"
							bind:value={newPassword}
							cssLabelClass="font-light! text-lg!"
						/>

						<PasswordInput
							label={m.newPasswordRepeat()}
							placeholder={m.repeatNewPassword()}
							cssClass="text-lg grow w-full"
							formName="newrepeat"
							bind:value={newPasswordRepeat}
							cssLabelClass="font-light! text-lg!"
						/>

						{#if newPassword.length > 0 || newPasswordRepeat.length > 0}
							<PasswordInputValid
								password={newPassword}
								rpassword={newPasswordRepeat}
								bind:valid={passwordValid}
							/>
						{/if}

						<ButtonRow
							text={m.changePassword()}
							emoji={'lock-2'}
							disabled={!passwordValid ||
								newPassword != newPasswordRepeat}
						/>
					</Form>
				</WideCard>

				<CardSeparator />

				<WideCard delay={1600}>
					{#if data.user.canChangeSettings}
						<div class="flex w-full grow flex-col gap-2">
							<h3 class="w-full max-xl:text-center xl:text-left">
								<i class="ri-wrench-line"></i>
								{m.accountManagement()}
							</h3>
							<StreakResetRow bind:formMessage />
							<DeleteRow bind:formMessage />
						</div>
					{:else}
						<DisallowedMessage />
					{/if}
				</WideCard>

				<CardSeparator />
			</div>
		{/await}
	</div>

	<SuccessBox bind:message={formMessage} />

	<UnsavedChangesBox bind:show={showUnsavedChanges} />
{/key}
