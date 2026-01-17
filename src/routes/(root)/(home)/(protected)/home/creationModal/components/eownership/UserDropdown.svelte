<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { UserTypeLimited } from '$lib/types';
	import LoadingAnimationHandler from '$component/LoadingAnimationHandler.svelte';
	import UserSelector from './UserSelector.svelte';

	let {
		usersList,
		selectedUser = $bindable(''),
	}: {
		usersList: Promise<UserTypeLimited[]>;
		selectedUser: string;
	} = $props();
</script>

<div
	class="absolute bottom-0 left-0 z-15 flex w-full translate-y-full flex-col gap-2 not-group-focus-within:hidden first:rounded-t-lg last:rounded-b-lg"
>
	{#await usersList}
		<LoadingAnimationHandler text={false} />
	{:then users}
		{#each users as user (user.uuid)}
			<UserSelector
				{user}
				bind:output={selectedUser}
			/>
		{:else}
			<div
				class="flex flex-col justify-center items-center w-full grow text-neutral-700 opacity-50"
			>
				{m.noUsersFound()}
			</div>
		{/each}
	{/await}
</div>
