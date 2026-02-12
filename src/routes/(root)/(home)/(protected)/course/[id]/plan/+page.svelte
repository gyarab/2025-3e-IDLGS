<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';
	import type { CourseType, UserType } from '$lib/types';

	/*
	 /plan - for teachers, has concepts, draft assignments, lesson plans etc.
	 /work-  for students, has their assignments, submissions, etc.

	 TODO finish

	 TODO add option for lesson plan (time/date) in course settings!
	 */

	let {
		data,
	}: {
		data: {
			course: CourseType;
			user: UserType;
		};
	} = $props();
</script>

<svelte:head>
	<title>
		{m.lessonPlan()} - {data.course.name} - {m.textbookNameShort()}
	</title>
</svelte:head>

<WideCard
	r={80 + data.course.red / 5}
	g={80 + data.course.green / 5}
	b={80 + data.course.blue / 5}
	cssAddition="grow"
>
	<div></div>
</WideCard>
