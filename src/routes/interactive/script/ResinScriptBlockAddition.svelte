<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '../../(root)/components/Button.svelte';
	import ResinScriptBlockSelect from './ResinScriptBlockSelect.svelte';
</script>

<div class="flex w-3/10 flex-col">
	<h2>{m.addNewBlock()}</h2>
	<div class="flex w-full grow flex-col gap-2 overflow-scroll">
		<ResinScriptBlockSelect />
	</div>

	<!-- most comments connected to block, also possibility to add one not connected to it -->
	<div class="grid grid-cols-2 gap-2">
		<Button
			emoji="chat-4"
			btn="button-violet"
		>
			{m.addComment()}
		</Button>
		<Button
			emoji="discuss"
			btn="button-violet"
		>
			{m.addCommentToScriptBlock()}
		</Button>
	</div>
</div>
