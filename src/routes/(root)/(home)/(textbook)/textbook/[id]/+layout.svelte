<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sidebar from './components/desktop/Sidebar.svelte';
	import ContentPositioning from './components/desktop/ContentPositioning.svelte';
	import ArchivedWarningTextbook from './components/desktop/ArchivedWarningTextbook.svelte';
	import type { TextbookType, UserType } from '$lib/types';
	import ButtonEdit from './components/ButtonEdit.svelte';
	import ButtonBackToTop from '$component/ButtonBackToTop.svelte';
	import { page } from '$app/state';

	let {
		children,
		data,
	}: {
		children: Snippet;
		data: {
			textbook: TextbookType;
			isEditor: boolean;
			isOwner: boolean;
			showEditButtons: boolean;
			user: UserType | undefined;
		};
	} = $props();

	//TODO finish, remove from definitions and statistics etc.
	let clickedEdit: boolean = $state(false);

	let isEditablePage: boolean = $derived(
		(page.route.id?.endsWith('[id]') ||
			page.route.id?.endsWith('[chapterId]') ||
			page.route.id?.endsWith('[articleId]')) ??
			false,
	);
</script>

<div
	class="
	relative flex w-full grow flex-row justify-center *:flex
	*:flex-col
"
>
	<Sidebar
		textbook={data.textbook}
		id={data.textbook.uuid}
		canEdit={data.isEditor || data.isOwner}
		showEditButtons={data.showEditButtons}
		user={data.user}
	/>
	<ContentPositioning>
		{#if data.textbook.archived}
			<ArchivedWarningTextbook />
		{/if}

		{@render children()}
	</ContentPositioning>

	<div class="sticky right-4 h-[20vh] gap-2 overflow-clip pb-4 xl:top-[80vh]">
		<div class="grow"></div>
		<!-- if ends with UUID: main, chapter, article... -->
		{#if isEditablePage}
			<ButtonEdit bind:clicked={clickedEdit} />
		{/if}
		<ButtonBackToTop />
	</div>
</div>
