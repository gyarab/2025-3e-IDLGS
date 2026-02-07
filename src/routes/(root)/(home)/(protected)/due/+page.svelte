<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { CourseAssignmentType } from '$lib/types';
	import CardSeparator from '$component/CardSeparator.svelte';
	import WideCard from '$component/WideCard.svelte';
	import Assignment from './components/Assignment.svelte';

	let {
		data,
	}: {
		data: {
			assignments: CourseAssignmentType[];
		};
	} = $props();

	const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

	const past = $derived(
		data.assignments.filter((v) => v.deadline < new Date()),
	);
	const todayOrTomorrow = $derived(
		data.assignments.filter((v) => {
			Date.now() - v.deadline.getTime() < TWO_DAYS &&
				Date.now() - v.deadline.getTime() >= 0;
		}),
	);
	const later = $derived(
		data.assignments.filter((v) => {
			Date.now() - v.deadline.getTime() >= TWO_DAYS;
		}),
	);
</script>

<svelte:head>
	<title>
		{m.myAssignments()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div class="flex w-full grow flex-col items-center gap-2 max-xl:hidden">
	<div class="flex w-3/4 grow flex-col gap-2">
		<CardSeparator />

		<h2 class="w-full max-xl:text-center xl:text-left">
			<i class="ri-todo-line"></i>
			{m.myAssignments()}
		</h2>

		<WideCard
			r={148}
			g={20}
			b={20}
		>
			<div class="flex w-full grow flex-col gap-2">
				<div class="flex w-full flex-row items-center gap-1">
					<i class="ri-error-warning-line text-2xl"></i>
					<h2>{m.alreadyPastDeadline()}</h2>
				</div>

				{#each past as assignment (assignment.uuid)}
					<Assignment {assignment} />
				{:else}
					<div
						class="flex flex-col justify-center items-center w-full grow opacity-80"
					>
						{m.noAssignmentsPastDeadline()}.
						{m.goodJob()}
					</div>
				{/each}
			</div>
		</WideCard>

		<CardSeparator />

		<WideCard
			r={148}
			g={108}
			b={0}
		>
			<div class="flex w-full grow flex-col gap-2">
				<div class="flex w-full flex-row items-center gap-1">
					<i class="ri-alarm-line text-2xl"></i>
					<h2>{m.todayOrTomorrow()}</h2>
				</div>

				{#each todayOrTomorrow as assignment (assignment.uuid)}
					<Assignment {assignment} />
				{:else}
					<div
						class="flex flex-col justify-center items-center w-full grow opacity-80"
					>
						{m.noAssignmentsDueTodayOrTomorrow()}.
					</div>
				{/each}
			</div>
		</WideCard>

		<CardSeparator />

		<WideCard
			r={20}
			g={148}
			b={20}
		>
			<div class="flex w-full grow flex-col gap-2">
				<div class="flex w-full flex-row items-center gap-1">
					<i class="ri-time-line text-2xl"></i>
					<h2>{m.later()}</h2>
				</div>

				{#each later as assignment (assignment.uuid)}
					<Assignment {assignment} />
				{:else}
					<div
						class="flex flex-col justify-center items-center w-full grow opacity-80"
					>
						{m.noOtherAssignmentsDue()}.
					</div>
				{/each}
			</div>
		</WideCard>

		<CardSeparator />
	</div>
</div>
