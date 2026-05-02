<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { UserTypeInfo } from '$lib/types';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import HoverEmoji from '$src/routes/(base)/components/HoverEmoji.svelte';
	import UserLink from '$src/routes/(base)/components/UserLink.svelte';

	let {
		user,
		darkMode,
		color,
		add,
		onclick,
	}: {
		user: UserTypeInfo;
		darkMode: boolean;
		color: string;
		add: boolean;
		onclick: () => void;
	} = $props();
</script>

<button
	class="group flex w-full flex-row gap-2 p-2 {darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-200 text-black'} rounded-lg"
	title={add ? m.addAuthor() : m.removeAuthor()}
	aria-label={add ? m.addAuthor() : m.removeAuthor()}
	onclick={onclick}
>
	<UserLink
		{user}
		nolink={true}
	/>
	<div class="grow"></div>
	{#if add}
		<HoverEmoji
			emoji="user-add"
		/>
	{:else}
		<HoverEmoji
			emoji="user-minus"
		/>
	{/if}
</button>
