<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import WideCard from '../components/WideCard.svelte';
	import CardSeparator from '../components/CardSeparator.svelte';
	import Card from '../components/Card.svelte';

	//Administration page, accessible only to users with ADMIN permissions
</script>

<svelte:head>
	<title>
		{m.administration()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div class="flex w-full grow flex-col items-center gap-2">
	<div class="flex grow flex-col gap-2 p-5 max-xl:w-9/10 xl:w-4/6">
		<h2 class="">
			<i class="ri-government-line"></i>
			{m.administration()}
		</h2>

		<WideCard>
			<h2 class="w-full max-xl:text-center xl:text-left">
				<i class="ri-settings-line"></i>
				{m.websiteSettings()}
			</h2>
			<div class="flex w-full grow flex-col">
				<!-- TODO -->
			</div>
		</WideCard>

		<CardSeparator />

		<WideCard>
			<h2 class="w-full max-xl:text-center xl:text-left">
				<i class="ri-window-2-line"></i>
				{m.infoPopupManagement()}
			</h2>
			<div class="flex w-full grow flex-col">
				<!-- TODO -->
			</div>
		</WideCard>

		<CardSeparator />

		<WideCard>
			<h2 class="w-full max-xl:text-center xl:text-left">
				<i class="ri-group-line"></i>
				{m.userManagement()}
			</h2>
			<div class="flex w-full grow flex-col">
				<!-- TODO -->
			</div>
		</WideCard>

		<CardSeparator />

		<WideCard>
			<h2 class="w-full max-xl:text-center xl:text-left">
				<i class="ri-speak-ai-line"></i>
				{m.aiManagement()}
			</h2>
			<div class="flex w-full grow flex-col">
				<!-- TODO -->
			</div>
		</WideCard>

		<CardSeparator />

		<WideCard>
			<h2 class="w-full max-xl:text-center xl:text-left">
				<i class="ri-government-line"></i>
				{m.legalDocuments()}
			</h2>
			<div class="flex w-full grow flex-col">
				<!-- TODO -->
			</div>
		</WideCard>

		<CardSeparator />

		<WideCard>
			<h2 class="w-full max-xl:text-center xl:text-left">
				<i class="ri-user-follow-line"></i>
				{m.dailyChallenges()}
			</h2>
			<div class="flex w-full grow flex-col">
				<!-- TODO -->
			</div>
		</WideCard>

		<CardSeparator />
	</div>
</div>
