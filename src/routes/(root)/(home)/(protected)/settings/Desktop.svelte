<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { UserType } from '$lib/types';
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

	let {
		data,
	}: {
		data: {
			user: UserType;
		};
	} = $props();
</script>

<div class="flex w-full grow flex-col items-center gap-2 max-xl:hidden">
	{#await data.user}
		<LoadingAnimationHandler />
	{:then}
		<div class="flex w-3/4 grow flex-col gap-2">
			<CardSeparator />

			<h2 class="w-full text-left">
				<i class="ri-settings-line"></i>
				{m.settings()}
			</h2>

			<WideCard>
				{#if data.user.canChangeSettings}
					<Form action="?/updatePersonalInfo">
						<div class="flex flex-col gap-2">
							<h3 class="w-full text-left">
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
									'dr',
									'rndr',
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
			<WideCard>
				<Form
					action="?/editPersonalization"
					success={async () => {
						window.location.href = window.location.href;
					}}
				>
					<h3 class="w-full text-left">
						<i class="ri-eye-2-line"></i>
						{m.personalization()}
					</h3>

					<SelectionRow
						names={[
							m.backgroundNameinspiration(),
							m.backgroundNameaFreshMorning(),
						]}
						values={[0, 1]}
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

			<WideCard>
				{#if data.user.canChangeSettings}
					<div class="flex w-full grow flex-col gap-2">
						<h3 class="w-full text-left">
							<i class="ri-wrench-line"></i>
							{m.accountManagement()}
						</h3>
						<StreakResetRow />
						<DeleteRow />
					</div>
				{:else}
					<DisallowedMessage />
				{/if}
			</WideCard>

			<CardSeparator />
		</div>
	{/await}
</div>
