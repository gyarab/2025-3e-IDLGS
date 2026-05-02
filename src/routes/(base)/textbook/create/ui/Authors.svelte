<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import VerticalLine from '$src/routes/(base)/components/VerticalLine.svelte';
	import { onDestroy, onMount, untrack } from 'svelte';
	import { fly } from 'svelte/transition';
	import { DEFAULT_MS_UNTIL_REQUEST } from '$lib';
	import type { UserTypeInfo } from '$lib/types';
	import { resolve } from '$app/paths';
	import User from './components/User.svelte';
	import LoadingAnimationHandler from '$src/routes/(base)/components/loading/LoadingAnimationHandler.svelte';

	let {
		darkMode,
		color,
		authors = $bindable([]),
		user,
	}: {
		darkMode: boolean;
		color: string;
		authors: string[]; //uuids
		user: UserTypeInfo;
	} = $props();

	let query: string = $state('');
	//on every change of query reset timer
	//then reaches zero: request with current query and reset timer again
	let msUntilRequest: number = $derived(
		query.trim().length > 3 ? DEFAULT_MS_UNTIL_REQUEST : 0,
	);
	let sentRequest: boolean = $derived(query.trim().length > 3 ? false : true);

	let users: UserTypeInfo[] = $state([]);
	let selectedUsers: UserTypeInfo[] = $state([]);

	const timerInterval = async () => {
		authors = selectedUsers
			.map((u) => u.uuid)
			.filter((uuid) => uuid != user.uuid);

		msUntilRequest -= 50;
		if (msUntilRequest <= 0) {
			msUntilRequest = 0;
		}

		if (msUntilRequest === 0 && !sentRequest) {
			const response = await fetch(resolve('/api/searchUsers'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: query.trim(),
					exclude: [user.uuid, ...authors],
				}),
			});

			if (response.ok) users = (await response.json()).results;

			sentRequest = true;
		}
	};

	let timer: NodeJS.Timeout | undefined = $state(undefined);

	onMount(() => {
		timer = setInterval(timerInterval, 50);
	});
	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-row items-center gap-2"
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.additionalAuthors()}</h2>
		<p>{m.additionalAuthorsDescription()}</p>
	</div>
	<div class="flex w-full grow flex-row gap-2">
		<div class="flex w-full grow flex-col gap-2">
			<TextInput
				{darkMode}
				{color}
				type="text"
				placeholder={m.typeToSearch()}
				css=""
				bind:value={query}
			/>
			<div class="flex w-full grow flex-col gap-2">
				{#if sentRequest}
					{#each users as user}
						<User
							{user}
							{darkMode}
							{color}
							add={true}
							onclick={() => {
								selectedUsers.push({
									...user,
								});
								users = users.filter(
									(u) => u.uuid !== user.uuid,
								);
							}}
						/>
					{:else}
						<div
							class="flex flex-col items-center justify-center gap-2 italic opacity-70 grow"
						>
							{#if query.trim().length > 3}
								{m.noUsersFound()}
							{:else if query.trim().length === 0}
								{m.typeToSearchUsers()}
							{:else}
								{m.pleaseTypeMoreThanCharacters({ number: 3 })}
							{/if}
						</div>
					{/each}
				{:else}
					<LoadingAnimationHandler {color}>
						<span class="italic opacity-70">
							{m.searching()}...
						</span>
					</LoadingAnimationHandler>
				{/if}
			</div>
		</div>
		<VerticalLine {darkMode} />
		<div class="flex w-full grow flex-col gap-2">
			{#each selectedUsers as user, i (i)}
				<User
					{user}
					{darkMode}
					{color}
					add={false}
					onclick={() => {
						selectedUsers.splice(i, 1);
						sentRequest = false;
					}}
				/>
			{/each}
		</div>
	</div>
</div>
