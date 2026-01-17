<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Content from '../Content.svelte';
	import type { TextbookType } from '$lib/types';

	let {
		textbook
	}: {
		textbook: TextbookType
	} = $props();
</script>

<div class="grow p-2 flex flex-col w-full items-center">
	<div class="flex flex-col grow w-3/4">
		<Content {textbook} />
	</div>
</div>