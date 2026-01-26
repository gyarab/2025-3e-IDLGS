<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import Sidebar from './components/desktop/Sidebar.svelte';
	import ContentPositioning from './components/desktop/ContentPositioning.svelte';
	import type { TextbookType } from '$lib/types';
	import ArchivedWarningTextbook from './components/desktop/ArchivedWarningTextbook.svelte';

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});

	let {
		data,
		children,
	}: {
		data: {
			textbook: TextbookType;
			isEditor: boolean;
			isOwner: boolean;
			showEditButtons: boolean;
		};
		children: Snippet;
	} = $props();
</script>

<div
	class="
	relative flex w-full grow flex-row justify-center *:flex
	*:flex-col max-xl:hidden
"
>
	<Sidebar
		textbook={data.textbook}
		id={data.textbook.uuid}
		canEdit={data.isEditor || data.isOwner}
		showEditButtons={data.showEditButtons}
	/>
	<ContentPositioning>
		{#if data.textbook.archived}
			<ArchivedWarningTextbook />
		{/if}
		{@render children()}
	</ContentPositioning>
</div>
