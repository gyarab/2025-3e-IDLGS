<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { CourseType } from '$lib/types';
	import Button from '$component/Button.svelte';
	import Card from '$component/Card.svelte';
	import WideCard from '$component/WideCard.svelte';

	let {
		course,
		delay = 0,
		perspective,
		onclick = () => {},
		disable = false,
		selected = false,
	}: {
		course: CourseType;
		delay: number;
		perspective: boolean;
		onclick?: () => void;
		disable?: boolean;
		selected?: boolean;
	} = $props();
</script>

<!-- TODO finish -->

<Card
	{disable}
	r={course.red}
	g={course.green}
	b={course.blue}
	{delay}
	{perspective}
	{onclick}
	css={selected ? 'border-neutral-500! brightness-110' : ''}
	forceSquare={true}
>
	<div class="relative flex w-full grow flex-col gap-0 p-2 text-left">
		<h2 class="flex flex-row items-center gap-1 text-left text-xl">
			<div class="flex flex-row items-center gap-1 text-xl">
				<i class="ri-file-list-3-line text-3xl"></i>
				{course.name}
			</div>
			<div class="text-lg font-light opacity-80">
				{course.subject}
			</div>
		</h2>
		<div class="flex flex-col gap-1">
			{#each course.people?.filter((v) => v.isOwner || v.isTeacher) as people (people.uuid)}
				<div class="flex w-full flex-row items-center gap-1">
					<i class="ri-user-3-line text-lg"></i>
					<span class="text-left opacity-80">
						{people.name}
						{people.surname}
					</span>
				</div>
			{/each}
		</div>
		<p
			class="w-full text-justify text-sm font-light text-ellipsis opacity-80"
		>
			{@html course.description.split('\n')[0]}
		</p>

		<div class="grow 2xl:hidden"></div>

		<span class="flex w-full grow flex-col pt-2 pb-2 max-2xl:hidden">
			<WideCard
				r={course.red}
				g={course.green}
				b={course.blue}
				cssParentOverride="grow"
				cssOverride="pt-1! pb-1! ps-2! pe-2! grow"
			>
				<h2 class="w-full text-lg">{m.assignments()}</h2>
				<div class="flex flex-col gap-2">
					<!-- TODO -->
				</div>
			</WideCard>
		</span>

		<span class="flex w-full flex-col">
			<WideCard
				r={course.red}
				g={course.green}
				b={course.blue}
				cssOverride="pt-1! pb-1! ps-2! pe-2! flex-row items-center flex grow"
			>
				<div
					class="flex flex-row flex-nowrap gap-1 overflow-hidden whitespace-nowrap **:text-lg!"
				>
					<h2 class="w-full max-2xl:hidden">
						{m.resultingGrade().split(' ')[0]}
					</h2>
					<h2 class="w-full whitespace-nowrap max-2xl:capitalize">
						{m.resultingGrade().split(' ')[1]}
					</h2>
				</div>
				<div class="grow"></div>
				<div class="flex flex-row items-center justify-center gap-2">
					<span class="text-3xl font-bold"> 1 </span>
					<span class="text-2xl font-light opacity-80"> (90%) </span>
				</div>
			</WideCard>
		</span>
	</div>

	<Button
		emoji="arrow-right"
		btn="button-primary w-full"
	>
		{m.open()}
	</Button>
</Card>
