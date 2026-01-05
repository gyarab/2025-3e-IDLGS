<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { UserType } from '$lib/types';
	import LoadingAnimationHandler from '$src/routes/(root)/components/LoadingAnimationHandler.svelte';
	import UserSelector from './UserSelector.svelte';

	let {
		usersList,
	}: {
		usersList: Promise<{ users: UserType[] }>;
	} = $props();

	$inspect(usersList);
</script>

<div
	class=" absolute bottom-0 left-0 flex w-full translate-y-full flex-col gap-2 rounded-lg bg-white p-2 not-group-focus-within:hidden"
>
	{#await usersList}
		<LoadingAnimationHandler />
	{:then users}
		{#each users.users as user (user.uuid)}
			<UserSelector {user} />
		{:else}
			<div
				class="flex flex-col justify-center items-center w-full grow text-neutral-700 opacity-50"
			>
				{m.noUsersFound()}
			</div>
		{/each}
	{/await}
</div>
