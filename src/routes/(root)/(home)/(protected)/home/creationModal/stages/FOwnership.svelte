<script lang="ts">
	//TODO make selected users show up when going back a stage

	import { m } from '$lib/paraglide/messages';
	import TextInput from '$component/TextInput.svelte';
	import { onDestroy, onMount } from 'svelte';
	import NextPrevious from '../components/NextPrevious.svelte';
	import type { UserRoleType, UserTypeLimited } from '$lib/types';
	import User from '../components/eownership/User.svelte';
	import UserDropdown from '../components/eownership/UserDropdown.svelte';
	import CheckboxInput from '$src/routes/(root)/components/CheckboxInput.svelte';

	let {
		step = $bindable(0),
		selected,
		//uuids of users
		selectedUsers = $bindable([]),
		selectedUserRoles = $bindable([]),
		red,
		green,
		blue,
		type,
		internet = $bindable(false),
	}: {
		step: number;
		selected: string;
		selectedUsers: string[];
		selectedUserRoles: UserRoleType[];
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
		new Promise((resolve) => {
			resolve([]);
		}),
	);

	//although this finding code is horribly inefficient it is simpler to manage and we won't have SO many users per course

	let actualUsersList: Promise<UserTypeLimited[]> = $derived.by(async () => {
		if (selectedUsers.length == 0) return [];

		return usersList.then((v) => {
			return v.filter((w) => selectedUsers.indexOf(w.uuid) != -1);
		});
	}); //selected users

	onMount(() => {
		ticksCounterInterval = setInterval(async () => {
			ticksCounter++;

			//200ms after last keystroke
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

	const onRewriteSelectedUser = (newValue: string) => {
		selectedUsers.push(newValue);
		selectedUserRoles.push({
			isEditor: false,
			isTeacher: false,
			isOwner: false,
		});
	};
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>
		{selected == 'course'
			? m.addPeopleToCourse()
			: m.addAuthorsToTextbook()}
	</h2>
	<div class="flex grow flex-col gap-2 rounded-lg bg-neutral-700/40 p-2">
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
				bind:selectedUser={() => '', onRewriteSelectedUser}
			/>
		</span>

		{#key actualUsersList}
			{#await actualUsersList then users}
				{#each users as user (user.uuid)}
					<User
						{user}
						{red}
						{green}
						{blue}
						roleHandler={(roles: UserRoleType, uuid: string) => {
							const id = selectedUsers.indexOf(uuid);
							selectedUserRoles[id] = { ...roles };
						}}
						removeHandler={(uuid: string) => {
							const id = selectedUsers.indexOf(uuid);
							selectedUsers.splice(id, 1);
							selectedUserRoles.splice(id, 1);
						}}
						{type}
					/>
				{:else}
					<div
						class="flex flex-col gap-2 justify-center items-center grow w-full opacity-50"
					>
						{m.noUsersAddedYet()}
					</div>
				{/each}
			{/await}
		{/key}
	</div>
	<div
		class="flex w-full flex-row items-center justify-center gap-1 opacity-50"
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
		<p class="grow opacity-50">
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
