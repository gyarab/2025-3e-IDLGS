<script lang="ts">
	import type { MessageType } from '$lib/types';

	let {
		message,
	}: {
		message: MessageType;
	} = $props();
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>{message.name}</h2>
	<p class="flex w-full grow flex-col gap-2">
		{@html message.content}
	</p>
</div>
