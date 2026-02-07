<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import TextInput from '$component/TextInput.svelte';
	import { onDestroy, onMount } from 'svelte';
	import NextPrevious from '../components/NextPrevious.svelte';
	import type { UserRoleType, UserTypeLimited } from '$lib/types';
	import User from '../components/ownership/User.svelte';
	import UserDropdown from '../components/ownership/UserDropdown.svelte';
	import CheckboxInput from '$component/CheckboxInput.svelte';

	let {
		step = $bindable(0),
		selected,
		//uuids of users
		selectedUsers = $bindable([]),
		red,
		green,
		blue,
		type,
		internet = $bindable(false),
	}: {
		step: number;
		selected: string;
		selectedUsers: UserTypeLimited[];
		red: number;
		green: number;
		blue: number;
		type: string;
		internet: boolean;
	} = $props();

	let ticksCounter: number = $state(0);
	let ticksCounterInterval: NodeJS.Timeout | undefined = $state(undefined);

	let query: string = $state('');
	let hasFetched = $derived(query.length < 3);
	let lastKeystroke: number = $state(0);

	let usersList: Promise<UserTypeLimited[]> = $state(
		Promise.resolve([] as UserTypeLimited[]),
	);

	onMount(async () => {
		ticksCounterInterval = setInterval(async () => {
			ticksCounter++;

			//200ms after last keystroke, first load handled elsewhere
			if (ticksCounter - lastKeystroke < 5 || hasFetched) return;

			//load data
			usersList = fetch('/home/creationModal/internalapi/userList/', {
				method: 'POST',
				body: JSON.stringify({
					query: query,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(async (res) => {
					return (await res.json()).users as UserTypeLimited[];
				})
				.finally(() => []);

			hasFetched = true;
		}, 100);
	});
	onDestroy(() => {
		clearInterval(ticksCounterInterval);
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>
		{selected == 'course'
			? m.addPeopleToCourse()
			: m.addAuthorsToTextbook()}
	</h2>
	<div class="flex grow flex-col gap-2 rounded bg-neutral-700/40 p-2">
		<span class="group relative flex w-full flex-col gap-2">
			<TextInput
				bind:value={query}
				cssClass="w-full text-xl!"
				placeholder={m.enterEmailNameOrSurnameOfUser()}
				onchange={() => {
					hasFetched = false;
					lastKeystroke = ticksCounter;
				}}
			/>
			<UserDropdown
				{usersList}
				opened={query.length >= 3}
				bind:selectedUsers
			/>
		</span>

		{#key selectedUsers}
			{#await selectedUsers then users}
				{#each users as user (user.uuid)}
					<User
						{user}
						{red}
						{green}
						{blue}
						roleHandler={(roles: UserRoleType, uuid: string) => {
							const id = selectedUsers.findIndex(
								(user) => user.uuid === uuid,
							);
							selectedUsers[id] = {
								...selectedUsers[id],
								...roles,
							};
						}}
						removeHandler={(uuid: string) => {
							const id = selectedUsers.findIndex(
								(user) => user.uuid === uuid,
							);
							selectedUsers.splice(id, 1);
						}}
						{type}
					/>
				{:else}
					<div
						class="flex flex-col gap-2 justify-center items-center grow w-full opacity-80"
					>
						{m.noUsersAddedYet()}
					</div>
				{/each}
			{/await}
		{/key}
	</div>
	<div
		class="flex w-full flex-row items-center justify-center gap-1 opacity-80"
	>
		{#if type == 'course'}
			{m.selectUsersWhichWillHaveAccessToTheCourseExceptForYou()}.
		{:else}
			{m.selectUsersWhichWillHaveAccessToTheBookExceptForYou()}.
		{/if}
		{m.youDoNotHaveToAddAnyoneElse()}.
		{#if type == 'course'}
			{m.youWillAlsoBeAddedAsTheOwnerOfTheCourse()}.
		{:else}
			{m.youWillAlsoBeAddedAsTheOwnerOfTheBook()}.
		{/if}
	</div>
	{#if selected != 'course'}
		<div class="flex w-full flex-row items-center gap-2">
			<CheckboxInput
				bind:checked={internet}
				label={m.publishTextbookOnTheInternet()}
			/>
			<p class="grow opacity-80">
				{m.itWillBeVisibleToEveryoneAndWillShowUpInSearchEngines()}.
			</p>
		</div>
	{/if}
	<NextPrevious
		currentStep={selected == 'course' ? 4 : 3}
		maxStep={selected == 'course' ? 5 : 4}
		onclickLast={() => {
			step = 3;
		}}
		onclickNext={() => {
			step = 6;
		}}
	/>
</div>
