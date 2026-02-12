<script lang="ts">
	//TODO redirects from assignments with specific grades highlighted using URL params
	import { m } from '$lib/paraglide/messages';
	import type {
		UserType,
		CourseType,
		CourseGradeValueType,
	} from '$lib/types';
	import WideCard from '$component/WideCard.svelte';

	let {
		data,
	}: {
		data: {
			user: UserType;
			course: CourseType;
			grades: CourseGradeValueType[];
		};
	} = $props();
</script>

<svelte:head>
	<title>
		{m.grades()} - {data.course.name} - {m.textbookNameShort()}
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
