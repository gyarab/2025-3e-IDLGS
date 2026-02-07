<script lang="ts">
	import WideCard from '$component/WideCard.svelte';
	import type { CourseType } from '$lib/types';
	import Button from '$src/routes/(root)/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages';
	import ExercisesDueBox from './sub/ExercisesDueBox.svelte';
	import ResultingGradeBox from './sub/ResultingGradeBox.svelte';
	import TeacherAverageGradeBox from './sub/TeacherAverageGradeBox.svelte';
	import TeacherStudentDueBox from './sub/TeacherStudentDueBox.svelte';

	let {
		data,
	}: {
		data: {
			course: CourseType;
			isTeacher: boolean;
			isOwner: boolean;
		};
	} = $props();
</script>

<div class="sticky left-0 h-[94svh] min-w-1/5 overflow-clip xl:top-[6vh]">
	<WideCard
		cssAddition="grow rounded-none! border-s-0! border-t-0! border-b-0!"
		cssOverride="p-5 rounded-none!"
		r={data.course.red}
		g={data.course.green}
		b={data.course.blue}
	>
		<h2 class="flex flex-row items-center gap-1">
			<i class="ri-file-list-3-line text-3xl"></i>
			{data.course.name}
		</h2>

		<div class="flex w-full flex-col gap-0 text-lg">
			<Button
				btn="button-none w-full"
				emoji="home"
				onclick={() => {
					goto(`/course/${data.course.uuid}/`);
				}}
			>
				<div class="flex w-full flex-row gap-1">
					{m.courseHome()}
				</div>
			</Button>

			<Button
				btn="button-none w-full"
				emoji="search"
				onclick={() => {
					goto(`/course/${data.course.uuid}/search/`);
				}}
			>
				<div class="flex w-full flex-row gap-1">
					{m.search()}
				</div>
			</Button>

			<Button
				btn="button-none w-full"
				emoji="group"
				onclick={() => {
					goto(`/course/${data.course.uuid}/people/`);
				}}
			>
				<div class="flex w-full flex-row gap-1">
					{m.participants()}
				</div>
			</Button>

			{#if data.isOwner || data.isTeacher}
				<Button
					btn="button-none w-full"
					emoji="calendar-2"
					onclick={() => {
						goto(`/course/${data.course.uuid}/plan/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.coursePlan()}
					</div>
				</Button>
				<Button
					btn="button-none w-full"
					emoji="line-chart"
					onclick={() => {
						goto(`/course/${data.course.uuid}/grades/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.grades()}
					</div>
				</Button>
				<Button
					btn="button-none w-full"
					emoji="pie-chart"
					onclick={() => {
						goto(`/course/${data.course.uuid}/statistics/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.statistics()}
					</div>
				</Button>

				<!-- settings -->
				<Button
					btn="button-none w-full"
					emoji="settings"
					onclick={() => {
						goto(`/course/${data.course.uuid}/settings/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.settings()}
					</div>
				</Button>
			{:else}
				<Button
					btn="button-none w-full"
					emoji="draft"
					onclick={() => {
						goto(`/course/${data.course.uuid}/work/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.yourWork()}
					</div>
				</Button>
			{/if}

			<div class="grow"></div>

			<!-- TODO boxes -->

			<!-- TODO quick action buttons -->
		</div>
	</WideCard>
</div>
