<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>
		{m.anErrorOccurred()}
	</title>
</svelte:head>

<div
	class="
relative flex w-full grow flex-col items-center
justify-center bg-linear-to-tr from-cyan-600 to-blue-900
"
>
	<div class="flex flex-col gap-2 rounded-lg bg-white p-5">
		<div class="text-xl text-blue-900">
			{m.anErrorOccurred()}:
		</div>
		<div class="text-9xl font-medium text-cyan-600">
			{page.status}
		</div>
		<div class="text-2xl text-blue-900">
			{page.error?.message}
		</div>
		{#if page.status == 404}
			<!-- TODO message -->
		{/if}
		<button
			class="button-blue w-full"
			onclick={() => {
				goto('/');
			}}
		>
			<i class="ri-arrow-go-back-line"></i>
			{m.goToHomePage()}
		</button>
	</div>
</div>
