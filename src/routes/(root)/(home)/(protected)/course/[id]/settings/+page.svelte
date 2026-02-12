<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { CourseType, UserType } from '$lib/types';
	import WideCard from '$component/WideCard.svelte';

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
		{m.settings()} - {data.course.name} - {m.textbookNameShort()}
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
