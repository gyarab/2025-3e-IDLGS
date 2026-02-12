<script lang="ts">
	import type { UserType } from '$lib/types';
	import WideCard from '$component/WideCard.svelte';
	import { m } from '$lib/paraglide/messages';
	import { writeDays } from '$lib/plural';
	import LessonPlan from './LessonPlan.svelte';
	import LessonInfo from './LessonInfo.svelte';

	//TODO add lesson plan

	let {
		user,
	}: {
		user: UserType;
	} = $props();
</script>

<WideCard>
	<div
		class="
			flex h-[30svh] w-full *:flex *:flex-col *:gap-2 *:border-e-2 *:border-neutral-500 *:last:border-e-0 max-xl:flex-col
			max-xl:gap-10 xl:flex-row xl:gap-4
		"
	>
		<div class="min-w-1/4">
			{#if user.gamification && !user.schoolDirector && !user.schoolTeacher}
				<div class="flex w-full flex-row items-center gap-2">
					{#if user.extended}
						<i class="ri-fire-fill text-5xl text-amber-600"></i>
					{:else}
						<i class="ri-fire-line text-5xl text-neutral-300"></i>
					{/if}
					<h2>
						{m.streak()}: {user.streak}
						{writeDays(user.streak)}
					</h2>
				</div>
			{:else}
				<div class="flex w-full flex-row items-center gap-2"></div>
			{/if}
		</div>
		<div class="min-w-1/3">
			{#if !user.schoolDirector && !user.schoolTeacher}
				<div class="flex w-full flex-row items-center gap-2">
					<i class="ri-calendar-todo-line text-5xl text-neutral-300"
					></i>
					<h2>{m.dailyChallenges()}</h2>
				</div>
			{:else}
				<div class="flex w-full flex-row items-center gap-2"></div>
			{/if}
		</div>
		<div class="grow">
			<div class="flex w-full flex-row items-center gap-2">
				<i class="ri-table-line text-5xl text-neutral-300"></i>
				<h2>{m.lessonPlan()}</h2>
			</div>
		</div>
	</div>
</WideCard>
