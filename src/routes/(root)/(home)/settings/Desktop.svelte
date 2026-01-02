<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { UserType } from '$lib/types';
	import LoadingAnimationHandler from '../../components/LoadingAnimationHandler.svelte';
	import WideCard from '../../components/WideCard.svelte';

	let {
		data,
	}: {
		data: {
			user: UserType;
		};
	} = $props();
</script>

<div class="flex w-full grow flex-col items-center max-xl:hidden">
	{#await data.user}
		<LoadingAnimationHandler />
	{:then}
	<div class="flex w-3/4 grow flex-col gap-2">
		<div class="h-[5vh] min-h-[5vh]"></div>

		<h2 class="w-full text-left">
			<i class="ri-settings-line"></i>
			{m.settings()}
		</h2>

		<WideCard>
			<div class="flex flex-col gap-2">
				<h3 class="w-full text-left">
					<i class="ri-user-3-line"></i>
					{m.personalInfo()}
				</h3>
				<div class="flex flex-row gap-2 w-full">
					{m.degree()}
				</div>
			</div>
		</WideCard>
	</div>
	{/await}
</div>