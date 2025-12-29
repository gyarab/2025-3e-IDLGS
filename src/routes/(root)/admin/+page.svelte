<script lang="ts">
	import { m } from "$lib/paraglide/messages";

	//Administration page, accessible only to users with ADMIN permissions
</script>

<svelte:head>
	<title>
		{m.administration()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div class="w-full flex flex-col gap-2 grow items-center">
	<div class="xl:w-4/6 max-xl:w-9/10 p-5 flex flex-col gap-2 grow">
		<h2 class="text-4xl font-bold text-emerald-500">
			{m.administration()}
		</h2>
	</div>
</div>