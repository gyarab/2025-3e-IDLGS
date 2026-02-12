<script lang="ts">
	import type { CourseGradeType } from '$lib/types';
	import { untrack } from 'svelte';
	import EditHandle from './EditHandle.svelte';

	let {
		grades = $bindable([]),
		red,
		green,
		blue,
	}: {
		grades: CourseGradeType[];
		red: number;
		green: number;
		blue: number;
	} = $props();

	let parentElement: HTMLDivElement | undefined = $state(undefined);

	$effect(() => {
		if (grades.length === 0) return;

		//descending
		grades.sort((a, b) => b.max - a.max);

		untrack(() => {
			//adjust min/max to be consistent, size of grade's range cannot be smaller then 3
			//min and max must be between 0 and 100
			grades[0].max = 100;
			for (let i = 0; i < grades.length - 1; i++) {
				grades[i].min = grades[i + 1].max + 1;
				if (grades[i].max - grades[i].min < 3) {
					grades[i].min = grades[i].max - 3;
					grades[i + 1].max = grades[i].min - 1;
				}
			}
			grades[grades.length - 1].min = 0;
		});
	});
</script>

<div
	class="relative mt-4 flex min-h-15 w-full flex-row"
	bind:this={parentElement}
>
	<div class="absolute -top-0.5 left-0 h-1 w-full bg-white"></div>

	{#key grades}
		{#each grades as grade, index (grade.name)}
			<!-- calculation so no gaps in grades-->
			<div
				class="absolute top-0 flex min-h-2 -translate-y-1/2 flex-col items-center rounded-lg"
				style="
				right: {grade.min}%;
				width: {Math.min(100, grade.max + 0.9999999) - grade.min}%;
				background-color: rgb({((100 - grade.min) / 100) * 255}, {(grade.max / 100) *
					255}, 0);
			"
			>
				<span
					class="overflow-hidden bg-clip-text font-bold text-ellipsis text-transparent brightness-150 invert"
					style="background-color: rgb({((100 - grade.min) / 100) *
						255}, {(grade.max / 100) * 255}, 0);"
				>
					{grade.name}
				</span>
			</div>
			<EditHandle
				bind:grades
				{red}
				{green}
				{blue}
				{index}
				parentWidth={parentElement?.clientWidth ?? 0}
				removeDrag={index === 0}
			/>
		{/each}
		{#if grades.length > 0}
			<EditHandle
				bind:grades
				{red}
				{green}
				{blue}
				index={grades.length}
				parentWidth={parentElement?.clientWidth ?? 0}
				removeDrag={true}
			/>
		{/if}
	{/key}
</div>
