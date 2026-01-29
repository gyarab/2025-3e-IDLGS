<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type {
		UserType,
		CourseType,
		CourseGradeValueType,
	} from '$lib/types';
	import CardSeparator from '../../../components/CardSeparator.svelte';

	//TODO redirects from assignments with specific grades highlighted using URL params

	let {
		data,
	}: {
		data: {
			user: UserType;
			courses: CourseType[];
			grades: CourseGradeValueType[][];
		};
	} = $props();
</script>

<svelte:head>
	<title>
		{m.myGrades()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div class="flex w-full grow flex-col items-center gap-2 max-xl:hidden">
	<div class="flex w-3/4 grow flex-col gap-2">
		<CardSeparator />

		<h2 class="w-full max-xl:text-center xl:text-left">
			<i class="ri-line-chart-line"></i>
			{m.myGrades()}
		</h2>

		{#each data.courses as course, index}
			<CardSeparator />
		{/each}

		<CardSeparator />
	</div>
</div>
