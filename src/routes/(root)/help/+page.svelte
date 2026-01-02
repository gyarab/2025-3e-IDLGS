<script lang="ts">
	import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>
		{m.mainHelpPage()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div class="flex w-full grow flex-col gap-2">
	<h2 class="text-4xl font-bold text-emerald-600">
		{m.helpAndDocumentation()}
	</h2>
</div>
