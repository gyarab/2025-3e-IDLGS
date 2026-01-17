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
	css="w-[35svh] h-[35svh]"
>
	<div class="relative flex w-full grow flex-col gap-2 p-2 text-left">
		<h2 class="text-left text-xl flex flex-row items-center gap-2">
			<i class="ri-book-line text-3xl"></i>
			{course.name}
		</h2>
		<p class="w-full text-sm opacity-70">{course.description}</p>

		<!-- TODO teachers on same row as name -->

		<WideCard
			r={course.red}
			g={course.green}
			b={course.blue}
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
