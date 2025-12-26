<script lang="ts">
	import { m } from '$lib/paraglide/messages';
</script>

<div class="flex w-3/10 flex-col">
	<h2>{m.addNewBlock()}</h2>
	<div class="flex w-full grow flex-col gap-2 overflow-scroll"></div>
	<div>
		<!-- most comments connected to block, also possibility to add one not connected to it -->
		{m.addComment()}
	</div>
	<div>
		<!-- most comments connected to block, also possibility to add one not connected to it -->
		{m.addCommentToScriptBlock()}
	</div>
</div>
