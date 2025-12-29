<script lang="ts">
	import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
	<title>
		{m.mainHelpPage()} - {m.textbookNameShort()}
	</title>	
</svelte:head>

<div class="w-full flex flex-col gap-2 grow">
	<h2 class="text-4xl font-bold text-emerald-500">
		{m.helpAndDocumentation()}
	</h2>
</div>