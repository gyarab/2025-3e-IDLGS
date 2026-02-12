<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MessageType, UserType } from '$lib/types';
	import MessageModal from './components/MessageModal.svelte';

	let {
		children,
		data,
	}: {
		children: Snippet;
		data: {
			user: UserType;
			messages: MessageType[];
		};
	} = $props();
</script>

<div class="flex flex-col grow min-h-screen">
	{@render children()}
</div>

{#if data.messages.length > 0}
	<MessageModal messages={data.messages} />
{/if}
