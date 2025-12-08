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
justify-center bg-linear-to-tr from-emerald-500 to-violet-700
"
>
	<div class="flex flex-col gap-2 rounded-lg bg-white p-5">
		<div class="text-xl text-violet-700">
			{m.anErrorOccurred()}:
		</div>
		<div class="text-9xl font-medium text-emerald-500">
			{page.status}
		</div>
		<div class="text-2xl text-violet-700">
			{page.error?.message}
		</div>
		{#if page.status == 404}
			<!-- TODO message -->
		{/if}
		<button class="button-primary w-full" onclick={() => {
			goto("/");
		}}>
			<i class="ri-arrow-go-back-line"></i>
			{m.goToHomePage()}
		</button>
	</div>
</div>
