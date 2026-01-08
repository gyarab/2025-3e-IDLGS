<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import WideCard from '../components/WideCard.svelte';

	//Administration page, accessible only to users with ADMIN permissions
</script>

<svelte:head>
	<title>
		{m.administration()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div class="flex w-full grow flex-col items-center gap-2">
	<div class="flex grow flex-col gap-2 p-5 max-xl:w-9/10 xl:w-4/6">
		<h1 class="text-emerald-600">
			{m.administration()}
		</h1>

		<WideCard>
			<h1 class="w-full text-left">
				<i class="ri-settings-line"></i>
				{m.websiteSettings()}
			</h1>
			<div class="flex flex-col grow w-full">
				<!-- TODO -->
			</div>
		</WideCard>

		<!-- TODO abstract this -->
		<div class="h-[5vh] min-h-[5vh]"></div>

		<WideCard>
			<h1 class="w-full text-left">
				<i class="ri-group-line"></i>
				{m.userManagement()}
			</h1>
			<div class="flex flex-col grow w-full">
				<!-- TODO -->
			</div>
		</WideCard>
	</div>
</div>
