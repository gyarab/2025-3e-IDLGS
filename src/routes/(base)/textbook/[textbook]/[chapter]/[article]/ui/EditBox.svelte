<script lang="ts">
	import { goto } from '$app/navigation';
	import { getDateTimeString } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import type { UserTypeInfo } from '$lib/types';
	import UserLink from '$src/routes/(base)/components/UserLink.svelte';
	import { page } from '$app/state';
	import { darkenHex } from '$lib';
	import { resolve } from '$app/paths';

	let {
		darkMode,
		color,
		isEditor,
		lastEditedDate,
		lastEditor,
	}: {
		darkMode: boolean;
		color: string;
		isEditor: boolean;
		lastEditedDate: Date;
		lastEditor: UserTypeInfo;
	} = $props();
</script>

<div
	class="flex w-6/10 flex-row justify-center gap-2 rounded-lg p-2 shadow-lg {darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-100 text-black'}"
>
	<div>
		<!-- TODO user icon -->
	</div>

	<div class="flex flex-col gap-0">
		<div>
			{m.lastEditedByUser()}:
			<UserLink user={lastEditor} />
		</div>
		<div>
			{m.lastEdited()}:
			{getDateTimeString(lastEditedDate)}
		</div>
	</div>

	<div class="grow"></div>

	<Button
		text={m.viewHistory()}
		emoji="file-edit"
		type="button"
		onclick={() => {
			goto(
				resolve(
					'/(base)/textbook/[textbook]/[chapter]/[article]/history',
					{
						textbook: page.params.textbook!,
						chapter: page.params.chapter!,
						article: page.params.article!,
					},
				),
			);
		}}
		css="buttonPrimary"
		style="background-color: {darkenHex(color, 20)};"
	/>

	{#if isEditor}
		<Button
			text={m.editArticle()}
			emoji="file-edit"
			type="button"
			onclick={() => {
				goto(
					resolve(
						'/(base)/textbook/[textbook]/[chapter]/[article]/edit',
						{
							textbook: page.params.textbook!,
							chapter: page.params.chapter!,
							article: page.params.article!,
						},
					),
				);
			}}
			css="buttonPrimary"
			style="background-color: {darkenHex(color, 50)};"
		/>
	{/if}
</div>
