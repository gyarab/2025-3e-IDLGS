<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';
	import type { CourseQuestionType, CourseType } from '$lib/types';

	let {
		data,
	}: {
		data: {
			course: CourseType;
			questions: CourseQuestionType[];
		};
	} = $props();
</script>

<svelte:head>
	<title>
		{m.search()} - {data.course.name} - {m.textbookNameShort()}
	</title>
</svelte:head>

<WideCard
	cssAddition="grow"
	r={80 + data.course.red / 5}
	g={80 + data.course.green / 5}
	b={80 + data.course.blue / 5}
>
	<h2>TODO search</h2>
</WideCard>
