<script lang="ts">
	import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>
		{m.privacyPolicy()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div class="flex w-full grow flex-col gap-2 items-center pt-4">
	<div class="flex grow flex-col xl:w-3/4">
		<h2 class="text-4xl font-bold text-emerald-600">
			{m.privacyPolicy()}
		</h2>
	</div>
</div>
