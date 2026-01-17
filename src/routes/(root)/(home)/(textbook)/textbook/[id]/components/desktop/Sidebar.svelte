<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$src/routes/(root)/components/WideCard.svelte';
</script>

<div class="min-w-1/5 p-2">
	<WideCard
		cssAddition="grow"
	>
		<h2>
			{m.textbookContents()}
		</h2>
	</WideCard>
</div>
