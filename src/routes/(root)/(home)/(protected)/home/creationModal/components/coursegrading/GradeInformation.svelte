<script lang="ts">
	import type { CourseGradeType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import Button from '$component/Button.svelte';

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

	let editMode = $state(new Array(grades.length).fill(false));
</script>

<div class="flex w-full grow flex-row gap-2">
	{#each grades as grade, index (grade.name)}
		<div class="flex w-full grow flex-col gap-2">
			<div
				class="flex grow flex-col items-center justify-center gap-2 rounded bg-white p-2 text-xl"
				style="color: rgb({red}, {green}, {blue});"
			>
				<span class="flex flex-row gap-1 text-3xl font-medium">
					{#if editMode[index]}
						<input
							type="text"
							class="input-text w-40! grow-0 text-3xl font-medium"
							bind:value={grade.name}
							maxlength="5"
						/>
					{:else}
						{grade.name}
					{/if}
					{#if grade.name.length >= 1}
						<Button
							btn="button-none text-base!"
							emoji="pencil"
							onclick={() => {
								editMode[index] = !editMode[index];
							}}
						/>
					{/if}
				</span>
				{grade.min}% - {grade.max}%
			</div>
			<div
				class="flex flex-row justify-center gap-2 text-center text-base"
			>
				<Button
					btn="button-white"
					emoji="delete-bin"
					onclick={() => {
						grades.splice(grades.indexOf(grade), 1);
					}}
				>
					{m.deleteGrade()}
				</Button>
			</div>
		</div>
	{/each}
</div>
