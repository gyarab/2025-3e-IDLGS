<script lang="ts">
	import { goto } from '$app/navigation';
	import { getDateTimeString, alphaColor } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import type { UserTypeInfo } from '$lib/types';
	import UserLink from '$src/routes/(base)/components/UserLink.svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import ConfirmDeleteDialog from '$src/routes/(base)/components/ConfirmDeleteDialog.svelte';

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

	let showDeleteDialog = $state(false);
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

	{#if isEditor}
		<Button
			text=""
			emoji="pencil"
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
			css="buttonPrimary h-fit bg-neutral-600/30"
		/>

		<Button
			text=""
			emoji="delete-bin-7"
			type="button"
			onclick={() => {
				showDeleteDialog = true;
			}}
			css="buttonPrimary h-fit bg-red-600/40"
		/>
	{/if}

	<!-- <Button
		text=""
		emoji="history"
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
		css="buttonPrimary h-fit"
		style="background-color: {alphaColor(color, 45)};"
	/> -->
</div>

<ConfirmDeleteDialog
	bind:open={showDeleteDialog}
	title="{m.deleteArticle()}?"
	darkMode={darkMode}
		color={color}
		confirm={async () => {
			// call delete action on this article route
			const form = new URLSearchParams();
			const res = await fetch('?/deleteArticle', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: form.toString(),
			});
			if (res.ok) {
				// navigate back to chapter
				goto(resolve('/(base)/textbook/[textbook]/[chapter]', {
					textbook: page.params.textbook!,
					chapter: page.params.chapter!,
				}));
			} else {
				showDeleteDialog = false;
			}
		}}
		cancel={async () => {
			showDeleteDialog = false;
		}}
	/>