<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import TextInput from '$src/routes/(root)/components/TextInput.svelte';
	import { onDestroy, onMount, untrack } from 'svelte';
	import NextPrevious from '../components/NextPrevious.svelte';
	import type { UserType } from '$lib/types';
	import User from '../components/eownership/User.svelte';
	import UserDropdown from '../components/eownership/UserDropdown.svelte';

	let {
		step = $bindable(0),
		selected,
		//uuids of users
		selectedUsers = $bindable([]),
	}: {
		step: number;
		selected: string;
		selectedUsers: string[];
	} = $props();

	let secondsTimer: number = $state(0);
	let secondsTimerInterval: NodeJS.Timeout | undefined = $state(undefined);

	let query: string = $state('');
	let hasFetched = $derived(query.length == 0);
	let lastKeystroke: number = $derived.by(() => {
		if (query.length == 0) return 0;
		let value = 0;
		untrack(() => {
			value = secondsTimer;
		});
		return value;
	});
	let usersList: Promise<{ users: UserType[] }> = $state(
		new Promise((resolve) => {
			resolve({ users: [] });
		}),
	);
	let actualUsersList: UserType[] = $state([]); //selected users

	onMount(() => {
		secondsTimerInterval = setInterval(async () => {
			if (secondsTimer - lastKeystroke > 2 && !hasFetched) {
				//load data

				const response = await fetch('/home/creationModal/userList/', {
					method: 'POST',
					body: JSON.stringify({
						query: query,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				usersList = response.json() as Promise<{ users: UserType[] }>;
				hasFetched = true;
			}

			secondsTimer++;
		}, 1000);
	});
	onDestroy(() => {
		clearInterval(secondsTimerInterval);
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>
		{selected == 'course'
			? m.addPeopleToCourse()
			: m.addAuthorsToTextbook()}
	</h2>
	<div class="flex grow flex-col gap-2 rounded-lg bg-neutral-700/40">
		<span class="group relative flex w-full flex-col gap-2">
			<TextInput
				bind:value={query}
				cssClass="w-full text-xl!"
				placeholder={m.enterEmailNameOrSurnameOfUser()}
			/>
			<UserDropdown {usersList} />
		</span>

		{#each actualUsersList as user (user.uuid)}
			<User {user} />
		{:else}
			<div
				class="flex flex-col gap-2 justify-center items-center grow w-full opacity-50"
			>
				{m.noUsersAddedYet()}
			</div>
		{/each}
	</div>
	<NextPrevious
		currentStep={selected == 'course' ? 4 : 3}
		maxStep={selected == 'course' ? 5 : 4}
		onclickLast={() => {
			step = 3;
		}}
		onclickNext={() => {
			step = 5;
		}}
	/>
</div>
