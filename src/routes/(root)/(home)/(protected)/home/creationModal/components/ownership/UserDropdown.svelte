<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { UserTypeLimited } from '$lib/types';
	import LoadingAnimationHandler from '$component/LoadingAnimationHandler.svelte';
	import UserSelector from './UserSelector.svelte';

	let {
		usersList,
		opened,
		selectedUsers = $bindable([] as UserTypeLimited[]),
	}: {
		usersList: Promise<UserTypeLimited[]>;
		opened: boolean;
		selectedUsers: UserTypeLimited[];
	} = $props();
</script>

<div
	class="{opened
		? ''
		: 'hidden!'} absolute bottom-0 left-0 z-15 flex w-full translate-y-full flex-col gap-2 not-group-focus-within:hidden first:rounded-t-lg last:rounded-b-lg"
>
	{#await usersList}
		<LoadingAnimationHandler text={false} />
	{:then users}
		<!-- only not yet selected users -->
		{@const shownUsers = users.filter(
			(user) =>
				selectedUsers.findIndex(
					(selected) => selected.uuid === user.uuid,
				) === -1,
		)}
		{#each shownUsers as user (user.uuid)}
			<UserSelector
				{user}
				outputHandler={(output: UserTypeLimited) => {
					selectedUsers.push(output);
				}}
			/>
		{:else}
			<div
				class="flex flex-col justify-center items-center w-full grow text-neutral-700 opacity-80"
			>
				{m.noUsersFound()}
			</div>
		{/each}
	{/await}
</div>
