<script lang="ts">
	import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>
		{m.termsOfService()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div class="flex w-full grow flex-col gap-2 items-center pt-4">
	<div class="xl:w-3/4 flex flex-col grow">
		<h2 class="text-4xl font-bold text-emerald-600">
			{m.termsOfService()}
		</h2>
	</div>
</div>
