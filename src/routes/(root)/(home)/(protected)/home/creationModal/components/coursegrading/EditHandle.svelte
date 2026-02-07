<script lang="ts">
	import { browser } from '$app/environment';
	import type { CourseGradeType } from '$lib/types';
	import Button from '$component/Button.svelte';
	import { onDestroy, onMount } from 'svelte';

	let {
		grades = $bindable([]),
		red,
		green,
		blue,
		index,
		parentWidth,
		removeDrag,
	}: {
		grades: CourseGradeType[];
		red: number;
		green: number;
		blue: number;
		index: number;
		parentWidth: number;
		removeDrag: boolean;
	} = $props();

	let dragBeginX: number = $state(0);
	let isDragging: boolean = $state(false);

	const dragStartHandler = (e: MouseEvent) => {
		e.stopPropagation();
		dragBeginX = e.pageX;
		isDragging = true;
	};

	const dragEndHandler = (e: MouseEvent) => {
		e.stopPropagation();
		isDragging = false;
	};

	const dragHandler = (e: MouseEvent) => {
		e.stopPropagation();

		if (!isDragging) return;

		let percentage = ((dragBeginX - e.pageX) / parentWidth) * 100;

		if (grades[index - 1]) {
			grades[index - 1]!.min = Math.max(
				(grades.length - index) * 3,
				Math.min(
					100 - (index + 1) * 3,
					grades[index - 1]!.min + percentage,
				),
			);
		}
		if (grades[index]) {
			grades[index]!.max = Math.max(
				(grades.length - index) * 3,
				Math.min(
					100 - (index + 1) * 3,
					grades[index]!.max + percentage,
				),
			);
		}

		//round to 1 decimal place
		grades[index - 1].min = Math.round(grades[index - 1].min * 10) / 10;
		grades[index].max = Math.round(grades[index].max * 10) / 10;

		grades[0].max = 100;
		grades[grades.length - 1]!.min = 0;

		dragBeginX = e.pageX;
	};

	onMount(() => {
		if (!browser) return;

		window.addEventListener('mouseup', dragEndHandler);
		window.addEventListener('mousemove', dragHandler);
	});
	onDestroy(() => {
		if (!browser) return;
		window.removeEventListener('mouseup', dragEndHandler);
		window.removeEventListener('mousemove', dragHandler);
	});
</script>

<div
	id="{index}timelinehandle"
	class="absolute top-4 z-10 flex flex-col rounded bg-white p-1"
	style="right: {Math.min(
		98,
		grades[index]?.max ?? 0,
	)}%; color: rgb({red}, {green}, {blue});"
	draggable="true"
>
	{#if !removeDrag}
		<Button
			btn="button-none"
			emoji="expand-horizontal"
			id="{index}timelinedrag"
			onmousedown={dragStartHandler}
		/>
	{/if}
	<Button
		btn="button-none"
		emoji="add-circle"
		id="{index}timelineadd"
		onclick={() => {
			const localIndex = index;

			grades.splice(localIndex, 0, {
				name:
					(grades[localIndex - 1]?.name ?? '+') +
					'/' +
					(grades[localIndex]?.name ?? '-'),
				min: Math.max(
					Math.min((grades[localIndex]?.max ?? 5) - 5, 100),
					0,
				),
				max: Math.max(
					Math.min((grades[localIndex - 1]?.min ?? 105) + 5, 100),
					0,
				),
			});

			//adjust neighboring grades
			if (grades[localIndex - 1] != undefined) {
				grades[localIndex - 1].min = Math.max(
					0,
					Math.min(grades[localIndex].max + 1, 100),
				);
			}
			if (grades[localIndex + 1] != undefined) {
				grades[localIndex + 1].max = Math.max(
					0,
					Math.min(grades[localIndex].min - 1, 100),
				);
			}
		}}
	/>
</div>
