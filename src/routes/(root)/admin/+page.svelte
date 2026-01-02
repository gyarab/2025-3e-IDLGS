<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	//Administration page, accessible only to users with ADMIN permissions
</script>

<svelte:head>
	<title>
		{m.administration()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div class="flex w-full grow flex-col items-center gap-2">
	<div class="flex grow flex-col gap-2 p-5 max-xl:w-9/10 xl:w-4/6">
		<h2 class="text-4xl font-bold text-emerald-600">
			{m.administration()}
		</h2>
	</div>
</div>
