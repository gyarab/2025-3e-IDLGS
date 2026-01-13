<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { CourseType } from '$lib/types';
	import Button from '../../../components/Button.svelte';
	import Card from '../../../components/Card.svelte';
	import WideCard from '../../../components/WideCard.svelte';

	let {
		course,
		delay = 0,
		perspective,
		onclick = () => {},
		disable = false,
	}: {
		course: CourseType;
		delay: number;
		perspective: boolean;
		onclick?: () => void;
		disable?: boolean;
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
	css="w-[35svh] h-[35svh]"
>
	<div class="flex w-full grow flex-col gap-2 p-2 text-left relative">
		<!-- corner -->
		<div class="
			absolute -top-2.5 -right-2.5 rounded-tr-lg rounded-bl-2xl w-1/3 h-1/3 flex flex-col 
			gap-0 justify-center items-center text-white backdrop-blur-2xl border-l border-b
		" style="
			background-color: rgba(
			{Math.min(255, course.red+50)},
			{Math.min(255, course.green+50)},
			{Math.min(255, course.blue+50)},
			0.5);
			border-color: rgba(
			{Math.min(255, course.red+70)},
			{Math.min(255, course.green+70)},
			{Math.min(255, course.blue+70)},
			1);
		">
			<i class="ri-book-line text-6xl"></i>
			<span>{m.course()}</span>
		</div>

		<h2 class="w-full text-xl">{course.name}</h2>
		<p class="w-full text-sm opacity-70">{course.description}</p>

		<!-- TODO teachers on same row as name -->

		<WideCard
			r={course.red}
			g={course.green}
			b={course.blue}
			cssOverride="p-2"
			cssParentOverride="grow"
		>
			<h2 class="w-full text-lg">{m.assignments()}</h2>
			<div class="flex flex-col gap-2">
				<!-- TODO -->
			</div>
		</WideCard>

		<WideCard
			r={course.red}
			g={course.green}
			b={course.blue}
			cssOverride="p-2"
		>
			<h2 class="w-full text-lg">{m.resultingGrade()}</h2>
			<div class="flex flex-row items-end justify-center gap-2">
				<span class="text-3xl font-bold"> 1 </span>
				<span class="text-2xl opacity-70"> (90%) </span>
			</div>
		</WideCard>

		<Button
			emoji="arrow-right"
			btn="button-primary"
		>
			{m.open()}
		</Button>
	</div>
</Card>
